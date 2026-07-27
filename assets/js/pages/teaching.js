// ======================================================
// TEACHING PAGE
// ======================================================

class TeachingPage extends Component {

    async render(params = []) {

        const teaching = await DataManager.getTeaching();

        if (!teaching || !Array.isArray(teaching.subjects)) {
            return `
                <section class="fade-in">
                    <div class="empty-state">
                        <h2>Teaching data unavailable</h2>
                        <p>Unable to load teaching information.</p>
                    </div>
                </section>
            `;
        }

        const subjectId = params[0];

        if (!subjectId) {
            return this.renderHomePage(teaching.subjects);
        }

        const currentSubject = teaching.subjects.find(
            subject => subject.id === subjectId
        );

        if (!currentSubject) {
            return `
                <section class="fade-in">
                    <div class="page-header">
                        <a href="#/teaching" class="btn btn-outline">
                            <i class="fas fa-arrow-left"></i>
                            Back
                        </a>
                    </div>

                    <div class="empty-state">
                        <h2>Subject Not Found</h2>
                        <p>
                            The requested teaching page does not exist.
                        </p>
                    </div>
                </section>
            `;
        }

        return this.renderSubjectPage(currentSubject);
    }

    renderHomePage(subjects) {

        const academicSubjects = subjects.filter(subject => {

            if (subject.type)
                return subject.type === "subject";

            return !/lab/i.test(subject.title);

        });

        const laboratoryCourses = subjects.filter(subject => {

            if (subject.type)
                return subject.type === "lab";

            return /lab/i.test(subject.title);

        });

        return `
<section class="fade-in teaching-page">

    <h1 class="section-title">
        Teaching
    </h1>

    <p class="section-subtitle">
        Courses taught across different institutions,
        departments, academic years and programmes.
    </p>

    <div class="teaching-group">

        <h2 class="teaching-group-title">
            <i class="fas fa-book"></i>
            Subjects
        </h2>

        <div class="cards-grid">

            ${academicSubjects
                .map(subject => this.renderSubjectCard(subject))
                .join("")}

        </div>

    </div>

    <div class="teaching-group">

        <h2 class="teaching-group-title">
            <i class="fas fa-flask"></i>
            Laboratory Courses
        </h2>

        <div class="cards-grid">

            ${laboratoryCourses
                .map(subject => this.renderSubjectCard(subject))
                .join("")}

        </div>

    </div>

</section>
`;
    }
        renderSubjectCard(subject) {

        return `

<div class="teaching-card">

    <div class="teaching-card-icon">
        <i class="fas ${subject.icon}"></i>
    </div>

    <div class="teaching-card-content">

        <h3 class="teaching-card-title">
            ${subject.title}
        </h3>

        <a href="#/teaching/${subject.id}"
           class="btn btn-primary teaching-btn">

            View Teaching Details

        </a>

    </div>

</div>

`;
    }

    renderSubjectPage(subject) {

        return `

<section class="fade-in teaching-details">

    <div class="page-header">

        <a href="#/teaching"
           class="btn btn-outline">

            <i class="fas fa-arrow-left"></i>

            Back

        </a>

        <h1 class="section-title">

            ${subject.title}

        </h1>

    </div>

    ${subject.teaching.map(college => `

        ${this.renderInstitution(college)}

    `).join("")}

    <div class="course-material-section">

    <h2 class="course-material-title">

        <i class="fas fa-folder-open"></i>

        Course Materials

    </h2>

    <p class="course-material-text">

        Access lecture notes, presentations, assignments,
        tutorials, question banks, previous papers,
        reference books, videos and downloadable resources.

    </p>

    <div class="materials-grid">

        ${[
            { name: "Notes", folder: "Notes", icon: "fa-book" },
            { name: "PPT", folder: "PPT", icon: "fa-file-powerpoint" },
            { name: "Assignments", folder: "Assignments", icon: "fa-pencil-alt" },
            { name: "Tutorials", folder: "Tutorials", icon: "fa-chalkboard-teacher" },
            { name: "Question Banks", folder: "QB", icon: "fa-circle-question" },
            { name: "Previous Papers", folder: "Papers", icon: "fa-file-lines" },
            { name: "Books", folder: "Books", icon: "fa-book-open" },
            { name: "Videos", folder: "Videos", icon: "fa-video" },
            { name: "Downloads", folder: "Downloads", icon: "fa-download" }
        ].map(item => `

            <a
                href="assets/teaching/${subject.folder}/${item.folder}/"
                target="_blank"
                class="material-card">

                <i class="fas ${item.icon}"></i>

                <h3>${item.name}</h3>

                <span>Open</span>

            </a>

        `).join("")}

    </div>

</div>
</section>

`;

    }
    renderInstitution(college) {

        return `

<div class="teaching-college">

    <div class="college-header">

        <div class="college-icon">
            <i class="fas fa-university"></i>
        </div>

        <div class="college-info">

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

        ${college.offerings.map(offering =>

            this.renderOfferingCard(offering)

        ).join("")}

    </div>

</div>

`;

    }

    renderOfferingCard(offering) {

        return `

<div class="offering-card">

    <div class="offering-header">

        <i class="fas fa-calendar-alt"></i>

        <span>

            ${offering.academicYear}

        </span>

    </div>

    <div class="offering-body">

        <div class="offering-row">

            <span class="offering-label">

                Year

            </span>

            <span class="offering-value">

                ${offering.year}

            </span>

        </div>

        <div class="offering-row">

            <span class="offering-label">

                Semester

            </span>

            <span class="offering-value">

                ${offering.semester}

            </span>

        </div>

        <div class="offering-row">

            <span class="offering-label">

                Branch

            </span>

            <span class="offering-value">

                ${offering.branch}

            </span>

        </div>

        <div class="offering-row">

            <span class="offering-label">

                Section

            </span>

            <span class="offering-value">

                ${offering.section || "-"}

            </span>

        </div>

    </div>

</div>

`;

    }
        afterRender() {

            super.afterRender();
        
            const cards = document.querySelectorAll(
                ".teaching-card, .offering-card"
            );
        
            cards.forEach((card, index) => {
        
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)";
        
                setTimeout(() => {
        
                    card.style.transition =
                        "opacity .4s ease, transform .4s ease";
        
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
        
                }, index * 60);
        
            });
        
        }

}
