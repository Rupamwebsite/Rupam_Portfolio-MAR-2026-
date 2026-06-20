/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
    var menuIcon = document.querySelector(".nav-menu-btn i");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
        if (menuIcon) { menuIcon.className = "uil uil-times"; }
    } else {
        menuBtn.className = "nav-menu";
        if (menuIcon) { menuIcon.className = "uil uil-bars"; }
    }
}

// Close mobile menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            var menuBtn = document.getElementById("myNavMenu");
            var menuIcon = document.querySelector(".nav-menu-btn i");
            menuBtn.className = "nav-menu";
            if (menuIcon) { menuIcon.className = "uil uil-bars"; }
        });
    });

    // Close menu when tapping outside (on overlay)
    document.addEventListener('click', function(e) {
        var menuBtn = document.getElementById("myNavMenu");
        var menuToggle = document.querySelector(".nav-menu-btn");
        var menuIcon = document.querySelector(".nav-menu-btn i");
        if (menuBtn && menuBtn.classList.contains('responsive')) {
            if (!menuBtn.contains(e.target) && !menuToggle.contains(e.target)) {
                menuBtn.className = "nav-menu";
                if (menuIcon) { menuIcon.className = "uil uil-bars"; }
            }
        }
    });
});

/* ----- THEME TOGGLE ----- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.className = 'uil uil-sun';
    } else {
        icon.className = 'uil uil-moon';
    }
});

/* ----- FADE IN HERO TEXT ----- */
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.featured-name').classList.add('fade-in');
    }, 500);
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () { headerShadow() };

function headerShadow() {
    const navHeader = document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.classList.add("header-scrolled");
    } else {
        navHeader.classList.remove("header-scrolled");
    }
}

/* ----- TYPING EFFECT ----- */
// Check if Typed is defined (it's loaded via CDN)
if (typeof Typed !== 'undefined') {
    var typingEffect = new Typed(".typedText", {
        strings: ["Developer", "Data Analyst", "Coder", "Designer"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000
    });
}

/* ----- SCROLL REVEAL ----- */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true });

    sr.reveal('.featured-text-card', {})
    sr.reveal('.featured-name', { delay: 100 })
    sr.reveal('.featured-text-info', { delay: 200 })
    sr.reveal('.featured-text-btn', { delay: 200 })
    sr.reveal('.social_icons', { delay: 200 })
    sr.reveal('.featured-image', { delay: 300 })

    // Project Box Animation
    sr.reveal('.project-box', { interval: 200 })

    // Headers
    sr.reveal('.top-header', {})

    const srLeft = ScrollReveal({ origin: 'left', distance: '80px', duration: 2000, reset: true })
    srLeft.reveal('.about-info', { delay: 100 })
    srLeft.reveal('.contact-info', { delay: 100 })

    const srRight = ScrollReveal({ origin: 'right', distance: '80px', duration: 2000, reset: true })
    srRight.reveal('.skills-box', { delay: 100 })
    srRight.reveal('.form-control', { delay: 100 })
}

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link')
            } else {
                link.classList.remove('active-link')
            }
        }
    })
}

window.addEventListener('scroll', scrollActive);

/* ----- ANIMATE PROGRESS BARS ----- */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (barTop < windowHeight - 50 && !bar.classList.contains('animated')) {
            const targetWidth = bar.style.width;
            bar.style.width = targetWidth;
            bar.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

/* ----- STATS COUNTER ----- */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        const counterTop = counter.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (counterTop < windowHeight - 50 && !counter.classList.contains('animated')) {
            updateCounter();
            counter.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

/* ----- BACK TO TOP ----- */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

/* ----- TESTIMONIAL CAROUSEL ----- */
const testimonialsContainer = document.querySelector('.testimonials-container');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

let currentIndex = 0;

function updateTestimonials() {
    testimonialCards.forEach((card, index) => {
        card.style.display = index === currentIndex ? 'block' : 'none';
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : testimonialCards.length - 1;
        updateTestimonials();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < testimonialCards.length - 1 ? currentIndex + 1 : 0;
        updateTestimonials();
    });

    // Initialize
    updateTestimonials();
}

/* ----- CONTACT FORM SUBMIT (GLOBAL HANDLER) ----- */
function handleContactForm(e) {
    if (e) e.preventDefault();
    const form = document.getElementById("contact-form");

    if (form) {
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending... <i class="uil uil-redo spin"></i>';
        btn.disabled = true;

        // 1. Send Notification Email (Contact Us)
        emailjs.sendForm('service_w0z89u3', 'template_ktnona6', '#contact-form')
            .then(function() {
                // 2. Send Auto-Reply Email
                return emailjs.sendForm('service_w0z89u3', 'template_a7t0c6q', '#contact-form');
            })
            .then(function() {
                showNotify('Message sent! You will receive a confirmation email shortly.', 'success');
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                btn.innerHTML = originalText;
                btn.disabled = false;
                const errorMsg = error.text || error.message || 'Please try again.';
                showNotify('Failed: ' + errorMsg, 'error');
            });
    }
    return false;
}

/* ----- PRELOADER ----- */
function hidePreloader() {
    var loader = document.getElementById('pre_loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(function () {
            loader.style.display = 'none';
        }, 700);
    }
}

