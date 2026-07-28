// MOOCS PAGE - COMPACT & COLORFUL FORMAT

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

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
                            ${moocs.categories.map(cat => `
                                <div class="card fade-in"
                                     data-vendor="${cat.id}"
                                     onclick="navigateTo('#/moocs/${cat.id}')"
                                     style="cursor:pointer; display:flex; flex-direction:column; min-height:175px;">
                                     
                                    <div class="card-header-row">
                                        <div class="card-icon" style="background:${cat.color};">
                                            <i class="fas ${cat.icon}"></i>
                                        </div>
                                        <h3 class="card-title">
                                            ${cat.name}
                                        </h3>
                                    </div>
                                    
                                    <div style="display:flex; flex-direction:column; flex:1;">
                                        <p class="card-description" style="flex:1;">
                                            ${cat.description}
                                        </p>
                                        
                                        <div class="card-link">
                                            View Directory
                                            <i class="fas fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </section>
                </div>
            `;
        }

        // ===========================
        // SELECTED CATEGORY VIEW
        // ===========================

        const currentVendor = moocs.categories.find(c => c.id === vendorParam);

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
                            <div class="card" style="display:flex; flex-direction:column; min-height:210px; border-top: 3px solid ${currentVendor.color};">
                                
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
