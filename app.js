/**
 * PREMIUM ACADEMIC PORTFOLIO AUTOMATION ENGINE
 * Gajavada Sanjeevkumar Core System Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initNavbarSystem();
    initThemeManager();
    initTypedEffect();
    initScrollProgressBar();
    initCounterAnimator();
    initScrollReveal();
    initParticlesBackground();
});

// Page Loader Dismissal
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 300);
        });
    }
}

// Navbar Collapse & Shadow Triggers
function initNavbarSystem() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, header');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Light / Dark Theme Core State Switching
function initThemeManager() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check saved state
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('portfolio-theme', targetTheme);
            updateThemeIcon(targetTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Custom Micro-Engine for Typing Simulation (Typed.js Replica)
function initTypedEffect() {
    const target = document.querySelector('.typed-text');
    if (!target) return;

    const phrases = [
        "PhD Scholar @ IIT (ISM) Dhanbad",
        "Computational Aeroelasticity Researcher",
        "Mechanical Design Systems Engineer",
        "Data Science & Predictive ML Practitioner"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 40;
        } else {
            target.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            typingSpeed = 2000; // Pause at completion
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 500);
}

// Reading Indicator Progress Mapping
function initScrollProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) progressBar.style.width = scrolled + '%';

        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Graphical Dashboard Analytics Auto-Counters
function initCounterAnimator() {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const duration = 1500;
                const increment = target / (duration / 16);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + (target === 7 || target === 10 ? '+' : '');
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    };

    const statObserver = new IntersectionObserver(countUp, { threshold: 0.5 });
    stats.forEach(stat => statObserver.observe(stat));
}

// Animate Elements on Scroll Architecture (Custom Lightweight Engine)
function initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    const reveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(reveal, { threshold: 0.15 });
    elements.forEach(el => revealObserver.observe(el));
}

// Tab Controllers for About Biography Segment
function switchAboutTab(event, tabId) {
    const container = event.target.closest('.about-text-content');
    const buttons = container.querySelectorAll('.about-tab-btn');
    const contents = container.querySelectorAll('.about-tab-content');

    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Timeline Block Switches (Education vs Experience)
function toggleTimeline(type) {
    const eduBtn = document.getElementById('btn-edu');
    const expBtn = document.getElementById('btn-exp');
    const eduTimeline = document.getElementById('timeline-education');
    const expTimeline = document.getElementById('timeline-experience');

    if (type === 'edu') {
        eduBtn.classList.add('active');
        expBtn.classList.remove('active');
        eduTimeline.classList.add('active');
        expTimeline.classList.remove('active');
    } else {
        expBtn.classList.add('active');
        eduBtn.classList.remove('active');
        expTimeline.classList.add('active');
        eduTimeline.classList.remove('active');
    }
}

// High-Fidelity Fuzzy Matching Certification Filtering Engine
function filterCategory(category, event) {
    // Handle active buttons swapping
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    const searchInput = document.getElementById('certSearch');
    if (searchInput) searchInput.value = ''; // Reset input to prioritize explicit button choice

    const cards = document.querySelectorAll('#certGrid .cert-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-cat') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCertifications() {
    const input = document.getElementById('certSearch').value.toLowerCase();
    const cards = document.querySelectorAll('#certGrid .cert-card');
    
    // Clear dynamic styles from category buttons during manual text query entry
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (filterButtons[0]) filterButtons[0].classList.add('active'); // set back to 'All'

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const details = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
        const vendor = card.querySelector('.cert-vendor').textContent.toLowerCase();
        
        if (title.includes(input) || details.includes(input) || vendor.includes(input)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Tab Switching Systems for Professional Development Segments
function switchDevTab(event, tabId) {
    const container = event.target.closest('#development');
    const buttons = container.querySelectorAll('.dev-tab-btn');
    const contents = container.querySelectorAll('.dev-tab-content');

    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Safe Secure Form Processing Mock Integration
function handleFormSubmit(event) {
    event.preventDefault();
    const feedback = document.getElementById('form-feedback');
    
    // Simulate encryption/transmission delay
    feedback.className = 'form-feedback-success';
    feedback.style.display = 'block';
    feedback.innerHTML = `<i class="fas fa-check-circle"></i> Secure Message Routed Successfully! Thank you, Dr. Sanjeevkumar will respond shortly.`;
    
    document.getElementById('portfolioContactForm').reset();
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 6000);
}

// Background Mathematical Grid Simulation Engine (Particles configuration structure)
function initParticlesBackground() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 45, "density": { "enable": true, "value_area": 900 } },
                "color": { "value": "#0ea5e9" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.15, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#0ea5e9", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.25 } } }
            },
            "retina_detect": true
        });
    }
}
