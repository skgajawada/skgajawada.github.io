// MOOCS PAGE - HIGHLY ACADEMIC & DYNAMIC PASTEL AESTHETIC

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // Academic Multi-Zone Pastel Color Schemes
        const colorSchemes = {
            "matlab":     { border: "#F97316", iconBg: "#FFEDD5", iconText: "#C2410C", tagBg: "#FFF7ED" }, // Peach / Amber
            "linkedin":   { border: "#0284C7", iconBg: "#E0F2FE", iconText: "#0369A1", tagBg: "#F0F9FF" }, // Sky Blue
            "coursera":   { border: "#4F46E5", iconBg: "#E0E7FF", iconText: "#3730A3", tagBg: "#EEF2FF" }, // Soft Indigo
            "dataiku":    { border: "#10B981", iconBg: "#D1FAE5", iconText: "#047857", tagBg: "#ECFDF5" }, // Mint Green
            "ibm":        { border: "#2563EB", iconBg: "#DBEAFE", iconText: "#1E40AF", tagBg: "#EFF6FF" }, // Slate Blue
            "cognitive":  { border: "#9333EA", iconBg: "#F3E8FF", iconText: "#6B21A8", tagBg: "#FAF5FF" }  // Soft Violet
        };

        const defaultPalette = [
            { border: "#F97316", iconBg: "#FFEDD5", iconText: "#C2410C", tagBg: "#FFF7ED" },
            { border: "#0284C7", iconBg: "#E0F2FE", iconText: "#0369A1", tagBg: "#F0F9FF" },
            { border: "#4F46E5", iconBg: "#E0E7FF", iconText: "#3730A3", tagBg: "#EEF2FF" },
            { border: "#10B981", iconBg: "#D1FAE5", iconText: "#047857", tagBg: "#ECFDF5" },
            { border: "#9333EA", iconBg: "#F3E8FF", iconText: "#6B21A8", tagBg: "#FAF5FF" }
        ];

        // ===========================
        // CATEGORY OVERVIEW DIRECTORY
        // ===========================

        if (!vendorParam) {
            return `
                <div class="moocs-page">
                    <section class="fade-in">
                        <header class="page-header">
                            <span class="academic-kicker">Academic Qualifications</span>
                            <h1 class="section-title">MOOC Certifications</h1>
                            <p class="lead">
                                Verified certifications and specialized coursework from leading global platforms.
                            </p>
                        </header>
                        
                        <div class="cards-grid">
                            ${moocs.categories.map((cat, idx) => {
                                const theme = colorSchemes[cat.id] || defaultPalette[idx % defaultPalette.length];

                                return `
                                    <div class="card fade-in"
                                         onclick="navigateTo('#/moocs/${cat.id}')"
                                         style="--accent-border: ${theme.border}; --accent-icon-bg: ${theme.iconBg}; --accent-icon-text: ${theme.iconText}; --accent-tag-bg: ${theme.tagBg};">
                                         
                                        <div class="card-top-bar"></div>

                                        <div class="card-header-row">
                                            <div class="card-icon">
                                                <i class="fas ${cat.icon || 'fa-certificate'}"></i>
                                            </div>
                                            <div>
                                                <h3 class="card-title">${cat.name}</h3>
                                                <span class="category-pill">Directory</span>
                                            </div>
                                        </div>
                                        
                                        <div class="card-body">
                                            <p class="card-description">
                                                ${cat.description}
                                            </p>
                                            
                                            <div class="card-link">
                                                <span>View Credentials</span>
                                                <i class="fas fa-arrow-right"></i>
                                            </div>
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
                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem;">
                        <a href="#/moocs" class="btn btn-outline">
                            <i class="fas fa-arrow-left"></i>
                            Back
                        </a>
                        <div>
                            <span class="academic-kicker" style="margin:0;">Certification Registry</span>
                            <h1 class="section-title" style="margin:0;">${currentVendor.name}</h1>
                        </div>
                    </div>

                    <p class="lead" style="margin-bottom:2rem;">
                        ${currentVendor.description}
                    </p>

                    <div class="cards-grid">
                        ${vendorCertificates.map(cert => `
                            <div class="card" style="--accent-border: ${vendorTheme.border}; --accent-icon-bg: ${vendorTheme.iconBg}; --accent-icon-text: ${vendorTheme.iconText}; --accent-tag-bg: ${vendorTheme.tagBg};">
                                <div class="card-top-bar"></div>
                                
                                <h3 class="card-title" style="font-size:1.05rem; line-height:1.4; margin-bottom:14px; margin-top:4px;">
                                    ${cert.name}
                                </h3>
                                
                                <div class="meta-panel">
                                    <div class="meta-row">
                                        <span class="meta-label">Provider</span>
                                        <span class="meta-value">${cert.issuer}</span>
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">Platform</span>
                                        <span class="meta-value">${cert.vendor.toUpperCase()}</span>
                                    </div>
                                </div>
                                
                                <div style="margin-top:auto;">
                                    <div style="display:flex; gap:8px;">
                                        <a href="assets/${cert.certificatePath}" target="_blank" class="btn btn-primary" style="flex:1;">
                                            <i class="fas fa-file-pdf"></i>
                                            Certificate
                                        </a>
                                        
                                        ${cert.verifyUrl ? `
                                            <a href="${cert.verifyUrl}" target="_blank" class="btn btn-outline" style="flex:1;">
                                                <i class="fas fa-circle-check"></i>
                                                Verify
                                            </a>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </section>
            </div>
        `;
    }
}
