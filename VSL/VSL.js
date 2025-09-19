(function () {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector(".site-header");
  
    function setHeaderVar(){
      const h = header ? header.offsetHeight : 60;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    }
    window.addEventListener("load", setHeaderVar);
    window.addEventListener("resize", setHeaderVar);
  
    function getTarget(el){
      const t = el.closest("[data-scroll-to], a[href^='#']");
      if(!t) return null;
      const sel = t.getAttribute("data-scroll-to") || t.getAttribute("href");
      try { return document.querySelector(sel); } catch { return null; }
    }
  
    function scrollWithOffset(target){
      if(!target) return;
      const h = header ? header.offsetHeight : 60;
      const y = target.getBoundingClientRect().top + window.pageYOffset - h - 12;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  
    document.addEventListener("click", (e)=>{
      const target = getTarget(e.target);
      if(!target) return;
      e.preventDefault();
      scrollWithOffset(target);
    });
  })();
  // Header height -> variable CSS (sirve para ubicar el menú mobile debajo)
(function () {
    const header = document.querySelector(".site-header");
    function setHeaderVar(){
      const h = header ? header.offsetHeight : 60;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    }
    window.addEventListener("load", setHeaderVar);
    window.addEventListener("resize", setHeaderVar);
  })();
  
  // Toggle hamburguesa + cerrar al elegir un link
  (function () {
    const btn = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!btn || !nav) return;
  
    const closeMenu = () => {
      btn.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
      document.body.style.overflow = ""; // desbloquear scroll de fondo si lo bloqueaste
    };
  
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  
    // Cerrar al clickear un enlace (y hacer smooth scroll con tu lógica existente)
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a[href^='#'], [data-scroll-to]");
      if (a) closeMenu();
    });
  
    // Cerrar si redimensiona a desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 640) closeMenu();
    });
  })();
  