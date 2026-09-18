// ============================================================
// ANALYTICS DASHBOARD
// ============================================================

class AnalyticsDashboard extends Component {

    // =========================================================
    // RENDER
    // =========================================================

    async render() {

        // -----------------------------------------------------
        // Load data
        // -----------------------------------------------------

        this.certs =
            await DataManager.getEngagements();

        this.moocs =
            await DataManager.getMOOCs();


        // -----------------------------------------------------
        // Professional Development Certificates
        // -----------------------------------------------------

        const professionalCertificates =
            this.certs?.certificates || [];


        // -----------------------------------------------------
        // MOOC Certificates
        //
        // This includes all certificates present in
        // moocCertifications, including Elsevier, Kaggle,
        // ISRO-IIRS, etc.
        // -----------------------------------------------------

        const moocCertificates =
            this.moocs?.moocCertifications || [];


        // -----------------------------------------------------
        // COUNTS
        // -----------------------------------------------------

        const professionalCount =
            professionalCertificates.length;


        const moocCount =
            moocCertificates.length;


        const totalCount =
            professionalCount + moocCount;


        // -----------------------------------------------------
        // Category counts
        // -----------------------------------------------------

        this.certsByCategory = {};


        if (this.certs?.categories) {

            this.certs.categories.forEach(cat => {

                this.certsByCategory[cat.name] =
                    professionalCertificates.filter(
                        certificate =>
                            certificate.category === cat.id
                    ).length;

            });

        }


        // -----------------------------------------------------
        // Add MOOC category
        //
        // IMPORTANT:
        // MOOC is added here ONLY for chart distribution.
        // It is NOT added again to professionalCount.
        // -----------------------------------------------------

        if (moocCount > 0) {

            this.certsByCategory[
                "MOOC Certifications"
            ] = moocCount;

        }


        // -----------------------------------------------------
        // Rounded display values
        // -----------------------------------------------------

        const roundedTotal =
            DataManager.getRoundedCount(
                totalCount,
                100
            );


        const roundedMoocs =
            DataManager.getRoundedCount(
                moocCount,
                10
            );


        // =====================================================
        // PAGE
        // =====================================================

        return `

<section class="fade-in">

    <h1 class="section-title">
        Analytics Dashboard
    </h1>


    <!-- =====================================================
         DASHBOARD GRID
    ====================================================== -->

    <div class="dashboard-grid">


        <!-- =================================================
             CERTIFICATE DISTRIBUTION
        ================================================== -->

        <div class="dashboard-card reveal">

            <h3>

                <i class="fas fa-chart-pie"></i>

                Certificate Distribution

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

                Certificates by Category

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
                     TOTAL CERTIFICATIONS
                ========================================== -->

                <div class="metric-box">

                    <i
                        class="fas fa-certificate
                               metric-icon blue"
                    ></i>


                    <div class="metric-number blue">

                        ${roundedTotal}+

                    </div>


                    <div class="metric-title">

                        Total Certifications

                    </div>

                </div>


                <!-- =========================================
                     TEACHING EXPERIENCE
                ========================================== -->

                <div class="metric-box">

                    <i
                        class="fas fa-chalkboard-teacher
                               metric-icon green"
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
                        class="fas fa-laptop-code
                               metric-icon purple"
                    ></i>


                    <div class="metric-number purple">

                        ${roundedMoocs}+

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
                        class="fas fa-heart
                               metric-icon red"
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

        if (typeof Chart === "undefined") {

            return;

        }


        Chart.defaults.font.family =
            "Inter";


        // -----------------------------------------------------
        // CATEGORY DATA
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
                                "Certificates",

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
        // =====================================================

        const years = {};


        // -----------------------------------------------------
        // Professional certificates
        // -----------------------------------------------------

        this.certs.certificates.forEach(
            certificate => {

                let year = "";


                if (
                    certificate.startDate
                ) {

                    const parts =
                        certificate.startDate
                            .split("-");


                    year =
                        parts[
                            parts.length - 1
                        ];

                }


                if (!year) {

                    return;

                }


                years[year] =
                    (years[year] || 0) + 1;

            }
        );


        // -----------------------------------------------------
        // MOOC certificates
        // -----------------------------------------------------

        this.moocs.moocCertifications.forEach(
            certificate => {

                let year = "";


                if (
                    certificate.startDate
                ) {

                    const parts =
                        certificate.startDate
                            .split("-");


                    year =
                        parts[
                            parts.length - 1
                        ];

                }


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
                        Number(a) - Number(b)
                );


        // -----------------------------------------------------
        // Cumulative growth
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
                                "Total Certifications",

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

}
