/* ===================================
   PORTFOLIO — DHANASHREE SAWANT
   script.js
=================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Navbar scroll shadow ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---- Hamburger menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity   = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0) * 1);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((el, i) => {
      el.dataset.delay = i * 80;
      observer.observe(el);
    });
  }

  /* ---- Page transition on nav links ---- */
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      // Only internal .html pages
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
      if (!href.endsWith('.html') && href !== '') return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 450);
      });
    });

    // On page load, fade out overlay if it was a transition
    overlay.classList.add('exit');
    setTimeout(() => {
      overlay.classList.remove('exit');
      overlay.classList.remove('active');
    }, 500);
  }

  /* ---- Image hover zoom (already handled by CSS but JS fallback) ---- */
  // Nothing extra needed — CSS handles all hover states

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Stagger hero text on landing page ---- */
  const heroLines = document.querySelectorAll('.hero-name-line');
  heroLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(30px)';
    line.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 200 + i * 150);
  });

  const heroIntro = document.querySelector('.hero-intro');
  if (heroIntro) {
    heroIntro.style.opacity = '0';
    heroIntro.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { heroIntro.style.opacity = '1'; }, 900);
  }

  const heroSocial = document.querySelector('.hero-social');
  if (heroSocial) {
    heroSocial.style.opacity = '0';
    heroSocial.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { heroSocial.style.opacity = '1'; }, 1100);
  }

});
