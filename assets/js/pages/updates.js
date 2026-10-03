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
        // ACTIVE / LATEST UPDATES
        //
        // RULE:
        //
        // If current month has 5 or more:
        //     Show ALL current-month updates.
        //
        // If current month has fewer than 5:
        //     Show all current-month updates
        //     plus the newest previous updates until
        //     there are 5 active updates.
        // =====================================================

        let activeUpdates = [];


        if (currentMonthUpdates.length >= 5) {

            // Current month already has 5 or more.
            // Show ALL current-month updates.

            activeUpdates = [
                ...currentMonthUpdates
            ];

        } else {

            // Current month has fewer than 5.
            // Fill the remaining positions with
            // the newest updates from previous months.

            const requiredPreviousUpdates =
                5 - currentMonthUpdates.length;


            const previousUpdates =
                sortedUpdates
                    .filter(update => {

                        const date = new Date(
                            update.date + "T00:00:00"
                        );

                        return !(
                            date.getFullYear() === currentYear &&
                            date.getMonth() === currentMonth
                        );

                    })
                    .slice(
                        0,
                        requiredPreviousUpdates
                    );


            activeUpdates = [
                ...currentMonthUpdates,
                ...previousUpdates
            ];


            // Make sure the final active list is always
            // newest to oldest.

            activeUpdates.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );

        }


        // =====================================================
        // ARCHIVED UPDATES
        //
        // Everything NOT included in activeUpdates
        // goes into Archive.
        // =====================================================

        const activeUpdateSet =
            new Set(activeUpdates);


        const archivedUpdates =
            sortedUpdates.filter(
                update =>
                    !activeUpdateSet.has(update)
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
            sectionType
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


            const isArchive =
                sectionType === "archive";


            return `
                <section
                    class="
                        updates-month-group
                        ${
                            isArchive
                            ? "updates-archive-group"
                            : "updates-latest-group"
                        }
                    "
                    data-month="${monthYear}"
                    data-section="${sectionType}"
                >

                    <div class="archive-month-header">

                        <div>

                            <span
                                class="updates-section-label"
                            >

                                <i
                                    class="${
                                        isArchive
                                        ? "fas fa-calendar"
                                        : "fas fa-clock"
                                    }"
                                ></i>

                                ${
                                    isArchive
                                    ? "Archive"
                                    : "Latest"
                                }

                            </span>


                            <h2>
                                ${monthYear}
                            </h2>

                        </div>


                        <span
                            class="updates-count"
                        >

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
        // =====================================================

        const latestHTML =
            Object.entries(latestGroups)
                .map(
                    (
                        [monthYear, monthUpdates]
                    ) =>
                        createMonthSection(
                            monthYear,
                            monthUpdates,
                            "latest"
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
                        [monthYear, monthUpdates]
                    ) =>
                        createMonthSection(
                            monthYear,
                            monthUpdates,
                            "archive"
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

                    ${categories
                        .map(
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
                        )
                        .join("")}

                </div>


                <!-- =================================================
                     LATEST / ACTIVE UPDATES
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

                            <span
                                class="updates-section-label"
                            >

                                <i
                                    class="fas fa-clock"
                                ></i>

                                Latest Updates

                            </span>


                            <h2>
                                Most Recent
                            </h2>

                        </div>


                        <span
                            class="updates-count"
                        >

                            ${activeUpdates.length}

                            ${
                                activeUpdates.length === 1
                                ? "update"
                                : "updates"
                            }

                        </span>

                    </div>


                    <div
                        class="updates-latest-list"
                    >

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
                                        class="
                                            updates-section-label
                                        "
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


                                <span
                                    class="updates-count"
                                >

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
