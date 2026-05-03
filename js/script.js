const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
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

const roles = ['Web Designer', 'Front-End Developer', 'UI/UX Designer', 'Graphics Designer', 'Freelancer'];
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

  setTimeout(typeRole, deleting ? 55 : 95);
}
typeRole();

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
