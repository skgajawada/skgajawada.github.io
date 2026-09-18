// MOOCS PAGE - DISTINCT PASTEL PALETTES & LOGOS

class MoocsPage extends Component {
    async render(params) {
        const moocs = await DataManager.getMOOCs();
        const vendorParam = params && params[0];

        // =========================================================
        // BRAND PROFILES
        // =========================================================

        const brandProfiles = {

            "matlab": {
                name: "MATLAB",
                primary: "#E06A3B",
                bg: "#FFF1EC",
                text: "#9A3412",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"
            },

            "linkedin": {
                name: "LinkedIn Learning",
                primary: "#0284C7",
                bg: "#E0F2FE",
                text: "#0369A1",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
            },

            "coursera": {
                name: "Coursera",
                primary: "#6366F1",
                bg: "#EEF2FF",
                text: "#4338CA",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coursera.svg"
            },

            "dataiku": {
                name: "Dataiku Academy",
                primary: "#0D9488",
                bg: "#CCFBF1",
                text: "#115E59",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dataiku.svg"
            },

            "ibm": {
                name: "IBM SkillsBuild",
                primary: "#2563EB",
                bg: "#EFF6FF",
                text: "#1E40AF",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ibm.svg"
            },

            "cognitiveai": {
                name: "Cognitive Class",
                primary: "#9333EA",
                bg: "#F3E8FF",
                text: "#6B21A8",
                logo: "/assets/images/logo/cognitive_classai.jpg"
            },

            // =====================================================
            // ELSEVIER RESEARCHER ACADEMY
            // =====================================================

            "elsevier": {
                name: "Elsevier Researcher Academy",
                primary: "#F15A29",
                bg: "#FFF3ED",
                text: "#B93815",

                // SVG logo - no local file required
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/elsevier.svg"
            },

            // =====================================================
            // ISRO - IIRS
            // =====================================================

            "isro-iirs": {
                name: "ISRO–IIRS",
                primary: "#F97316",
                bg: "#FFF7ED",
                text: "#C2410C",

                // ISRO logo from Wikimedia Commons
                logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Indian%20Space%20Research%20Organisation%20Logo.svg"
            },

            // =====================================================
            // KAGGLE
            // =====================================================

            "kaggle": {
                name: "Kaggle",
                primary: "#20BEFF",
                bg: "#EAF9FF",
                text: "#087EA4",
                logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/kaggle.svg"
            }
        };

        // =========================================================
        // FALLBACK BRAND
        // =========================================================

        const fallbackBrand = {
            primary: "#0284C7",
            bg: "#F0F9FF",
            text: "#0369A1",
            logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/academia.svg"
        };

        // =========================================================
        // DIRECTORY OVERVIEW
        // =========================================================

        if (!vendorParam) {

            return `
                <div class="moocs-page">

                    <section class="fade-in">

                        <header class="page-header">

                            <span class="academic-kicker">
                                Academic Qualifications
                            </span>

                            <h1 class="section-title">
                                MOOC Certifications
                            </h1>

                            <p class="lead">
                                Verified certifications and specialized
                                coursework completed across leading global
                                education, research and professional
                                learning platforms.
                            </p>

                        </header>

                        <div class="cards-grid">

                            ${moocs.categories.map((cat) => {

                                const brand =
                                    brandProfiles[cat.id] ||
                                    fallbackBrand;

                                return `
                                    <div
                                        class="card fade-in"
                                        onclick="
                                            navigateTo(
                                                '#/moocs/${cat.id}'
                                            )
                                        "
                                        style="
                                            --accent-color:${brand.primary};
                                            --badge-bg:${brand.bg};
                                            --badge-text:${brand.text};
                                        "
                                    >

                                        <div class="card-header-row">

                                            <div class="card-logo-wrapper">

                                                <img
                                                    src="${brand.logo}"
                                                    alt="${cat.name} logo"
                                                    class="brand-logo"
                                                    loading="lazy"
                                                    onerror="
                                                        this.style.display='none';
                                                        this.parentElement.innerHTML='<i class=\\'fas fa-certificate\\' style=\\'font-size:1.4rem;color:${brand.primary}\\'></i>';
                                                    "
                                                >

                                            </div>

                                            <div class="card-title-group">

                                                <h3 class="card-title">
                                                    ${cat.name}
                                                </h3>

                                                <span class="category-pill">
                                                    Verified Platform
                                                </span>

                                            </div>

                                        </div>

                                        <p class="card-description">
                                            ${cat.description}
                                        </p>

                                        <div class="card-link">

                                            <span>
                                                Explore Certifications
                                            </span>

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

        // =========================================================
        // CATEGORY DETAIL VIEW
        // =========================================================

        const categoryIndex =
            moocs.categories.findIndex(
                c => c.id === vendorParam
            );

        const currentVendor =
            moocs.categories[categoryIndex];

        // =========================================================
        // CATEGORY NOT FOUND
        // =========================================================

        if (!currentVendor) {

            return `
                <div class="moocs-page">

                    <section class="fade-in">

                        <h2 style="margin-bottom:1rem;">
                            Category Not Found
                        </h2>

                        <a
                            href="#/moocs"
                            class="btn btn-outline"
                        >
                            Return to Directory
                        </a>

                    </section>

                </div>
            `;
        }

        const brand =
            brandProfiles[currentVendor.id] ||
            fallbackBrand;

        // =========================================================
        // GET CERTIFICATES
        // =========================================================

        const vendorCertificates =
            moocs.moocCertifications.filter(
                cert => cert.vendor === vendorParam
            );

        return `
            <div class="moocs-page">

                <section class="fade-in">

                    <div style="margin-bottom:2rem;">

                        <a
                            href="#/moocs"
                            class="btn btn-outline"
                            style="margin-bottom:1.5rem;"
                        >

                            <i class="fas fa-arrow-left"></i>

                            Back to Categories

                        </a>

                        <span class="academic-kicker">
                            Certification Registry
                        </span>

                        <h1 class="section-title">
                            ${currentVendor.name}
                        </h1>

                        <p class="lead">
                            ${currentVendor.description}
                        </p>

                    </div>

                    <div class="cards-grid">

                        ${vendorCertificates.map(cert => `

                            <div
                                class="card"
                                style="
                                    --accent-color:${brand.primary};
                                    --badge-bg:${brand.bg};
                                    --badge-text:${brand.text};
                                "
                            >

                                <h3
                                    class="card-title"
                                    style="
                                        font-size:1.05rem;
                                        margin-bottom:12px;
                                    "
                                >
                                    ${cert.name}
                                </h3>

                                <div class="meta-panel">

                                    <div class="meta-row">

                                        <span class="meta-label">
                                            Issuer
                                        </span>

                                        <span class="meta-value">
                                            ${cert.issuer}
                                        </span>

                                    </div>

                                    <div class="meta-row">

                                        <span class="meta-label">
                                            Platform
                                        </span>

                                        <span class="meta-value">
                                            ${currentVendor.name}
                                        </span>

                                    </div>

                                    ${
                                        cert.date
                                        ? `
                                            <div class="meta-row">

                                                <span class="meta-label">
                                                    Date
                                                </span>

                                                <span class="meta-value">
                                                    ${cert.date}
                                                </span>

                                            </div>
                                        `
                                        : ""
                                    }

                                </div>

                                <div
                                    style="
                                        margin-top:auto;
                                        display:flex;
                                        gap:8px;
                                    "
                                >

                                    <a
                                        href="assets/${cert.certificatePath}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="btn btn-primary"
                                        style="flex:1;"
                                    >

                                        <i
                                            class="
                                                fas
                                                fa-certificate
                                            "
                                        ></i>

                                        Certificate

                                    </a>

                                    ${
                                        cert.verifyUrl
                                        ? `
                                            <a
                                                href="${cert.verifyUrl}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="btn btn-outline"
                                                style="flex:1;"
                                            >

                                                <i
                                                    class="
                                                        fas
                                                        fa-external-link-alt
                                                    "
                                                ></i>

                                                Verify

                                            </a>
                                        `
                                        : ""
                                    }

                                </div>

                            </div>

                        `).join("")}

                    </div>

                    ${
                        vendorCertificates.length === 0
                        ? `
                            <div
                                style="
                                    text-align:center;
                                    padding:3rem 1rem;
                                    color:#64748b;
                                "
                            >

                                <i
                                    class="fas fa-certificate"
                                    style="
                                        font-size:2rem;
                                        margin-bottom:1rem;
                                    "
                                ></i>

                                <p>
                                    No certificates have been added
                                    to this platform yet.
                                </p>

                            </div>
                        `
                        : ""
                    }

                </section>

            </div>
        `;
    }
}
