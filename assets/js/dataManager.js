// Portfolio Data Manager
class DataManager {

    static async loadData(file) {
        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(file);
            }

            return await response.json();

        } catch (e) {
            console.error(file, e);
            return null;
        }
    }

    static async getPortfolioData() {
        return await this.loadData("assets/data/portfolio-data.json");
    }

    static async getCertificates() {
        return await this.loadData("assets/data/professional-development.json");
    }

    static async getMOOCs() {
        return await this.loadData("assets/data/mooc-certifications.json");
    }

    static async getTeaching() {
        return await this.loadData("assets/data/teaching-data.json");
    }

    // NEW METHOD
    static async getSocialResponsibility() {
        return await this.loadData("assets/data/social-responsibility.json");
    }

    static getRoundedCount(count, threshold = 100) {
        return count >= threshold
            ? `${Math.floor(count / 10) * 10}+`
            : count.toString();
    }
}
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

