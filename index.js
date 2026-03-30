
    gsap.registerPlugin(ScrollTrigger);

    // --- CUSTOM CURSOR ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followX = 0, followY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      gsap.set(cursor, { x: mouseX, y: mouseY });
    });

    function animateFollower() {
      followX += (mouseX - followX) * 0.12;
      followY += (mouseY - followY) * 0.12;
      gsap.set(follower, { x: followX, y: followY });
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .product-card, .occasion-card, .insta-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });

    // --- NAVBAR SCROLL ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // --- HERO ANIMATIONS ---
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .from('.hero-eyebrow', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      .from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' }, '-=0.5')
      .from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-btns', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-badges', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-img', { opacity: 0, scale: 0.95, stagger: 0.12, duration: 1, ease: 'power3.out' }, '-=0.8')
      .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.3');

    // --- NAV ---
    gsap.from('nav', { opacity: 0, y: -30, duration: 0.8, ease: 'power3.out', delay: 0.2 });

    // --- SCROLL ANIMATIONS ---
    // Fade up elements
    gsap.utils.toArray('.fade-up').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          delay: i * 0.05
        }
      );
    });

    // Fade in
    gsap.utils.toArray('.fade-in').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      );
    });

    // Slide left
    gsap.utils.toArray('.slide-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      );
    });

    // Slide right
    gsap.utils.toArray('.slide-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      );
    });

    // Scale in — stagger product cards
    gsap.utils.toArray('.scale-in').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.88, y: 30 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.75, ease: 'back.out(1.4)',
          delay: (i % 3) * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    // --- PARALLAX HERO BG ---
    gsap.to('.hero-bg-pattern', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // --- OCCASION CARD HOVER TILT ---
    document.querySelectorAll('.occasion-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
        gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.4, ease: 'power2.out', transformPerspective: 600 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
      });
    });

    // --- PRODUCT CARD 3D HOVER ---
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.4, transformPerspective: 800 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 });
      });
    });

    // --- INSTAGRAM GRID STAGGER ---
    gsap.from('.insta-item', {
      opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.6, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.insta-grid', start: 'top 85%' }
    });

    // --- COUNTER EFFECT (why-icon bounce) ---
    gsap.utils.toArray('.why-icon').forEach((icon, i) => {
      gsap.fromTo(icon,
        { scale: 0, rotation: -15 },
        {
          scale: 1, rotation: 0, duration: 0.6,
          ease: 'back.out(2)', delay: i * 0.12,
          scrollTrigger: { trigger: icon, start: 'top 85%' }
        }
      );
    });

    // --- FLOATING PETALS ---
    const petals = ['🌸', '🌺', '🌹', '✿', '❀'];
    function createPetal() {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.top = '-2rem';
      petal.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      document.body.appendChild(petal);

      gsap.to(petal, {
        y: '110vh',
        x: (Math.random() - 0.5) * 200,
        rotation: (Math.random() - 0.5) * 360,
        opacity: 0.6,
        duration: 6 + Math.random() * 4,
        ease: 'none',
        onStart: () => { petal.style.opacity = '0.6'; },
        onComplete: () => petal.remove()
      });
    }

    // Trigger petals occasionally
    setInterval(() => {
      if (Math.random() > 0.5) createPetal();
    }, 2500);

    // --- SMOOTH SECTION PARALLAX ---
    gsap.utils.toArray('.comm-img').forEach((img, i) => {
      gsap.to(img, {
        y: i % 2 === 0 ? -30 : 30,
        ease: 'none',
        scrollTrigger: { trigger: '.community', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });

    // --- CTA SECTION PULSE ---
    gsap.to('.cta-banner::before', {
      scale: 1.05, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1
    });

    // --- HERO TITLE SPLIT TEXT EFFECT ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      gsap.fromTo(heroTitle, 
        { backgroundPositionX: '0%' }, 
        { backgroundPositionX: '100%', duration: 8, ease: 'none', repeat: -1, yoyo: true }
      );
    }

    // --- SCROLL PROGRESS INDICATOR (subtle) ---
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--sage),var(--blush));z-index:9999;transform-origin:left;';
    document.body.appendChild(progressBar);
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true }
    });
    gsap.set(progressBar, { scaleX: 0 });

    // --- TEST CARDS STAGGER ---
    gsap.from('.test-card', {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.test-grid', start: 'top 80%' }
    });

    // --- FOOTER REVEAL ---
    gsap.from('footer', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: 'footer', start: 'top 95%' }
    });