window.addEventListener('load', hidePreloader);

// Safety: force hide after 3 seconds no matter what
setTimeout(hidePreloader, 3000);



/* ----- FETCH PROJECTS FROM DB ----- */
async function loadProjects() {
    const fallbackProjects = [
        { title: "LMS with AI Integration", description: "AI-Integrated learning management system for student education and progress tracking.", category: "web", link: "https://rmedu.cleverapps.io" },
        { title: "Advanced Doctor Appointment & HMS", description: "Hospital Management System with AI integration for doctor appointments and patient records.", category: "web", link: "#" },
        { title: "Personal Portfolio", description: "Premium personal portfolio website with interactive 3D effects and animations.", category: "web", link: "https://rupam.co.in" },
        { title: "Spotify Website", description: "High-fidelity UI clone of Spotify music streaming platform.", category: "design", link: "#" }
    ];

    const container = document.querySelector('#projects .project-container');
    if (!container) return;

    const projectCountStat = document.querySelector('.stat-item:nth-child(1) .stat-number');

    try {
        let projects = [];
        
        // Try fetching from API
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                projects = await response.json();
            }
        } catch (e) {
            console.log("API unavailable, using fallback projects");
            projects = fallbackProjects;
        }

        // If empty, use fallback
        if (!projects || projects.length === 0) {
            projects = fallbackProjects;
        }

        // Render projects
        if (projects.length > 0) {
            container.innerHTML = '';
            projects.forEach(project => {
                const projectDiv = document.createElement('a');
                projectDiv.classList.add('project-box');
                projectDiv.setAttribute('data-tilt', ''); 
                
                const category = project.category || 'web';
                projectDiv.setAttribute('data-category', category);
                projectDiv.href = project.link || '#';
                projectDiv.target = '_blank';

                projectDiv.innerHTML = `
                    <i class="uil uil-folder"></i>
                    <h3>${project.title}</h3>
                    <label>${project.description || 'View Project'}</label>
                `;
                container.appendChild(projectDiv);
            });
            
            // ScrollReveal animation
            if (typeof ScrollReveal !== 'undefined') {
                ScrollReveal().reveal('.project-box', { interval: 200 });
            }

            // Update project counter
            if (projectCountStat) {
                const count = projects.length;
                projectCountStat.setAttribute('data-target', count);
                projectCountStat.textContent = count;
                projectCountStat.classList.remove('animated');
            }
        }
    } catch (err) {
        console.error("Error loading projects:", err);
    }
}

// Load projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}


/* ----- VANILLA TILT INIT ----- */
/* Data-tilt attribute handles initialization auto-magically by the library */


