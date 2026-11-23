// Interações do site romântico da Isabella

const openLetterButton = document.querySelector('#openLetter');
const letterContent = document.querySelector('#letterContent');
const surpriseButton = document.querySelector('#surpriseButton');
const toast = document.querySelector('#toast');
const heartLayer = document.querySelector('#heartLayer');
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

// Menu compacto para celulares e telas estreitas.
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      menuToggle.textContent = '☰';
    });
  });
}

openLetterButton?.addEventListener('click', () => {
  const isOpening = letterContent.hidden;
  letterContent.hidden = !isOpening;
  openLetterButton.setAttribute('aria-expanded', String(isOpening));
  openLetterButton.innerHTML = isOpening
    ? 'Fechar cartinha <span>♥</span>'
    : 'Abrir minha cartinha <span>♥</span>';

  if (isOpening) {
    letterContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    launchHearts(9);
  }
});

let toastTimeout;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function launchHearts(amount = 18) {
  if (!heartLayer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const symbols = ['♥', '♡', '❤'];
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 0.9}s`;
    heart.style.fontSize = `${13 + Math.random() * 18}px`;
    heartLayer.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

surpriseButton?.addEventListener('click', () => {
  launchHearts(28);
  showToast('Um beijo enorme para você, Isabella! ♥');
});

// Anima os elementos conforme aparecem na tela.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}