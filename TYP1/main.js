// Scroll suave con offset del header fijo
(function () {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    const header = document.querySelector(".site-header");
    function headerH() { return header ? header.offsetHeight : 64; }
  
    function scrollWithOffset(target){
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH() - 8;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-scroll-to], a[href^='#']");
      if (!t) return;
      e.preventDefault();
      const sel = t.getAttribute("data-scroll-to") || t.getAttribute("href");
      const el = document.querySelector(sel);
      if (el) scrollWithOffset(el);
    });
  })();
  