/* ----- PROJECT FILTERING ----- */
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        // Add active to click
        btn.classList.add('active-filter');

        const filterValue = btn.getAttribute('data-filter');
        const projectBoxes = document.querySelectorAll('.project-box');

        projectBoxes.forEach(box => {
            const text = box.innerText.toLowerCase();
            let category = box.getAttribute('data-category') || 'all';
            
            // Fallback to keyword matching only if no explicit category
            if (category === 'all') {
                if (text.includes('react') || text.includes('node') || text.includes('web') || text.includes('appointment')) category = 'web';
                if (text.includes('app') || text.includes('mobile')) category = 'app';
                if (text.includes('design') || text.includes('ui/ux') || text.includes('clone') || text.includes('netflix')) category = 'design';
            }

            if (filterValue === 'all' || category === filterValue || (filterValue === 'web' && text.includes('portfolio'))) {
                box.style.display = 'flex';
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'scale(1)';
                }, 100);
            } else {
                box.style.opacity = '0';
                box.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    box.style.display = 'none';
                }, 300);
            }
        });
    });
});


/* ----- INTERACTIVE BACKGROUND (GRADIENT MESH) ----- */
const interBubble = document.querySelector('.interactive');
if (interBubble) {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
}


/* ----- NOTIFICATION (REPLACE alert) ----- */
function showNotify(message, type = 'success', timeout = 3000) {
    const modal = document.getElementById('notify-modal');
    if (!modal) {
        // Fallback to alert if modal not present
        alert(message);
        return;
    }

    const titleEl = modal.querySelector('.notify-title');
    const messageEl = modal.querySelector('.notify-message');
    const iconEl = modal.querySelector('.notify-icon i');
    const contentEl = modal.querySelector('.notify-modal-content');

    messageEl.textContent = message;
    if (type === 'success') {
        titleEl.textContent = 'Success';
        iconEl.className = 'uil uil-check-circle';
        iconEl.style.color = '#00ff88';
    } else {
        titleEl.textContent = 'Error';
        iconEl.className = 'uil uil-times-circle';
        iconEl.style.color = '#ff4444';
    }

    modal.classList.add('show');

    // Close handler
    const closeBtn = modal.querySelector('.notify-close');
    function hide() {
        modal.classList.remove('show');
        closeBtn.removeEventListener('click', hide);
        if (hideTimeout) clearTimeout(hideTimeout);
    }

    closeBtn.addEventListener('click', hide);

    const hideTimeout = setTimeout(() => {
        hide();
    }, timeout);
}

/* =========================================================
   LIVE CLOCK
   ========================================================= */
function updateNavClock() {
    const timeEl = document.getElementById('navClockTime');
    const dateEl = document.getElementById('navClockDate');
    if (!timeEl || !dateEl) return;

    const now = new Date();
    
    // Time formatting: HH:MM:SS
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const strHours = hours.toString().padStart(2, '0');
    const strMins = minutes.toString().padStart(2, '0');
    const strSecs = seconds.toString().padStart(2, '0');
    
    timeEl.innerHTML = `${strHours}:${strMins}:${strSecs} <span style="font-size:0.7em">${ampm}</span>`;
    
    // Date formatting: Day, Month Date, Year
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    dateEl.textContent = `${dayName}, ${date} ${monthName} ${year}`;
}

// Start clock
setInterval(updateNavClock, 1000);
updateNavClock(); // Initial call

/* =========================================================
   DYNAMIC EXPERIENCE COUNTER (EXACT DATE)
   ========================================================= */
function updateExperience() {
    const heroExp = document.getElementById('dynamic-exp');
    const statsExpNum = document.getElementById('stats-exp-num');
    const statsExpDetail = document.getElementById('stats-exp-detail');

    // User joined: 6 December 2024
    const startDate = new Date('2024-12-06T00:00:00');
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Prevent negative numbers if currently before start date somehow
    if (years < 0) { years=0; months=0; days=0; }

    // 1. Update Hero section
    if (heroExp) {
        heroExp.innerHTML = `${years}<span style="font-size:0.55em; color:var(--c); margin-right:4px;">Y</span>${months}<span style="font-size:0.55em; color:var(--c);">M</span>`;
    }

    // 2. Update Stats section
    if (statsExpNum) {
        statsExpNum.innerHTML = `${years}<span style="font-size:0.6em; color:var(--c);">Y</span> ${months}<span style="font-size:0.6em; color:var(--c);">M</span>`;
    }
    if (statsExpDetail) {
        statsExpDetail.innerHTML = `${years} YRS, ${months} MOS, ${days} DAYS`;
    }
}

// Update the experience on load
updateExperience();
// Check and update periodically
setInterval(updateExperience, 1000 * 60 * 60); // Every hour