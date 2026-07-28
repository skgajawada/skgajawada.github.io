// PROFESSIONAL DEVELOPMENT & ENGAGEMENTS PAGE
class EngagementsPage extends Component {
    async render(params) {
        const certs = await DataManager.getEngagements();
        const categoryParam = params && params[0];

        // -----------------------------------------------------------------
        // 1. SUBCATEGORY DETAIL VIEW
        // -----------------------------------------------------------------
        if (categoryParam) {
            const currentCat = certs.categories.find(c => c.id === categoryParam);
            
            if (!currentCat) {
                return `
                    <div class="container text-center py-5">
                        <h3 class="academic-title">Category Not Found</h3>
                        <p class="academic-subtitle mb-4">The requested academic category could not be located.</p>
                        <a href="#/engagements" class="btn-academic-back">Return to Overview</a>
                    </div>
                `;
            }
            
            const categoryCerts = certs.certificates.filter(c => c.category === categoryParam);
            
            return `
                <section class="fade-in container">
                    <!-- Academic Navigation & Section Header -->
                    <div class="academic-header">
                        <div style="margin-bottom: 1rem;">
                            <a href="#/engagements" class="btn-academic-back">
                                <i class="fas fa-arrow-left"></i> Back to Categories
                            </a>
                        </div>
                        <h1 class="academic-title">${currentCat.name}</h1>
                        <p class="academic-subtitle">${currentCat.description}</p>
                    </div>
                    
                    <!-- Certificates Grid -->
                    <div class="cards-grid">
                        ${categoryCerts.length > 0 ? categoryCerts.map(cert => `
                            <article class="academic-cert-card reveal">
                                <div>
                                    ${cert.type ? `<span class="cert-type-tag">${cert.type}</span>` : ''}
                                    <h3 class="cert-title">${cert.name}</h3>

                                    <div class="cert-metadata-list">
                                        <div class="cert-metadata-item">
                                            <span class="cert-metadata-label">Organization:</span>
                                            <span>${cert.organization || 'N/A'}</span>
                                        </div>
                                        ${cert.department ? `
                                            <div class="cert-metadata-item">
                                                <span class="cert-metadata-label">Department:</span>
                                                <span>${cert.department}</span>
                                            </div>
                                        ` : ''}
                                        <div class="cert-metadata-item">
                                            <span class="cert-metadata-label">Duration:</span>
                                            <span>${cert.duration}</span>
                                        </div>
                                        <div class="cert-metadata-item">
                                            <span class="cert-metadata-label">Date:</span>
                                            <span>${cert.startDate}${cert.endDate ? ' to ' + cert.endDate : ''}</span>
                                        </div>
                                        ${cert.association ? `
                                            <div class="cert-metadata-item">
                                                <span class="cert-metadata-label">Affiliation:</span>
                                                <span>${cert.association}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>

                                <a href="assets/certificates/professional-development/${cert.category}/${cert.certificateFile}"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   class="btn-academic-pdf">
                                    <i class="fas fa-file-pdf"></i> View Certificate (PDF)
                                </a>
                            </article>
                        `).join('') : `
                            <div class="reveal" style="background: var(--academic-bg-light); border: 1px dashed var(--academic-border); padding: 3rem; border-radius: 8px; text-align: center; grid-column: 1 / -1;">
                                <p style="color: var(--academic-slate); margin: 0; font-size: 1.05rem;">
                                    No records currently published under this category.
                                </p>
                            </div>
                        `}
                    </div>
                </section>
            `;
        }

        // -----------------------------------------------------------------
        // 2. MAIN CATEGORIES OVERVIEW VIEW
        // -----------------------------------------------------------------
        return `
            <section class="fade-in container">
                <div class="academic-header">
                    <h1 class="academic-title">Professional Engagements & Certifications</h1>
                    <p class="academic-subtitle">
                        A formal repository of faculty development programs, workshops, short-term courses, and scholarly contributions.
                    </p>
                </div>
                
                <div class="cards-grid stagger-container">
                    ${certs.categories.map(cat => `
                        <div class="academic-category-card" onclick="navigateTo('#/engagements/${cat.id}')" style="cursor: pointer;">
                            <div>
                                <div class="category-icon-wrapper" style="background-color: ${cat.color}15; color: ${cat.color};">
                                    <span>${cat.icon}</span>
                                </div>
                                <h3 class="category-card-title">${cat.name}</h3>
                                <p class="category-card-desc">${cat.description}</p>
                            </div>

                            <a href="#/engagements/${cat.id}" class="category-link">
                                Explore Section <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    afterRender(params) {
        super.afterRender();
    }
}
