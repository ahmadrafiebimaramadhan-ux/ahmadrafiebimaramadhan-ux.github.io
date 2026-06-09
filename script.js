/* ============================================
   AHMAD RAFIE - PORTFOLIO JS
   Premium Enterprise Interactions
   ============================================ */

'use strict';

/* ── THEME TOGGLE ──────────────────────────── */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Load saved preference
  const saved = localStorage.getItem('ar-theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('ar-theme', isLight ? 'light' : 'dark');

    // Visual feedback ripple
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => { btn.style.transform = ''; }, 150);
  });
}

/* ── LOADER ────────────────────────────────── */
const loader = document.getElementById('loader');
const loaderStatus = document.getElementById('loaderStatus');

const loaderMessages = [
  'Initializing System...',
  'Loading Kernel Modules...',
  'Mounting Filesystems...',
  'Starting Services...',
  'System Ready.'
];

let msgIndex = 0;
const msgInterval = setInterval(() => {
  msgIndex++;
  if (msgIndex < loaderMessages.length) {
    loaderStatus.textContent = loaderMessages[msgIndex];
  } else {
    clearInterval(msgInterval);
  }
}, 400);

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('fade-out');
    document.body.classList.remove('loading');
    initAllAnimations();
  }, 2200);
});

document.body.classList.add('loading');

/* ── PARTICLE CANVAS ───────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -1000, y: -1000 };
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 120;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 162, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 162, 255, ${0.08 * (1 - d / MAX_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      // mouse repel
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        particles[i].x += dx * 0.015;
        particles[i].y += dy * 0.015;
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
}

/* ── TYPING ANIMATION ──────────────────────── */
function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const texts = [
    'Junior System Administrator',
    'Linux Administrator',
    'Cloud Enthusiast',
    'Infrastructure Engineer',
    'IT Support Specialist'
  ];
  let i = 0, j = 0, deleting = false;

  function type() {
    const current = texts[i];
    if (!deleting) {
      el.textContent = current.substring(0, j++);
      if (j > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.substring(0, j--);
      if (j < 0) {
        deleting = false;
        i = (i + 1) % texts.length;
        j = 0;
        setTimeout(type, 400);
        return;
      }
    }
    setTimeout(type, deleting ? 50 : 80);
  }
  type();
}

/* ── NAVBAR ────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
}

/* ── SCROLL REVEAL ─────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── ANIMATED COUNTERS ─────────────────────── */
function initCounters() {
  const cards = document.querySelectorAll('.stat-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const counter = card.querySelector('.counter');
        const target = parseInt(card.dataset.target);
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          counter.textContent = count;
          if (count >= target) clearInterval(timer);
        }, 30);
        obs.unobserve(card);
      }
    });
  }, { threshold: 0.5 });
  cards.forEach(c => obs.observe(c));
}

/* ── SKILL BARS ────────────────────────────── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        setTimeout(() => { fill.style.width = width + '%'; }, 200);
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
}

/* ── SKILL TABS ────────────────────────────── */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById('tab-' + target);
      if (pane) {
        pane.classList.add('active');
        // Animate skill bars in new tab
        pane.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 100);
        });
      }
    });
  });
}

/* ── CERTIFICATE FILTER ────────────────────── */
function initCertFilter() {
  const btns = document.querySelectorAll('.cert-btn');
  const cards = document.querySelectorAll('.cert-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hide');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
          });
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ── CONTACT FORM ──────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', errId: 'nameError', msg: 'Please enter your name.' },
      { id: 'email', errId: 'emailError', msg: 'Please enter a valid email.', isEmail: true },
      { id: 'subject', errId: 'subjectError', msg: 'Please enter a subject.' },
      { id: 'message', errId: 'messageError', msg: 'Please enter your message.' }
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const err = document.getElementById(f.errId);
      const val = input.value.trim();
      let msg = '';

      if (!val) {
        msg = f.msg;
        valid = false;
      } else if (f.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg = 'Please enter a valid email.';
        valid = false;
      }

      err.textContent = msg;
      input.style.borderColor = msg ? 'rgba(255,71,87,0.6)' : '';
    });

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        form.reset();
        const success = document.getElementById('formSuccess');
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 4000);
      }, 1500);
    }
  });

  // Real-time clear errors
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const errId = input.id + 'Error';
      const err = document.getElementById(errId);
      if (err) { err.textContent = ''; input.style.borderColor = ''; }
    });
  });
}

/* ── BACK TO TOP ───────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── SMOOTH SCROLL FOR ANCHORS ─────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── MOUSE PARALLAX ────────────────────────── */
function initParallax() {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;

  document.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 15;
    const y = (e.clientY / h - 0.5) * 15;
    heroVisual.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  });
}

/* ── INIT ALL ──────────────────────────────── */
function initAllAnimations() {
  initParticles();
  initTyping();
  initNavbar();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initSkillTabs();
  initCertFilter();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initParallax();
  initThemeToggle();

  // Trigger initial skill bars for active tab
  setTimeout(() => {
    document.querySelectorAll('#tab-sysadmin .skill-fill').forEach(fill => {
      fill.style.width = fill.dataset.width + '%';
    });
  }, 300);
}

// Apply saved theme immediately to prevent flash
(function() {
  if (localStorage.getItem('ar-theme') === 'light') {
    document.body.classList.add('light-mode');
  }
})();
