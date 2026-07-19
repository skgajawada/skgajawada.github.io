// Analytics Dashboard
class AnalyticsDashboard extends Component {

    async render() {

        this.certs = await DataManager.getCertificates();

        const totalCerts = this.certs.certificates.length;

        this.certsByCategory = {};

        this.certs.categories.forEach(cat => {

            this.certsByCategory[cat.name] =
                this.certs.certificates.filter(c => c.category === cat.id).length;

        });

        return `

<section class="fade-in">

<h1 class="section-title">
Analytics Dashboard
</h1>

<div class="dashboard-grid">

<div class="dashboard-card reveal">

<h3>
<i class="fas fa-chart-pie"></i>
Certificate Distribution
</h3>

<div class="chart-container" style="height:350px;">
<canvas id="certChart"></canvas>
</div>

</div>

<div class="dashboard-card reveal">

<h3>
<i class="fas fa-chart-bar"></i>
Certificates by Category
</h3>

<div class="chart-container" style="height:350px;">
<canvas id="categoryChart"></canvas>
</div>

</div>

<div class="dashboard-card reveal">

<h3>
<i class="fas fa-chart-line"></i>
Professional Growth
</h3>

<div class="chart-container" style="height:350px;">
<canvas id="growthChart"></canvas>
</div>

</div>

<div class="dashboard-card reveal">

<h3>
<i class="fas fa-award"></i>
Key Metrics
</h3>

<div class="metrics-grid">

<div class="metric-item">
<span class="metric-label">Professional Development</span>
<span class="metric-value blue">${totalCerts}</span>
</div>

<div class="metric-item">
<span class="metric-label">Teaching Experience</span>
<span class="metric-value green">7+ Years</span>
</div>

<div class="metric-item">
<span class="metric-label">MOOC Certifications</span>
<span class="metric-value purple">30+</span>
</div>

<div class="metric-item">
<span class="metric-label">Blood Donations</span>
<span class="metric-value red">10</span>
</div>

</div>

</div>


</section>

`;

    }

    afterRender() {

        super.afterRender();

        this.drawCharts();

    }

    drawCharts() {

        if (typeof Chart === "undefined") return;

        Chart.defaults.font.family = "Inter";

        const labels = Object.keys(this.certsByCategory);

        const values = Object.values(this.certsByCategory);

        /* ---------------- PIE ---------------- */

        const pie = document.getElementById("certChart");

        if (pie) {

            new Chart(pie, {

                type: "doughnut",

                data: {

                    labels,

                    datasets: [{

                        data: values,

                        backgroundColor: [

                            "#3498db",
                            "#2ecc71",
                            "#e74c3c",
                            "#f39c12",
                            "#9b59b6",
                            "#1abc9c"

                        ],

                        borderWidth: 2

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            position: "bottom"

                        }

                    }

                }

            });

        }

        /* ---------------- BAR ---------------- */

        const bar = document.getElementById("categoryChart");

        if (bar) {

            new Chart(bar, {

                type: "bar",

                data: {

                    labels,

                    datasets: [{

                        label: "Certificates",

                        data: values,

                        backgroundColor: "#2563eb"

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {

                            beginAtZero: true

                        }

                    }

                }

            });

        }

        /* ---------------- GROWTH ---------------- */

        const years = {};

        this.certs.certificates.forEach(c => {

            let year = "";

            if (c.startDate) {

                const parts = c.startDate.split("-");

                year = parts[parts.length - 1];

            }

            if (!year) return;

            years[year] = (years[year] || 0) + 1;

        });

        const sortedYears = Object.keys(years).sort();

        let cumulative = 0;

        const growth = sortedYears.map(y => {

            cumulative += years[y];

            return cumulative;

        });

        const line = document.getElementById("growthChart");

        if (line) {

            new Chart(line, {

                type: "line",

                data: {

                    labels: sortedYears,

                    datasets: [{

                        label: "Professional Development",

                        data: growth,

                        borderColor: "#16a34a",

                        backgroundColor: "rgba(22,163,74,.15)",

                        fill: true,

                        tension: .35

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false

                }

            });

        }

    }

}

router.register("/analytics", new AnalyticsDashboard());
