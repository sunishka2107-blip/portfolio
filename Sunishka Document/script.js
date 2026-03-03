/* ============================================
   SUNISHKA AGARWAL — PORTFOLIO
   script.js  |  Interactions & Animations
   ============================================ */

   'use strict';

   /* ---- NAVBAR SCROLL ---- */
   const navbar = document.getElementById('navbar');
   
   window.addEventListener('scroll', () => {
     navbar.classList.toggle('scrolled', window.scrollY > 50);
   }, { passive: true });
   
   
   /* ---- MOBILE MENU ---- */
   const hamburger   = document.getElementById('hamburger');
   const mobileMenu  = document.getElementById('mobileMenu');
   const mobileClose = document.getElementById('mobileClose');
   
   hamburger.addEventListener('click',   () => mobileMenu.classList.add('open'));
   mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
   
   document.querySelectorAll('.mob-link').forEach(l =>
     l.addEventListener('click', () => mobileMenu.classList.remove('open'))
   );
   
   
   /* ---- PHOTO FALLBACK ---- */
   // If photo fails to load, hide img and show placeholder
   const profilePhoto   = document.querySelector('.profile-photo');
   const photoPlaceholder = document.getElementById('photoPlaceholder');
   
   if (profilePhoto) {
     profilePhoto.addEventListener('error', () => {
       profilePhoto.style.display = 'none';
       if (photoPlaceholder) photoPlaceholder.style.display = 'flex';
     });
   
     // If image loaded fine, hide placeholder
     profilePhoto.addEventListener('load', () => {
       if (photoPlaceholder) photoPlaceholder.style.display = 'none';
     });
   
     // Handle cached images that already loaded before listener attached
     if (profilePhoto.complete && profilePhoto.naturalWidth !== 0) {
       if (photoPlaceholder) photoPlaceholder.style.display = 'none';
     }
   }
   
   
   /* ---- TYPEWRITER — hero role line ---- */
   const roles = [
     'AI & Machine Learning Enthusiast ',
     'ECE & Full Stack Developer',
     'DSA & Problem Solver',
     'MATLAB & Signal Processing',
     'AI Explorer',
     'Laravel & PHP Developer',
   ];
   
   let rIdx = 0, cIdx = 0, del = false;
   const typedEl = document.getElementById('typedRole');
   
   function typeRole() {
     if (!typedEl) return;
     const word = roles[rIdx];
     typedEl.textContent = del ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);
   
     if (!del && cIdx === word.length) { del = true; return setTimeout(typeRole, 2200); }
     if ( del && cIdx === 0)           { del = false; rIdx = (rIdx + 1) % roles.length; }
   
     setTimeout(typeRole, del ? 36 : 72);
   }
   setTimeout(typeRole, 1800);
   
   
   /* ---- ABOUT TERMINAL ---- */
   function typeIn(id, text, delay, cb) {
     const el = document.getElementById(id);
     if (!el) return;
     let i = 0;
     setTimeout(() => {
       const iv = setInterval(() => {
         el.textContent += text[i++];
         if (i >= text.length) {
           clearInterval(iv);
           if (cb) setTimeout(cb, 260);
         }
       }, 24);
     }, delay);
   }
   
   function show(id) {
     const el = document.getElementById(id);
     if (el) el.style.display = '';
   }
   
   const terminalEl = document.getElementById('aboutTerminal');
   let terminalFired = false;
   
   const termObs = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting && !terminalFired) {
         terminalFired = true;
         termObs.unobserve(entry.target);
   
         typeIn('ac1', 'whoami --profile', 0, () => {
           const rows = [
             ['ao1', '  name      : Sunishka Agarwal'],
             ['ao2', '  degree    : B.Tech ECE — 2nd Year · JIIT'],
             ['ao3', '  status    : open_to_work = true ✓'],
             ['ao4', '  school    : Ryan International, Noida · CBSE'],
             ['ao5', '  skills    : C++ · Python · MATLAB · Proteus'],
             ['ao6', '  passion   : Hardware ∩ Software · AI/ML'],
           ];
   
           rows.forEach(([id, text], i) => {
             setTimeout(() => {
               show(id);
               document.getElementById(id).textContent = text;
             }, i * 120);
           });
   
           setTimeout(() => {
             show('aline2');
             typeIn('ac2', 'echo $goal', 0, () => {
               show('ao7');
               document.getElementById('ao7').textContent =
                 '  → Build impactful software. Get hired. Ship things. 🚀';
               setTimeout(() => show('aline3'), 360);
             });
           }, rows.length * 120 + 380);
         });
       }
     });
   }, { threshold: 0.3 });
   
   if (terminalEl) termObs.observe(terminalEl);
   
   
   /* ---- SCROLL REVEAL ---- */
   const reveals = document.querySelectorAll('.reveal');
   
   const revealObs = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (!entry.isIntersecting) return;
   
       const siblings = entry.target.parentElement
         ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
         : [];
       const idx = siblings.indexOf(entry.target);
       setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 85, 320));
   
       revealObs.unobserve(entry.target);
     });
   }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
   
   reveals.forEach(el => revealObs.observe(el));
   
   
   /* ---- SKILL BARS ---- */
   const barObs = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.querySelectorAll('.skr-fill').forEach(b => b.classList.add('animated'));
         barObs.unobserve(entry.target);
       }
     });
   }, { threshold: 0.2 });
   
   document.querySelectorAll('.sk-col').forEach(c => barObs.observe(c));
   
   
   /* ---- ACTIVE NAV LINK ---- */
   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('.nav-links a');
   
   const secObs = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         navLinks.forEach(a => a.classList.remove('active-nav'));
         const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
         if (link) link.classList.add('active-nav');
       }
     });
   }, { threshold: 0.4 });
   
   sections.forEach(s => secObs.observe(s));
   
   
   /* ---- SMOOTH SCROLL ---- */
   document.querySelectorAll('a[href^="#"]').forEach(link => {
     link.addEventListener('click', e => {
       const id = link.getAttribute('href');
       if (id === '#') return;
       const target = document.querySelector(id);
       if (target) {
         e.preventDefault();
         const top = target.getBoundingClientRect().top + window.scrollY - 80;
         window.scrollTo({ top, behavior: 'smooth' });
       }
     });
   });
   
   
   /* ---- CONSOLE EASTER EGG ---- */
   console.log(
     '%c ✦ Sunishka Agarwal ',
     'background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;padding:8px 18px;font-weight:900;font-size:15px;border-radius:8px;'
   );
   console.log('%c B.Tech ECE · JIIT · Open to Opportunities', 'color:#a78bfa;font-size:13px;');
   console.log('%c sunishka2107@gmail.com', 'color:#5a607a;font-size:12px;');