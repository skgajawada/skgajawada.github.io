// Base Component Class
class Component {
    constructor(name) {
        this.name = name;
    }

    async render() {
        return '<div>Component not implemented</div>';
    }

    afterRender() {
        this.addAnimations();
        this.setupInteractions();
    }

    addAnimations() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    setupInteractions() {
        const revealElements = document.querySelectorAll('.reveal');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }
}

