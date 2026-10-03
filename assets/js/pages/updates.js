// LATEST UPDATES PAGE
class UpdatesPage extends Component {

    async render() {

        const updates = await DataManager.getLatestUpdates();


        // =====================================================
        // SORT - NEWEST TO OLDEST
        // =====================================================

        const sortedUpdates = [...updates].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );


        // =====================================================
        // ICONS
        // =====================================================

        const iconMap = {
            linkedin: "fab fa-linkedin",
            youtube: "fab fa-youtube",
            achievement: "fas fa-trophy",
            certification: "fas fa-certificate",
            learning: "fas fa-graduation-cap",
            research: "fas fa-flask",
            project: "fas fa-project-diagram",
            event: "fas fa-calendar-check",
            professional: "fas fa-briefcase",
            experience: "fas fa-briefcase",
            engagement: "fas fa-users",
            teaching: "fas fa-chalkboard-teacher",
            education: "fas fa-graduation-cap",
            github: "fab fa-github"
        };


        // =====================================================
        // CURRENT MONTH
        // =====================================================

        const now = new Date();

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();


        // =====================================================
        // CURRENT MONTH UPDATES
        //
        // If current month has 5 or more:
        //     show ALL current-month updates.
        //
        // If current month has fewer than 5:
        //     show current-month updates +
        //     latest previous updates until 5.
        // =====================================================

        const currentMonthUpdates =
            sortedUpdates.filter(update => {

                const date = new Date(
                    update.date + "T00:00:00"
                );

                return (
                    date.getFullYear() === currentYear &&
                    date.getMonth() === currentMonth
                );

            });


        let activeUpdates = [];


