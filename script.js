/* ==========================================
   SIGN MAKERS PUNE — script.js v2
   Performance-first: RAF scroll, passive
   listeners, reduced-motion support
========================================== */

/* ── Reduced motion flag ───────────────── */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Menu Toggle ────────────────────────── */
function toggleMenu() {
  const menu    = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  if (!menu) return;
  const isOpen = menu.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

/* Close on overlay click */
const overlay = document.getElementById("menuOverlay");
if (overlay) overlay.addEventListener("click", toggleMenu);

/* Close menu when tapping outside */
document.addEventListener("click", function (e) {
  const menu = document.getElementById("mobileMenu");
  const ham  = document.querySelector(".hamburger");
  if (!menu || !ham) return;
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !ham.contains(e.target)
  ) {
    toggleMenu();
  }
}, { passive: true });

/* ── Header scroll class (RAF-throttled) ─ */
const hdr = document.querySelector(".site-header");
if (hdr) {
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        hdr.classList.toggle("scrolled", window.scrollY > 30);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ── Mark active page ───────────────────── */
(function markActivePage() {
  const links   = document.querySelectorAll(".mobile-menu a");
  const current = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active-page");
    }
  });
})();

/* ── Scroll Reveal ──────────────────────
   Single IntersectionObserver for all
   reveal targets. Unobserves after trigger
   to free memory on long pages.
──────────────────────────────────────── */
(function initReveal() {
  if (prefersReduced) return; /* CSS handles fallback */

  const revealSelectors = [
    ".section h2",
    ".about-intro",
    ".about-services",
    ".about-services-header",
    ".expertise-grid",
    ".about-closing",
    ".testimonial-slider",
    ".products-hero p",
  ];

  const groupSelectors = [
    ".about-highlights",
    ".grid",
    ".contact-grid",
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add("reveal"));
  });

  groupSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add("reveal-group"));
  });

  /* expertise items: staggered individually */
  document.querySelectorAll(".expertise-grid").forEach(grid => {
    grid.querySelectorAll(".expertise-item").forEach((item, i) => {
      item.style.transitionDelay = (0.06 + i * 0.07) + "s";
      item.classList.add("reveal");
    });
  });

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target); /* fire once */
        }
      });
    },
    { threshold: 0.10, rootMargin: "0px 0px -28px 0px" }
  );

  document.querySelectorAll(".reveal, .reveal-group").forEach(el => io.observe(el));
})();

/* ── Testimonial Slider ─────────────────
   Auto-advance with pause-on-hover.
   Dot navigation built dynamically.
──────────────────────────────────────── */
(function initSlider() {
  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;

  const slides  = slider.querySelectorAll(".testimonial");
  if (!slides.length) return;

  const dotsWrap = slider.parentElement.querySelector(".slider-dots");
  let current    = 0;
  let timer      = null;
  let paused     = false;

  /* Build dots dynamically if container exists */
  if (dotsWrap && !dotsWrap.children.length) {
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "slider-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Review " + (i + 1));
      d.addEventListener("click", () => showSlide(i));
      dotsWrap.appendChild(d);
    });
  }

  function showSlide(n) {
    slides[current].classList.remove("active");
    if (dotsWrap) {
      dotsWrap.children[current]?.classList.remove("active");
    }
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dotsWrap) {
      dotsWrap.children[current]?.classList.add("active");
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      if (!paused) showSlide(current + 1);
    }, 5000);
  }

  showSlide(0);
  startTimer();

  /* Pause on hover / touch */
  slider.addEventListener("mouseenter",  () => { paused = true;  }, { passive: true });
  slider.addEventListener("mouseleave",  () => { paused = false; }, { passive: true });
  slider.addEventListener("touchstart",  () => { paused = true;  }, { passive: true });
  slider.addEventListener("touchend",    () => {
    setTimeout(() => { paused = false; }, 3000);
  }, { passive: true });

  /* Expose for inline onclick fallback */
  window.nextSlide = () => showSlide(current + 1);
  window.prevSlide = () => showSlide(current - 1);
})();
