// HOME PAGE
class HomePage extends Component {
    async render() {
        const data = await DataManager.getPortfolioData();

        const certs = await DataManager.getEngagements();
        const totalCerts = certs.certificates.length;
        const roundedCerts = DataManager.getRoundedCount(totalCerts, 100);

        const moocs = await DataManager.getMOOCs();
        const totalMoocs = moocs.moocCertifications.length;
        const roundedMoocs = DataManager.getRoundedCount(totalMoocs, 10);

        // =====================================================
        // LATEST UPDATES
        // =====================================================

        const allUpdates = await DataManager.getLatestUpdates();

        const latestUpdates = [...allUpdates]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        const updateIcon = (type) => {
            const icons = {
                linkedin: "fab fa-linkedin",
                achievement: "fas fa-trophy",
                certification: "fas fa-certificate",
                learning: "fas fa-graduation-cap",
                research: "fas fa-flask",
                project: "fas fa-project-diagram",
                event: "fas fa-calendar-check",
                professional: "fas fa-briefcase"
            };

            return icons[type] || "fas fa-bell";
        };

        const updateCards = latestUpdates.length
            ? latestUpdates.map(update => `
                <article class="update-card reveal">

                    <div class="update-icon">
                        <i class="${updateIcon(update.type)}"></i>
                    </div>

                    <div class="update-content">

                        <div class="update-meta">
                            <span class="update-category">
                                ${update.category}
                            </span>

                            <time datetime="${update.date}">
                                ${new Date(update.date + "T00:00:00").toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </time>
                        </div>

                        <h3>${update.title}</h3>

                        <p>${update.description}</p>

                    </div>

                </article>
            `).join("")
            : `
                <div class="updates-empty">
                    <i class="fas fa-bell"></i>
                    <p>No updates have been added yet.</p>
                </div>
            `;

        // =====================================================
        // PAGE
        // =====================================================

        return `
            <section class="hero fade-in">

                <div class="hero-content">

                    <h1>${data.personal.name}</h1>

                    <p class="subtitle">
                        ${data.personal.title}
                    </p>

                    <p class="hero-institution">
                        ${data.personal.institution}
                    </p>

                    <p class="description">
                        ${data.personal.bio}
                    </p>

                    <div class="hero-buttons">

                        <a href="#/about" class="btn btn-primary">
                            <i class="fas fa-user"></i>
                            View Profile
                        </a>

                        <a href="#/contact" class="btn btn-outline">
                            <i class="fas fa-envelope"></i>
                            Get In Touch
                        </a>

                        <a href="#/resume" class="btn btn-secondary">
                            <i class="fas fa-file-alt"></i>
                            View CV
                        </a>

                    </div>

                </div>

                <div class="hero-image fade-in-right">
                    <img
                        src="${data.personal.profileImage}"
                        alt="Profile"
                        class="profile-image"
                        onerror="this.src='https://via.placeholder.com/400x400?text=Profile+Image'"
                    >
                </div>

            </section>


            <!-- =====================================================
                 STATISTICS
            ====================================================== -->

            <section class="stats-grid">

                <div class="stat-card reveal">
                    <i
                        class="fas fa-chalkboard-teacher"
                        style="font-size:2rem;color:var(--primary);margin-bottom:.5rem;"
                    ></i>

                    <div class="stat-number">
                        7+
                    </div>

                    <div class="stat-label">
                        Years Teaching Experience
                    </div>
                </div>


                <div class="stat-card reveal">
                    <i
                        class="fas fa-certificate"
                        style="font-size:2rem;color:var(--primary);margin-bottom:.5rem;"
                    ></i>

                    <div class="stat-number">
                        ${roundedCerts}
                    </div>

                    <div class="stat-label">
                        Professional Development <br>
                        Certifications
                    </div>
                </div>


                <div class="stat-card reveal">
                    <i
                        class="fas fa-book"
                        style="font-size:2rem;color:var(--primary);margin-bottom:.5rem;"
                    ></i>

                    <div class="stat-number">
                        10+
                    </div>

                    <div class="stat-label">
                        Subjects Taught
                    </div>
                </div>


                <div class="stat-card reveal">
                    <i
                        class="fas fa-laptop-code"
                        style="font-size:2rem;color:var(--primary);margin-bottom:.5rem;"
                    ></i>

                    <div class="stat-number">
                        ${roundedMoocs}
                    </div>

                    <div class="stat-label">
                        MOOC Certifications
                    </div>
                </div>

            </section>


            <!-- =====================================================
                 LATEST UPDATES
            ====================================================== -->

            <section class="latest-updates-section">

                <div class="section-heading-row">

                    <h2 class="section-title">
                        Latest Updates
                    </h2>

                    <a href="#/updates" class="section-view-all">
                        View All
                        <i class="fas fa-arrow-right"></i>
                    </a>

                </div>


                <div class="latest-updates-list">
                    ${updateCards}
                </div>

            </section>


            <!-- =====================================================
                 RESEARCH INTERESTS
            ====================================================== -->

            <section>

                <h2 class="section-title">
                    Research Interests
                </h2>

                <div
                    style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem;
                        margin-bottom: 4rem;
                    "
                >

                    ${data.researchInterests.map((interest, i) => `
                        <div
                            class="reveal"
                            style="
                                background: linear-gradient(
                                    135deg,
                                    var(--primary),
                                    var(--secondary)
                                );
                                color: white;
                                padding: 1.5rem;
                                border-radius: 10px;
                                text-align: center;
                                animation-delay: ${i * 0.1}s;
                            "
                        >
                            <i
                                class="fas fa-check-circle"
                                style="margin-right: 0.5rem;"
                            ></i>

                            ${interest}
                        </div>
                    `).join('')}

                </div>

            </section>


            <!-- =====================================================
                 QUICK ACCESS
            ====================================================== -->

            <section>

                <h2 class="section-title">
                    Quick Access
                </h2>

                <div class="cards-grid stagger-container">


                    <!-- ABOUT -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-user"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                About Me
                            </h3>

                            <p class="card-description">
                                Read my biographical outline, career research objective, and personal traits.
                            </p>

                            <a href="#/about" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- EXPERIENCE -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Experience
                            </h3>

                            <p class="card-description">
                                Comprehensive work history spanning academics and research from 2015 to present.
                            </p>

                            <a href="#/experience" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- TEACHING -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Teaching
                            </h3>

                            <p class="card-description">
                                Explore subjects taught, institutions, batches, and course materials.
                            </p>

                            <a href="#/teaching" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- EDUCATION -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Education
                            </h3>

                            <p class="card-description">
                                PhD status, Master's degree, and B.Tech academic timeline with certifications.
                            </p>

                            <a href="#/education" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- PROJECTS -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Projects
                            </h3>

                            <p class="card-description">
                                Explore research, academic, and industrial projects with detailed documentation.
                            </p>

                            <a href="#/projects" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- PROFESSIONAL DEVELOPMENT -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-certificate"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Professional Development
                            </h3>

                            <p class="card-description">
                                Explore Faculty Development Programs, Workshops, Conferences, STTPs, Webinars, Quizzes and other professional development activities with downloadable certificates.
                            </p>

                            <a href="#/engagements" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- ONLINE LEARNING -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-laptop-code"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Online Learning
                            </h3>

                            <p class="card-description">
                                Explore courses, certifications, badges, and online learning activities completed through MATLAB Academy, LinkedIn Learning, Coursera, Dataiku Academy, IBM SkillsBuild, and Cognitive Class.
                            </p>

                            <a href="#/online-learning" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                    <!-- CONTACT -->

                    <div class="card fade-in">

                        <div class="card-icon">
                            <i class="fas fa-envelope"></i>
                        </div>

                        <div class="card-content">

                            <h3 class="card-title">
                                Contact
                            </h3>

                            <p class="card-description">
                                Submit queries, request resources, or connect through my social directory instantly.
                            </p>

                            <a href="#/contact" class="card-link">
                                View Details
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>


                </div>

            </section>
        `;
    }
}
