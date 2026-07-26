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

const router = new Router(false);

// Register base paths
router.register('/home', new HomePage());
router.register('/about', new AboutPage());
router.register('/experience', new ExperiencePage());
router.register('/teaching',new TeachingPage());
router.register('/education', new EducationPage());
router.register('/projects', new ProjectsPage());
router.register('/engagements', new EngagementsPage());
router.register('/moocs', new MoocsPage());
router.register('/skills', new SkillsPage());
router.register('/analytics', new AnalyticsDashboard());
router.register('/social-responsibility', new SocialResponsibilityPage());
router.register('/contact', new ContactPage());

router.init();


