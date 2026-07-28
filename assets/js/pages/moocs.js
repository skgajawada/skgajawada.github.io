// MOOCS PAGE - DISTINCT LIGHT PASTEL PALETTE

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // Light & Soft Accent Palette Map
        const lightColorMap = {
            "matlab":     { bg: "#FFEDD5", border: "#F97316", text: "#C2410C" }, // Warm Peach / Orange
            "linkedin":   { bg: "#E0F2FE", border: "#0284C7", text: "#0369A1" }, // Soft Sky Blue
            "coursera":   { bg: "#E0E7FF", border: "#4F46E5", text: "#3730A3" }, // Gentle Indigo
            "dataiku":    { bg: "#D1FAE5", border: "#10B981", text: "#047857" }, // Mint Green
            "ibm":        { bg: "#E0F2FE", border: "#38BDF8", text: "#0284C7" }, // Ice Cyan
            "cognitive":  { bg: "#F3E8FF", border: "#A855F7", text: "#6B21A8" }, // Soft Lavender / Purple
            "default":    { bg: "#FEF3C7", border: "#F59E0B", text: "#B45309" }  // Soft Amber
        };

        // Fallback array of light theme objects for any unmapped categories
        const lightColorList = [
            { bg: "#FFEDD5", border: "#F97316", text: "#C2410C" }, // Peach
            { bg: "#E0F2FE", border: "#0284C7", text: "#0369A1" }, // Soft Sky
            { bg: "#E0E7FF", border: "#4F46E5", text: "#3730A3" }, // Soft Indigo
            { bg: "#D1FAE5", border: "#10B981", text: "#047857" }, // Mint
            { bg: "#F3E8FF", border: "#A855F7", text: "#6B21A8" }, // Soft Lavender
            { bg: "#FEF3C7", border: "#F59E0B", text: "#B45309" }, // Warm Sand
            { bg: "#FFE4E6", border: "#FB7185", text: "#BE123C" }  // Soft Rose
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
                                // Assign distinct light color scheme per vendor
                                const colorTheme = lightColorMap[cat.id] || lightColorList[index % lightColorList.length];

                                return `
                                    <div class="card fade-in"
                                         onclick="navigateTo('#/moocs/${cat.id}')"
                                         style="cursor:pointer; display:flex; flex-direction:column; min-height:165px; border-left: 5px solid ${colorTheme.border};">
                                         
                                        <div class="card-header-row">
                                            <div class="card-icon" style="background:${colorTheme.bg}; color:${colorTheme.text};">
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
                                            
                                            <div class="card-link" style="color: ${colorTheme.text};">
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
                        <a href="#/moocs" class="btn btn-outline">Return to Directory</a>
                    </section>
                </div>
            `;
        }

        const vendorTheme = lightColorMap[currentVendor.id] || lightColorList[categoryIndex % lightColorList.length];
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
                            <div class="card" style="display:flex; flex-direction:column; min-height:205px; border-top: 4px solid ${vendorTheme.border};">
                                
                                <h3 class="card-title" style="font-size:1.05rem; line-height:1.4; margin-bottom:12px;">
                                    ${cert.name}
                                </h3>
                                
                                <div class="meta-panel" style="background:${vendorTheme.bg}; border-color:${vendorTheme.border}33;">
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
                                        <a href="assets/${cert.certificatePath}" target="_blank" class="btn" style="background:${vendorTheme.bg}; color:${vendorTheme.text}; border:1px solid ${vendorTheme.border}; flex:1; text-align:center;">
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
