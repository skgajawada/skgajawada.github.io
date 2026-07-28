// MOOCS PAGE - DISTINCT BRAND COLOR SCHEMES & LOGOS

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // 1. Official Brand Identity & Color Schemes for Each Platform
        const brandProfiles = {
            "matlab": {
                name: "MATLAB",
                primary: "#CC292B",        // MathWorks Red
                bg: "#FEF2F2",
                text: "#991B1B",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"
            },
            "linkedin": {
                name: "LinkedIn Learning",
                primary: "#0A66C2",        // LinkedIn Blue
                bg: "#E0F2FE",
                text: "#0369A1",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
            },
            "coursera": {
                name: "Coursera",
                primary: "#0056D2",        // Coursera Blue
                bg: "#EEF2FF",
                text: "#1E40AF",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coursera.svg"
            },
            "dataiku": {
                name: "Dataiku Academy",
                primary: "#2AB1AC",        // Dataiku Teal
                bg: "#E6F8F7",
                text: "#0D6865",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dataiku.svg"
            },
            "ibm": {
                name: "IBM SkillsBuild",
                primary: "#1261FE",        // IBM Blue
                bg: "#EFF6FF",
                text: "#1D4ED8",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ibm.svg"
            },
            "cognitive": {
                name: "Cognitive Class",
                primary: "#8B5CF6",        // Cognitive Class Purple
                bg: "#F5F3FF",
                text: "#6D28D9",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ibm.svg" // Powered by IBM AI
            }
        };

        const fallbackBrand = {
            primary: "#2563EB",
            bg: "#EFF6FF",
            text: "#1D4ED8",
            logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/degree.svg"
        };

        // ===========================
        // DIRECTORY OVERVIEW
        // ===========================
        if (!vendorParam) {
            return `
                <div class="moocs-page">
                    <section class="fade-in">
                        <header class="page-header">
                            <span class="academic-kicker">Academic Qualifications</span>
                            <h1 class="section-title">MOOC Certifications</h1>
                            <p class="lead">
                                Verified certifications and specialized coursework completed across leading global education platforms.
                            </p>
                        </header>
                        
                        <div class="cards-grid">
                            ${moocs.categories.map((cat) => {
                                const brand = brandProfiles[cat.id] || fallbackBrand;

                                return `
                                    <div class="card fade-in"
                                         onclick="navigateTo('#/moocs/${cat.id}')"
                                         style="--accent-color: ${brand.primary}; --badge-bg: ${brand.bg}; --badge-text: ${brand.text};">
                                         
                                        <div class="card-header-row">
                                            <!-- Official Clean Platform Logo Box -->
                                            <div class="card-logo-wrapper">
                                                <img src="${brand.logo}" alt="${cat.name} logo" class="brand-logo" onerror="this.src='https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/academicons.svg'">
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
        // CATEGORY DETAIL VIEW
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

        const brand = brandProfiles[currentVendor.id] || fallbackBrand;
        const vendorCertificates = moocs.moocCertifications.filter(cert => cert.vendor === vendorParam);

        return `
            <div class="moocs-page">
                <section class="fade-in">
                    <div style="margin-bottom:2rem;">
                        <a href="#/moocs" class="btn btn-outline" style="margin-bottom:1.5rem;">
                            <i class="fas fa-arrow-left"></i>
                            Back to Categories
                        </a>
                        <span class="academic-kicker">Certification Registry</span>
                        <h1 class="section-title">${currentVendor.name}</h1>
                        <p class="lead">${currentVendor.description}</p>
                    </div>

                    <div class="cards-grid">
                        ${vendorCertificates.map(cert => `
                            <div class="card" style="--accent-color: ${brand.primary}; --badge-bg: ${brand.bg}; --badge-text: ${brand.text};">
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
