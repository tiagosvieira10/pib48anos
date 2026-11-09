/* ==========================================================
   CONFIGURAÇÕES EDITÁVEIS — altere somente aqui
   ========================================================== */
const CONFIG = {
  // TODO: substitua pelo link definitivo do Google Forms da PIB RUN
  PIB_RUN_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLScBzmO4LGlhbxvjtXEBuhdvXID50gg3Oj8r0RF6Tlc1eKLmdw/viewform?usp=header",
  // TODO: substitua pelo link do Instagram oficial da igreja
  INSTAGRAM_URL: "https://www.instagram.com/pibouricuri/",
};

/* Aplica um link externo a todos os elementos do seletor */
function applyExternalLink(selector, url, label) {
  const isValid = /^https?:\/\//i.test(url);
  document.querySelectorAll(selector).forEach((el) => {
    if (isValid) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        alert(label + " ainda não foi configurado.");
      });
    }
  });
}

/* Rolagem suave para links internos */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const id = link.getAttribute("href");
    if (id.length < 2) return;
    link.addEventListener("click", (event) => {
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* Animações discretas de entrada */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* Cabeçalho ganha fundo após rolar */
function setupTopbar() {
  const bar = document.getElementById("topbar");
  const update = () => bar.classList.toggle("is-scrolled", window.scrollY > 40);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  applyExternalLink(".js-run-link", CONFIG.PIB_RUN_FORM_URL, "O link de inscrição da PIB RUN");
  applyExternalLink(".js-instagram-link", CONFIG.INSTAGRAM_URL, "O link do Instagram");
  setupSmoothScroll();
  setupReveal();
  setupTopbar();
});
