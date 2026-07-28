// MOOCS PAGE - DYNAMIC SUB-CATEGORY COLORS & COMPACT CARDS

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // Palette of distinct colors for sub-categories
        const categoryColors = [
            "#E65100", // Matlab / Orange
            "#0A66C2", // LinkedIn / Deep Blue
            "#0056D2", // Coursera / Royal Blue
            "#00A884", // Dataiku / Emerald Green
            "#1261A0", // IBM / Steel Blue
            "#7C3AED", // Cognitive / Vibrant Purple
            "#D97706", // Amber / Warm Gold
            "#DC2626"  // Crimson Red
        ];

        // ===========================
        // CATEGORY PAGE OVERVIEW
        // ===========================

        if (!vendorParam) {
            return `
                <div class="moocs-page">
                    <section class="fade-in">
                        <h1 class="section-title">MOOC Certifications</h1>
                        <p class="lead" style="margin-bottom: 1.5rem;">
                            Verified academic and industry certifications across specialized computing domains.
                        </p>
                        
                        <div class="cards-grid">
                            ${moocs.categories.map((cat, index) => {
                                // Assign individual color from JSON or fallback array
                                const accentColor = cat.color || categoryColors[index % categoryColors.length];

                                return `
                                    <div class="card fade-in"
                                         onclick="navigateTo('#/moocs/${cat.id}')"
                                         style="cursor:pointer; display:flex; flex-direction:column; min-height:170px; border-left: 4px solid ${accentColor};">
                                         
                                        <div class="card-header-row">
                                            <div class="card-icon" style="background:${accentColor};">
                                                <i class="fas ${cat.icon || 'fa-certificate'}"></i>
                                            </div>
                                            <h3 class="card-title">
                                                ${cat.name}
                                            </h3>
                                        </div>
                                        
                                        <div style="display:flex; flex-direction:column; flex:1;">
                                            <p class="card-description" style="flex:1;">
                                                ${cat.description}
                                            </p>
                                            
                                            <div class="card-link" style="color: ${accentColor};">
                                                View Directory
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
                        <h2 style="margin-bottom:1.5rem;">Category Not Found</h2>
                        <a href="#/moocs" class="btn btn-primary">Return to Directory</a>
                    </section>
                </div>
            `;
        }

        const vendorAccent = currentVendor.color || categoryColors[categoryIndex % categoryColors.length];
        const vendorCertificates = moocs.moocCertifications.filter(cert => cert.vendor === vendorParam);

        return `
            <div class="moocs-page">
                <section class="fade-in">
                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem;">
                        <a href="#/moocs" class="btn btn-outline">
                            <i class="fas fa-arrow-left"></i>
                            Back
                        </a>
                        
                        <h1 class="section-title" style="margin:0;">
                            ${currentVendor.name}
                        </h1>
                    </div>

                    <p class="lead" style="margin-bottom:1.75rem;">
                        ${currentVendor.description}
                    </p>

                    <div class="cards-grid">
                        ${vendorCertificates.map(cert => `
                            <div class="card" style="display:flex; flex-direction:column; min-height:210px; border-top: 3px solid ${vendorAccent};">
                                
                                <h3 class="card-title" style="font-size:1.05rem; line-height:1.4; margin-bottom:12px;">
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
                                        <a href="assets/${cert.certificatePath}" target="_blank" class="btn btn-primary" style="background:${vendorAccent}; border-color:${vendorAccent}; flex:1;">
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
