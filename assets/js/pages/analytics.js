// ============================================================
// ANALYTICS DASHBOARD
// ============================================================

class AnalyticsDashboard extends Component {

    // =========================================================
    // RENDER
    // =========================================================

    async render() {

        // -----------------------------------------------------
        // Load Professional Engagements / Certifications
        // -----------------------------------------------------

        this.certs =
            await DataManager.getEngagements();


        // -----------------------------------------------------
        // Load MOOCs separately
        // -----------------------------------------------------

        this.moocs =
            await DataManager.getMOOCs();


        // -----------------------------------------------------
        // PROFESSIONAL CERTIFICATES
        //
        // IMPORTANT:
        // This is the TOTAL shown as
        // "Professional Engagements & Certifications".
        //
        // MOOCs are NOT included here.
        // -----------------------------------------------------

        const professionalCertificates =
            Array.isArray(
                this.certs?.certificates
            )
                ? this.certs.certificates
                : [];


        const professionalCount =
            professionalCertificates.length;


        // -----------------------------------------------------
        // MOOC CERTIFICATES
        // -----------------------------------------------------

        const moocCertificates =
            Array.isArray(
                this.moocs?.moocCertifications
            )
                ? this.moocs.moocCertifications
                : [];


        const moocCount =
            moocCertificates.length;


        // -----------------------------------------------------
        // CATEGORY COUNTS
        //
        // ONLY PROFESSIONAL ENGAGEMENTS/CERTIFICATIONS
        // are included here.
        //
        // MOOCs are deliberately NOT added as a category.
        // -----------------------------------------------------

        this.certsByCategory = {};


        if (
            Array.isArray(
                this.certs?.categories
            )
        ) {

            this.certs.categories.forEach(
                category => {

                    this.certsByCategory[
                        category.name
                    ] =
                        professionalCertificates.filter(
                            certificate =>
                                certificate.category ===
                                category.id
                        ).length;

                }
            );

        }


        // =====================================================
        // PAGE
        // =====================================================

        return `

<section class="fade-in">


    <h1 class="section-title">
        Analytics Dashboard
    </h1>


    <div class="dashboard-grid">


        <!-- =================================================
             CERTIFICATE DISTRIBUTION
        ================================================== -->

        <div class="dashboard-card reveal">

            <h3>

                <i class="fas fa-chart-pie"></i>

                Professional Certificate Distribution

            </h3>


            <div
                class="chart-container"
                style="height:350px;"
            >

                <canvas id="certChart"></canvas>

            </div>

        </div>


        <!-- =================================================
             CERTIFICATES BY CATEGORY
        ================================================== -->

        <div class="dashboard-card reveal">

            <h3>

                <i class="fas fa-chart-bar"></i>

                Professional Certificates by Category

            </h3>


            <div
                class="chart-container"
                style="height:350px;"
            >

                <canvas id="categoryChart"></canvas>

            </div>

        </div>


        <!-- =================================================
             PROFESSIONAL GROWTH
        ================================================== -->

        <div class="dashboard-card reveal">

            <h3>

                <i class="fas fa-chart-line"></i>

                Professional Growth

            </h3>


            <div
                class="chart-container"
                style="height:350px;"
            >

                <canvas id="growthChart"></canvas>

            </div>

        </div>


        <!-- =================================================
             KEY METRICS
        ================================================== -->

        <div class="dashboard-card reveal">

            <h3>

                <i class="fas fa-award"></i>

                Key Metrics

            </h3>


            <div class="metrics-dashboard">


                <!-- =========================================
                     PROFESSIONAL ENGAGEMENTS & CERTIFICATIONS
                ========================================== -->

                <div class="metric-box">

                    <i
                        class="fas fa-certificate metric-icon blue"
                    ></i>


                    <div class="metric-number blue">

                        ${professionalCount}+

                    </div>


                    <div class="metric-title">

                        Professional Engagements<br>
                        & Certifications

                    </div>

                </div>


                <!-- =========================================
                     TEACHING EXPERIENCE
                ========================================== -->

                <div class="metric-box">

                    <i
                        class="fas fa-chalkboard-teacher metric-icon green"
                    ></i>


                    <div class="metric-number green">

                        7+

                    </div>


                    <div class="metric-title">

                        Years Teaching Experience

                    </div>

                </div>


                <!-- =========================================
                     MOOC CERTIFICATIONS
                ========================================== -->

                <div class="metric-box">

                    <i
                        class="fas fa-laptop-code metric-icon purple"
                    ></i>


                    <div class="metric-number purple">

                        ${moocCount}+

                    </div>


                    <div class="metric-title">

                        MOOC Certifications

                    </div>

                </div>


                <!-- =========================================
                     BLOOD DONATIONS
                ========================================== -->

                <div class="metric-box">

                    <i
                        class="fas fa-heart metric-icon red"
                    ></i>


                    <div class="metric-number red">

                        10+

                    </div>


                    <div class="metric-title">

                        Blood Donations

                    </div>

                </div>


            </div>

        </div>

    </div>

</section>

`;

    }


