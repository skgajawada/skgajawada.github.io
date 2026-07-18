// Main Application Router
class Router {
    constructor(autoInit = true) {
        this.routes = {};
        this.currentRoute = null;

        if (autoInit) {
            this.init();
        }
    }

    register(path, component) {
        this.routes[path] = component;
    }

    init() {
        window.addEventListener('hashchange', () => this.navigate());
        this.navigate();
    }

    async navigate() {
        // Remove leading and trailing slashes to accurately extract route and parameters
        let hash = window.location.hash.slice(1) || 'home';
        if (hash.startsWith('/')) hash = hash.slice(1);
        if (hash.endsWith('/')) hash = hash.slice(0, -1);

        const segments = hash.split('/');
        const route = segments[0]; // e.g., 'professional-dev'
        const params = segments.slice(1); // e.g., ['moocs']
        const routePath = `/${route}`;

        if (this.routes[routePath]) {
            this.currentRoute = routePath;
            const component = this.routes[routePath];
            const html = await component.render(params);
            document.getElementById('app').innerHTML = html;
            component.afterRender(params); // Pass parameters along to child actions
            this.updateActiveNav(routePath);
            window.scrollTo(0, 0);
        } else {
            window.location.hash = '/home';
        }
    }

    updateActiveNav(route) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const routeName = route.split('/')[1];
        const activeLink = document.querySelector(`a[href="#/${routeName}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

const router = new Router();

// Portfolio Data Manager
// Portfolio Data Manager
class DataManager {

    static async loadData(file) {
        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(`Unable to load ${file}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    static async getPortfolioData() {
        return await this.loadData('assets/data/portfolio-data.json');
    }

    static async getCertificates() {
        return await this.loadData('assets/data/professional-development.json');
    }
    static async getMoocs() {
    return await this.loadData("assets/data/mooc-certifications.json");
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

// HOME PAGE
class HomePage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();
        const certs = await DataManager.getCertificates();
        return `
            <section class="hero fade-in">
                <div class="hero-content">
                    <h1>${data.personal.name}</h1>
                    <p class="subtitle">${data.personal.title}</p>
                    <p class="subtitle" style="font-size: 1rem; color: #666;">${data.personal.institution}</p>
                    <p class="description">${data.personal.bio}</p>
                    <div class="hero-buttons">
                        <a href="#/about" class="btn btn-primary">
                            <i class="fas fa-user"></i> View Profile
                        </a>
                        <a href="#/contact" class="btn btn-outline">
                            <i class="fas fa-envelope"></i> Get In Touch
                        </a>
                        <a href="assets/documents/SANJEEVKUMAR_RESUME.pdf" class="btn btn-secondary" download>
                            <i class="fas fa-download"></i> Download CV
                        </a>
                    </div>
                </div>
                <div class="hero-image fade-in-right">
                    <img src="${data.personal.profileImage}" alt="Profile" class="profile-image" onerror="this.src='https://via.placeholder.com/400x400?text=Profile+Image'">
                </div>
            </section>

            <section class="stats-grid">
                ${data.stats.map((stat, i) => `
                    <div class="stat-card reveal" style="animation-delay: ${i * 0.1}s;">
                        <i class="fas ${stat.icon}" style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem;"></i>
                        <div class="stat-number">${stat.number}</div>
                        <div class="stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </section>

            <section>
                <h2 class="section-title">Research Interests</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 4rem;">
                    ${data.researchInterests.map((interest, i) => `
                        <div class="reveal" style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 1.5rem; border-radius: 10px; text-align: center; animation-delay: ${i * 0.1}s;">
                            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i> ${interest}
                        </div>
                    `).join('')}
                </div>
            </section>

            <section>
                <h2 class="section-title">Quick Access</h2>
                <div class="cards-grid stagger-container">
                    <div class="card fade-in">
                        <div class="card-icon"><i class="fas fa-user"></i></div>
                        <div class="card-content">
                            <h3 class="card-title">About Me</h3>
                            <p class="card-description">Read my biographical outline, career research objective, and personal traits.</p>
                            <a href="#/about" class="card-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-icon"><i class="fas fa-briefcase"></i></div>
                        <div class="card-content">
                            <h3 class="card-title">Experience</h3>
                            <p class="card-description">Comprehensive work history spanning academics and research from 2015 to present.</p>
                            <a href="#/experience" class="card-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
                        <div class="card-content">
                            <h3 class="card-title">Education</h3>
                            <p class="card-description">PhD status, Master's degree, and B.Tech academic timeline with certifications.</p>
                            <a href="#/education" class="card-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-icon"><i class="fas fa-project-diagram"></i></div>
                        <div class="card-content">
                            <h3 class="card-title">Projects</h3>
                            <p class="card-description">Explore research, academic, and industrial projects with detailed documentation.</p>
                            <a href="#/projects" class="card-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-icon"><i class="fas fa-certificate"></i></div>
                        <div class="card-content">
                            <h3 class="card-title">Professional Dev</h3>
                            <p class="card-description">${certs.certificates.length} certifications from FDPs, workshops, and webinars with viewable PDFs.</p>
                            <a href="#/professional-dev" class="card-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-icon"><i class="fas fa-envelope"></i></div>
                        <div class="card-content">
                            <h3 class="card-title">Contact</h3>
                            <p class="card-description">Submit queries, request resources, or connect through my social directory instantly.</p>
                            <a href="#/contact" class="card-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// ABOUT PAGE
class AboutPage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();
        const certs = await DataManager.getCertificates();

        return `
            <section class="fade-in">
                <h1 class="section-title">About Me</h1>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem;">
                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.3rem;">Biography</h3>
                        <p style="line-height: 1.8; color: var(--text-light);">
                            ${data.about.biography !== '[Awaiting content]' ? data.about.biography : 'Biography content awaiting update. I am a dedicated educator and researcher with strong fundamentals in mechanical engineering and emerging expertise in computational design and machine learning.'}
                        </p>
                    </div>
                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.3rem;">Career Objective</h3>
                        <p style="line-height: 1.8; color: var(--text-light);">
                            ${data.about.careerObjective !== '[Awaiting content]' ? data.about.careerObjective : 'To leverage expertise in design engineering and AI to develop innovative solutions for complex engineering challenges while contributing to academic excellence and mentoring the next generation of engineers.'}
                        </p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem;">
                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.3rem;">Research Vision</h3>
                        <p style="line-height: 1.8; color: var(--text-light);">
                            ${data.about.researchVision !== '[Awaiting content]' ? data.about.researchVision : 'To advance the understanding of structural dynamics and aeroelasticity through innovative finite element analysis and machine learning methodologies.'}
                        </p>
                    </div>
                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.3rem;">Research Philosophy</h3>
                        <p style="line-height: 1.8; color: var(--text-light);">
                            ${data.about.researchPhilosophy !== '[Awaiting content]' ? data.about.researchPhilosophy : 'Rigorous empirical validation combined with computational modeling to derive practical engineering solutions backed by solid theoretical foundations.'}
                        </p>
                    </div>
                </div>

                <div class="reveal" style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 2rem; border-radius: 10px; margin-bottom: 3rem;">
                    <h3 style="margin-bottom: 1rem;"><i class="fas fa-handshake"></i> Administrative Responsibilities</h3>
                    <p style="line-height: 1.8;">
                        ${data.about.administrativeResponsibilities !== '[Awaiting content]' ? data.about.administrativeResponsibilities : 'Committee member for curriculum development, student mentoring, and academic affairs coordination. Active participant in departmental initiatives and institutional governance.'}
                    </p>
                </div>

                <div class="reveal">
                    <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.3rem;">Personal Interests</h3>
                    <p style="line-height: 1.8; color: var(--text-light);">
                        ${data.about.personalInterests !== '[Awaiting content]' ? data.about.personalInterests : 'Beyond academics, I am passionate about community service, particularly blood donation drives. I enjoy exploring emerging technologies, reading research papers, and mentoring young professionals.'}
                    </p>
                </div>
            </section>
        `;
    }
}

// EXPERIENCE PAGE
class ExperiencePage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();
        
