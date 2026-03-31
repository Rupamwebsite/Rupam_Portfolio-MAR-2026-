/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

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
        navHeader.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
        navHeader.style.height = "80px";
        navHeader.style.background = "rgba(5, 5, 7, 0.95)";
        navHeader.style.backdropFilter = "blur(25px) saturate(180%)";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.background = "rgba(5, 5, 7, 0.8)";
        navHeader.style.backdropFilter = "blur(20px) saturate(180%)";
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
window.addEventListener('load', function () {
    var loader = document.getElementById('pre_loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(function () {
            loader.style.display = 'none';
        }, 500);
    }
});


/* ----- FETCH PROJECTS FROM DB ----- */
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        const container = document.querySelector('.project-container');

        // Only if we actually have projects in DB, otherwise keep static ones
        if (projects.length > 0) {
            container.innerHTML = ''; // Clear static ones
            projects.forEach(project => {
                const projectDiv = document.createElement('a');
                projectDiv.classList.add('project-box');
                projectDiv.setAttribute('data-tilt', ''); // Add tilt effect
                projectDiv.href = project.link || '#';
                projectDiv.target = '_blank';

                // Add categories for filtering (assuming DB could return tags or we infer)
                // Defaulting to "web" for demo if not present
                const category = project.category || 'web';
                // We add a hidden text span or data attribute for our filter logic to find

                projectDiv.innerHTML = `
                    <i class="uil uil-folder"></i>
                    <h3>${project.title}</h3>
                    <label>${project.description || 'View Project'}</label>
                    <span style="display:none;">${category}</span> 
                `;
                container.appendChild(projectDiv);
            });
            // Re-init Tilt for new elements
            if (typeof VanillaTilt !== 'undefined') {
                VanillaTilt.init(document.querySelectorAll(".project-box"), {
                    max: 25,
                    speed: 400
                });
            }
        }
    } catch (err) {
        console.log("Using static projects (DB might be empty or offline)");
    }
}
loadProjects();


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
            // Check if box has the category
            const text = box.innerText.toLowerCase();
            let category = 'all';

            if (text.includes('react') || text.includes('node') || text.includes('web') || text.includes('appointment')) category = 'web';
            if (text.includes('app') || text.includes('mobile')) category = 'app';
            if (text.includes('design') || text.includes('ui/ux') || text.includes('clone') || text.includes('netflix')) category = 'design';

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


