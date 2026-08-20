/* ================================================================
   RUPAM MANDAL — PORTFOLIO CORE INTERACTIVITY ENGINE v4.5
   Particle Canvas · 3D Card Spotlight · Custom Cursor · Telemetry
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initParticleCanvas();
    initCustomCursor();
    initCardSpotlights();
    initScrollProgressBar();
    initTimelineLaser();
    initNavFunctions();
    initTypedEffect();
    initStatsCounter();
    initExperienceCounter();
    initLiveClock();
    loadProjects();
    initProjectFilter();
    
    // Defer non-critical tilt initialization to after loader exit for max smoothness
    setTimeout(() => {
        initVanillaTilt();
    }, 5500);
});

/* ================================================================
   1. PRELOADER: LUXURY MINIMALIST ZERO-LAG SEQUENCER (120 FPS)
   ================================================================ */
function initPreloader() {
    const loader = document.getElementById('pre_loader');
    const barFill = document.getElementById('loader_bar_fill');
    const percentEl = document.getElementById('loader_percent');
    const statusTxt = document.getElementById('loader_status_txt');
    if (!loader) return;

    let isDone = false;
    const startTime = performance.now();
    const duration = 1300; // Satisfying 1.3s duration

    const statusMap = [
        { t: 0, msg: 'INITIALIZING SYSTEM...' },
        { t: 30, msg: 'CALIBRATING NEURAL CORE...' },
        { t: 65, msg: 'LOADING KNOWLEDGE BASES...' },
        { t: 90, msg: 'ACCESS GRANTED // SYSTEM ONLINE' }
    ];

    let lastIdx = -1;

    function dismiss() {
        if (isDone) return;
        isDone = true;
        if (barFill) barFill.style.width = '100%';
        if (percentEl) percentEl.textContent = '100%';
        if (statusTxt) statusTxt.textContent = 'ACCESS GRANTED // WELCOME';

        setTimeout(() => {
            requestAnimationFrame(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 350);
            });
        }, 120);
    }

    function step(now) {
        if (isDone) return;
        const elapsed = now - startTime;
        const ratio = Math.min(elapsed / duration, 1);

        // Smooth cubic easing
        const eased = ratio < 0.5 
            ? 4 * ratio * ratio * ratio 
            : 1 - Math.pow(-2 * ratio + 2, 3) / 2;

        const val = Math.min(100, Math.round(eased * 100));

        if (barFill) barFill.style.width = `${val}%`;
        if (percentEl) percentEl.textContent = `${val}%`;

        if (statusTxt) {
            let curIdx = 0;
            for (let i = 0; i < statusMap.length; i++) {
                if (val >= statusMap[i].t) curIdx = i;
            }
            if (curIdx !== lastIdx) {
                lastIdx = curIdx;
                statusTxt.textContent = statusMap[curIdx].msg;
            }
        }

        if (ratio < 1) {
            requestAnimationFrame(step);
        } else {
            dismiss();
        }
    }

    requestAnimationFrame(step);
    setTimeout(dismiss, 1600);
}

/* ================================================================
   2. THEME SYSTEM WITH PERSISTENCE (LIGHT / DARK CYBER)
   ================================================================ */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('rupam_theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'uil uil-sun';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('rupam_theme', isLight ? 'light' : 'dark');

            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'uil uil-sun' : 'uil uil-moon';
            }

            // Trigger particle refresh
            if (window.refreshParticles) window.refreshParticles();
        });
    }
}