    // =========================================================
    // AFTER RENDER
    // =========================================================

    afterRender() {

        super.afterRender();

        this.drawCharts();

    }


    // =========================================================
    // DRAW CHARTS
    // =========================================================

    drawCharts() {

        if (
            typeof Chart === "undefined"
        ) {

            return;

        }


        Chart.defaults.font.family =
            "Inter";


        // -----------------------------------------------------
        // PROFESSIONAL CATEGORY DATA ONLY
        // -----------------------------------------------------

        const labels =
            Object.keys(
                this.certsByCategory
            );


        const values =
            Object.values(
                this.certsByCategory
            );


        // =====================================================
        // DOUGHNUT CHART
        // =====================================================

        const pie =
            document.getElementById(
                "certChart"
            );


        if (pie) {

            new Chart(
                pie,
                {

                    type: "doughnut",


                    data: {

                        labels: labels,


                        datasets: [{

                            data: values,


                            backgroundColor: [

                                "#3498db",
                                "#2ecc71",
                                "#e74c3c",
                                "#f39c12",
                                "#9b59b6",
                                "#1abc9c",
                                "#6366f1",
                                "#f97316",
                                "#14b8a6"

                            ],


                            borderWidth: 2

                        }]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio: false,


                        plugins: {

                            legend: {

                                position:
                                    "bottom"

                            }

                        }

                    }

                }
            );

        }


        // =====================================================
        // BAR CHART
        // =====================================================

        const bar =
            document.getElementById(
                "categoryChart"
            );


        if (bar) {

            new Chart(
                bar,
                {

                    type: "bar",


                    data: {

                        labels: labels,


                        datasets: [{

                            label:
                                "Professional Certifications",


                            data:
                                values,


                            backgroundColor:
                                "#2563eb"

                        }]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio: false,


                        scales: {

                            y: {

                                beginAtZero: true,


                                ticks: {

                                    precision: 0

                                }

                            }

                        }

                    }

                }
            );

        }


        // =====================================================
        // PROFESSIONAL GROWTH
        //
        // IMPORTANT:
        // MOOCs are NOT included.
        // =====================================================

        const years = {};


        this.certs.certificates.forEach(
            certificate => {

                const date =
                    certificate.startDate;


                if (!date) {

                    return;

                }


                const year =
                    this.extractYear(date);


                if (!year) {

                    return;

                }


                years[year] =
                    (years[year] || 0) + 1;

            }
        );


        // -----------------------------------------------------
        // Sort years
        // -----------------------------------------------------

        const sortedYears =
            Object.keys(years)
                .sort(
                    (a, b) =>
                        Number(a) -
                        Number(b)
                );


        // -----------------------------------------------------
        // Cumulative professional certificates
        // -----------------------------------------------------

        let cumulative = 0;


        const growth =
            sortedYears.map(
                year => {

                    cumulative +=
                        years[year];

                    return cumulative;

                }
            );


        // =====================================================
        // LINE CHART
        // =====================================================

        const line =
            document.getElementById(
                "growthChart"
            );


        if (line) {

            new Chart(
                line,
                {

                    type: "line",


                    data: {

                        labels:
                            sortedYears,


                        datasets: [{

                            label:
                                "Professional Certifications",


                            data:
                                growth,


                            borderColor:
                                "#16a34a",


                            backgroundColor:
                                "rgba(22,163,74,.15)",


                            fill: true,


                            tension:
                                0.35

                        }]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio: false,


                        scales: {

                            y: {

                                beginAtZero: true,


                                ticks: {

                                    precision: 0

                                }

                            }

                        }

                    }

                }
            );

        }

    }


    // =========================================================
    // EXTRACT YEAR
    // =========================================================

    extractYear(dateValue) {

        if (!dateValue) {

            return "";

        }


        const match =
            String(dateValue)
                .match(
                    /\b(19|20)\d{2}\b/
                );


        return match
            ? match[0]
            : "";

    }

}
