// SOCIAL RESPONSIBILITY PAGE
class SocialResponsibilityPage extends Component {

    async render(params) {

        const data = await DataManager.getSocialResponsibility();
        const categoryParam = params && params[0];

        // ===========================
        // CATEGORY LIST
        // ===========================
        if (!categoryParam) {

            return `
                <section class="fade-in">

                    <h1 class="section-title">
                        Social Responsibility
                    </h1>

                    <div class="cards-grid stagger-container">

                        ${data.categories.map(cat => `

                            <div class="card fade-in"
                                 onclick="navigateTo('#/social-responsibility/${cat.id}')"
                                 style="cursor:pointer;">

                                <div class="card-icon"
                                     style="background:${cat.color};
                                            font-size:2rem;">

                                    ${cat.icon}

                                </div>

                                <div class="card-content">

                                    <h3 class="card-title">
                                        ${cat.name}
                                    </h3>

                                    <a href="#/social-responsibility/${cat.id}"
                                       class="card-link">
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

        const currentCategory =
            data.categories.find(c => c.id === categoryParam);

        if (!currentCategory) {

            return `
                <section class="fade-in">

                    <h2>Category Not Found</h2>

                    <a href="#/social-responsibility"
                       class="btn btn-primary">

                        Back

                    </a>

                </section>
            `;
        }

        const items =
            data.socialResponsibilities.filter(
                item => item.category === categoryParam
            );

        return `

            <section class="fade-in">

                <div style="
                    display:flex;
                    align-items:center;
                    gap:1rem;
                    margin-bottom:2rem;">

                    <a href="#/social-responsibility"
                       class="btn btn-outline">

                        <i class="fas fa-arrow-left"></i>
                        Back

                    </a>

                    <h1 class="section-title"
                        style="margin:0;">

                        ${currentCategory.name}

                    </h1>

                </div>

                <div class="cards-grid">

                    ${items.map(item => `

                        <div class="card reveal"
                             style="padding:20px;">

                            <h3 class="card-title">
                                ${item.name}
                            </h3>

                            <p>
                                <strong>Organization:</strong>
                                ${item.organization}
                            </p>

                            <p>
                                <strong>Venue:</strong>
                                ${item.venue}
                            </p>

                            <p>
                                <strong>Duration:</strong>
                                ${item.duration}
                            </p>

                            <p>
                                <strong>Date:</strong>
                                ${item.startDate}
                                ${item.endDate ? " to " + item.endDate : ""}
                            </p>

                            <div style="
                                display:flex;
                                gap:10px;
                                margin-top:20px;">

                                <a href="assets/certificates/social-responsibility/${item.category}/${item.certificateFile}"
                                   target="_blank"
                                   class="btn btn-primary"
                                   style="flex:1;text-align:center;">

                                    <i class="fas fa-file-pdf"></i>
                                    Certificate

                                </a>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </section>

        `;
    }

}
