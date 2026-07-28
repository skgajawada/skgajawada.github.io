// PROFESSIONAL ENGAGEMENTS & CERTIFICATIONS PAGE
class EngagementsPage extends Component {
    async render(params) {
        const certs = await DataManager.getEngagements();
        const categoryParam = params && params[0];

        // Central Theme & Metadata Registry
        const categoryThemes = {
            'sttp': { 
                icon: 'fa-graduation-cap', 
                title: 'Short Term Courses / STTPs', 
                desc: 'Specialized technical training programs and intensive skill workshops.'
            },
            'workshops': { 
                icon: 'fa-chalkboard-teacher', 
                title: 'Workshops / Seminars', 
                desc: 'Interactive academic workshops, domain seminars, and collaborative forums.'
            },
            'fdp': { 
                icon: 'fa-university', 
                title: 'Faculty Development Programs', 
                desc: 'Pedagogical training, research methodologies, and faculty orientation.'
            },
            'webinars': { 
                icon: 'fa-laptop-house', 
                title: 'Webinars', 
                desc: 'Online technical lectures, virtual symposia, and web discourses.'
            },
            'quizzes': { 
                icon: 'fa-award', 
                title: 'Quizzes', 
                desc: 'National-level knowledge evaluations and subject assessments.'
            },
            'conferences': { 
                icon: 'fa-users', 
                title: 'Conferences', 
                desc: 'International and national research presentations and proceedings.'
            }
        };

        const defaultTheme = {
            icon: 'fa-certificate',
            title: categoryParam ? categoryParam.toUpperCase() : 'Category',
            desc: 'Academic certifications and records.'
        };

        // -----------------------------------------------------------------
        // 1. DETAIL VIEW (Specific Category Page)
        // -----------------------------------------------------------------
        if (categoryParam) {
            const themeInfo = categoryThemes[categoryParam] || defaultTheme;
            
            // Defensively match category data
            const currentCat = certs?.categories?.find(c => c.id === categoryParam) || {
                id: categoryParam,
                name: themeInfo.title,
                description: themeInfo.desc
            };
            
            const categoryCerts = certs?.certificates ? certs.certificates.filter(c => c.category === categoryParam) : [];
            const themeClass = categoryThemes[categoryParam] ? `theme-${categoryParam}` : 'theme-default';

            return `
                <section class="fade-in container py-4 ${themeClass}">
                    <div class="mb-4">
                        <a href="#/engagements" class="btn btn-outline-secondary btn-sm" style="border-radius: 20px; padding: 0.4rem 1rem;">
                            <i class="fas fa-arrow-left me-1"></i> Back to Categories
                        </a>
                    </div>

                    <div class="academic-header text-start ms-0 mb-4" style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
                        <div class="d-flex align-items-center gap-3 mb-2">
                            <div class="category-icon-box">
                                <i class="fas ${themeInfo.icon}"></i>
                            </div>
                            <div>
                                <h1 class="academic-title mb-0" style="font-size: 2rem;">${currentCat.name}</h1>
                            </div>
                        </div>
                        <p class="academic-subtitle mt-2">${currentCat.description}</p>
                    </div>

                    <div class="academic-grid">
                        ${categoryCerts.length > 0 ? categoryCerts.map(cert => `
                            <article class="cert-card">
                                <div>
                                    ${cert.type ? `<span class="badge bg-light text-dark border mb-2">${cert.type}</span>` : ''}
                                    <h3 style="font-family: var(--academic-font-serif); font-size: 1.15rem; color: #0f172a; margin-bottom: 0.75rem;">
                                        ${cert.name}
                                    </h3>

                                    <div class="cert-meta-grid">
                                        <span class="cert-meta-label">Issuer:</span>
                                        <span>${cert.organization || 'N/A'}</span>
                                        
                                        ${cert.department ? `
                                            <span class="cert-meta-label">Dept:</span>
                                            <span>${cert.department}</span>
                                        ` : ''}
                                        
                                        <span class="cert-meta-label">Duration:</span>
                                        <span>${cert.duration || 'N/A'}</span>
                                        
                                        <span class="cert-meta-label">Date:</span>
                                        <span>${cert.startDate || ''}${cert.endDate ? ' - ' + cert.endDate : ''}</span>
                                    </div>
                                </div>

                                ${cert.certificateFile ? `
                                    <a href="assets/certificates/professional-development/${cert.category}/${cert.certificateFile}"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       class="btn-download-pdf">
                                        <i class="fas fa-file-pdf"></i> View Verified PDF
                                    </a>
                                ` : `
                                    <button class="btn-download-pdf" disabled>
                                        <i class="fas fa-file-pdf"></i> PDF Unavailable
                                    </button>
                                `}
                            </article>
                        `).join('') : `
                            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: #fff; border: 1px dashed #cbd5e1; border-radius: 12px;">
                                <i class="fas fa-folder-open text-muted mb-3" style="font-size: 2.5rem;"></i>
                                <p class="text-muted mb-0">No records found for this category.</p>
                            </div>
                        `}
                    </div>
                </section>
            `;
        }

        // -----------------------------------------------------------------
        // 2. MAIN CATEGORIES OVERVIEW
        // -----------------------------------------------------------------
        const categoriesList = certs?.categories || [];

        return `
            <section class="fade-in container py-4">
                <header class="academic-header">
                    <div class="academic-badge-pill">
                        <i class="fas fa-university"></i> Scholarly Record & Faculty Development
                    </div>
                    <h1 class="academic-title">Professional Engagements & Certifications</h1>
                    <p class="academic-subtitle">
                        A formal archive of academic contributions, pedagogical development programs, 
                        specialized short-term courses, and technical symposia.
                    </p>
                </header>

                <div class="academic-grid">
                    ${categoriesList.map(cat => {
                        const meta = categoryThemes[cat.id] || { 
                            icon: cat.icon || 'fa-certificate', 
                            title: cat.name, 
                            desc: cat.description 
                        };
                        const themeClass = categoryThemes[cat.id] ? `theme-${cat.id}` : 'theme-default';

                        return `
                            <div class="academic-card ${themeClass}" 
                                 role="button"
                                 tabindex="0"
                                 aria-label="Navigate to ${meta.title}"
                                 onclick="navigateTo('#/engagements/${cat.id}')"
                                 onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); navigateTo('#/engagements/${cat.id}'); }"
                                 style="cursor: pointer;">
                                <div>
                                    <div class="card-top-row">
                                        <div class="category-icon-box">
                                            <i class="fas ${meta.icon}"></i>
                                        </div>
                                    </div>

                                    <h2 class="card-title">${meta.title}</h2>
                                    <p class="card-description">${meta.desc}</p>
                                </div>

                                <div class="card-footer-link">
                                    <span>Explore Section</span>
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </section>
        `;
    }

    afterRender(params) {
        super.afterRender();
    }
}