        return `
            <section class="fade-in">
                <h1 class="section-title">Professional Experience</h1>
                
                <div class="timeline">
                    ${data.experience.length > 0 ? data.experience.map((exp, i) => `
                        <div class="timeline-item reveal" style="animation-delay: ${i * 0.1}s;">
                            <div class="timeline-dot">
                                <i class="fas ${exp.icon}"></i>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-date">${exp.startDate} - ${exp.endDate}</div>
                                <h3 class="timeline-title">${exp.title}</h3>
                                <p class="timeline-subtitle">${exp.company} • ${exp.location}</p>
                                <p class="timeline-description">${exp.description}</p>
                                ${exp.achievements && exp.achievements.length > 0 ? `
                                    <div style="margin-top: 1rem;">
                                        <strong>Key Achievements:</strong>
                                        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                                            ${exp.achievements.map(a => `<li style="margin-bottom: 0.5rem;">${a}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('') : `
                        <div class="reveal" style="background: var(--light); padding: 2rem; border-radius: 10px; text-align: center;">
                            <p style="color: var(--text-light);">Experience details awaiting content update...</p>
                        </div>
                    `}
                </div>
            </section>
        `;
    }
}

// EDUCATION PAGE
class EducationPage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();

        return `
            <section class="fade-in">
                <h1 class="section-title">Education</h1>
                