        if (currentMonthUpdates.length >= 5) {

            activeUpdates = [
                ...currentMonthUpdates
            ];

        } else {

            const requiredPrevious =
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
                    .slice(0, requiredPrevious);


            activeUpdates = [
                ...currentMonthUpdates,
                ...previousUpdates
            ];


            activeUpdates.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );

        }


        // =====================================================
        // ARCHIVE
        // =====================================================

        const activeSet =
            new Set(activeUpdates);


        const archivedUpdates =
            sortedUpdates.filter(
                update => !activeSet.has(update)
            );


        // =====================================================
        // CATEGORIES
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
        // DATE HELPERS
        // =====================================================

        const getDate = dateString =>
            new Date(
                dateString + "T00:00:00"
            );


        const getMonthYear = dateString =>
            getDate(dateString).toLocaleDateString(
                "en-GB",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        const getFormattedDate = dateString =>
            getDate(dateString).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        // =====================================================
        // GROUP BY MONTH + YEAR
        // =====================================================

        const groupByMonthYear = list => {

            const groups = {};

            list.forEach(update => {

                const key =
                    getMonthYear(update.date);


                if (!groups[key]) {
                    groups[key] = [];
                }


                groups[key].push(update);

            });


            return groups;
        };


        const latestGroups =
            groupByMonthYear(activeUpdates);


        const archiveGroups =
            groupByMonthYear(archivedUpdates);


        // =====================================================
        // INTERNAL / EXTERNAL ACTION
        //
        // internalRoute:
        //     Portfolio pages
        //     Projects
        //     Experience
        //     Engagements
        //     Online Learning
        //     Teaching
        //     etc.
        //
        // link:
        //     LinkedIn
        //     YouTube
        //     GitHub
        //     Credly
        //     External websites
        // =====================================================

        const createAction = update => {

            const destination =
                update.internalRoute ||
                update.link;


            if (!destination) {
                return "";
            }


            const isInternal =
                Boolean(update.internalRoute);


            return `
                <a
                    href="${destination}"
                    class="update-action btn btn-primary"
                    ${
                        !isInternal &&
                        update.external !== false
                            ? 'target="_blank" rel="noopener noreferrer"'
                            : ''
                    }
                >
                    More Details
                    <i class="fas fa-arrow-right"></i>
                </a>
            `;
        };


        // =====================================================
        // UPDATE CARD
        // =====================================================

        const createUpdateCard = (
            update,
            index
        ) => {

            return `
                <article
                    class="full-update-card reveal"
                    data-category="${update.category}"
                    data-date="${update.date}"
                    data-month="${getDate(update.date).getMonth()}"
                    data-year="${getDate(update.date).getFullYear()}"
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


                        ${createAction(update)}

                    </div>

                </article>
            `;
        };


        // =====================================================
        // MONTH SECTION
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


            return `
                <section
                    class="updates-month-group"
                    data-section="${sectionType}"
                    data-month="${monthYear}"
                >

                    <div class="month-heading">

                        <h2>
                            ${monthYear}
                        </h2>

                    </div>


                    <div class="full-updates-list">

                        ${cards}

                    </div>

                </section>
            `;
        };


        // =====================================================
        // LATEST HTML
        // =====================================================

        const latestHTML =
            Object.entries(latestGroups)
                .map(
                    ([monthYear, monthUpdates]) =>
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
                    ([monthYear, monthUpdates]) =>
                        createMonthSection(
                            monthYear,
                            monthUpdates,
                            "archive"
                        )
                )
                .join("");


        // =====================================================
        // PAGE
        // =====================================================

        return `

            <section class="updates-page">


                <!-- =================================================
                     HEADER
                ================================================== -->

                <div class="updates-page-header">

                    <h1 class="page-title">
                        Latest Updates
                    </h1>

                    <p class="page-intro">
                        Achievements, learning activities,
                        professional updates, research,
                        projects, events and selected LinkedIn posts.
                    </p>

                </div>


                <!-- =================================================
                     FILTER BAR
                ================================================== -->

                <div class="updates-toolbar">


                    <!-- CATEGORY -->

                    <div class="update-filter-group">

                        <label for="updateCategoryFilter">
                            Category
                        </label>

                        <select
                            id="updateCategoryFilter"
                            class="update-select"
                        >

                            ${categories.map(
                                category => `
                                    <option
                                        value="${category}"
                                    >
                                        ${category}
                                    </option>
                                `
                            ).join("")}

                        </select>

                    </div>


                    <!-- MONTH -->

                    <div class="update-filter-group">

                        <label for="updateMonthFilter">
                            Month
                        </label>

                        <select
                            id="updateMonthFilter"
                            class="update-select"
                        >

                            <option value="all">
                                All Months
                            </option>

                        </select>

                    </div>


                    <!-- YEAR -->

                    <div class="update-filter-group">

                        <label for="updateYearFilter">
                            Year
                        </label>

                        <select
                            id="updateYearFilter"
                            class="update-select"
                        >

                            <option value="all">
                                All Years
                            </option>

                        </select>

                    </div>


                    <!-- RESET -->

                    <button
                        type="button"
                        id="resetUpdateFilters"
                        class="update-reset"
                    >

                        <i class="fas fa-rotate-left"></i>

                        Reset

                    </button>


                </div>


                <!-- =================================================
                     LATEST
                ================================================== -->

                <section
                    class="updates-latest-section"
                    data-section="latest"
                >

                    ${latestHTML}

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

                            <div class="archive-title">

                                <h2>
                                    Archive
                                </h2>

                            </div>


                            <div class="updates-archive-list">

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

        const categoryFilter =
            document.getElementById(
                "updateCategoryFilter"
            );


        const monthFilter =
            document.getElementById(
                "updateMonthFilter"
            );


        const yearFilter =
            document.getElementById(
                "updateYearFilter"
            );


        const resetButton =
            document.getElementById(
                "resetUpdateFilters"
            );


        const cards =
            document.querySelectorAll(
                ".full-update-card"
            );


        const groups =
            document.querySelectorAll(
                ".updates-month-group"
            );


        // =====================================================
        // BUILD MONTH / YEAR OPTIONS
        // =====================================================

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];


        const months = new Set();
        const years = new Set();


        cards.forEach(card => {

            const date =
                new Date(
                    card.dataset.date +
                    "T00:00:00"
                );


            months.add(
                date.getMonth()
            );


            years.add(
                date.getFullYear()
            );

        });


        [...months]
            .sort((a, b) => a - b)
            .forEach(month => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value = month;

                option.textContent =
                    monthNames[month];

                monthFilter.appendChild(
                    option
                );

            });


        [...years]
            .sort((a, b) => b - a)
            .forEach(year => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value = year;

                option.textContent = year;

                yearFilter.appendChild(
                    option
                );

            });


        // =====================================================
        // FILTER FUNCTION
        // =====================================================

        const applyFilters = () => {

            const selectedCategory =
                categoryFilter.value;


            const selectedMonth =
                monthFilter.value;


            const selectedYear =
                yearFilter.value;


            cards.forEach(card => {

                const date =
                    new Date(
                        card.dataset.date +
                        "T00:00:00"
                    );


                const categoryMatch =
                    selectedCategory === "All" ||
                    card.dataset.category ===
                        selectedCategory;


                const monthMatch =
                    selectedMonth === "all" ||
                    date.getMonth().toString() ===
                        selectedMonth;


                const yearMatch =
                    selectedYear === "all" ||
                    date.getFullYear().toString() ===
                        selectedYear;


                card.style.display =
                    categoryMatch &&
                    monthMatch &&
                    yearMatch
                    ? ""
                    : "none";

            });


            // Hide empty month sections

            groups.forEach(group => {

                const visibleCards =
                    group.querySelectorAll(
                        ".full-update-card"
                    );


                const hasVisible =
                    Array.from(
                        visibleCards
                    ).some(
                        card =>
                            card.style.display !==
                            "none"
                    );


                group.style.display =
                    hasVisible
                    ? ""
                    : "none";

            });

        };


        // =====================================================
        // EVENTS
        // =====================================================

        categoryFilter.addEventListener(
            "change",
            applyFilters
        );


        monthFilter.addEventListener(
            "change",
            applyFilters
        );


        yearFilter.addEventListener(
            "change",
            applyFilters
        );


        resetButton.addEventListener(
            "click",
            () => {

                categoryFilter.value =
                    "All";

                monthFilter.value =
                    "all";

                yearFilter.value =
                    "all";

                applyFilters();

            }
        );

    }

}