/* ================================================================
   3. INTERACTIVE PARTICLE CONSTELLATION CANVAS
   ================================================================ */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(width < 768 ? 25 : 55, 70);
    const connectionDistance = width < 768 ? 90 : 130;

    let mouse = { x: -1000, y: -1000, radius: 140 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 1.8 + 1;
            this.updateColor();
            this.baseAlpha = Math.random() * 0.4 + 0.2;
        }

        updateColor() {
            const isLight = document.body.classList.contains('light-theme');
            if (isLight) {
                this.color = Math.random() > 0.5 ? '#0284c7' : '#7c3aed';
            } else {
                this.color = Math.random() > 0.5 ? '#00f2fe' : '#a855f7';
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction (repel subtly)
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 1.8;
                this.y -= Math.sin(angle) * force * 1.8;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.baseAlpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    window.refreshParticles = () => {
        particles.forEach((p) => p.updateColor());
    };

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isLight = document.body.classList.contains('light-theme');

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * (isLight ? 0.2 : 0.14);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isLight
                        ? `rgba(2, 132, 199, ${alpha})`
                        : `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Update & Draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

/* ================================================================
   4. CUSTOM CURSOR FOLLOWER WITH SMOOTH INTERPOLATION
   ================================================================ */
function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    if (!dot || !outline) return;

    let mouseX = -100, mouseY = -100;
    let outlineX = -100, outlineY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = '1';
            outline.style.opacity = '1';
        }

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });

    // Smooth trailing animation loop
    function renderCursor() {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;

        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover detection on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .spotlight-card, .tool-item, .tech-tag');
    hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'), { passive: true });
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'), { passive: true });
    });
}

/* ================================================================
   5. 3D CARD SPOTLIGHT TRACKER
   ================================================================ */
function initCardSpotlights() {
    const cards = document.querySelectorAll('.spotlight-card');

    document.addEventListener('mousemove', (e) => {
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }, { passive: true });
}

/* ================================================================
   6. TOP SCROLL PROGRESS BAR
   ================================================================ */
function initScrollProgressBar() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ================================================================
   7. DYNAMIC LASER TIMELINE PROGRESS BEAM
   ================================================================ */
function initTimelineLaser() {
    const timeline = document.getElementById('experienceTimeline');
    const laser = document.getElementById('timelineLaser');
    if (!timeline || !laser) return;

    function updateLaser() {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const totalHeight = rect.height;
            const visibleProgress = Math.min(Math.max((windowHeight * 0.7 - rect.top) / totalHeight, 0), 1);
            laser.style.height = `${visibleProgress * 100}%`;
        }
    }

    window.addEventListener('scroll', updateLaser, { passive: true });
    window.addEventListener('resize', updateLaser, { passive: true });
    updateLaser();
}

/* ================================================================
   8. NAVIGATION & ACTIVE SECTION SPY
   ================================================================ */
function initNavFunctions() {
    const navHeader = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll blur effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navHeader.classList.add('header-scrolled');
        } else {
            navHeader.classList.remove('header-scrolled');
        }

        // Active link spy
        const scrollY = window.scrollY + 100;
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 60;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { passive: true });

    // Close mobile menu on link click
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const menuBtn = document.getElementById('myNavMenu');
            const toggleIcon = document.getElementById('menuToggleIcon');
            if (menuBtn && menuBtn.classList.contains('responsive')) {
                menuBtn.classList.remove('responsive');
                document.body.classList.remove('mobile-menu-open');
                if (toggleIcon) toggleIcon.className = 'uil uil-bars';
            }
        });
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
        const menuBtn = document.getElementById('myNavMenu');
        const toggleBtn = document.getElementById('mobileMenuBtn');
        if (menuBtn && menuBtn.classList.contains('responsive')) {
            if (!menuBtn.contains(e.target) && !toggleBtn.contains(e.target)) {
                menuBtn.classList.remove('responsive');
                document.body.classList.remove('mobile-menu-open');
                const toggleIcon = document.getElementById('menuToggleIcon');
                if (toggleIcon) toggleIcon.className = 'uil uil-bars';
            }
        }
    });
}

function myMenuFunction() {
    const menuBtn = document.getElementById('myNavMenu');
    const toggleIcon = document.getElementById('menuToggleIcon');
    if (menuBtn) {
        const isOpen = menuBtn.classList.toggle('responsive');
        if (toggleIcon) {
            toggleIcon.className = isOpen ? 'uil uil-times' : 'uil uil-bars';
        }
        if (isOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }
    }
}

/* ================================================================
   9. TYPED.JS EFFECT
   ================================================================ */
function initTypedEffect() {
    if (typeof Typed !== 'undefined') {
        new Typed('.typedText', {
            strings: [
                'Full-Stack Developer',
                'Hospital IT Executive',
                'Oracle PL/SQL Specialist',
                'React &amp; Node.js Engineer'
            ],
            loop: true,
            typeSpeed: 70,
            backSpeed: 45,
            backDelay: 2200
        });
    }
}

/* ================================================================
   10. STATS COUNTER ANIMATION
   ================================================================ */
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 1400;
                    const startTime = performance.now();

                    function updateCount(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = `${Math.floor(eased * target)}+`;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = `${target}+`;
                        }
                    }

                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

/* ================================================================
   11. DYNAMIC LIVE EXPERIENCE CALCULATOR (DEC 6, 2024 START)
   ================================================================ */
function initExperienceCounter() {
    function updateExp() {
        const heroExp = document.getElementById('dynamic-exp');
        const statsExpNum = document.getElementById('stats-exp-num');
        const statsExpDetail = document.getElementById('stats-exp-detail');

        const startDate = new Date('2024-12-06T00:00:00');
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        if (years < 0) { years = 0; months = 0; days = 0; }

        if (heroExp) {
            heroExp.innerHTML = `${years}<span style="font-size:0.55em; color:var(--c); margin-right:3px;">Y</span> ${months}<span style="font-size:0.55em; color:var(--c);">M</span>`;
        }
        if (statsExpNum) {
            statsExpNum.innerHTML = `${years}<span style="font-size:0.55em; color:var(--c);">Y</span> ${months}<span style="font-size:0.55em; color:var(--c);">M</span>`;
        }
        if (statsExpDetail) {
            statsExpDetail.innerHTML = `${years} YRS, ${months} MOS, ${days} DAYS`;
        }
    }

    updateExp();
    setInterval(updateExp, 1000 * 60 * 30);
}

/* ================================================================
   12. LIVE IST CLOCK
   ================================================================ */
function initLiveClock() {
    const timeEl = document.getElementById('navClockTime');
    const timeMobileEl = document.getElementById('navClockTimeMobile');
    const dateEl = document.getElementById('navClockDate');
    if (!timeEl && !timeMobileEl) return;

    function tick() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        const sH = hours.toString().padStart(2, '0');
        const sM = minutes.toString().padStart(2, '0');
        const sS = seconds.toString().padStart(2, '0');

        const formattedTime = `${sH}:${sM}:${sS} <span style="font-size:0.7em; color:var(--c);">${ampm}</span>`;
        if (timeEl) timeEl.innerHTML = formattedTime;
        if (timeMobileEl) timeMobileEl.innerHTML = formattedTime;

        if (dateEl) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
        }
    }

    setInterval(tick, 1000);
    tick();
}

/* ================================================================
   13. PROJECTS LOADER & DYNAMIC FILTER SYSTEM
   ================================================================ */
async function loadProjects() {
    const container = document.querySelector('#projects .project-container');
    if (!container) return;

    const fallbackProjects = [
        {
            title: "LMS with AI Integration",
            description: "Full-scale modern Learning Management System with AI-assisted student progress evaluation, interactive course modules, and analytics.",
            category: "web",
            link: "https://rmeducation.vercel.app/"
        },
        {
            title: "Advanced Doctor Appointment & HMS",
            description: "High-throughput Hospital Management module with AI clinical slot scheduling, OPD/IPD queues, and real-time doctor telemetry.",
            category: "app",
            link: "#modal"
        },
        {
            title: "Rupam Mandal — Portfolio 2026",
            description: "Flagship personal portfolio engineered with 3D canvas constellation, cyber-aurora glassmorphism, and Apex AI integration.",
            category: "web",
            link: "https://rupam.co.in"
        },
        {
            title: "Spotify Ultra UI Clone",
            description: "High-fidelity audio streaming interface clone featuring dynamic theme color extraction, track visualization, and playback management.",
            category: "design",
            link: "#modal"
        }
    ];

    try {
        let projects = [];
        try {
            const res = await fetch('/api/projects');
            if (res.ok) projects = await res.json();
        } catch (e) {
            projects = fallbackProjects;
        }

        if (!projects || !projects.length) projects = fallbackProjects;

        container.innerHTML = '';
        projects.forEach((proj) => {
            const isModal = proj.link === '#' || proj.link === '#modal' || !proj.link.startsWith('http');
            const card = document.createElement('a');
            card.classList.add('project-box', 'spotlight-card');
            card.setAttribute('data-category', proj.category || 'web');
            card.setAttribute('data-tilt', '');

            if (isModal) {
                card.href = '#';
                card.onclick = (e) => {
                    e.preventDefault();
                    openProjectModal(proj.title, proj.description);
                };
            } else {
                card.href = proj.link;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
            }

            card.innerHTML = `
                <i class="uil uil-folder"></i>
                <h3>${proj.title}</h3>
                <label>${proj.description}</label>
            `;

            container.appendChild(card);
        });

        initCardSpotlights();
    } catch (err) {
        console.error("Error rendering projects:", err);
    }
}

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            const filter = btn.getAttribute('data-filter');
            const projectBoxes = document.querySelectorAll('.project-box');

            projectBoxes.forEach((box) => {
                const category = box.getAttribute('data-category') || 'web';
                if (filter === 'all' || category === filter) {
                    box.style.display = 'flex';
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        box.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ================================================================
   14. CONTACT FORM HANDLER WITH EMAILJS
   ================================================================ */
function handleContactForm(e) {
    if (e) e.preventDefault();
    const form = document.getElementById("contact-form");
    if (!form) return false;

    const btn = form.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span>Transmitting...</span> <i class="uil uil-sync spin"></i>';
    btn.disabled = true;

    if (typeof emailjs !== 'undefined') {
        // Send Notification Email
        emailjs.sendForm('service_w0z89u3', 'template_ktnona6', '#contact-form')
            .then(() => {
                // Send Auto-Reply
                return emailjs.sendForm('service_w0z89u3', 'template_a7t0c6q', '#contact-form');
            })
            .then(() => {
                showNotify('Your message has been transmitted successfully! Rupam will get back to you shortly.', 'success');
                form.reset();
                btn.innerHTML = originalContent;
                btn.disabled = false;
            })
            .catch((err) => {
                console.error('EmailJS Error:', err);
                showNotify('Transmission error. Please try emailing directly to rupammandal240@gmail.com', 'error');
                btn.innerHTML = originalContent;
                btn.disabled = false;
            });
    } else {
        setTimeout(() => {
            showNotify('Message received! Thank you for reaching out.', 'success');
            form.reset();
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }, 800);
    }
    return false;
}

/* Notification Modal Display */
function showNotify(message, type = 'success', timeout = 4000) {
    const modal = document.getElementById('notify-modal');
    if (!modal) {
        alert(message);
        return;
    }

    const titleEl = modal.querySelector('.notify-title');
    const messageEl = modal.querySelector('.notify-message');
    const iconEl = modal.querySelector('.notify-icon i');

    messageEl.textContent = message;
    if (type === 'success') {
        titleEl.textContent = 'Transmission Confirmed';
        iconEl.className = 'uil uil-check-circle';
        iconEl.style.color = '#10b981';
    } else {
        titleEl.textContent = 'Notice';
        iconEl.className = 'uil uil-exclamation-triangle';
        iconEl.style.color = '#f43f5e';
    }

    modal.classList.add('show');

    const closeBtn = modal.querySelector('.notify-close');
    const hide = () => modal.classList.remove('show');
    closeBtn.onclick = hide;

    setTimeout(hide, timeout);
}

/* ================================================================
   15. VANILLA TILT RE-INITIALIZER
   ================================================================ */
function initVanillaTilt() {
    // Only enable 3D tilt on devices with mouse/hover support to prevent mobile scroll interference
    if (typeof VanillaTilt !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        VanillaTilt.init(tiltElements, {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            perspective: 1000
        });
    }
}
