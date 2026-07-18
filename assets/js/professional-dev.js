// Professional Development Category Page
class ProfDevCategoryPage extends Component {
    async render(params) {
        const categoryId = params[0];
        const certs = await DataManager.getCertificates();
        const category = certs.categories.find(c => c.id === categoryId);
        const certificates = certs.certificates.filter(c => c.category === categoryId);

        if (!category) {
            return '<div style="text-align: center; padding: 3rem;"><h2>Category not found</h2><a href="#/professional-dev" class="btn btn-primary">Back to Professional Development</a></div>';
        }

        return `
            <section class="fade-in">
                <div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, ${category.color}, ${category.color}cc); color: white; border-radius: 10px;">
                    <div style="font-size: 3rem;">${category.icon}</div>
                    <div>
                        <h1 style="margin: 0; color: white;">${category.name}</h1>
                        <p style="margin: 0.5rem 0 0 0; color: rgba(255,255,255,0.9);">${category.description}</p>
                        <p style="margin: 0.5rem 0 0 0; font-weight: bold;"><i class="fas fa-certificate"></i> ${certificates.length} Certificates</p>
                    </div>
                </div>

                <a href="#/professional-dev" class="btn btn-outline" style="margin-bottom: 2rem;">
                    <i class="fas fa-arrow-left"></i> Back to Categories
                </a>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
                    ${certificates.map((cert, i) => `
                        <div class="card reveal" style="animation-delay: ${i * 0.05}s; cursor: pointer;" onclick="navigateTo('#/professional-dev/${categoryId}/${cert.id}')">
                            <div class="card-icon" style="background: ${category.color};">
                                <i class="fas fa-award"></i>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title" style="font-size: 1rem;">${cert.name}</h3>
                                <p style="color: var(--text-light); font-size: 0.85rem; margin-bottom: 0.5rem;">
                                    <i class="fas fa-building"></i> ${cert.organization}
                                </p>
                                <p style="color: var(--text-light); font-size: 0.85rem; margin-bottom: 0.5rem;">
                                    <i class="fas fa-calendar"></i> ${new Date(cert.startDate).toLocaleDateString()}
                                </p>
                                <p style="color: var(--text-light); font-size: 0.85rem; margin-bottom: 1rem;">
                                    <i class="fas fa-clock"></i> ${cert.duration}
                                </p>
                                <a href="#/professional-dev/${categoryId}/${cert.id}" class="card-link">
                                    View Details <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }
}

// Professional Development Certificate Detail Page
class ProfDevDetailPage extends Component {
    async render(params) {
        const categoryId = params[0];
        const certId = parseInt(params[1]);
        const certs = await DataManager.getCertificates();
        const category = certs.categories.find(c => c.id === categoryId);
        const certificate = certs.certificates.find(c => c.id === certId);

        if (!certificate || !category) {
            return '<div style="text-align: center; padding: 3rem;"><h2>Certificate not found</h2><a href="#/professional-dev" class="btn btn-primary">Back to Professional Development</a></div>';
        }

        const startDate = new Date(certificate.startDate);
        const endDate = new Date(certificate.endDate);

        return `
            <section class="fade-in">
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <a href="#/professional-dev" class="btn btn-outline" style="flex: 0;">
                        <i class="fas fa-arrow-left"></i>
                    </a>
                    <a href="#/professional-dev/${categoryId}" class="btn btn-outline" style="flex: 0;">
                        <i class="fas fa-arrow-left"></i> Back to ${category.name}
                    </a>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem;">
                    <!-- Certificate Info -->
                    <div class="reveal">
                        <div style="background: linear-gradient(135deg, ${category.color}, ${category.color}cc); color: white; padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h1 style="color: white; margin: 0 0 1rem 0; font-size: 1.5rem;">${certificate.name}</h1>
                            <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 5px;">
                                <p style="margin: 0.5rem 0;"><strong>Certificate #${certificate.id}</strong></p>
                                <p style="margin: 0.5rem 0;"><strong>Type:</strong> ${certificate.type}</p>
                                <p style="margin: 0.5rem 0;"><strong>Duration:</strong> ${certificate.duration}</p>
                            </div>
                        </div>

                        <div style="background: var(--light); padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-building"></i> Organization</h3>
                            <p style="font-weight: bold; margin-bottom: 0.5rem;">${certificate.organization}</p>
                            <p style="color: var(--text-light); margin: 0;">Department: ${certificate.department}</p>
                        </div>

                        <div style="background: var(--light); padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-map-marker-alt"></i> Venue</h3>
                            <p style="margin: 0;">${certificate.venue}</p>
                        </div>

                        <div style="background: var(--light); padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-calendar-alt"></i> Duration</h3>
                            <p style="margin: 0.5rem 0;"><strong>Start:</strong> ${startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p style="margin: 0.5rem 0;"><strong>End:</strong> ${endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p style="margin: 0.5rem 0; color: var(--primary); font-weight: bold;">Total: ${certificate.duration}</p>
                        </div>

                        <div style="background: var(--light); padding: 2rem; border-radius: 10px;">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-link"></i> Association</h3>
                            <p style="margin: 0;">${certificate.association}</p>
                        </div>
                    </div>

                    <!-- Certificate Preview -->
                    <div class="reveal">
                        <div style="background: var(--light); padding: 2rem; border-radius: 10px; margin-bottom: 2rem; text-align: center;">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-file-pdf"></i> Certificate Preview</h3>
                            <div style="background: white; padding: 2rem; border-radius: 10px; margin-bottom: 1rem; min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px dashed ${category.color};">
                                <i class="fas fa-certificate" style="font-size: 4rem; color: ${category.color}; margin-bottom: 1rem; opacity: 0.5;"></i>
                                <p style="color: var(--text-light); margin: 0;">Certificate Preview</p>
                                <p style="color: var(--text-light); font-size: 0.9rem; margin: 0.5rem 0;">ID: ${certificate.id}</p>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <a href="assets/certificates/professional-development/${certificate.category}/${certificate.certificateFile}"
                                   class="btn btn-primary"
                                   target="_blank">
                                    <i class="fas fa-file-pdf"></i> PDF
                                </a>

                                <a href="assets/certificates/professional-development/${certificate.category}/${certificate.certificateImage}"
                                   class="btn btn-secondary"
                                   target="_blank">
                                     <i class="fas fa-image"></i> Image
                                </a>
                            </div>
                        </div>

                        <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 2rem; border-radius: 10px; text-align: center;">
                            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                            <h3 style="color: white; margin: 0 0 0.5rem 0;">Certificate Verified</h3>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">This is an authentic professional development credential</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Register new routes
router.register('/professional-dev/:category', new ProfDevCategoryPage());
router.register('/professional-dev/:category/:id', new ProfDevDetailPage());
