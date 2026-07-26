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

