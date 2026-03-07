/* ==========================================
   SIGN MAKERS PUNE — script.js
========================================== */

/* ── Menu Toggle ─────────────────────── */
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

/* Close menu when clicking outside */
document.addEventListener("click", function (e) {
  const menu = document.getElementById("mobileMenu");
  const ham  = document.querySelector(".hamburger");
  if (!menu || !ham) return;
  if (menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !ham.contains(e.target)) {
    menu.classList.remove("active");
  }
});

/* ── Header: more opaque on scroll ────── */
const hdr = document.querySelector(".site-header");
if (hdr) {
  window.addEventListener("scroll", () => {
    hdr.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });
}

/* ── Mark active page in menu ──────────── */
(function markActivePage() {
  const links   = document.querySelectorAll(".mobile-menu a");
  const current = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active-page");
    }
  });
})();

/* ── Scroll Reveal ─────────────────────
   SAFE: only targets specific elements,
   never touches .projects-grid or images
──────────────────────────────────────── */
(function initReveal() {
  /* Only these specific selectors get reveal treatment */
  const revealSelectors = [
    ".section h2",
    ".about-intro",
    ".about-services",
    ".about-closing",
    ".testimonial-slider",
    ".products-hero p",
  ];

  /* These get staggered child reveals — NOT projects-grid, NOT services-grid */
  const groupSelectors = [
    ".about-highlights",
    ".grid",
    ".contact-grid",
    ".about-services ul",
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add("reveal");
    });
  });

  groupSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add("reveal-group");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".reveal, .reveal-group").forEach(el => {
    observer.observe(el);
  });
})();

/* ── Testimonial Slider ────────────────── */
(function initSlider() {
  const slides = document.querySelectorAll(".testimonial");
  if (!slides.length) return;

  let current = 0;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  showSlide(0);
  setInterval(() => showSlide(current + 1), 5000);

  window.nextSlide = () => showSlide(current + 1);
  window.prevSlide = () => showSlide(current - 1);
})();
