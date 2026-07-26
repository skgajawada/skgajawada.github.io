
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
