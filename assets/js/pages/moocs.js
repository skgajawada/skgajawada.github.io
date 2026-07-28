// MOOCS PAGE - REFINED ACADEMIC EDITORIAL LAYOUT

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // Refined Academic Color Mapping (Clean & Cohesive)
        const colorSchemes = {
            "matlab":     { primary: "#D97706", bg: "#FFFBEB", text: "#92400E" }, // Amber
            "linkedin":   { primary: "#0284C7", bg: "#F0F9FF", text: "#075985" }, // Sky Blue
            "coursera":   { primary: "#4F46E5", bg: "#EEF2FF", text: "#3730A3" }, // Indigo
            "dataiku":    { primary: "#059669", bg: "#ECFDF5", text: "#065F46" }, // Emerald
            "ibm":        { primary: "#2563EB", bg: "#EFF6FF", text: "#1E40AF" }, // Royal Blue
            "cognitive":  { primary: "#7C3AED", bg: "#F5F3FF", text: "#5B21B6" }  // Purple
        };

        const defaultPalette = [
            { primary: "#0284C7", bg: "#F0F9FF", text: "#075985" },
            { primary: "#4F46E5", bg: "#EEF2FF", text: "#3730A3" },
            { primary: "#059669", bg: "#ECFDF5", text: "#065F46" }
        ];

        // ===========================
        // CATEGORY OVERVIEW DIRECTORY
        // ===========================

        if (!vendorParam) {
            return `
                <div class="moocs-page">
                    <section class="fade-in">
                        <!-- Properly Stacked Academic Header -->
                        <header class="page-header">
                            <span class="academic-kicker">Academic Qualifications</span>
                            <h1 class="section-title">MOOC Certifications</h1>
                            <p class="lead">
                                Verified certifications and specialized coursework completed across leading global education platforms.
                            </p>
                        </header>
                        
                        <div class="cards-grid">
                            ${moocs.categories.map((cat, idx) => {
                                const theme = colorSchemes[cat.id] || defaultPalette[idx % defaultPalette.length];

                                return `
                                    <div class="card fade-in"
                                         onclick="navigateTo('#/moocs/${cat.id}')"
                                         style="--accent-color: ${theme.primary}; --badge-bg: ${theme.bg}; --badge-text: ${theme.text};">
                                         
                                        <div class="card-header-row">
                                            <div class="card-icon">
                                                <i class="fas ${cat.icon || 'fa-certificate'}"></i>
                                            </div>
                                            <div class="card-title-group">
                                                <h3 class="card-title">${cat.name}</h3>
                                                <span class="category-pill">Verified Platform</span>
                                            </div>
                                        </div>
                                        
                                        <p class="card-description">
                                            ${cat.description}
                                        </p>
                                        
                                        <div class="card-link">
                                            <span>Explore Certifications</span>
                                            <i class="fas fa-arrow-right"></i>
                                        </div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </section>
                </div>
            `;
        }

        // ===========================
        // SELECTED CATEGORY VIEW
        // ===========================

        const categoryIndex = moocs.categories.findIndex(c => c.id === vendorParam);
        const currentVendor = moocs.categories[categoryIndex];

        if (!currentVendor) {
            return `
                <div class="moocs-page">
                    <section class="fade-in">
                        <h2 style="margin-bottom:1rem;">Category Not Found</h2>
                        <a href="#/moocs" class="btn btn-outline">Return to Directory</a>
                    </section>
                </div>
            `;
        }

        const vendorTheme = colorSchemes[currentVendor.id] || defaultPalette[categoryIndex % defaultPalette.length];
        const vendorCertificates = moocs.moocCertifications.filter(cert => cert.vendor === vendorParam);

        return `
            <div class="moocs-page">
                <section class="fade-in">
                    <div style="margin-bottom:2rem;">
                        <a href="#/moocs" class="btn btn-outline" style="margin-bottom:1rem;">
                            <i class="fas fa-arrow-left"></i>
                            Back to Categories
                        </a>
                        <span class="academic-kicker">Certification Registry</span>
                        <h1 class="section-title">${currentVendor.name}</h1>
                        <p class="lead">${currentVendor.description}</p>
                    </div>

                    <div class="cards-grid">
                        ${vendorCertificates.map(cert => `
                            <div class="card" style="--accent-color: ${vendorTheme.primary}; --badge-bg: ${vendorTheme.bg}; --badge-text: ${vendorTheme.text};">
                                <h3 class="card-title" style="font-size:1.05rem; margin-bottom:12px;">
                                    ${cert.name}
                                </h3>
                                
                                <div class="meta-panel">
                                    <div class="meta-row">
                                        <span class="meta-label">Issuer</span>
                                        <span class="meta-value">${cert.issuer}</span>
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">Platform</span>
                                        <span class="meta-value">${cert.vendor.toUpperCase()}</span>
                                    </div>
                                </div>
                                
                                <div style="margin-top:auto; display:flex; gap:8px;">
                                    <a href="assets/${cert.certificatePath}" target="_blank" class="btn btn-primary" style="flex:1;">
                                        <i class="fas fa-file-pdf"></i>
                                        Certificate
                                    </a>
                                    
                                    ${cert.verifyUrl ? `
                                        <a href="${cert.verifyUrl}" target="_blank" class="btn btn-outline" style="flex:1;">
                                            <i class="fas fa-external-link-alt"></i>
                                            Verify
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </section>
            </div>
        `;
    }
}
