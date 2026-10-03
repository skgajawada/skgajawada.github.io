// LATEST UPDATES PAGE
class UpdatesPage extends Component {

    async render() {

        const updates = await DataManager.getLatestUpdates();

        // =====================================================
        // SORT ALL UPDATES - LATEST TO OLDEST
        // =====================================================

        const sortedUpdates = [...updates].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );


        // =====================================================
        // ICON MAP
        // =====================================================

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


        // =====================================================
        // CURRENT DATE
        // =====================================================

        const now = new Date();

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();


        // =====================================================
        // CURRENT MONTH UPDATES
        // =====================================================

        const currentMonthUpdates = sortedUpdates.filter(update => {

            const date = new Date(
                update.date + "T00:00:00"
            );

            return (
                date.getFullYear() === currentYear &&
                date.getMonth() === currentMonth
            );

        });


        // =====================================================
        // ACTIVE / RECENT UPDATES
        //
        // Keep at least 5 latest updates.
        // If the current month contains more than 5,
        // keep all current-month updates visible.
        // =====================================================

        const activeCount = Math.max(
            5,
            currentMonthUpdates.length
        );


        const activeUpdates = sortedUpdates.slice(
            0,
            activeCount
        );


        // =====================================================
        // ARCHIVED UPDATES
        //
        // Everything after the active section is archived.
        // =====================================================

        const archivedUpdates = sortedUpdates.slice(
            activeCount
        );


        // =====================================================
        // CATEGORY FILTERS
        // =====================================================

        const categories = [
            "All",
            ...new Set(
                sortedUpdates.map(
                    update => update.category
                )
            )
        ];


        // =====================================================
        // MONTH + YEAR FORMATTER
        // =====================================================

        const getMonthYear = (dateString) => {

            return new Date(
                dateString + "T00:00:00"
            ).toLocaleDateString(
                "en-GB",
                {
                    month: "long",
                    year: "numeric"
                }
            );

        };


        // =====================================================
        // DATE FORMATTER
        // =====================================================

        const getFormattedDate = (dateString) => {

            return new Date(
                dateString + "T00:00:00"
            ).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        };


        // =====================================================
        // UPDATE CARD GENERATOR
        // =====================================================

        const createUpdateCard = (update, index) => {

            return `
                <article
                    class="full-update-card reveal"
                    data-category="${update.category}"
                    style="animation-delay:${index * 0.05}s;"
                >

                    <div class="full-update-icon">

                        <i class="${
                            iconMap[update.type] ||
                            "fas fa-bell"
                        }"></i>

                    </div>


                    <div class="full-update-body">

                        <div class="update-meta">

                            <span class="update-category">
                                ${update.category}
                            </span>

                            <time datetime="${update.date}">
                                ${getFormattedDate(update.date)}
                            </time>

                        </div>


                        <h2>
                            ${update.title}
                        </h2>


                        <p>
                            ${update.description}
                        </p>


                        ${
                            update.link
                            ? `
                                <a
                                    href="${update.link}"
                                    class="btn btn-primary update-action"

                                    ${
                                        update.external !== false
                                        ? 'target="_blank" rel="noopener noreferrer"'
                                        : ''
                                    }
                                >

                                    ${
                                        update.linkText ||
                                        "View Details"
                                    }

                                    <i class="fas fa-arrow-right"></i>

                                </a>
                            `
                            : ""
                        }

                    </div>

                </article>
            `;

        };


        // =====================================================
        // ACTIVE UPDATES HTML
        // =====================================================

        const activeUpdatesHTML = activeUpdates.length

            ? activeUpdates
                .map((update, index) =>
                    createUpdateCard(
                        update,
                        index
                    )
                )
                .join("")

            : `
                <div class="updates-empty">

                    <i class="fas fa-bell"></i>

                    <p>
                        No updates have been added yet.
                    </p>

                </div>
            `;


        // =====================================================
        // GROUP ARCHIVED UPDATES
        // BY MONTH + YEAR
        // =====================================================

        const archiveGroups = {};


        archivedUpdates.forEach(update => {

            const monthYear =
                getMonthYear(update.date);


            if (!archiveGroups[monthYear]) {

                archiveGroups[monthYear] = [];

            }


            archiveGroups[monthYear].push(update);

        });


        // =====================================================
        // ARCHIVE HTML
        // =====================================================

        const archiveHTML =
            Object.entries(archiveGroups)
                .map(
                    (
                        [monthYear, monthUpdates],
                        groupIndex
                    ) => {

                        const cards =
                            monthUpdates
                                .map(
                                    (update, index) =>
                                        createUpdateCard(
                                            update,
                                            index
                                        )
                                )
                                .join("");


                        return `
                            <section
                                class="updates-archive-group"
                                data-month="${monthYear}"
                            >

                                <div class="archive-month-header">

                                    <div>

                                        <span class="updates-section-label">

                                            <i class="fas fa-calendar"></i>

                                            Archive

                                        </span>


                                        <h2>
                                            ${monthYear}
                                        </h2>

                                    </div>


                                    <span class="updates-count">

                                        ${monthUpdates.length}

                                        ${
                                            monthUpdates.length === 1
                                            ? "update"
                                            : "updates"
                                        }

                                    </span>

                                </div>


                                <div class="full-updates-list">

                                    ${cards}

                                </div>

                            </section>
                        `;

                    }
                )
                .join("");