                <div class="timeline">
                    ${data.education.length > 0 ? data.education.map((edu, i) => `
                        <div class="timeline-item reveal" style="animation-delay: ${i * 0.1}s;">
                            <div class="timeline-dot">
                                <i class="fas ${edu.icon}"></i>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-date">${edu.year}</div>
                                <h3 class="timeline-title">${edu.degree}</h3>
                                <p class="timeline-subtitle">${edu.institution}</p>
                                <p class="timeline-description">Field: ${edu.field}${edu.cgpa ? ' | CGPA: ' + edu.cgpa : ''}</p>
                                ${edu.achievements && edu.achievements.length > 0 ? `
                                    <div style="margin-top: 1rem;">
                                        <strong>Achievements:</strong>
                                        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                                            ${edu.achievements.map(a => `<li style="margin-bottom: 0.5rem;">${a}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('') : `
                        <div class="reveal" style="background: var(--light); padding: 2rem; border-radius: 10px; text-align: center;">
                            <p style="color: var(--text-light);">Education details awaiting content update...</p>
                        </div>
                    `}
                </div>
            </section>
        `;
    }
}

// PROJECTS PAGE
class ProjectsPage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();
        const categories = ['all', 'research', 'academic', 'industrial'];

        return `
            <section class="fade-in">
                <h1 class="section-title">Projects</h1>
                
                <div class="projects-filters">
                    ${categories.map(cat => `
                        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" onclick="filterProjects('${cat}')">
                            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    `).join('')}
                </div>

                <div class="projects-grid">
                    ${data.projects.length > 0 ? data.projects.map(proj => `
                        <div class="project-card active reveal" data-category="${proj.category}">
                            <div class="project-image">
                                <i class="fas ${proj.image}"></i>
                            </div>
                            <div class="project-info">
                                <h3 class="project-title">${proj.title}</h3>
                                <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.5;">${proj.description}</p>
                                <div class="project-tech">
                                    ${proj.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                                ${proj.github ? `<a href="${proj.github}" target="_blank" class="btn btn-outline" style="width: 100%; text-align: center;"><i class="fab fa-github"></i> View Code</a>` : ''}
                            </div>
                        </div>
                    `).join('') : `
                        <div class="reveal" style="background: var(--light); padding: 2rem; border-radius: 10px; text-align: center; grid-column: 1 / -1;">
                            <p style="color: var(--text-light);">Projects awaiting content update...</p>
                        </div>
                    `}
                </div>
            </section>
        `;
    }
}

// PROFESSIONAL DEVELOPMENT MAIN CATEGORIES PAGE
class ProfessionalDevPage extends Component {
    async render(params) {
        const certs = await DataManager.getCertificates();
        const categoryParam = params && params[0];

        // If a specific subcategory parameter exists in the URL, render the certificate listings instead
        if (categoryParam) {
            const currentCat = certs.categories.find(c => c.id === categoryParam);
            if (!currentCat) return `<div class="container text-center"><h3>Category not found</h3><a href="#/professional-dev" class="btn btn-primary mt-3">Back to Overview</a></div>`;
            
            const categoryCerts = certs.certificates.filter(c => c.category === categoryParam);
            
            console.log("Category:", categoryParam);
            console.log("Certificates:", categoryCerts);
            return `
                <section class="fade-in">
                    <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
                        <a href="#/professional-dev" class="btn btn-outline" style="padding: 0.5rem 1rem;"><i class="fas fa-arrow-left"></i> Back</a>
                        <h1 class="section-title" style="margin: 0;">${currentCat.name}</h1>
                    </div>
                    <p class="lead" style="color: var(--text-light); margin-bottom: 2rem;">${currentCat.description}</p>
                    
                    <div class="cards-grid">
                   
                    <p style="color:red;font-size:20px;">
                    Found ${categoryCerts.length} certificates
                    </p>
                        ${categoryCerts.length > 0 ? categoryCerts.map(cert => `
                            <div class="card reveal" style="padding: 1.5rem;">
                                <h3 class="card-title" style="font-size:1.1rem; margin-bottom:0.5rem;">
                                    ${cert.name}
                                </h3>

                                <p style="font-size:0.9rem; color:#666; margin-bottom:0.4rem;">
                                    <strong>Organization:</strong> ${cert.organization}
                                </p>

                                <p style="font-size:0.9rem; color:#666; margin-bottom:0.4rem;">
                                    <strong>Department:</strong> ${cert.department}
                                </p>

                                <p style="font-size:0.9rem; color:#666; margin-bottom:0.4rem;">
                                    <strong>Duration:</strong> ${cert.duration}
                                </p>

                                <p style="font-size:0.9rem; color:#666; margin-bottom:1rem;">
                                <strong>Date:</strong>
                                ${cert.startDate}
                                    ${cert.endDate ? " to " + cert.endDate : ""}
                                </p>

                                <a href="assets/certificates/professional-development/${cert.category}/${cert.certificateFile}"
                                   target="_blank"
                                   class="btn btn-primary"
                                   style="display:block;text-align:center;">
                                   <i class="fas fa-file-pdf"></i>
                                       View Certificate
                                    </a>
                            </div>
                        `).join('') : `
                            <div class="reveal" style="background: var(--light); padding: 2rem; border-radius: 10px; text-align: center; grid-column: 1 / -1;">
                                <p style="color: var(--text-light);">No certificates loaded in this section yet.</p>
                            </div>
                        `}
                    </div>
                </section>
            `;
        }

        // Default Overview Layout
        return `
            <section class="fade-in">
                <h1 class="section-title">Professional Development</h1>
                
                <div class="cards-grid stagger-container">
                    ${certs.categories.map((cat, i) => `
                        <div class="card fade-in" onclick="navigateTo('#/professional-dev/${cat.id}')" style="cursor: pointer;">
                            <div class="card-icon" style="background: ${cat.color};">
                                <i class="fas ${cat.icon.includes('fa-') ? cat.icon : 'fa-certificate'}"></i>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">${cat.name}</h3>
                                <p class="card-description">${cat.description}</p>
                                <p style="font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">
                                    ${certs.certificates.filter(c => c.category === cat.id).length} certificates
                                </p>
                                <a href="#/professional-dev/${cat.id}" class="card-link">View All <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    // Adapt layout hooks to support animations when a param view handles the rendering lifecycle
    afterRender(params) {
        super.afterRender();
    }
}
// MOOCS PAGE
class MoocsPage extends Component {

    async render() {

        const moocs = await DataManager.getMoocs();

        return `
            <section class="fade-in">

                <h1 class="section-title">
                    MOOC Certifications
                </h1>

                <div class="cards-grid">

                    ${moocs.moocCertifications.map(cert => `

                        <div class="card"
                        style="
display:flex;
flex-direction:column;
min-height:280px;
padding:20px;
">

    <h3 class="card-title"
    style="
    font-size:1.15rem;
    line-height:1.4;
    min-height:60px;
    margin-bottom:15px;
    ">
        ${cert.name}
    </h3>

    <p style="margin-bottom:8px;">
        <strong>Provider:</strong> ${cert.issuer}
    </p>

    <p style="margin-bottom:15px;">
        <strong>Platform:</strong> ${cert.vendor.toUpperCase()}
    </p>

    <div style="margin-top:auto;">

        <div style="display:flex;gap:10px;">

            <a
            href="assets/${cert.certificatePath}"
            target="_blank"
            class="btn btn-primary"
            style="flex:1;text-align:center;">

                <i class="fas fa-file-pdf"></i>
                Certificate

            </a>

            <a
            href="${cert.verifyUrl}"
            target="_blank"
            class="btn btn-outline"
            style="flex:1;text-align:center;">

                <i class="fas fa-circle-check"></i>
                Verify

            </a>

        </div>

    </div>

</div>
                    `).join("")}

                </div>

            </section>
        `;

    }

}
// SKILLS PAGE
class SkillsPage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();

        return `
            <section class="fade-in">
                <h1 class="section-title">Skills & Expertise</h1>
                
                <div class="skills-container">
                    ${Object.entries(data.skills).map(([category, skills]) => `
                        <div class="skill-category reveal">
                            <h3 class="skill-category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            ${skills.map(skill => `
                                <div class="skill-item">
                                    <div class="skill-name">
                                        <span>${skill.name}</span>
                                        <span style="color: var(--primary);">${skill.proficiency}%</span>
                                    </div>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: ${skill.proficiency}%;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }
}

// CONTACT PAGE
class ContactPage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();

