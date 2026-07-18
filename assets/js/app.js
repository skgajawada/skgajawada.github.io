// Main App Initialization
class App {
    constructor() {
        this.initVisitorCounter();
        this.initSmoothScroll();
        this.setupMobileMenu();
    }

    initVisitorCounter() {
        let visitCount = localStorage.getItem('visitCount') || 0;
        visitCount = parseInt(visitCount) + 1;
        localStorage.setItem('visitCount', visitCount);
        const counter = document.getElementById('visitor-count');
        if (counter) {
            counter.textContent = visitCount;
        }
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && !href.startsWith('#/')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.flexDirection = 'column';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1rem';
                navMenu.style.borderRadius = '0 0 10px 10px';
            });
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
