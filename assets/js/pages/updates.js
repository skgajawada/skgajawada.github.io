// LATEST UPDATES PAGE
class UpdatesPage extends Component {
    async render() {
        const updates = await DataManager.getLatestUpdates();

        const sortedUpdates = [...updates].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        const iconMap = {
            linkedin: "fab fa-linkedin",
            achievement: "fas fa-trophy",
            certification: "fas fa-certificate",
            learning: "fas fa-graduation-cap",
            research: "fas fa-flask",
            project: "fas fa-project-diagram",
            event: "fas fa-calendar-check",
            professional: "fas fa-briefcase"
        };

        const categories = [
            "All",
            ...new Set(sortedUpdates.map(update => update.category))
        ];

        const updateCards = sortedUpdates.map((update, index) => `
            <article class="full-update-card reveal"
                     data-category="${update.category}"
                     style="animation-delay:${index * 0.05}s;">
                <div class="full-update-icon">
                    <i class="${iconMap[update.type] || "fas fa-bell"}"></i>
                </div>

                <div class="full-update-body">
                    <div class="update-meta">
                        <span class="update-category">${update.category}</span>
                        <time datetime="${update.date}">
                            ${new Date(update.date + "T00:00:00").toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })}
                        </time>
                    </div>

                    <h2>${update.title}</h2>
                    <p>${update.description}</p>

                    ${update.link ? `
                        <a href="${update.link}"
                           class="btn btn-primary update-action"
                           ${update.external !== false ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                            ${update.linkText || "View Details"}
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    ` : ""}
                </div>
            </article>
        `).join("");

        return `
            <section class="updates-page">
                <div class="updates-page-header">
                    <span class="updates-eyebrow">
                        <i class="fas fa-bolt"></i> Recent Activity
                    </span>
                    <h1 class="page-title">Latest Updates</h1>
                    <p class="page-intro">
                        Recent achievements, learning activities, professional
                        updates, research activities, and selected LinkedIn posts.
                    </p>
                </div>

                <div class="update-filters">
                    ${categories.map((category, index) => `
                        <button class="update-filter ${index === 0 ? "active" : ""}"
                                data-filter="${category}">
                            ${category}
                        </button>
                    `).join("")}
                </div>

                <div class="full-updates-list">
                    ${updateCards || `
                        <div class="updates-empty">
                            <i class="fas fa-bell"></i>
                            <p>No updates have been added yet.</p>
                        </div>
                    `}
                </div>
            </section>
        `;
    }

    afterRender() {
        const filterButtons = document.querySelectorAll(".update-filter");
        const cards = document.querySelectorAll(".full-update-card");

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(item => item.classList.remove("active"));
                button.classList.add("active");

                const selected = button.dataset.filter;

                cards.forEach(card => {
                    const visible =
                        selected === "All" ||
                        card.dataset.category === selected;

                    card.style.display = visible ? "" : "none";
                });
            });
        });
    }
}
