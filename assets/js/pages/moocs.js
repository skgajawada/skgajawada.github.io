// MOOCS PAGE
// Inside js/pages/moocs.js

// 1. Overview View
return `
    <div class="moocs-page">
        <section class="fade-in">
            <!-- your content here -->
        </section>
    </div>
`;

// 2. Selected Category View
return `
    <div class="moocs-page">
        <section class="fade-in">
            <!-- your content here -->
        </section>
    </div>
`;
class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // ===========================
        // CATEGORY PAGE
        // ===========================

        if (!vendorParam) {
            return `
                <section class="fade-in">
                    <h1 class="section-title">MOOC Certifications</h1>
                    
                    <div class="cards-grid stagger-container">
                        ${moocs.categories.map(cat => `
                            <div class="card fade-in"
                                 onclick="navigateTo('#/moocs/${cat.id}')"
                                 style="cursor:pointer; transition:all 0.3s ease; min-height:260px; display:flex; flex-direction:column;">
                                 
                                <div class="card-icon"
                                     style="background:${cat.color}; width:70px; height:70px; font-size:1.8rem; margin-bottom:1.2rem;">
                                    <i class="fas ${cat.icon}"></i>
                                </div>
                                
                                <div class="card-content" style="display:flex; flex-direction:column; flex:1;">
                                    <h3 class="card-title" style="font-size:1.35rem; margin-bottom:12px;">
                                        ${cat.name}
                                    </h3>
                                    
                                    <p class="card-description" style="flex:1; line-height:1.6; color:var(--text-light);">
                                        ${cat.description}
                                    </p>
                                    
                                    <a href="#/moocs/${cat.id}" class="card-link">
                                        View All
                                        <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </section>
            `;
        }

        // ===========================
        // SELECTED CATEGORY
        // ===========================

        const currentVendor = moocs.categories.find(c => c.id === vendorParam);

        if (!currentVendor) {
            return `
                <section class="fade-in">
                    <h2 style="margin-bottom:1.5rem;">Category Not Found</h2>
                    <a href="#/moocs" class="btn btn-primary">Back</a>
                </section>
            `;
        }

        const vendorCertificates = moocs.moocCertifications.filter(cert => cert.vendor === vendorParam);

        return `
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

                <p class="lead" style="color:var(--text-light); margin-bottom:2.5rem;">
                    ${currentVendor.description}
                </p>

                <div class="cards-grid">
                    ${vendorCertificates.map(cert => `
                        <div class="card" style="display:flex; flex-direction:column; min-height:280px; padding:24px;">
                            <h3 class="card-title" style="font-size:1.15rem; line-height:1.4; min-height:60px; margin-bottom:15px;">
                                ${cert.name}
                            </h3>
                            
                            <p style="margin-bottom:8px; font-size:0.95rem;">
                                <strong style="color:var(--dark);">Provider:</strong> <span style="color:var(--text-light);">${cert.issuer}</span>
                            </p>
                            
                            <p style="margin-bottom:20px; font-size:0.95rem;">
                                <strong style="color:var(--dark);">Platform:</strong> <span style="color:var(--text-light);">${cert.vendor.toUpperCase()}</span>
                            </p>
                            
                            <div style="margin-top:auto;">
                                <div style="display:flex; gap:12px; flex-wrap:wrap;">
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
        `;
    }
}
