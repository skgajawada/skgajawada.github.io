// PROFESSIONAL ENGAGEMENTS & CERTIFICATIONS PAGE
class EngagementsPage extends Component {
    async render(params) {
        const certs = await DataManager.getEngagements();
        const categoryParam = params && params[0];

        // Unique colors and Font Awesome icons for each category
        const categoryThemes = {
            'STC_STTPs': { 
                icon: 'fa-graduation-cap', 
                title: 'Short Term Courses / STTPs', 
                desc: 'Specialized technical training programs and intensive skill workshops.',
                color: '#1d4ed8',      // Navy Blue
                bgColor: '#eff6ff',
                borderColor: '#bfdbfe'
            },
            'Workshop': { 
                icon: 'fa-chalkboard-teacher', 
                title: 'Workshops / Seminars', 
                desc: 'Interactive academic workshops, domain seminars, and collaborative forums.',
                color: '#d97706',      // Warm Amber
                bgColor: '#fffbeb',
                borderColor: '#fde68a'
            },
            'FDP': { 
                icon: 'fa-university', 
                title: 'Faculty Development Programs', 
                desc: 'Pedagogical training, research methodologies, and faculty orientation.',
                color: '#be123c',      // Crimson Red
                bgColor: '#fff1f2',
                borderColor: '#fecdd3'
            },
            'Webinars': { 
                icon: 'fa-laptop-house', 
                title: 'Webinars', 
                desc: 'Online technical lectures, virtual symposia, and web discourses.',
                color: '#0d9488',      // Teal
                bgColor: '#f0fdfa',
                borderColor: '#99f6e4'
            },
            'Quiz': { 
                icon: 'fa-award', 
                title: 'Quizzes', 
                desc: 'National-level knowledge evaluations and subject assessments.',
                color: '#6d28d9',      // Deep Purple
                bgColor: '#f5f3ff',
                borderColor: '#ddd6fe'
            },
            'Conference': { 
                icon: 'fa-users', 
                title: 'Conferences', 
                desc: 'International and national research presentations and proceedings.',
                color: '#047857',      // Emerald Green
                bgColor: '#ecfdf5',
                borderColor: '#a7f3d0'
            }
        };

        // -----------------------------------------------------------------
        // 1. DETAIL VIEW (Specific Category Page)
        // -----------------------------------------------------------------
        if (categoryParam) {
            const currentCat = certs.categories.find(c => c.id === categoryParam) || {
                id: categoryParam,
                name: categoryThemes[categoryParam]?.title || categoryParam.toUpperCase(),
                description: categoryThemes[categoryParam]?.desc || 'Academic certifications and records.'
            };
            
            const categoryCerts = certs.certificates.filter(c => c.category === categoryParam);
            const themeInfo = categoryThemes[categoryParam] || { 
                icon: 'fa-certificate', 
                color: '#1d4ed8', 
                bgColor: '#eff6ff', 
                borderColor: '#bfdbfe' 
            };

            return `
                <section class="fade-in container py-4">
                    <div class="mb-4">
                        <a href="#/engagements" class="btn btn-outline-secondary btn-sm" style="border-radius: 20px; padding: 0.4rem 1rem;">
                            <i class="fas fa-arrow-left me-1"></i> Back to Categories
                        </a>
                    </div>

                    <div class="academic-header text-start ms-0 mb-4" style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
                        <div class="d-flex align-items-center gap-3 mb-2">
                            <div class="category-icon-box" style="background-color: ${themeInfo.bgColor}; border: 1px solid ${themeInfo.borderColor}; color: ${themeInfo.color};">
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
                                        <span>${cert.startDate}${cert.endDate ? ' - ' + cert.endDate : ''}</span>
                                    </div>
                                </div>

                                <a href="assets/certificates/professional-development/${cert.category}/${cert.certificateFile}"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   class="btn-download-pdf">
                                    <i class="fas fa-file-pdf"></i> View Verified PDF
                                </a>
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
                    ${certs.categories.map(cat => {
                        const meta = categoryThemes[cat.id] || { 
                            icon: cat.icon || 'fa-certificate', 
                            title: cat.name, 
                            desc: cat.description,
                            color: '#1d4ed8',
                            bgColor: '#eff6ff',
                            borderColor: '#bfdbfe'
                        };

                        return `
                            <div class="academic-card" 
                                 onclick="navigateTo('#/engagements/${cat.id}')" 
                                 style="cursor: pointer; border-top: 4px solid ${meta.color};">
                                <div>
                                    <div class="card-top-row">
                                        <div class="category-icon-box" style="background-color: ${meta.bgColor}; border: 1px solid ${meta.borderColor}; color: ${meta.color};">
                                            <i class="fas ${meta.icon}"></i>
                                        </div>
                                    </div>

                                    <h2 class="card-title">${meta.title}</h2>
                                    <p class="card-description">${meta.desc}</p>
                                </div>

                                <div class="card-footer-link" style="color: ${meta.color};">
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
