// PROFESSIONAL DEVELOPMENT MAIN CATEGORIES PAGE
class EngagementsPage extends Component {
    async render(params) {
        const certs = await DataManager.getCertificates();
        const categoryParam = params && params[0];

        // If a specific subcategory parameter exists in the URL, render the certificate listings instead
        if (categoryParam) {
            const currentCat = certs.categories.find(c => c.id === categoryParam);
            if (!currentCat) return `<div class="container text-center"><h3>Category not found</h3><a href="#/professional-dev" class="btn btn-primary mt-3">Back to Overview</a></div>`;
            
            const categoryCerts = certs.certificates.filter(c => c.category === categoryParam);
            
            return `
                <section class="fade-in">
                    <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
                        <a href="#/professional-dev" class="btn btn-outline" style="padding: 0.5rem 1rem;"><i class="fas fa-arrow-left"></i> Back</a>
                        <h1 class="section-title" style="margin: 0;">${currentCat.name}</h1>
                    </div>
                    <p class="lead" style="color: var(--text-light); margin-bottom: 2rem;">${currentCat.description}</p>
                    
                    <div class="cards-grid">

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
