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
                                <p class="timeline-description">
                                    ${edu.field ? `Field: ${edu.field}` : ''}
                                    ${edu.cgpa ? ` | CGPA: ${edu.cgpa}` : ''}
                                    ${edu.percentage ? ` | Percentage: ${edu.percentage}` : ''}
                                </p>
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
