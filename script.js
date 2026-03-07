function toggleMenu() {
  let menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}
let testimonials = document.querySelectorAll(".testimonial");
let index = 0;

function rotateTestimonials() {
  testimonials.forEach((t) => t.classList.remove("active"));

  index = (index + 1) % testimonials.length;

  testimonials[index].classList.add("active");
}

setInterval(rotateTestimonials, 3500);
function toggleMenu() {
  let menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}
/* ==========================================
   SIGN MAKERS PUNE — script.js
========================================== */

/* ── Menu Toggle ───────────────────────── */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("active");
}

/* Close menu when clicking outside */
document.addEventListener("click", function (e) {
  const menu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");
  if (
    menu &&
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menu.classList.remove("active");
  }
});

/* ── Header: translucent → more opaque on scroll ── */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });

/* ── Mark active page link in menu ───────────────── */
(function markActivePage() {
  const links = document.querySelectorAll(".mobile-menu a");
  const current = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active-page");
  });
})();

/* ── Scroll Reveal (parallax-style) ─────────────── */
(function initReveal() {
  // Auto-add .reveal to section headings and .reveal-group to grids
  document.querySelectorAll(".section h2").forEach(el => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  });
  document.querySelectorAll(
    ".about-highlights, .services-grid, .grid, .contact-grid, .projects-grid, .about-services ul"
  ).forEach(el => {
    if (!el.classList.contains("reveal-group")) el.classList.add("reveal-group");
  });
  document.querySelectorAll(
    ".about-intro, .about-services, .testimonial-slider, .products-hero p, .about-closing"
  ).forEach(el => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal, .reveal-group").forEach(el => {
    observer.observe(el);
  });
})();

/* ── Testimonial Slider (if present) ────────────── */
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

  // Auto-advance every 5s
  setInterval(() => showSlide(current + 1), 5000);

  // Expose for manual controls if needed
  window.nextSlide = () => showSlide(current + 1);
  window.prevSlide = () => showSlide(current - 1);
})();
