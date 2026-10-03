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
        // LATEST 5 UPDATES
        //
        // Only the 5 newest updates are shown in the
        // "Latest Updates" section.
        //
        // They are grouped according to their actual
        // month and year.
        // =====================================================

        const activeUpdates = sortedUpdates.slice(0, 5);


        // =====================================================
        // ARCHIVED UPDATES
        //
        // Everything after the latest 5 is archived.
        // =====================================================

        const archivedUpdates = sortedUpdates.slice(5);


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
        // GROUP UPDATES BY MONTH + YEAR
        // =====================================================

        const groupByMonthYear = (updateList) => {

            const groups = {};

            updateList.forEach(update => {

                const monthYear =
                    getMonthYear(update.date);


                if (!groups[monthYear]) {

                    groups[monthYear] = [];

                }


                groups[monthYear].push(update);

            });


            return groups;

        };


        // =====================================================
        // LATEST GROUPS
        // =====================================================

        const latestGroups =
            groupByMonthYear(activeUpdates);


        // =====================================================
        // ARCHIVE GROUPS
        // =====================================================

        const archiveGroups =
            groupByMonthYear(archivedUpdates);


        // =====================================================
        // UPDATE CARD GENERATOR
        // =====================================================

        const createUpdateCard = (
            update,
            index
        ) => {

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

                                    <i
                                        class="fas fa-arrow-right"
                                    ></i>

                                </a>
                            `
                            : ""
                        }

                    </div>

                </article>
            `;

        };


        // =====================================================
        // CREATE MONTH SECTION
        // =====================================================

        const createMonthSection = (
            monthYear,
            monthUpdates,
            sectionType,
            groupIndex
        ) => {

            const cards = monthUpdates
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
                    class="
                        updates-month-group
                        ${sectionType === "archive"
                            ? "updates-archive-group"
                            : "updates-latest-group"}
                    "
                    data-month="${monthYear}"
                    data-section="${sectionType}"
                >

                    <div class="archive-month-header">

                        <div>

                            <span class="updates-section-label">

                                <i
                                    class="${
                                        sectionType === "archive"
                                        ? "fas fa-calendar"
                                        : "fas fa-clock"
                                    }"
                                ></i>

                                ${
                                    sectionType === "archive"
                                    ? "Archive"
                                    : "Latest"
                                }

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

        };


        // =====================================================
        // LATEST UPDATES HTML
        //
        // Example:
        //
        // October 2026
        //   Update 1
        //   Update 2
        //
        // September 2026
        //   Update 3
        //   Update 4
        //   Update 5
        // =====================================================

        const latestHTML =
            Object.entries(latestGroups)
                .map(
                    (
                        [monthYear, monthUpdates],
                        groupIndex
                    ) =>
                        createMonthSection(
                            monthYear,
                            monthUpdates,
                            "latest",
                            groupIndex
                        )
                )
                .join("");


        // =====================================================
        // ARCHIVE HTML
        // =====================================================

        const archiveHTML =
            Object.entries(archiveGroups)
                .map(
                    (
                        [monthYear, monthUpdates],
                        groupIndex
                    ) =>
                        createMonthSection(
                            monthYear,
                            monthUpdates,
                            "archive",
                            groupIndex
                        )
                )
                .join("");


        // =====================================================
        // EMPTY STATE
        // =====================================================

        const latestEmptyHTML = `
            <div class="updates-empty">

                <i class="fas fa-bell"></i>

                <p>
                    No updates have been added yet.
                </p>

            </div>
        `;


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
                     LATEST 5
                ================================================== -->

                <section
                    class="updates-latest-section"
                    data-section="latest"
                >

                    <div
                        class="
                            updates-section-heading
                            latest-heading
                        "
                    >

                        <div>

                            <span class="updates-section-label">

                                <i class="fas fa-clock"></i>

                                Latest Updates

                            </span>


                            <h2>
                                Most Recent
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


                    <div class="updates-latest-list">

                        ${
                            activeUpdates.length
                            ? latestHTML
                            : latestEmptyHTML
                        }

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
                            data-section="archive"
                        >

                            <div
                                class="
                                    updates-section-heading
                                    archive-heading
                                "
                            >

                                <div>

                                    <span
                                        class="updates-section-label"
                                    >

                                        <i
                                            class="
                                                fas
                                                fa-box-archive
                                            "
                                        ></i>

                                        Archive

                                    </span>


                                    <h2>
                                        Previous Updates
                                    </h2>

                                </div>


                                <span class="updates-count">

                                    ${archivedUpdates.length}

                                    ${
                                        archivedUpdates.length === 1
                                        ? "update"
                                        : "updates"
                                    }

                                </span>

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
                    // HIDE EMPTY MONTH GROUPS
                    // =============================================

                    document
                        .querySelectorAll(
                            ".updates-month-group"
                        )
                        .forEach(group => {

                            const cards =
                                group.querySelectorAll(
                                    ".full-update-card"
                                );


                            const hasVisibleCards =
                                Array.from(
                                    cards
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
                    // HIDE EMPTY LATEST SECTION
                    // =============================================

                    const latestSection =
                        document.querySelector(
                            ".updates-latest-section"
                        );


                    if (latestSection) {

                        const latestCards =
                            latestSection.querySelectorAll(
                                ".full-update-card"
                            );


                        const hasVisibleLatestCards =
                            Array.from(
                                latestCards
                            ).some(
                                card =>
                                    card.style.display !==
                                    "none"
                            );


                        latestSection.style.display =
                            hasVisibleLatestCards
                            ? ""
                            : "none";

                    }


                    // =============================================
                    // HIDE EMPTY ARCHIVE SECTION
                    // =============================================

                    const archiveSection =
                        document.querySelector(
                            ".updates-archive-section"
                        );


                    if (archiveSection) {

                        const archiveCards =
                            archiveSection.querySelectorAll(
                                ".full-update-card"
                            );


                        const hasVisibleArchiveCards =
                            Array.from(
                                archiveCards
                            ).some(
                                card =>
                                    card.style.display !==
                                    "none"
                            );


                        archiveSection.style.display =
                            hasVisibleArchiveCards
                            ? ""
                            : "none";

                    }

                }
            );

        });

    }

}
