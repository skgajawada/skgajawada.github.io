// ======================================================
// TEACHING PAGE
// ======================================================

class TeachingPage extends Component {

    async render(params) {

        const teaching = await DataManager.getTeaching();
        const subjectId = params?.[0];

        // ==================================================
        // HOME PAGE
        // ==================================================

        if (!subjectId) {

            const subjects = teaching.subjects.filter(
                item => item.type === "subject"
            );

            const labs = teaching.subjects.filter(
                item => item.type === "lab"
            );

            return `

<section class="fade-in teaching-page">

    <h1 class="section-title">
        Teaching
    </h1>

    <div class="teaching-group">

        <h2 class="teaching-group-title">

            <i class="fas fa-book"></i>

            Subjects

        </h2>

        <div class="cards-grid">

            ${subjects.map(subject =>
                this.renderSubjectCard(subject)
            ).join("")}

        </div>

    </div>

    <div class="teaching-group">

        <h2 class="teaching-group-title">

            <i class="fas fa-flask"></i>

            Laboratory Courses

        </h2>

        <div class="cards-grid">

            ${labs.map(subject =>
                this.renderSubjectCard(subject)
            ).join("")}

        </div>

    </div>

</section>

`;

        }

        // ==================================================
        // FIND SUBJECT
        // ==================================================

        const currentSubject = teaching.subjects.find(
            item => item.id === subjectId
        );

        if (!currentSubject) {

            return `

<section class="fade-in">

    <h2>Subject Not Found</h2>

    <a href="#/teaching"
       class="btn btn-primary">

        Back

    </a>

</section>

`;

        }

        return `

<section class="fade-in teaching-details">

    <div class="page-header">

        <a href="#/teaching"
           class="btn btn-outline">

            <i class="fas fa-arrow-left"></i>

            Back

        </a>

        <h1 class="section-title">

            ${currentSubject.title}

        </h1>

    </div>
        ${currentSubject.teaching.map(college => `
    
        <div class="teaching-college">

            <div class="college-header">

                <div class="college-icon">
                    <i class="fas fa-university"></i>
                </div>

                <div>

                    <h2 class="college-title">
                        ${college.institution}
                    </h2>

                    ${college.department ? `
                        <p class="college-department">
                            ${college.department}
                        </p>
                    ` : ""}

                </div>

            </div>

            <div class="offering-grid">

                ${college.offerings.map(off => `

                    <div class="offering-card">

                        <div class="offering-year">

                            <span class="offering-icon">📅</span>

                            <span>${off.academicYear}</span>

                        </div>

                        <div class="offering-body">

                            <div class="offering-row">

                                <span>🎓</span>

                                <span>${off.year}</span>

                            </div>

                            <div class="offering-row">

                                <span>📖</span>

                                <span>${off.semester}</span>

                            </div>

                            <div class="offering-row">

                                <span>🏛</span>

                                <span>${off.branch}</span>

                            </div>

                            <div class="offering-row">

                                <span>👥</span>

                                <span>${off.section || "-"}</span>

                            </div>

                        </div>

                    </div>

                `).join("")}

            </div>

        </div>

    `).join("")}
        <div class="course-material-section">

        <h2 class="course-material-title">

            <i class="fas fa-folder-open"></i>

            Course Materials

        </h2>

        <p class="course-material-text">

            View lecture notes, presentations, assignments,
            laboratory manuals, question banks and additional
            learning resources.

        </p>

        <a href="assets/teaching/${currentSubject.folder}/index.html"
           target="_blank"
           class="btn btn-primary course-btn">

            <i class="fas fa-folder-open"></i>

            Access Course Materials

        </a>

    </div>

</section>

`;

    }
}