        // =====================================================
        // CURRENT PERIOD LABEL
        // =====================================================

        const currentMonthTitle =
            now.toLocaleDateString(
                "en-GB",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        // =====================================================
        // PAGE
        // =====================================================

        return `

            <section class="updates-page">


                <!-- =================================================
                     PAGE HEADER
                ================================================== -->

                <div class="updates-page-header">

                    <span class="updates-eyebrow">

                        <i class="fas fa-bolt"></i>

                        Recent Activity

                    </span>


                    <h1 class="page-title">
                        Latest Updates
                    </h1>


                    <p class="page-intro">

                        Recent achievements, learning activities,
                        professional updates, research activities,
                        projects, events, and selected LinkedIn posts.

                    </p>

                </div>


                <!-- =================================================
                     CATEGORY FILTERS
                ================================================== -->

                <div class="update-filters">

                    ${categories.map(
                        (category, index) => `

                            <button
                                class="update-filter ${
                                    index === 0
                                    ? "active"
                                    : ""
                                }"
                                data-filter="${category}"
                            >

                                ${category}

                            </button>

                        `
                    ).join("")}

                </div>


                <!-- =================================================
                     ACTIVE / RECENT UPDATES
                ================================================== -->

                <section
                    class="updates-current-section"
                    data-section="active"
                >

                    <div class="updates-section-heading">

                        <div>

                            <span class="updates-section-label">

                                <i class="fas fa-clock"></i>

                                Latest

                            </span>


                            <h2>
                                ${currentMonthTitle}
                            </h2>

                        </div>


                        <span class="updates-count">

                            ${activeUpdates.length}

                            ${
                                activeUpdates.length === 1
                                ? "update"
                                : "updates"
                            }

                        </span>

                    </div>


                    <div class="full-updates-list">

                        ${activeUpdatesHTML}

                    </div>

                </section>


                <!-- =================================================
                     ARCHIVE
                ================================================== -->

                ${
                    archivedUpdates.length

                    ? `

                        <section
                            class="updates-archive-section"
                        >

                            <div
                                class="updates-section-heading
                                       archive-heading"
                            >

                                <div>

                                    <span
                                        class="updates-section-label"
                                    >

                                        <i
                                            class="fas fa-box-archive"
                                        ></i>

                                        Archive

                                    </span>


                                    <h2>
                                        Previous Updates
                                    </h2>

                                </div>

                            </div>


                            <div
                                class="updates-archive-list"
                            >

                                ${archiveHTML}

                            </div>

                        </section>

                    `

                    : ""
                }


            </section>

        `;
    }


    // =========================================================
    // AFTER RENDER
    // =========================================================

    afterRender() {

        const filterButtons =
            document.querySelectorAll(
                ".update-filter"
            );


        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    // =============================================
                    // ACTIVE FILTER BUTTON
                    // =============================================

                    filterButtons.forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                    button.classList.add(
                        "active"
                    );


                    const selected =
                        button.dataset.filter;


                    // =============================================
                    // FILTER ALL UPDATE CARDS
                    // =============================================

                    const cards =
                        document.querySelectorAll(
                            ".full-update-card"
                        );


                    cards.forEach(card => {

                        const visible =
                            selected === "All" ||
                            card.dataset.category ===
                                selected;


                        card.style.display =
                            visible
                            ? ""
                            : "none";

                    });


                    // =============================================
                    // HIDE EMPTY ARCHIVE MONTHS
                    // =============================================

                    document
                        .querySelectorAll(
                            ".updates-archive-group"
                        )
                        .forEach(group => {

                            const visibleCards =
                                group.querySelectorAll(
                                    ".full-update-card"
                                );


                            const hasVisibleCards =
                                Array.from(
                                    visibleCards
                                ).some(
                                    card =>
                                        card.style.display !==
                                        "none"
                                );


                            group.style.display =
                                hasVisibleCards
                                ? ""
                                : "none";

                        });


                    // =============================================
                    // HIDE ACTIVE SECTION IF EMPTY
                    // =============================================

                    const activeSection =
                        document.querySelector(
                            ".updates-current-section"
                        );


                    if (activeSection) {

                        const activeCards =
                            activeSection.querySelectorAll(
                                ".full-update-card"
                            );


                        const hasVisibleActiveCards =
                            Array.from(
                                activeCards
                            ).some(
                                card =>
                                    card.style.display !==
                                    "none"
                            );


                        activeSection.style.display =
                            hasVisibleActiveCards
                            ? ""
                            : "none";

                    }

                }
            );

        });

    }

}
