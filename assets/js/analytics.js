// Analytics Dashboard
class AnalyticsDashboard extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();
        const certs = await DataManager.getCertificates();

        // Calculate statistics
        const totalCerts = certs.certificates.length;
        const certsByCategory = {};
        certs.categories.forEach(cat => {
            certsByCategory[cat.name] = certs.certificates.filter(c => c.category === cat.id).length;
        });

        return `
            <section class="fade-in">
                <h1 class="section-title">Analytics Dashboard</h1>

                <div class="dashboard-grid">
                    <div class="dashboard-card reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-chart-pie"></i> Certificate Distribution</h3>
                        <div class="chart-container">
                            <canvas id="certChart"></canvas>
                        </div>
                    </div>

                    <div class="dashboard-card reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-chart-bar"></i> Certificates by Category</h3>
                        <div class="chart-container">
                            <canvas id="categoryChart"></canvas>
                        </div>
                    </div>

                    <div class="dashboard-card reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-chart-line"></i> Professional Growth</h3>
                        <div class="chart-container">
                            <canvas id="growthChart"></canvas>
                        </div>
                    </div>

                    <div class="dashboard-card reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1rem;"><i class="fas fa-award"></i> Key Metrics</h3>
                        <div style="padding: 1rem 0;">
                            <p style="margin: 1rem 0; display: flex; justify-content: space-between; align-items: center;">
                                <span>Total Certifications:</span>
                                <span style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">${totalCerts}</span>
                            </p>
                            <hr style="border: 1px solid var(--border); margin: 1rem 0;">
                            <p style="margin: 1rem 0; display: flex; justify-content: space-between; align-items: center;">
                                <span>Teaching Experience:</span>
                                <span style="font-size: 1.5rem; font-weight: bold; color: var(--secondary);">7+ yrs</span>
                            </p>
                            <hr style="border: 1px solid var(--border); margin: 1rem 0;">
                            <p style="margin: 1rem 0; display: flex; justify-content: space-between; align-items: center;">
                                <span>MOOC Certifications:</span>
                                <span style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">30+</span>
                            </p>
                            <hr style="border: 1px solid var(--border); margin: 1rem 0;">
                            <p style="margin: 1rem 0; display: flex; justify-content: space-between; align-items: center;">
                                <span>Blood Donations:</span>
                                <span style="font-size: 1.5rem; font-weight: bold; color: #e74c3c;">10</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <script>
                setTimeout(() => {
                    // Pie Chart - Certificate Distribution
                    const ctx1 = document.getElementById('certChart');
                    if (ctx1 && typeof Chart !== 'undefined') {
                        new Chart(ctx1, {
                            type: 'doughnut',
                            data: {
                                labels: Object.keys(${JSON.stringify(certsByCategory)}),
                                datasets: [{
                                    data: Object.values(${JSON.stringify(certsByCategory)}),
                                    backgroundColor: [
                                        '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'
                                    ],
                                    borderColor: '#fff',
                                    borderWidth: 2
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'bottom' }
                                }
                            }
                        });
                    }

                    // Bar Chart - Certificates by Category
                    const ctx2 = document.getElementById('categoryChart');
                    if (ctx2 && typeof Chart !== 'undefined') {
                        new Chart(ctx2, {
                            type: 'bar',
                            data: {
                                labels: Object.keys(${JSON.stringify(certsByCategory)}),
                                datasets: [{
                                    label: 'Number of Certificates',
                                    data: Object.values(${JSON.stringify(certsByCategory)}),
                                    backgroundColor: '#3498db',
                                    borderColor: '#2980b9',
                                    borderWidth: 2
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }
                        });
                    }

                    // Line Chart - Professional Growth
                    const ctx3 = document.getElementById('growthChart');
                    if (ctx3 && typeof Chart !== 'undefined') {
                        new Chart(ctx3, {
                            type: 'line',
                            data: {
                                labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                                datasets: [{
                                    label: 'Professional Development Growth',
                                    data: [5, 25, 45, 65, 85, 105, 115],
                                    borderColor: '#2ecc71',
                                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                                    tension: 0.4,
                                    fill: true,
                                    borderWidth: 3
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }
                        });
                    }
                }, 100);
            </script>
        `;
    }
}

router.register('/analytics', new AnalyticsDashboard());
