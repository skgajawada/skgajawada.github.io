// MOOCS PAGE - ACADEMIC SCOPED FORMAT

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
                        <p class="lead" style="margin-bottom: 2rem;">
                            Verified academic and industry certifications across specialized computing and analytical domains.
                        </p>
                        
                        <div class="cards-grid stagger-container">
                            ${moocs.categories.map(cat => `
                                <div class="card fade-in"
                                     onclick="navigateTo('#/moocs/${cat.id}')"
                                     style="cursor:pointer; transition:all 0.25s ease; min-height:260px; display:flex; flex-direction:column; border-left: 5px solid ${cat.color};">
                                     
                                    <div class="card-icon"
                                         style="background:${cat.color}; width:62px; height:62px; font-size:1.75rem; margin-bottom:1.25rem;">
                                        <i class="fas ${cat.icon}"></i>
                                    </div>
                                    
                                    <div class="card-content" style="display:flex; flex-direction:column; flex:1;">
                                        <h3 class="card-title" style="font-size:1.35rem; margin-bottom:12px;">
                                            ${cat.name}
                                        </h3>
                                        
                                        <p class="card-description" style="flex:1; line-height:1.6; font-size:0.95rem;">
                                            ${cat.description}
                                        </p>
                                        
                                        <a href="#/moocs/${cat.id}" class="card-link" style="margin-top:1.25rem;">
                                            View Directory
                                            <i class="fas fa-arrow-right"></i>
                                        </a>
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
                    <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem;">
                        <a href="#/moocs" class="btn btn-outline">
                            <i class="fas fa-arrow-left"></i>
                            Back
                        </a>
                        
                        <h1 class="section-title" style="margin:0;">
                            ${currentVendor.name}
                        </h1>
                    </div>

                    <p class="lead" style="margin-bottom:2.5rem;">
                        ${currentVendor.description}
                    </p>

                    <div class="cards-grid">
                        ${vendorCertificates.map(cert => `
                            <div class="card" style="display:flex; flex-direction:column; min-height:280px; padding:24px; border-top: 4px solid ${currentVendor.color};">
                                
                                <h3 class="card-title" style="font-size:1.15rem; line-height:1.45; min-height:56px; margin-bottom:16px;">
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
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        <a href="assets/${cert.certificatePath}" target="_blank" class="btn btn-primary" style="flex:1; text-align:center;">
                                            <i class="fas fa-file-pdf"></i>
                                            Certificate
                                        </a>
                                        
                                        ${cert.verifyUrl ? `
                                            <a href="${cert.verifyUrl}" target="_blank" class="btn btn-outline" style="flex:1; text-align:center;">
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
