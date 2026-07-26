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

