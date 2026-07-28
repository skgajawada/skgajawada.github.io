// SKILLS PAGE
class SkillsPage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();

        return `
            <section class="fade-in">
                <h1 class="section-title">Skills & Expertise</h1>

                <div class="cards-grid">
                    ${Object.entries(data.skills).map(([category, skills]) => `
                        <div class="card reveal skill-card">
                            <div class="card-content">
                                <h3 class="card-title">${category}</h3>
                                <div class="skills-tags">
                                    ${skills.map(skill => `
                                        <span class="skill-tag">
                                            ${typeof skill === 'string' ? skill : skill.name}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }
}