        return `
            <section class="fade-in">
                <h1 class="section-title">Get In Touch</h1>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem;">
                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1.5rem; font-size: 1.2rem;">Contact Information</h3>
                        <div style="background: var(--light); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem;">
                            <p style="margin-bottom: 0.5rem;"><strong><i class="fas fa-envelope"></i> Email:</strong></p>
                            <p><a href="mailto:${data.personal.email}" style="color: var(--primary);">${data.personal.email}</a></p>
                        </div>
                        <div style="background: var(--light); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem;">
                            <p style="margin-bottom: 0.5rem;"><strong><i class="fas fa-phone"></i> Phone:</strong></p>
                            <p>${data.personal.phone}</p>
                        </div>
                        <div style="background: var(--light); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem;">
                            <p style="margin-bottom: 0.5rem;"><strong><i class="fas fa-map-marker-alt"></i> Location:</strong></p>
                            <p>${data.personal.location}</p>
                        </div>
                        <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 1.5rem; border-radius: 10px;">
                            <p style="margin-bottom: 1rem;"><strong>Connect On Social</strong></p>
                            <div class="social-links" style="gap: 0.5rem;">
                                <a href="${data.socialLinks.googleScholar}" target="_blank" style="background: rgba(255,255,255,0.2); color: white;" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
                                <a href="${data.socialLinks.researchGate}" target="_blank" style="background: rgba(255,255,255,0.2); color: white;" title="ResearchGate"><i class="fab fa-researchgate"></i></a>
                                <a href="${data.socialLinks.github}" target="_blank" style="background: rgba(255,255,255,0.2); color: white;" title="GitHub"><i class="fab fa-github"></i></a>
                                <a href="${data.socialLinks.linkedin}" target="_blank" style="background: rgba(255,255,255,0.2); color: white;" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1.5rem; font-size: 1.2rem;">Send Message</h3>
                        <form class="contact-form" onsubmit="handleContactForm(event)">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input type="text" id="subject" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">
                                <i class="fas fa-paper-plane"></i> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
}

// Register base paths
router.register('/home', new HomePage());
router.register('/about', new AboutPage());
router.register('/experience', new ExperiencePage());
router.register('/education', new EducationPage());
router.register('/projects', new ProjectsPage());
router.register('/professional-dev', new ProfessionalDevPage());
router.register('/moocs', new MoocsPage());
router.register('/skills', new SkillsPage());
router.register('/contact', new ContactPage());

// Helper Functions
function filterProjects(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.classList.add('active');
        } else {
            card.style.display = 'none';
            card.classList.remove('active');
        }
    });
}

function navigateTo(url) {
    window.location.hash = url;
}

function handleContactForm(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo(0, 0);
        });
    }
});
