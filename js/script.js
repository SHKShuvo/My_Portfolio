const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const roles = ['API Middleware Specialist', 'Microservices Engineer', 'Core Banking Developer', 'Enterprise Integration Professional', 'Data-Aware Software Engineer'];
const typingText = document.getElementById('typing-text');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const role = roles[roleIndex];
  typingText.textContent = deleting ? role.slice(0, charIndex--) : role.slice(0, charIndex++);
  if (!deleting && charIndex > role.length + 8) deleting = true;
  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeRole, deleting ? 48 : 80);
}
if (typingText) typeRole();

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    const suffix = el.closest('.metrics') ? '+' : '+';
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.8 });

counters.forEach(counter => counterObserver.observe(counter));


// Project carousel
const carousel = document.querySelector('.project-carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prev = carousel.querySelector('.carousel-btn.prev');
  const next = carousel.querySelector('.carousel-btn.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let activeSlide = 0;
  let autoplay;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to project slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('button'));

  function goToSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === activeSlide));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(() => goToSlide(activeSlide + 1), 4200);
  }

  function stopAutoplay() {
    if (autoplay) clearInterval(autoplay);
  }

  prev.addEventListener('click', () => { goToSlide(activeSlide - 1); startAutoplay(); });
  next.addEventListener('click', () => { goToSlide(activeSlide + 1); startAutoplay(); });
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  goToSlide(0);
  startAutoplay();
}
