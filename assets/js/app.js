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

    setupMobileMenu(){

const hamburger=document.querySelector(".hamburger");

const navMenu=document.querySelector(".nav-menu");

if(!hamburger||!navMenu)return;

hamburger.addEventListener("click",()=>{

navMenu.classList.toggle("open");

});

}
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
