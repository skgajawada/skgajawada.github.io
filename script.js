/**
 * Gajavada Sanjeevkumar - Academic Portfolio Application Data & Routing Architecture Engine
 * Scaled explicitly to display comprehensive professional developments, subjects, and digital assets.
 */

// Global Application State Store
const PortfolioAppState = {
    currentActiveView: 'home', // Supports 'home', 'experience', 'education', 'subjects', 'certifications', 'projects', 'professional_dev'
};

// Complete Academic and Professional Data Model Structures
const PersonalProfileData = {
    fullName: "GAJAVADA SANJEEVKUMAR",
    currentTitle: "PhD Research Scholar (Design) | Computational Mechanical Engineer",
    contactEmail: "sanjeevkumargajawada@gmail.com",
    contactPhone: "+91 9030 833 667",
    linkedInURL: "https://www.linkedin.com/in/skgajawada/",
    careerStatement: "To advance mechanical and aerospace engineering through research in aeroelasticity, vibration analysis, structural dynamics, finite element methods, composite structures, and control systems. I aim to integrate computational modeling, simulation techniques, and data-driven approaches, including machine learning and artificial intelligence, to develop innovative engineering solutions for complex real-world challenges while fostering interdisciplinary research and technological innovation.",
    imagePath: "pp.jpeg"
};

// 11 Core Subjects Handled from the Resume
const AcademicSubjectsHandled = [
    { id: "sub_1", name: "Engineering Mechanics", code: "ME101C", desc: "Foundational principles of statics, particle dynamics, rigid body analysis, and structural equilibrium modeling systems." },
    { id: "sub_2", name: "Engineering Graphics", code: "ME102C", desc: "Geometric dimensioning, spatial visualization, orthographic projections, and computer-aided technical drafting workflows." },
    { id: "sub_3", name: "Mechanics of Solids", code: "ME201C", desc: "Stress-strain tensors, beam deflection theories, axial load responses, shear stress analysis, and structural failure mechanics." },
    { id: "sub_4", name: "Kinematics of Machinery", code: "ME202C", desc: "Analysis of relative displacements, velocity mechanisms, acceleration profiles of linkages, cams, and gear systems." },
    { id: "sub_5", name: "Fluid Mechanics", code: "ME203C", desc: "Fluid statics, conservation laws, Navier-Stokes applications, boundary layer parameters, and internal/external pipe flow regimes." },
    { id: "sub_6", name: "Thermodynamics", code: "ME204C", desc: "Fundamental laws of thermal systems, pure substances energy transformations, availability, and transient thermodynamic cycle formulations." },
    { id: "sub_7", name: "Heat Transfer", code: "ME301C", desc: "Conduction heat equations, steady and transient models, convective boundary calculations, radiation networks, and exchanger design." },
    { id: "sub_8", name: "Design of Machine Members", code: "ME302C", desc: "Stress concentration analysis, fatigue loading mitigation, and design engineering for shafts, keys, couplings, and welded frames." },
    { id: "sub_9", name: "Design of Machine Elements", code: "ME303C", desc: "Analysis and specification procedures for bearings, spur/helical gears, engine elements, flexible drives, and structural linkages." },
    { id: "sub_10", name: "Operations Research", code: "ME401C", desc: "Linear optimization programming, simplex method, queuing algorithms, transportation mechanics, and game-theoretic optimization structures." },
    { id: "sub_11", name: "Finite Element Methods / Finite Element Analysis", code: "ME402C", desc: "Discretization techniques, variational methods, stiffness matrix derivation, structural dynamics mapping, and thermal elasticity FEA validation." }
];

