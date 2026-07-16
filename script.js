// Initialize Core Component Parameters on Dom Load
document.addEventListener('DOMContentLoaded', () => {
    
    // AOS Animation setup
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

    // Dark/Light Mode Engine Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // Mobile Navigation Drawer Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Typing Effect Integration via Typed.js
    new Typed('#typed-text', {
        strings: [
            'Advancing Computational Aeroelasticity Matrices',
            'Fusing Finite Element Analysis with Machine Learning Systems',
            'Optimizing Multi-Domain Structural Dynamics Frameworks'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000
    });

    // Particles.js Premium Canvas Engine Integration
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#0ea5e9' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#0ea5e9', opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false } }
        },
        retina_detect: true
    });

    // Animated Statistics Counters Trigger
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;
    
    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger metrics when scroll matches hero section base layout
    let counterTriggered = false;
    window.addEventListener('scroll', () => {
        const triggerHeight = document.getElementById('home').offsetHeight - 300;
        if (window.scrollY > 0 && !counterTriggered) {
            startCounters();
            counterTriggered = true;
        }

        // Top Reading Indicator Management Logic
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.reading-progress').style.width = scrolled + '%';
    });

    // Certification Live Multi-Filter and Native Search Routing Logic
    const searchInput = document.getElementById('cert-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    const filterCertifications = () => {
        const searchText = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        certCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const provider = card.querySelector('.cert-provider').innerText.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchText) || provider.includes(searchText);
            const matchesFilter = activeFilter === 'all' || category === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    };

    searchInput.addEventListener('input', filterCertifications);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterCertifications();
        });
    });
});

// Structural Biography Navigation Tab Switcher Engine
function switchTab(event, tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    const tabs = document.querySelectorAll('.tab-btn');
    
    panels.forEach(p => p.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}
