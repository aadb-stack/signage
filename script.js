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