const WorkExperienceRecords = [
    { role: "Online Data Science Intern", institution: "Sabudh Foundation (in collaboration with STPI), Mohali, India", duration: "8 January 2026 - 30 June 2026", brief: "Developed and contributed to the primary project titled 'Federated Learning for Intelligent Transportation System'." },
    { role: "Assistant Professor", institution: "Guru Nanak Institutions Technical Campus, Hyderabad, India", duration: "23 March 2021 - 30 June 2025", brief: "Instructed advanced coursework, managed computational engineering laboratories, and structured undergraduate research programs." },
    { role: "Assistant Professor", institution: "Sree Chaitanya College of Engineering, Karimnagar, India", duration: "26 November 2018 - 22 March 2021", brief: "Delivered standard curriculum in structural mechanics and design fields while anchoring institutional outcome-based compliance frameworks." },
    { role: "Lecturer", institution: "Jyothishmathi Institute of Technology and Science, Karimnagar, India", duration: "7 December 2015 - 30 June 2016", brief: "Conducted fundamental engineering design laboratories and guided student project cohorts." }
];

const EducationMilestones = [
    { degree: "PhD - Design", institution: "Indian Institute of Technology (ISM), Dhanbad", period: "July 2025 - Till Date", performance: "8.2 CGPA" },
    { degree: "AICTE QIP PG Certificate Course Data Science", institution: "Indian Institute of Technology Bhilai", period: "June 2025 - Dec 2025", performance: "8.67 CGPA" },
    { degree: "Master of Technology - Machine Design", institution: "GITAM Deemed To Be University, Visakhapatnam", period: "2016 - 2018", performance: "8.78 CGPA" },
    { degree: "Bachelor of Technology - Mechanical Engineering", institution: "Vivekananda Institute of Technology and Science, Karimnagar", period: "2010 - 2014", performance: "71.28%" },
    { degree: "Intermediate, M.P.C", institution: "SR Junior College, Karimnagar", period: "2008 - 2010", performance: "81.8%" },
    { degree: "SSC", institution: "Pragathi Vidyalayam, Sircilla", period: "2007 - 2008", performance: "85.5%" }
];

const AcademicProjectsRegistry = [
    { title: "A study on the effect of elastic-plastic material properties of metals on hardness values using finite element analysis", objective: "To investigate how the elastic-plastic material properties of metals on hardness values varies from theoretical to experimental baselines, followed by optimization of these hardness values using Finite Element Analysis structures." },
    { title: "Study of internal combustion engines & their components", objective: "To present and analyze the fundamentals of internal Combustion Engines & their internal components. The structural report traces the exact mechanism of operation of Internal Combustion Engines and its distinct categorizations based on operation cycles, specifically detailing two-stroke and four-stroke mechanical engines." },
    { title: "Hydraulic Robotic Arm for pick and place operation", objective: "Designed to explore and apply heavy industrial hydraulic engineering principles. The architecture illustrates how fluid pressure applied at one terminal point transmits force through confined flow lines based completely on PASCALS LAW." }
];

