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
   ADVANCED GROQ AI CHATBOT
   ========================================================= */
function initChatbot() {
    /* ---- DOM References ---- */
    const fab         = document.getElementById('chatbotFab');
    const panel       = document.getElementById('chatbotPanel');
    const closeBtn    = document.getElementById('chatbotClose');
    const clearBtn    = document.getElementById('chatbotClear');
    const voiceBtn    = document.getElementById('chatbotVoice');
    const sendBtn     = document.getElementById('chatbotSend');
    const inputEl     = document.getElementById('chatbotInput');
    const messagesEl  = document.getElementById('chatbotMessages');
    const suggestEl   = document.getElementById('chatbotSuggestions');
    const badge       = document.getElementById('chatbotBadge');
    const chips       = document.querySelectorAll('.chatbot-chip');

    if (!fab || !panel) {
        console.warn("Chatbot elements not found in DOM.");
        return; 
    }

    /* ---- State ---- */
    let isOpen        = false;
    let isLoading     = false;
    let isVoiceEnabled= true; // Voice on by default
    let conversationHistory = []; // [{role: 'user'|'assistant', content: '...'}]

    /* ---- Text to Speech logic ---- */
    let synth = window.speechSynthesis;
    let sweetVoice = null;
    
    function loadVoices() {
        if (!synth) return;
        const voices = synth.getVoices();
        // Priority for sweet female voices based on browser options:
        sweetVoice = voices.find(v => v.name.includes('Google UK English Female')) || 
                     voices.find(v => v.name.includes('Google US English')) ||
                     voices.find(v => v.name.includes('Zira')) ||
                     voices.find(v => v.name.includes('Aria')) ||
                     voices.find(v => v.name.includes('Samantha')) ||
                     voices.find(v => v.name.includes('Female')) || 
                     voices[0];
    }
    
    if (synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    // Attempt loading immediately if voices are already cached
    loadVoices();
    
    function speakText(text) {
        if (!isVoiceEnabled || !synth) return;
        synth.cancel(); // Stop playing current audio if any
        
        // Strip markdown and emojis exactly to get purely readable text
        let rawText = text.replace(/[*_~`#\-]/g, '')
                          .replace(/👋|✅|❌/g, '')
                          .replace(/<\/?[^>]+(>|$)/g, "") // simple HTML strip
                          .trim();
                          
        const utterThis = new SpeechSynthesisUtterance(rawText);
        if (sweetVoice) utterThis.voice = sweetVoice;
        utterThis.pitch = 1.25; // Slightly higher pitch makes it sound a bit sweeter
        utterThis.rate = 1.05;  // Slightly faster
        
        synth.speak(utterThis);
    }

    /* ---- Helpers ---- */
    function getTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function scrollBottom() {
        requestAnimationFrame(() => {
            messagesEl.scrollTo({
                top: messagesEl.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    // Auto-scroll when messages change (using MutationObserver for real-time scrolling even during typing)
    const scrollObserver = new MutationObserver(() => {
        if (!isOpen) return; // Don't scroll if panel is closed
        
        // Only scroll if user is already near the bottom (optional, but good for UX)
        // Here we just scroll always as it's a chatbot
        messagesEl.scrollTo({
            top: messagesEl.scrollHeight,
            behavior: 'smooth'
        });
    });

    scrollObserver.observe(messagesEl, { 
        childList: true, 
        subtree: true, 
        characterData: true 
    });

    /**
     * Basic Markdown → HTML renderer
     * Handles: **bold**, `code`, bullet lists (- item), numbered points
     */
    function markdownToHtml(text) {
        // Escape HTML first
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Bold: **text**
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Inline code: `code`
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Convert line breaks to paragraphs
        const lines = html.split('\n');
        const result = [];
        let inList = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) {
                if (inList) { result.push('</ul>'); inList = false; }
                continue;
            }
            // Bullet list item: starts with - or * or •
            if (/^[-*•]\s/.test(line)) {
                if (!inList) { result.push('<ul>'); inList = true; }
                result.push(`<li>${line.replace(/^[-*•]\s/, '')}</li>`);
            } else {
                if (inList) { result.push('</ul>'); inList = false; }
                result.push(`<p>${line}</p>`);
            }
        }
        if (inList) result.push('</ul>');

        return result.join('');
    }

    /* ---- Append a message bubble ---- */
    function appendMessage(role, content, isError = false, animate = false) {
        const row = document.createElement('div');
        row.classList.add('chatbot-msg', role === 'user' ? 'user-msg' : 'bot-msg');
        if (isError) row.classList.add('error-msg');

        const time = getTime();

        if (role === 'assistant') {
            // speakText(content); // Removed automatic speech for every message as requested
            const bubbleId = 'bot-msg-' + Date.now() + Math.floor(Math.random() * 1000);
            row.innerHTML = `
                <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
                <div class="chatbot-msg-bubble">
                    <div id="${bubbleId}" class="bot-msg-content"></div>
                    <span class="chatbot-msg-time">${time}</span>
                </div>`;
            messagesEl.appendChild(row);
            scrollBottom();

            const contentEl = document.getElementById(bubbleId);
            const htmlHtml = markdownToHtml(content);

            if (animate && typeof Typed !== 'undefined') {
                new Typed(`#${bubbleId}`, {
                    strings: [htmlHtml],
                    typeSpeed: 10,
                    showCursor: false,
                    onStringTyped: function() {
                        scrollBottom();
                    }
                });
            } else if (animate) {
                // Fallback manual typing
                let i = 0;
                let isTag = false;
                let currentHTML = '';
                function type() {
                    if (i < htmlHtml.length) {
                        currentHTML += htmlHtml.charAt(i);
                        if (htmlHtml.charAt(i) === '<') isTag = true;
                        if (htmlHtml.charAt(i) === '>') isTag = false;
                        
                        contentEl.innerHTML = currentHTML;
                        i++;
                        
                        if (isTag) {
                            type(); // typing tags instantly
                        } else {
                            setTimeout(type, 10);
                            if(i % 3 === 0) scrollBottom();
                        }
                    } else {
                        scrollBottom();
                    }
                }
                type();
            } else {
                contentEl.innerHTML = htmlHtml;
                scrollBottom();
            }
        } else {
            row.innerHTML = `
                <div class="chatbot-msg-bubble">
                    <p>${content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
                    <span class="chatbot-msg-time">${time}</span>
                </div>`;
            messagesEl.appendChild(row);
            scrollBottom();
        }

        return row;
    }

    /* ---- Typing Indicator ---- */
    let typingEl = null;
    function showTyping() {
        typingEl = document.createElement('div');
        typingEl.classList.add('chatbot-typing');
        typingEl.innerHTML = `
            <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
            <div class="chatbot-typing-bubble">
                <span></span><span></span><span></span>
            </div>`;
        messagesEl.appendChild(typingEl);
        scrollBottom();
    }

    function hideTyping() {
        if (typingEl) { typingEl.remove(); typingEl = null; }
    }

    /* ---- Send Message ---- */
    async function sendMessage(userText) {
        userText = userText.trim();
        if (!userText || isLoading) return;

        // Hide suggestions after first message
        suggestEl.classList.add('hidden');

        // Append user bubble
        appendMessage('user', userText);

        // Add to history
        conversationHistory.push({ role: 'user', content: userText });

        // Show typing
        isLoading = true;
        sendBtn.disabled = true;
        showTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: conversationHistory })
            });

            hideTyping();

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            const reply = data.reply || "Sorry, I couldn't get a response.";

            // Append bot reply with animation
            appendMessage('assistant', reply, false, true);

            // Save to history
            conversationHistory.push({ role: 'assistant', content: reply });

        } catch (err) {
            hideTyping();
            console.error('Chatbot error:', err);
            appendMessage('assistant', `⚠️ Error: ${err.message}. Please try again.`, true);
        } finally {
            isLoading = false;
            sendBtn.disabled = false;
            inputEl.focus();
        }
    }

    /* ---- Open / Close Panel ---- */
    function openChat() {
        isOpen = true;
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        fab.classList.add('active');
        badge.classList.add('hidden');
        scrollBottom(); // Ensure we are at the bottom when opening
        
        // Play Multilingual Welcome Message once when opened
        setTimeout(() => {
            speakText("Welcome! Shwa-go-tom! Swa-gat-hai!");
        }, 600);
        
        setTimeout(() => inputEl.focus(), 400);
    }

    function closeChat() {
        isOpen = false;
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        fab.classList.remove('active');
    }

    function clearChat() {
        conversationHistory = [];
        // Keep only the initial welcome message
        messagesEl.innerHTML = `
            <div class="chatbot-msg bot-msg">
                <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
                <div class="chatbot-msg-bubble">
                    <p>Hi, I’m <strong>Apex</strong> 👋 Rupam Mandal’s personal AI assistant.</p>
                    <p>I’m here to help you explore his skills, projects, and services instantly. If you need a website, software, or custom solution, feel free to ask!</p>
                    <span class="chatbot-msg-time">Just now</span>
                </div>
            </div>`;
        suggestEl.classList.remove('hidden');
    }

    /* ---- Auto-resize Textarea ---- */
    function autoResize() {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 130) + 'px';
    }

    /* ---- Event Listeners ---- */
    fab.addEventListener('click', () => {
        if (isOpen) closeChat(); else openChat();
    });

    closeBtn.addEventListener('click', closeChat);

    clearBtn.addEventListener('click', () => {
        clearChat();
        if (synth) synth.cancel();
    });

    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            isVoiceEnabled = !isVoiceEnabled;
            if (!isVoiceEnabled) {
                voiceBtn.classList.add('muted');
                voiceBtn.title = 'Toggle Voice (Muted)';
                if (synth) synth.cancel();
            } else {
                voiceBtn.classList.remove('muted');
                voiceBtn.title = 'Toggle Voice (Unmuted)';
            }
        });
    }

    sendBtn.addEventListener('click', () => {
        const text = inputEl.value;
        inputEl.value = '';
        autoResize();
        sendMessage(text);
    });

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = inputEl.value;
            inputEl.value = '';
            autoResize();
            sendMessage(text);
        }
    });

    inputEl.addEventListener('input', autoResize);

    // Suggestion chips
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const msg = chip.getAttribute('data-msg');
            if (msg) sendMessage(msg);
        });
    });

    // Close panel on outside click
    document.addEventListener('click', (e) => {
        if (isOpen && !panel.contains(e.target) && !fab.contains(e.target)) {
            closeChat();
        }
    });

    // Open chat automatically after 4 seconds on first visit
    const hasVisited = sessionStorage.getItem('chatbot_visited');
    if (!hasVisited) {
        sessionStorage.setItem('chatbot_visited', '1');
        setTimeout(() => {
            if (!isOpen) openChat();
        }, 4000);
    }
}

// Ensure the DOM is fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