// Chronological Vault containing Certifications with clean relative path definitions matching the repository structure
const DocumentedCertifications = [
    { title: "Business Analytics with Excel: Elementary to Advanced", issuer: "Coursera (Johns Hopkins University)", date: "2026", path: "certificates/coursera/business-analytics-excel.pdf" },
    { title: "From Excel to Power BI", issuer: "Coursera (Knowledge Accelerators)", date: "2026", path: "certificates/coursera/From-Excel-to-Power-BI.pdf" },
    { title: "Getting Started with Microsoft Excel", issuer: "Coursera Guided Project", date: "2026", path: "certificates/coursera/microsoft-excel.pdf" },
    { title: "Data Literacy", issuer: "IBM SkillsBuild", date: "28th June 2026", path: "certificates/IBM/DataLiteracy.pdf" },
    { title: "Sensemaking with Data", issuer: "IBM SkillsBuild", date: "28th June 2026", path: "certificates/IBM/DataLiteracy.pdf" },
    { title: "Exploring Data", issuer: "IBM SkillsBuild", date: "28th June 2026", path: "certificates/IBM/DataLiteracy.pdf" },
    { title: "Data Fundamentals", issuer: "IBM SkillsBuild", date: "27th June 2026", path: "certificates/IBM/DataFundamentals.pdf" },
    { title: "Your Future in Data: The Job Landscape", issuer: "IBM SkillsBuild", date: "27th June 2026", path: "certificates/IBM/DataFundamentals.pdf" },
    { title: "Overview of Data Tools and Languages", issuer: "IBM SkillsBuild", date: "27th June 2026", path: "certificates/IBM/DataFundamentals.pdf" },
    { title: "Clean, Refine, and Visualize Data with IBM Watson Studio", issuer: "IBM SkillsBuild", date: "27th June 2026", path: "certificates/IBM/DataFundamentals.pdf" },
    { title: "Data Science in Our World", issuer: "IBM SkillsBuild", date: "27th June 2026", path: "certificates/IBM/DataFundamentals.pdf" },
    { title: "Introduction to Data Concepts", issuer: "IBM SkillsBuild", date: "27th June 2026", path: "certificates/IBM/DataFundamentals.pdf" },
    { title: "Python 101 for Data Science (PY0101EN)", issuer: "IBM Cognitive Class", date: "2026", path: "certificates/CognitiveAI/IBM PY0101EN Certificate _ Cognitive Class.pdf" },
    { title: "Dataiku Core Designer", issuer: "Dataiku Academy", date: "2026", path: "certificates/Dataiku/Core Designer Certificate.pdf" },
    { title: "Dataiku Advanced Designer", issuer: "Dataiku Academy", date: "2026", path: "certificates/Dataiku/Advanced Designer Certificate.pdf" },
    { title: "Dataiku Developer", issuer: "Dataiku Academy", date: "2026", path: "certificates/Dataiku/Developer Certificate.pdf" },
    { title: "Dataiku ML Practitioner", issuer: "Dataiku Academy", date: "2026", path: "certificates/Dataiku/ML Practitioner Certificate.pdf" },
    { title: "Dataiku MLOps Practitioner", issuer: "Dataiku Academy", date: "2026", path: "certificates/Dataiku/MLOps Practitioner Certificate.pdf" },
    { title: "Dataiku Generative AI Practitioner", issuer: "Dataiku Academy", date: "2026", path: "certificates/Dataiku/Generative AI Practitioner Certificate.pdf" },
    { title: "MATLAB Onramp", issuer: "MathWorks Training", date: "2026", path: "certificates/MATLAB/MATLAB Onramp.pdf" },
    { title: "Simulink Onramp", issuer: "MathWorks Training", date: "2026", path: "certificates/MATLAB/Simulink Onramp.pdf" },
    { title: "Control Design Onramp with Simulink", issuer: "MathWorks Training", date: "2026", path: "certificates/MATLAB/Control Design Onramp with Simulink.pdf" },
    { title: "Control System Design Path (Modeling, Linearization, Analysis, PID, Classical)", issuer: "MathWorks", date: "2026", path: "certificates/MATLAB/Control System Design with MATLAB and Simulink.pdf" },
    { title: "Learning SQL Programming", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Learning SQL Programming.pdf" },
    { title: "MySQL for Non-Programmers", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/MySQL for NonProgrammers.pdf" },
    { title: "Learning Data Analytics: Foundations", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Learning Data Analytics 1 Foundations.pdf" },
    { title: "Python for Data Science and Machine Learning Essential Training", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Python for Data Science and Machine Learning Essential Training Part 1.pdf" },
    { title: "Python Essential Training", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Python Essential Training.pdf" },
    { title: "MATLAB Essential Training", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/MATLAB Essential Training.pdf" },
    { title: "Accelerated MATLAB", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Accelerated MATLAB.pdf" },
    { title: "Learning MATLAB", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Learning MATLAB.pdf" },
    { title: "Six Sigma: Green Belt", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Six Sigma Green Belt.pdf" },
    { title: "Statistics Foundations 3: Using Data Sets", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Statistics Foundations 3 Using Data Sets.pdf" },
    { title: "Six Sigma Foundations", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Six Sigma Foundations.pdf" },
    { title: "Operational Excellence Foundations", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Operational Excellence Foundations.pdf" },
    { title: "Additive Manufacturing: Tips, Tricks, and Techniques", issuer: "LinkedIn Learning", date: "2026", path: "certificates/LinkedIn/Additive Manufacturing Tips Tricks and Techniques.pdf" }
];

// Chronological Array indexing all 53 Professional Development events (FDP, ATAL, Webinar, Workshop, Short-Term Courses) from latest to oldest
const ProfessionalDevelopmentRegistry = [
    { type: "Summer School", title: "Data-Driven Modelling for Mechanical Systems (D2MMS)", organizer: "IIT (ISM) Dhanbad", date: "1st - 5th July 2026" },
    { type: "FDP", title: "Research & Development Excellence through Data Science Case Studies", organizer: "Sphoorthy Engineering College", date: "29th June - 3rd July 2026" },
    { type: "FDP", title: "AI-Driven Business Analytics For Research, Teaching & Industry Applications", organizer: "Jodhpur Institute of Engineering & Technology", date: "26th - 30th June 2026" },
    { type: "FDP", title: "AI Powered Teaching Excellence", organizer: "Walchand Institute of Technology, Solapur", date: "22nd - 27th June 2026" },
    { type: "Workshop", title: "Problem-Driven AI: Real World Applications and Solution Frameworks", organizer: "NIT Rourkela", date: "7th - 16th February 2026" },
    { type: "FDP", title: "Next-Generation Mechanical Engineering: From Research to Industrial Applications", organizer: "Institute of Engineering & Management (IEM)", date: "16th - 21st January 2026" },
    { type: "FDP", title: "Advanced Computational Modeling for Solids and Fluids", organizer: "IIT Bhilai", date: "5th - 8th January 2026" },
    { type: "Conference", title: "AI for Forensics and Biometric Applications (AIFB) 2025", organizer: "IIT Bhilai", date: "19th - 20th December 2025" },
    { type: "ATAL FDP", title: "Robotics for Industry 4.0: Enabling Smart Manufacturing", organizer: "Sri Venkateswara College of Engineering", date: "17th - 22nd November 2025" },
    { type: "FDP", title: "Recent Advances in Composite Materials: Integrating Modelling And Experimental Approaches", organizer: "MVGR College of Engineering", date: "17th - 21st November 2025" },
    { type: "FDP", title: "The Role of Artificial Intelligence in Manufacturing Industries", organizer: "MVGR College of Engineering", date: "27th - 31st October 2025" },
    { type: "FDP", title: "The Art and Science of Successful Proposal Writing: Techniques, Strategies, and Best Practices", organizer: "CVR College of Engineering", date: "27th October - 6th November 2025" },
    { type: "FDP", title: "Smart Materials and Technologies for Durable Structures (SMTDS'25)", organizer: "R.V.R.J.C. College of Engineering", date: "15th - 19th September 2025" },
    { type: "FDP", title: "Innovations in Robotics and UAVs: Digital Twins, Drone Design, and Future Trends", organizer: "VNR Vignana Jyothi Institute of Engineering and Technology", date: "30th July - 3rd August 2024" },
    { type: "FDP", title: "Transforming Education: Integrating OBE and NEP 2020", organizer: "CVR College of Engineering", date: "22nd July - 2nd August 2024" },
    { type: "FDP", title: "Advanced Python Programming", organizer: "Guru Nanak Institutions Technical Campus", date: "26th December 2023 - 2nd January 2024" },
    { type: "Workshop", title: "Emission Control Strategies in Thermal Power Plants", organizer: "OP Jindal University & JPL", date: "31st October 2023" },
    { type: "FDP", title: "Fundamentals, Advancements and Applications of Robotics", organizer: "Vignan Institute of Technology and Science", date: "12th - 16th September 2023" },
    { type: "Workshop", title: "Autodesk Authorized Academic Partner Event", organizer: "Guru Nanak Institutions Technical Campus", date: "2023" },
    { type: "FDP", title: "Additive Manufacturing Processes and Its Applications", organizer: "Sri Manakula Vinayagar Engineering College", date: "23rd - 28th August 2021" },
    { type: "ATAL FDP", title: "Green Technology and Sustainability Engineering", organizer: "Amrita Vishwa Vidyapeetham", date: "5th - 9th July 2021" },
    { type: "Short Term Course", title: "Enduring Trends in Hydraulic Control Systems: Past, Present and Future", organizer: "IIT Madras", date: "22nd - 27th March 2021" },
    { type: "Workshop", title: "Computational Research Techniques Using MATLAB", organizer: "Sree Chaitanya College of Engineering", date: "2021" },
    { type: "Workshop", title: "Metallurgy for Mechanical Engineering", organizer: "Sree Chaitanya College of Engineering", date: "2021" },
    { type: "FDP", title: "Mathematical Modeling & Numerical Techniques 2020", organizer: "Kakatiya Institute of Technology and Science", date: "2020" },
    { type: "FDP", title: "Frontiers of Research in Mechanical Engineering (FORME 2020)", organizer: "Satya Institute of Technology and Management", date: "2020" },
    { type: "FDP", title: "Three-Week Faculty Induction Training Program (PMMMNMTT)", organizer: "TLC, IIT Hyderabad", date: "2020" },
    { type: "FDP", title: "Engineering Physics and Materials Science", organizer: "Chaitanya Bharathi Institute of Technology", date: "2020" },
    { type: "FDP", title: "Recent Trends in Manufacturing", organizer: "Mahatma Gandhi Institute of Technology", date: "2020" },
    { type: "FDP", title: "Recent Advances in Renewable Energy & Energy Efficiency Technologies", organizer: "Mahatma Gandhi Institute of Technology", date: "2020" },
    { type: "FDP", title: "National Online FDP on Advanced Welding Technologies", organizer: "JAIN Deemed-to-be University", date: "2020" },
    { type: "FDP", title: "Recent Developments in Solar Energy Recovery and Storage Technologies", organizer: "St. Joseph's College of Engineering", date: "2020" },
    { type: "FDP", title: "Recent Developments of Nano-Composites and Smart Materials in Aerospace Industry", organizer: "MLR Institute of Technology", date: "2020" },
    { type: "FDP", title: "Research Methodologies in Mechanical Engineering (A Refresher Approach)", organizer: "Narsimha Reddy Engineering College", date: "2020" },
    { type: "FDP", title: "Nanoscience and Nanotechnology Current Perspectives", organizer: "G. H. Raisoni College of Engineering", date: "2020" },
    { type: "FDP", title: "Advanced Composite Materials", organizer: "R. R. Institute of Technology", date: "2020" },
    { type: "FDP", title: "Optimization Techniques for Mechanical Engineers", organizer: "Vignan Institute of Technology and Science", date: "2020" },
    { type: "FDP", title: "Research Opportunities in Advanced Welding Processes", organizer: "Hindusthan College of Engineering and Technology", date: "2020" },
    { type: "Short Term Course", title: "Theory of Plasticity and Its Applications", organizer: "IIT Bombay", date: "2020" },
    { type: "Short Term Course", title: "Application of Forecasting Methods in Engineering and Business Problems", organizer: "IIT Kharagpur", date: "2020" },
    { type: "Short Term Course", title: "Green Manufacturing", organizer: "NITTTR Chandigarh", date: "2020" },
    { type: "STTP", title: "Training of Trainers (TOT) for Teacher Educator", organizer: "NITTTR Bhopal", date: "2020" },
    { type: "Short Term Course", title: "Advances in Additive Manufacturing", organizer: "Yeshwantrao Chavan College of Engineering", date: "2020" },
    { type: "STTP", title: "Advanced Techniques in Modelling and Analysis for Materials and Manufacturing Process", organizer: "VNR VJIET", date: "2020" },
    { type: "STTP", title: "Modeling and Analysis using MATLAB and Python for Mechanical Engineering Applications", organizer: "VNR VJIET", date: "2020" },
    { type: "STTP", title: "Advances in Finite Element Method for Industry & Research Applications", organizer: "Vasavi College of Engineering", date: "2020" },
    { type: "STTP", title: "Design of Experiments in Engineering", organizer: "B. V. Raju Institute of Technology", date: "2020" },
    { type: "Webinar", title: "A Vision Towards Materials and Manufacturing", organizer: "KPR Institute of Engineering and Technology", date: "2020" },
    { type: "Webinar", title: "Essential Technologies and Career Opportunities in Mechanical Engineering", organizer: "Universal Engineering College", date: "2020" },
    { type: "FDP", title: "Outcome Based Education and Accreditation Frameworks", organizer: "Guru Nanak Institutions", date: "2021" },
    { type: "FDP", title: "Advanced Computational Solid Mechanics Models", organizer: "Sree Chaitanya College of Engineering", date: "2019" },
    { type: "Workshop", title: "Strategic Pedagogical Engineering Tools in Higher Education", organizer: "JITS Karimnagar", date: "2016" },
    { type: "Workshop", title: "Innovation 2K12 National Engineering Framework Fest", organizer: "VITS Karimnagar", date: "2012" }
];

// Structural Base Markup Renderers
function GetHeaderMarkup() {
    return `
        <header class="portfolio-header">
            <div class="nav-wrapper">
                <div class="brand-placeholder"></div>
                ${PortfolioAppState.currentActiveView !== 'home' ? `
                    <button class="home-nav-btn" onclick="SwitchApplicationView('home')">
                        <i class="fas fa-arrow-left"></i> Return to Dashboard
                    </button>
                ` : ''}
            </div>
        </header>
    `;
}

function GetFooterMarkup() {
    return `
        <footer class="portfolio-footer-sticky">
            <div class="footer-content-alignment-box">
                <div class="footer-social-icons-row">
                    <a href="mailto:${PersonalProfileData.contactEmail}" class="footer-social-link-icon" title="Email Contact"><i class="fas fa-envelope"></i></a>
                    <a href="${PersonalProfileData.linkedInURL}" target="_blank" rel="noopener noreferrer" class="footer-social-link-icon" title="LinkedIn Profile"><i class="fab fa-linkedin"></i></a>
                    <a href="tel:${PersonalProfileData.contactPhone.replace(/\s+/g, '')}" class="footer-social-link-icon" title="Phone Contact"><i class="fas fa-phone"></i></a>
                </div>
                <div class="footer-copyright-declaration">
                    &copy; 2026 Gajavada Sanjeevkumar. All Rights Reserved.
                </div>
            </div>
        </footer>
    `;
}

// Master Structural Controller Engine
function SwitchApplicationView(targetViewId) {
    PortfolioAppState.currentActiveView = targetViewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    RenderApplicationShell();
}

function RenderApplicationShell() {
    const mainAppContainer = document.getElementById('app-container');
    let dynamicInnerBodyContent = '';

    // Route execution to select specific UI views dynamically
    switch (PortfolioAppState.currentActiveView) {
        case 'home':
            dynamicInnerBodyContent = BuildHomeDashboardMarkup();
            break;
        case 'experience':
            dynamicInnerBodyContent = BuildExperienceViewMarkup();
            break;
        case 'education':
            dynamicInnerBodyContent = BuildEducationViewMarkup();
            break;
        case 'subjects':
            dynamicInnerBodyContent = BuildSubjectsViewMarkup();
            break;
        case 'certifications':
            dynamicInnerBodyContent = BuildCertificationsViewMarkup();
            break;
        case 'projects':
            dynamicInnerBodyContent = BuildProjectsViewMarkup();
            break;
        case 'professional_dev':
            dynamicInnerBodyContent = BuildProfessionalDevViewMarkup();
            break;
        default:
            dynamicInnerBodyContent = BuildHomeDashboardMarkup();
    }

    // Assembly pattern
    mainAppContainer.innerHTML = `
        ${GetHeaderMarkup()}
        <main class="main-layout-wrapper">
            ${dynamicInnerBodyContent}
        </main>
        ${GetFooterMarkup()}
    `;
}

// Sub-Component UI Layout Builders
function BuildHomeDashboardMarkup() {
    return `
        <section class="hero-profile-card">
            <div class="profile-avatar-wrapper">
                <img src="${PersonalProfileData.imagePath}" alt="${PersonalProfileData.fullName}" class="profile-avatar-img" onerror="this.src='https://via.placeholder.com/180?text=Sanjeevkumar'">
            </div>
            <div class="profile-bio-summary">
                <h1>${PersonalProfileData.fullName}</h1>
                <h2>${PersonalProfileData.currentTitle}</h2>
                <p>${PersonalProfileData.careerStatement}</p>
            </div>
        </section>

        <section class="dashboard-grid-system">
            <div class="navigation-portal-card" onclick="SwitchApplicationView('experience')">
                <div class="card-icon-frame"><i class="fas fa-briefcase"></i></div>
                <h3>Teaching & Research Experience</h3>
                <p>Chronological breakdown of professional institutional tenures.</p>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('education')">
                <div class="card-icon-frame"><i class="fas fa-graduation-cap"></i></div>
                <h3>Education & Academic Timeline</h3>
                <p>Academic qualifications from PhD tracking down to secondary education.</p>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('subjects')">
                <div class="card-icon-frame"><i class="fas fa-book-open"></i></div>
                <h3>Subjects Handled & Folders</h3>
                <p>Access structured reference folders for all 11 core courses handled.</p>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('certifications')">
                <div class="card-icon-frame"><i class="fas fa-certificate"></i></div>
                <h3>Professional Certifications Vault</h3>
                <p>Verified links to IBM, Dataiku, Coursera, and MathWorks tracking credentials.</p>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('projects')">
                <div class="card-icon-frame"><i class="fas fa-project-diagram"></i></div>
                <h3>Academic & Simulation Projects</h3>
                <p>Finite element evaluations and mechanical design projects.</p>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('professional_dev')">
                <div class="card-icon-frame"><i class="fas fa-chalkboard-teacher"></i></div>
                <h3>Professional Development (${ProfessionalDevelopmentRegistry.length})</h3>
                <p>Unified index tracking all FDPs, workshops, and international symposia.</p>
            </div>
        </section>
    `;
}

function BuildExperienceViewMarkup() {
    let listHTML = '';
    WorkExperienceRecords.forEach(item => {
        listHTML += `
            <div class="data-node-block-item">
                <div class="node-header-flex-row">
                    <div>
                        <div class="node-main-title">${item.role}</div>
                        <div class="node-institution-label">${item.institution}</div>
                    </div>
                    <span class="node-chronology-badge">${item.duration}</span>
                </div>
                <div class="node-narrative-details">${item.brief}</div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <h2 class="view-headline-title">Teaching & Research Experience</h2>
            <p class="view-subheading-description">Detailed tracking of institutional milestones, design instruction roles, and corporate-sponsored analytical data projects.</p>
            <div class="inner-data-grid-layout">
                ${listHTML}
            </div>
        </div>
    `;
}

function BuildEducationViewMarkup() {
    let listHTML = '';
    EducationMilestones.forEach(item => {
        listHTML += `
            <div class="data-node-block-item">
                <div class="node-header-flex-row">
                    <div>
                        <div class="node-main-title">${item.degree}</div>
                        <div class="node-institution-label">${item.institution}</div>
                    </div>
                    <span class="node-chronology-badge">${item.period}</span>
                </div>
                <div class="node-narrative-details"><strong>Performance Matrix Score:</strong> ${item.performance}</div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <h2 class="view-headline-title">Education & Academic Timeline</h2>
            <p class="view-subheading-description">Formal higher qualifications profile outlining research paths and postgraduate specialization milestones.</p>
            <div class="inner-data-grid-layout">
                ${listHTML}
            </div>
        </div>
    `;
}

function BuildSubjectsViewMarkup() {
    let matrixHTML = '';
    AcademicSubjectsHandled.forEach(sub => {
        matrixHTML += `
            <div class="subject-academic-card">
                <div class="subject-title-area">
                    <h4>${sub.name}</h4>
                    <p>${sub.desc}</p>
                </div>
                <div class="action-resource-btn-group">
                    <a href="https://github.com/skgajawada/skgajawada.github.io/tree/main/materials/${sub.id}" target="_blank" rel="noopener noreferrer" class="resource-access-link-btn">
                        <i class="fas fa-folder-open"></i> Material Folder
                    </a>
                </div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <h2 class="view-headline-title">Subjects Handled (${AcademicSubjectsHandled.length} Courses)</h2>
            <p class="view-subheading-description">Complete curriculum map of taught technical areas. Click to securely access structural content folders directly in the repository layout environment.</p>
            <div class="subject-modules-matrix-grid">
                ${matrixHTML}
            </div>
        </div>
    `;
}

function BuildCertificationsViewMarkup() {
    let gridHTML = '';
    DocumentedCertifications.forEach(cert => {
        const fullRepoUrl = `https://github.com/skgajawada/skgajawada.github.io/blob/main/${cert.path}`;
        const rawPdfUrl = `https://raw.githubusercontent.com/skgajawada/skgajawada.github.io/main/${cert.path}`;
        
        gridHTML += `
            <div class="certification-vault-card">
                <div class="cert-meta-header">
                    <div class="cert-issuer-tag">${cert.issuer}</div>
                    <div class="cert-main-title">${cert.title}</div>
                    <div class="cert-timeline-stamp">Completed: ${cert.date}</div>
                </div>
                <div class="cert-action-footer-btns">
                    <a href="${rawPdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-open-certificate">
                        <i class="fas fa-external-link-alt"></i> Open Certificate
                    </a>
                    <a href="${fullRepoUrl}" target="_blank" rel="noopener noreferrer" class="btn-verify-certificate">
                        <i class="fas fa-shield-alt"></i> Verify
                    </a>
                </div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <h2 class="view-headline-title">Professional Certifications Vault</h2>
            <p class="view-subheading-description">Verified credentials archive confirming programmatic competency parameters across advanced computational engineering systems.</p>
            <div class="certifications-matrix-grid">
                ${gridHTML}
            </div>
        </div>
    `;
}

function BuildProjectsViewMarkup() {
    let listHTML = '';
    AcademicProjectsRegistry.forEach(proj => {
        listHTML += `
            <div class="data-node-block-item">
                <h4 class="node-main-title" style="font-size:1.4rem; color:var(--brand-glow); margin-bottom:0.75rem;">${proj.title}</h4>
                <div class="node-narrative-details" style="line-height:1.7;">
                    <strong>Investigation Parameters & Technical Objectives:</strong><br>
                    ${proj.objective}
                </div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <h2 class="view-headline-title">Academic & Simulation Projects</h2>
            <p class="view-subheading-description">Core computational modeling and mechanics research projects completed during advanced academic tenures.</p>
            <div class="inner-data-grid-layout">
                ${listHTML}
            </div>
        </div>
    `;
}

function BuildProfessionalDevViewMarkup() {
    let rowsHTML = '';
    ProfessionalDevelopmentRegistry.forEach(item => {
        rowsHTML += `
            <div class="prof-dev-list-row">
                <div class="prof-dev-info-left">
                    <span class="prof-dev-type-badge">${item.type}</span>
                    <div class="prof-dev-title-text">${item.title}</div>
                    <div class="prof-dev-organizer-text"><i class="fas fa-university"></i> ${item.organizer}</div>
                </div>
                <div class="prof-dev-date-right">
                    <span class="node-chronology-badge">${item.date}</span>
                </div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <h2 class="view-headline-title">Professional Development Portfolio Index</h2>
            <p class="view-subheading-description">Comprehensive, consolidated list tracking precisely <strong>${ProfessionalDevelopmentRegistry.length}</strong> distinct Faculty Development Programs (FDPs), ATAL configurations, national level technical workshops, short-term continuous training paths, and engineering webinar symposiums organized chronologically from latest to oldest.</p>
            <div class="prof-dev-master-list">
                ${rowsHTML}
            </div>
        </div>
    `;
}

// Global Application Core Bootstrap Trigger Hook
document.addEventListener('DOMContentLoaded', () => {
    RenderApplicationShell();
});
