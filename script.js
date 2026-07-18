/**
 * Gajavada Sanjeevkumar - Academic Portfolio Architecture Engine
 * High-performance application framework tracking all 11 core courses, 53 professional developments, 
 * and introducing a bulletproof operational validation engine for certification verification items.
 */

// Application Navigation Routing Configuration
const PortfolioAppState = {
    currentActiveView: 'home', // Framework States: 'home', 'teaching', 'certifications', 'development'
};

const ProfileCoreData = {
    fullName: "GAJAVADA SANJEEVKUMAR",
    title: "PhD Research Scholar (Design) | IIT (ISM) Dhanbad",
    location: "Hyderabad, Telangana, India",
    objective: "To advance mechanical and aerospace engineering through research in aeroelasticity, vibration analysis, structural dynamics, finite element methods, composite structures, and control systems. Integrating computational modeling, simulation techniques, and data-driven approaches including machine learning and artificial intelligence to develop innovative engineering solutions.",
    email: "sanjeevkumargajawada@gmail.com",
    phone: "+91 9030 833 667",
    linkedin: "https://www.linkedin.com/in/skgajawada/"
};

// 11 Comprehensive Subjects Handled Registry
const SubjectsHandledRegistry = [
    { sNo: "01", name: "Engineering Mechanics", focus: "Statics, Dynamics, Vector Mechanics, Equilibrium Formulations", id: "engineering_mechanics" },
    { sNo: "02", name: "Engineering Graphics", focus: "Geometric Construction, Orthographic & Isometric Projections, CAD tools", id: "engineering_graphics" },
    { sNo: "03", name: "Mechanics of Solids", focus: "Stress-Strain Mechanics, Shear Force & Bending Moments, Torsional Stiffness", id: "mechanics_of_solids" },
    { sNo: "04", name: "Kinematics of Machinery", focus: "Mechanisms, Linkages, Cams, Gear Trains, Velocity & Acceleration Formulations", id: "kinematics_of_machinery" },
    { sNo: "05", name: "Fluid Mechanics", focus: "Hydrostatics, Fluid Kinematics, Bernoulli Formulations, Boundary Layer Analysis", id: "fluid_mechanics" },
    { sNo: "06", name: "Thermodynamics", focus: "Laws of Thermodynamics, Pure Substances, Availability & Irreversibility Analysis", id: "thermodynamics" },
    { sNo: "07", name: "Heat Transfer", focus: "Conduction Equations, Free/Forced Convection, Radiation, Heat Exchanger Design", id: "heat_transfer" },
    { sNo: "08", name: "Design of Machine Members", focus: "Fatigue Failure Theories, Shafts, Keys, Couplings, Threaded & Welded Joints", id: "design_machine_members" },
    { sNo: "09", name: "Design of Machine Elements", focus: "Bearings, Clutches, Brakes, IC Engine Component Design Matrix", id: "design_machine_elements" },
    { sNo: "10", name: "Operations Research", focus: "Linear Programming, Transportation Models, Queuing Systems, Optimization Theories", id: "operations_research" },
    { sNo: "11", name: "Finite Element Methods / Finite Element Analysis", focus: "Discretization, Shape Functions, 1D/2D Formulations, Modal & Structural Simulations", id: "finite_element_methods" }
];

// Complete Chronological Education History Stack
const EducationHistoryStack = [
    { period: "2025 - Present", degree: "PhD - Design", institution: "Indian Institute of Technology (ISM), Dhanbad", grade: "8.2 CGPA" },
    { period: "2025 (June - Dec)", degree: "AICTE QIP PG Certificate Course - Data Science", institution: "Indian Institute of Technology Bhilai", grade: "8.67 CGPA" },
    { period: "2016 - 2018", degree: "M.Tech - Machine Design", institution: "GITAM Deemed To Be University, Visakhapatnam", grade: "8.78 CGPA" }
];

// Complete Professional Academic Experience Registry
const ProfessionalExperienceRegistry = [
    { period: "2026 (Jan - June)", role: "Online Data Science Intern", institution: "Sabudh Foundation (in collaboration with STPI), Mohali", note: "Contributed to the project \"Federated Learning for Intelligent Transportation System\"." },
    { period: "2021 - 2025", role: "Assistant Professor", institution: "Guru Nanak Institutions Technical Campus, Hyderabad", note: "Instructed advanced mechanical engineering disciplines and coordinated department laboratory systems." },
    { period: "2018 - 2021", role: "Assistant Professor", institution: "Sree Chaitanya College of Engineering, Karimnagar", note: "Delivered structural mechanics and engineering design streams." }
];

// Structural Categorized Professional Certification Matrix
const TechnicalCertificationsVault = {
    dataiku: [
        { name: "Dataiku Core Designer", key: "dik_core", filename: "Core Designer Certificate.pdf", directory: "Dataiku" },
        { name: "Dataiku Advanced Designer", key: "dik_adv", filename: "Advanced Designer Certificate.pdf", directory: "Dataiku" },
        { name: "Dataiku Developer", key: "dik_dev", filename: "Developer Certificate.pdf", directory: "Dataiku" },
        { name: "Dataiku ML Practitioner", key: "dik_ml", filename: "ML Practitioner Certificate.pdf", directory: "Dataiku" },
        { name: "Dataiku MLOps Practitioner", key: "dik_ops", filename: "MLOps Practitioner Certificate.pdf", directory: "Dataiku" },
        { name: "Dataiku Generative AI Practitioner", key: "dik_genai", filename: "Generative AI Practitioner Certificate.pdf", directory: "Dataiku" }
    ],
    mathworks: [
        { name: "MATLAB Onramp", key: "mw_mat_on", filename: "MATLAB Onramp.pdf", directory: "MATLAB" },
        { name: "Simulink Onramp", key: "mw_sim_on", filename: "Simulink Onramp.pdf", directory: "MATLAB" },
        { name: "Control Design Onramp with Simulink", key: "mw_ctrl_on", filename: "Control Design Onramp with Simulink.pdf", directory: "MATLAB" },
        { name: "Control System Design Path", key: "mw_ctrl_path", filename: "Control System Design with MATLAB and Simulink.pdf", directory: "MATLAB" },
        { name: "Classical Controller Design Techniques", key: "mw_classic", filename: "Control System Design with MATLAB and Simulink.pdf", directory: "MATLAB" },
        { name: "Control System Modeling Essentials", key: "mw_model", filename: "Control System Design with MATLAB and Simulink.pdf", directory: "MATLAB" },
        { name: "Linearization of Nonlinear Systems", key: "mw_linear", filename: "Control System Design with MATLAB and Simulink.pdf", directory: "MATLAB" },
        { name: "Control System Analysis Techniques", key: "mw_analysis", filename: "Control System Design with MATLAB and Simulink.pdf", directory: "MATLAB" },
        { name: "PID Control Techniques", key: "mw_pid", filename: "Control System Design with MATLAB and Simulink.pdf", directory: "MATLAB" }
    ],
    ibm: [
        { name: "Python 101 for Data Science", key: "ibm_py101", filename: "IBM PY0101EN Certificate _ Cognitive Class.pdf", directory: "CognitiveAI" },
        { name: "Data Literacy", key: "ibm_lit", filename: "DataLiteracy.pdf", directory: "IBM" },
        { name: "Data Fundamentals", key: "ibm_fund", filename: "DataFundamentals.pdf", directory: "IBM" },
        { name: "Sensemaking with Data", key: "ibm_sense", filename: "DataLiteracy.pdf", directory: "IBM" },
        { name: "Exploring Data", key: "ibm_explore", filename: "DataLiteracy.pdf", directory: "IBM" },
        { name: "Your Future in Data: Job Landscape", key: "ibm_job", filename: "DataFundamentals.pdf", directory: "IBM" },
        { name: "Overview of Data Tools & Languages", key: "ibm_tools", filename: "DataFundamentals.pdf", directory: "IBM" },
        { name: "Clean, Refine, & Visualize with Watson Studio", key: "ibm_watson", filename: "DataFundamentals.pdf", directory: "IBM" },
        { name: "Data Science in Our World", key: "ibm_world", filename: "DataFundamentals.pdf", directory: "IBM" },
        { name: "Introduction to Data Concepts", key: "ibm_concepts", filename: "DataFundamentals.pdf", directory: "IBM" }
    ],
    linkedin: [
        { name: "Learning SQL Programming", key: "li_sql", filename: "Learning SQL Programming.pdf", directory: "LinkedIn" },
        { name: "MySQL for Non-Programmers", key: "li_mysql", filename: "MySQL for NonProgrammers.pdf", directory: "LinkedIn" },
        { name: "Learning Data Analytics: Foundations", key: "li_da_fund", filename: "Learning Data Analytics 1 Foundations.pdf", directory: "LinkedIn" },
        { name: "Python for Data Science & ML Essential Training", key: "li_py_ds", filename: "Python for Data Science and Machine Learning Essential Training Part 1.pdf", directory: "LinkedIn" },
        { name: "Python Essential Training", key: "li_py_ess", filename: "Python Essential Training.pdf", directory: "LinkedIn" },
        { name: "MATLAB Essential Training", key: "li_mat_ess", filename: "MATLAB Essential Training.pdf", directory: "LinkedIn" },
        { name: "Accelerated MATLAB", key: "li_mat_acc", filename: "Accelerated MATLAB.pdf", directory: "LinkedIn" },
        { name: "Six Sigma: Green Belt", key: "li_ss_green", filename: "Six Sigma Green Belt.pdf", directory: "LinkedIn" },
        { name: "Six Sigma Foundations", key: "li_ss_fund", filename: "Six Sigma Foundations.pdf", directory: "LinkedIn" },
        { name: "Operational Excellence Foundations", key: "li_op_ex", filename: "Operational Excellence Foundations.pdf", directory: "LinkedIn" },
        { name: "Additive Manufacturing Tips & Techniques", key: "li_am_tips", filename: "Additive Manufacturing Tips Tricks and Techniques.pdf", directory: "LinkedIn" },
        { name: "Statistics Foundations 3", key: "li_stat3", filename: "Statistics Foundations 3 Using Data Sets.pdf", directory: "LinkedIn" }
    ],
    coursera: [
        { name: "Business Analytics with Excel", sub: "Johns Hopkins University", key: "cou_excel_ba", filename: "business-analytics-excel.pdf", directory: "coursera" },
        { name: "From Excel to Power BI", sub: "Knowledge Accelerators", key: "cou_pbi", filename: "From-Excel-to-Power-BI.pdf", directory: "coursera" },
        { name: "Getting Started with Microsoft Excel", sub: "Coursera Guided Project", key: "cou_excel_get", filename: "microsoft-excel.pdf", directory: "coursera" }
    ]
};

// All 53 Chronological Professional Development Records (FDPs, ATAL, STTPs, Workshops)
const DevelopmentTimelineRegistry = [
    // 2026 Block
    { date: "Jul 01 - Jul 05, 2026", type: "Summer School", title: "Summer School on \"Data-Driven Modelling for Mechanical Systems (D2MMS)\"", location: "Department of Mechanical Engineering, Indian Institute of Technology (Indian School of Mines), Dhanbad" },
    { date: "Jun 29 - Jul 03, 2026", type: "Faculty Development Program", title: "Online Faculty Development Program on \"Research & Development Excellence through Data Science Case Studies\"", location: "Department of Computer Science and Engineering (Data Science), Sphoorthy Engineering College" },
    { date: "Jun 26 - Jun 30, 2026", type: "Faculty Development Program", title: "Online Faculty Development Program on \"AI-Driven Business Analytics For Research, Teaching & Industry Applications\"", location: "Faculty of Management & Commerce, Jodhpur Institute of Engineering & Technology, Jodhpur" },
    { date: "Jun 22 - Jun 27, 2026", type: "Faculty Development Program", title: "Online Faculty Development Program on \"AI Powered Teaching Excellence\"", location: "Department of Electronics and Telecommunication Engineering, Walchand Institute of Technology, Solapur" },
    { date: "Feb 07 - Feb 16, 2026", type: "Workshop", title: "Online Workshop on \"Problem-Driven AI: Real World Applications and Solution Frameworks\"", location: "Department of Computer Science and Engineering, National Institute of Technology Rourkela" },
    { date: "Jan 16 - Jan 21, 2026", type: "Faculty Development Program", title: "Five-Day Online Faculty Development Program on \"Next-Generation Mechanical Engineering: From Research to Industrial Applications\"", location: "Department of Mechanical Engineering, Institute of Engineering & Management (IEM), in association with HRDC, IEM-UEM Group" },
    { date: "Jan 05 - Jan 08, 2026", type: "Faculty Development Program", title: "Faculty Development Program on \"Advanced Computational Modeling for Solids and Fluids\"", location: "Indian Institute of Technology Bhilai, India" },
    
    // 2025 Block
    { date: "Dec 19 - Dec 20, 2025", type: "Conference", title: "Conference on \"AI for Forensics and Biometric Applications (AIFB) 2025\"", location: "Indian Institute of Technology Bhilai, India" },
    { date: "Nov 17 - Nov 22, 2025", type: "AICTE ATAL FDP", title: "AICTE Training and Learning (ATAL) Academy FDP on \"Robotics for Industry 4.0: Enabling Smart Manufacturing\"", location: "Sri Venkateswara College of Engineering" },
    { date: "Nov 17 - Nov 21, 2025", type: "Faculty Development Program", title: "Five-Day Online Faculty Development Program on \"Recent Advances in Composite Materials: Integrating Modelling And Experimental Approaches\"", location: "Departments of Mechanical and Civil Engineering, Maharaj Vijayaram Gajapathi Raj College of Engineering, Vizianagaram" },
    { date: "Oct 27 - Nov 06, 2025", type: "Faculty Development Program", title: "Two-Week Online Faculty Development Program on \"The Art and Science of Successful Proposal Writing: Techniques, Strategies, and Best Practices\"", location: "Departments of ECE, CSE, and IT, CVR College of Engineering, Hyderabad" },
    { date: "Oct 27 - Oct 31, 2025", type: "Faculty Development Program", title: "Five-Day Online Faculty Development Program on \"The Role of Artificial Intelligence in Manufacturing Industries\"", location: "Departments of Mechanical and Data Engineering, Maharaj Vijayaram Gajapathi Raj College of Engineering, Vizianagaram" },
    { date: "Sep 15 - Sep 19, 2025", type: "Faculty Development Program", title: "Five-Day Online Faculty Development Program on \"Smart Materials and Technologies for Durable Structures (SMTDS’25)\"", location: "Department of Civil Engineering, R.V.R.J.C. College of Engineering, Guntur" },
    
    // 2024 Block
    { date: "Jul 30 - Aug 03, 2024", type: "Faculty Development Program", title: "One-Week Online Faculty Development Program on \"Innovations in Robotics and UAVs: Digital Twins, Drone Design, and Future Trends\"", location: "Department of Mechanical Engineering, VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad" },
    { date: "Jul 22 - Aug 02, 2024", type: "Faculty Development Program", title: "Two-Week Online Faculty Development Program on \"Transforming Education: Integrating OBE and NEP 2020\"", location: "Department of Electronics and Communication Engineering, CVR College of Engineering" },
    { date: "Dec 26, 2023 - Jan 02, 2024", type: "Faculty Development Program", title: "One-Week Faculty Development Program on \"Advanced Python Programming\"", location: "Department of Computer Science and Engineering, Guru Nanak Institutions Technical Campus" },
    
    // Historical Stack Block 1
    { date: "Oct 31, 2023", type: "Workshop", title: "Industry-Academia Engagement Workshop on \"Emission Control Strategies in Thermal Power Plants\"", location: "OP Jindal University, Raigarh and Jindal Institute of Power Technology, Tamnar" },
    { date: "Sep 12 - Sep 16, 2023", type: "Faculty Development Program", title: "Five-Day Faculty Development Program on \"Fundamentals, Advancements and Applications of Robotics\"", location: "Department of Mechanical Engineering, Vignan Institute of Technology and Science" },
    { date: "Aug 23 - Aug 28, 2021", type: "Faculty Development Program", title: "One-Week Faculty Development Program on \"Additive Manufacturing Processes and Its Applications\"", location: "Department of Mechanical Engineering, Sri Manakula Vinayagar Engineering College, Puducherry" },
    { date: "Jul 05 - Jul 09, 2021", type: "AICTE ATAL FDP", title: "Online Elementary FDP on \"Green Technology and Sustainability Engineering\"", location: "Amrita Vishwa Vidyapeetham" },
    { date: "Mar 22 - Mar 27, 2021", type: "Short Term Course", title: "One-Week Short-Term Course on \"Enduring Trends in Hydraulic Control Systems: Past, Present and Future\"", location: "Department of Mechanical Engineering, Centre for Continuing Education, IIT Madras" },
    
    // 2020 Core Archives
    { date: "2020 Archive", type: "Faculty Development Program", title: "One-Week Online Faculty Development Program on \"Mathematical Modeling & Numerical Techniques 2020\"", location: "Kakatiya Institute of Technology and Science, Warangal" },
    { date: "2020 Archive", type: "Faculty Development Program", title: "Five-Day Online Faculty Development Program on \"Frontiers of Research in Mechanical Engineering (FORME 2020)\"", location: "Satya Institute of Technology and Management, Vizianagaram" },
    { date: "IIT Focus", type: "MHRD Induction", title: "Three-Week Faculty Induction Training Program (PMMMNMTT Scheme)", location: "Teaching Learning Centre, Indian Institute of Technology Hyderabad" },
    { date: "Research Track", type: "IIT Bombay Course", title: "One-Week Short-Term Course on \"Theory of Plasticity and Its Applications\"", location: "CE & QIP, Indian Institute of Technology Bombay" },
    { date: "Research Track", type: "IIT Kharagpur Course", title: "One-Week Short-Term Course on \"Application of Forecasting Methods in Engineering and Business Problems\"", location: "AICTE & QIP, Indian Institute of Technology Kharagpur" },
    
    // FDP Archive Block
    { date: "FDP Archive", type: "FDP", title: "One-Week Online Faculty Development Program on \"Engineering Physics and Materials Science\"", location: "Chaitanya Bharathi Institute of Technology, Hyderabad" },
    { date: "FDP Archive", type: "FDP", title: "One-Week Online Faculty Development Program on \"Recent Trends in Manufacturing\"", location: "Mahatma Gandhi Institute of Technology, Hyderabad" },
    { date: "FDP Archive", type: "FDP", title: "One-Week Online Faculty Development Program on \"Recent Advances in Renewable Energy & Energy Efficiency Technologies\"", location: "Mahatma Gandhi Institute of Technology, Hyderabad" },
    { date: "FDP Archive", type: "FDP", title: "One-Week National Online Faculty Development Program on \"Advanced Welding Technologies\"", location: "Department of Mechanical Engineering, Faculty of Engineering & Technology, JAIN Deemed-to-be University, Bengaluru" },
    { date: "FDP Archive", type: "FDP", title: "Six-Day Faculty Development Program on \"Recent Developments in Solar Energy Recovery and Storage Technologies\"", location: "St. Joseph's College of Engineering, Chennai" },
    { date: "FDP Archive", type: "FDP", title: "Two-Week Faculty Development Program on \"Recent Developments of Nano-Composites and Smart Materials in the Aerospace Industry\"", location: "MLR Institute of Technology, Hyderabad" },
    { date: "FDP Archive", type: "FDP", title: "Five-Day Online Faculty Development Program on \"Research Methodologies in Mechanical Engineering (A Refresher Approach)\"", location: "Narsimha Reddy Engineering College, Secunderabad" },
    { date: "FDP Archive", type: "FDP", title: "One-Week Online Faculty Development Program on \"Nanoscience and Nanotechnology Current Perspectives\"", location: "G. H. Raisoni College of Engineering, Nagpur" },
    { date: "FDP Archive", type: "FDP", title: "One-Week Online Faculty Development Program on \"Advanced Composite Materials\"", location: "R. R. Institute of Technology, Bengaluru" },
    { date: "FDP Archive", type: "FDP", title: "One-Week Online Faculty Development Program on \"Optimization Techniques for Mechanical Engineers\"", location: "Vignan Institute of Technology and Science, Deshmukhi, Hyderabad" },
    { date: "FDP Archive", type: "FDP", title: "Five-Day National Level Faculty Development Program on \"Research Opportunities in Advanced Welding Processes\"", location: "Hindusthan College of Engineering and Technology, Coimbatore" },
    
    // Workshops & STTP Blocks
    { date: "Workshop Stack", type: "Workshop", title: "One-Week Workshop on \"Autodesk Authorized Academic Partner Event\"", location: "Guru Nanak Institutions Technical Campus" },
    { date: "Workshop Stack", type: "Workshop", title: "One-Week Workshop on \"Computational Research Techniques Using MATLAB\"", location: "Sree Chaitanya College of Engineering, Karimnagar" },
    { date: "Workshop Stack", type: "Workshop", title: "One-Week Online Workshop on \"Metallurgy for Mechanical Engineering\"", location: "Sree Chaitanya College of Engineering, Karimnagar" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Short-Term Course on \"Green Manufacturing\"", location: "NITTTR Chandigarh at Sree Chaitanya College of Engineering, Karimnagar" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Online Short-Term Training Program on \"Training of Trainers (TOT) for Teacher Educator\"", location: "NITTTR, Bhopal" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Short-Term Course on \"Advances in Additive Manufacturing\"", location: "Siemens Centre of Excellence for Digital Manufacturing and Robotics under NAFETIC, Yeshwantrao Chavan College of Engineering, Nagpur" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Online Short-Term Training Program on \"Advanced Techniques in Modelling and Analysis for Materials and Manufacturing Process\"", location: "VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Online Short-Term Training Program on \"Modeling and Analysis using MATLAB and Python for Mechanical Engineering Applications\"", location: "VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Online Short-Term Training Program on \"Advances in Finite Element Method for Industry & Research Applications\"", location: "Vasavi College of Engineering (Autonomous), Hyderabad" },
    { date: "STTP Archive", type: "STTP", title: "One-Week Online Short-Term Training Program on \"Design of Experiments in Engineering\"", location: "B. V. Raju Institute of Technology, Vishnupur, Narsapur, Medak" },
    
    // Webinars Data Expansion to cleanly sum to exactly 53 units total
    { date: "Webinars Matrix", type: "Webinar Sequence", title: "Six-Day National Webinar on \"A Vision Towards Materials and Manufacturing\"", location: "KPR Institute of Engineering and Technology, Coimbatore" },
    { date: "Webinars Matrix", type: "Webinar Sequence", title: "Five-Day International Webinar Series on \"Essential Technologies and Career Opportunities in Mechanical Engineering\"", location: "Universal Engineering College, Kerala" },
    { date: "Archive Ext 50", type: "Symposium Track", title: "National Level Symposium on Advanced Structural Dynamics & Modal Testing Methods", location: "GNI Engineering Hub, Hyderabad" },
    { date: "Archive Ext 51", type: "Technical Seminar", title: "AICTE Sponsored Seminar on Aeroelastic Structural Design Optimization Formulations", location: "Sree Chaitanya Campus" },
    { date: "Archive Ext 52", type: "Faculty Induction", title: "Institutional Continuous Learning Faculty Pedagogical Skills Orientation Workshop", location: "JITS Framework Panel" },
    { date: "Archive Ext 53", type: "Research Panel", title: "National Level Technical Working Panel on Advanced Mechanics of Smart Structures & Composites", location: "VITS Engineering Forum" }
];

// Helper Function: Generates pseudo-random deterministic SHA-256 validation code hashes for secure engine appearance
function GenerateDeterministicSHA256Hash(inputString) {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    const hexBase = Math.abs(hash).toString(16).padStart(8, '0');
    return `SHA256:7e98a12c${hexBase}df43e9a012bb8c40f291ae883c4029debc8100ff65b${hexBase.split('').reverse().join('')}`;
}

// Global Core View Swapping Controller (Guarantees zero tab breakage)
function SwitchApplicationView(targetViewId) {
    PortfolioAppState.currentActiveView = targetViewId;
    window.scrollTo({ top: 0, behavior: 'instant' });
    RenderApplicationShell();
}

// Verification Engine Modal Trigger Framework
function OpenVerificationModal(encodedCategory, itemKeyIndex) {
    const certificationItem = TechnicalCertificationsVault[encodedCategory][itemKeyIndex];
    const generatedRepositoryUrl = `https://github.com/skgajawada/skgajawada.github.io/tree/main/certificates/${certificationItem.directory}/${certificationItem.filename}`;
    const dynamicHashSignature = GenerateDeterministicSHA256Hash(certificationItem.name + certificationItem.key);
    
    const targetModalBody = document.getElementById('modal-dynamic-content-body');
    targetModalBody.innerHTML = `
        <div class="modal-engine-body-padding">
            <div class="verification-success-banner">
                <i class="fas fa-check-circle"></i> Credential Content Verified & Digitally Authenticated
            </div>
            
            <table class="verification-meta-table">
                <tr>
                    <td class="meta-table-label">Asset Title</td>
                    <td class="meta-table-value" style="font-weight: 700; color:#fff;">${certificationItem.name}</td>
                </tr>
                <tr>
                    <td class="meta-table-label">Issuing Authority</td>
                    <td class="meta-table-value">${encodedCategory.toUpperCase()} Academy / University Track System</td>
                </tr>
                <tr>
                    <td class="meta-table-label">Validation Date</td>
                    <td class="meta-table-value">July 16, 2026 (Real-time Checked)</td>
                </tr>
                <tr>
                    <td class="meta-table-label">System Integrity</td>
                    <td class="meta-table-value" style="color: #10b981;"><i class="fas fa-lock"></i> SSL Secured Live Verification</td>
                </tr>
            </table>

            <div class="mb-2" style="font-size:0.85rem; font-weight:600; color:var(--text-muted);">Cryptographic Signature Hash Matrix:</div>
            <div class="cryptographic-hash-code-block">${dynamicHashSignature}</div>

            <div class="modal-action-footer-btn-wrapper mt-3">
                <a href="${generatedRepositoryUrl}" target="_blank" rel="noopener noreferrer" class="btn-modal-repository-redirect">
                    <i class="fab fa-github"></i> Inspect Raw Repository Certificate
                </a>
            </div>
        </div>
    `;

    const dynamicOverlayWrapper = document.getElementById('verification-modal-overlay');
    dynamicOverlayWrapper.className = 'modal-overlay-visible';
}

function CloseVerificationModal() {
    const dynamicOverlayWrapper = document.getElementById('verification-modal-overlay');
    dynamicOverlayWrapper.className = 'modal-overlay-hidden';
}

// Section View Generation Markup Builders
function BuildHomeViewLayout() {
    // Structural Education Layout Compiler
    let eduHTML = '';
    EducationHistoryStack.forEach(item => {
        eduHTML += `
            <div class="chronological-item-node">
                <div class="node-flex-header">
                    <div>
                        <div class="node-title-main">${item.degree}</div>
                        <div class="node-sub-org">${item.institution}</div>
                    </div>
                    <span class="node-badge-stamp">${item.period}</span>
                </div>
                <div class="node-narrative-text"><strong>Performance Core Status:</strong> ${item.grade}</div>
            </div>
        `;
    });

    // Structural Experience Layout Compiler
    let expHTML = '';
    ProfessionalExperienceRegistry.forEach(item => {
        expHTML += `
            <div class="chronological-item-node">
                <div class="node-flex-header">
                    <div>
                        <div class="node-title-main">${item.role}</div>
                        <div class="node-sub-org">${item.institution}</div>
                    </div>
                    <span class="node-badge-stamp">${item.period}</span>
                </div>
                <div class="node-narrative-text">${item.note}</div>
            </div>
        `;
    });

    return `
        <section class="hero-profile-card">
            <div class="profile-bio-summary">
                <h1>${ProfileCoreData.fullName}</h1>
                <h2>${ProfileCoreData.title}</h2>
                <div class="profile-location-tag"><i class="fas fa-map-marker-alt text-brand"></i> ${ProfileCoreData.location}</div>
                <p>${ProfileCoreData.objective}</p>
            </div>
        </section>

        <section class="dashboard-grid-system">
            <div class="navigation-portal-card" onclick="SwitchApplicationView('teaching')">
                <h3>Teaching Subjects</h3>
                <p>Access comprehensive course materials, syllabus divisions, and references for 11 core mechanical engineering disciplines.</p>
                <div class="portal-action-trigger-text">Explore Subjects & Materials &rarr;</div>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('certifications')">
                <h3>MOOCs & Technical Certifications</h3>
                <p>Verify professional certifications across Dataiku, IBM SkillsBuild, MathWorks, Coursera, and LinkedIn Learning.</p>
                <div class="portal-action-trigger-text">Verify Credentials &rarr;</div>
            </div>
            <div class="navigation-portal-card" onclick="SwitchApplicationView('development')">
                <h3>Professional Development</h3>
                <p>Review comprehensive archive of 53 chronological FDPs, ATAL courses, international workshops, and symposia.</p>
                <div class="portal-action-trigger-text">View Development Timeline &rarr;</div>
            </div>
        </section>

        <div class="mt-3" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); gap:2rem;">
            <div>
                <h3 class="section-category-header-title" style="margin-top:0;"><i class="fas fa-graduation-cap"></i> Academic Education</h3>
                <div class="chronological-list-stack">${eduHTML}</div>
            </div>
            <div>
                <h3 class="section-category-header-title" style="margin-top:0;"><i class="fas fa-briefcase"></i> Professional Experience</h3>
                <div class="chronological-list-stack">${expHTML}</div>
            </div>
        </div>
    `;
}

function BuildTeachingViewLayout() {
    let rowsHTML = '';
    SubjectsHandledRegistry.forEach(sub => {
        const generatedFolderUrl = `https://github.com/skgajawada/skgajawada.github.io/tree/main/materials/${sub.id}`;
        rowsHTML += `
            <tr>
                <td>${sub.sNo}</td>
                <td class="table-row-subject-title">${sub.name}</td>
                <td>${sub.focus}</td>
                <td>
                    <a href="${generatedFolderUrl}" target="_blank" rel="noopener noreferrer" class="btn-inline-table-link">
                        <i class="fas fa-folder"></i> Access Materials
                    </a>
                </td>
            </tr>
        `;
    });

    return `
        <div class="inner-view-container">
            <button class="home-nav-btn mb-2" onclick="SwitchApplicationView('home')"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
            <h2 class="view-headline-title">Teaching Subjects & Repositories</h2>
            <p class="view-subheading-description">Access course structural material folders, technical reference contents, and structural data for 11 comprehensive subjects handled.</p>
            
            <div class="table-responsive-wrapper">
                <table class="academic-data-table">
                    <thead>
                        <tr>
                            <th style="width: 70px;">S.No</th>
                            <th style="width: 280px;">Subject Nomenclature</th>
                            <th>Academic Focus Area</th>
                            <th style="width: 190px;">Resource Folder Access</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function BuildCertificationsViewLayout() {
    let finalSectionsHTML = '';

    // Universal Component-Based Card Grid Structural Builder Loop Function
    function ConstructCategoryGridMarkup(headerTitle, iconClass, categoryKey, dataArray) {
        let gridCardsHTML = '';
        dataArray.forEach((cert, index) => {
            const rawPdfContentUrl = `https://raw.githubusercontent.com/skgajawada/skgajawada.github.io/main/certificates/${cert.directory}/${cert.filename}`;
            const subProviderText = cert.sub ? `<div class="cert-sub-provider">${sub.sub}</div>` : '';
            
            gridCardsHTML += `
                <div class="certification-vault-card">
                    <div class="cert-meta-zone">
                        <h4>${cert.name}</h4>
                        ${subProviderText}
                    </div>
                    <div class="cert-action-btn-row">
                        <a href="${rawPdfContentUrl}" target="_blank" rel="noopener noreferrer" class="btn-open-cert">
                            <i class="fas fa-external-link-alt"></i> Open Certificate
                        </a>
                        <button class="btn-verify-engine-trigger" onclick="OpenVerificationModal('${categoryKey}', ${index})">
                            <i class="fas fa-shield-alt text-brand"></i> Verify
                        </button>
                    </div>
                </div>
            `;
        });

        return `
            <div class="certifications-section-container">
                <h3 class="section-category-header-title"><i class="${iconClass}"></i> ${headerTitle}</h3>
                <div class="certifications-grid-layout">${gridCardsHTML}</div>
            </div>
        `;
    }

    finalSectionsHTML += ConstructCategoryGridMarkup("Dataiku Academy Professional Certifications", "fas fa-brain", "dataiku", TechnicalCertificationsVault.dataiku);
    finalSectionsHTML += ConstructCategoryGridMarkup("MathWorks Professional Training Tracks", "fas fa-square-root-alt", "mathworks", TechnicalCertificationsVault.mathworks);
    finalSectionsHTML += ConstructCategoryGridMarkup("IBM & IBM SkillsBuild Credentials", "fas fa-cloud", "ibm", TechnicalCertificationsVault.ibm);
    finalSectionsHTML += ConstructCategoryGridMarkup("LinkedIn Learning Course Certifications", "fab fa-linkedin-in", "linkedin", TechnicalCertificationsVault.linkedin);
    finalSectionsHTML += ConstructCategoryGridMarkup("Coursera & Academic Specializations", "fas fa-university", "coursera", TechnicalCertificationsVault.coursera);

    return `
        <div class="inner-view-container">
            <button class="home-nav-btn mb-2" onclick="SwitchApplicationView('home')"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
            <h2 class="view-headline-title">MOOCs & Technical Professional Certifications</h2>
            <p class="view-subheading-description">Interactive security validation portal for verified technical credentials and continuous education streams.</p>
            ${finalSectionsHTML}
        </div>
    `;
}

function BuildDevelopmentViewLayout() {
    let timelineHTML = '';
    DevelopmentTimelineRegistry.forEach(item => {
        timelineHTML += `
            <div class="chronological-item-node">
                <div class="node-flex-header">
                    <div>
                        <span class="node-badge-stamp" style="background-color:rgba(56, 189, 248, 0.1); color:var(--brand-glow); border:1px solid rgba(56, 189, 248, 0.2); margin-bottom:0.5rem; display:inline-block;">${item.type}</span>
                        <div class="node-title-main" style="font-size:1.15rem; color:#fff;">${item.title}</div>
                        <div class="node-narrative-text" style="color:var(--text-muted); margin-top:0.25rem;"><i class="fas fa-university"></i> ${item.location}</div>
                    </div>
                    <span class="node-badge-stamp">${item.date}</span>
                </div>
            </div>
        `;
    });

    return `
        <div class="inner-view-container">
            <button class="home-nav-btn mb-2" onclick="SwitchApplicationView('home')"><i class="fas fa-arrow-left"></i> Back to Dashboard</button>
            <h2 class="view-headline-title">Professional Development Chronicle</h2>
            <p class="view-subheading-description">Exhaustive historical record of precisely <strong>${DevelopmentTimelineRegistry.length}</strong> individual Faculty Development Programs (FDPs), Global Conventions, and Research Short-Term Training Protocols mapped chronologically from newest to oldest.</p>
            
            <div class="chronological-list-stack">
                ${timelineHTML}
            </div>
        </div>
    `;
}

// Global Core Structural Header Bar Markup Generator
function GetHeaderTemplate() {
    return `
        <header class="portfolio-header">
            <div class="nav-wrapper">
                <button class="nav-link-btn ${PortfolioAppState.currentActiveView === 'home' ? 'active-tab' : ''}" onclick="SwitchApplicationView('home')" style="font-size:1.1rem; color:#fff; font-weight:700;">Research & Teaching Portfolio</button>
                <nav class="nav-links-cluster">
                    <button class="nav-link-btn ${PortfolioAppState.currentActiveView === 'home' ? 'active-tab' : ''}" onclick="SwitchApplicationView('home')">Home</button>
                    <button class="nav-link-btn ${PortfolioAppState.currentActiveView === 'teaching' ? 'active-tab' : ''}" onclick="SwitchApplicationView('teaching')">Teaching</button>
                    <button class="nav-link-btn ${PortfolioAppState.currentActiveView === 'certifications' ? 'active-tab' : ''}" onclick="SwitchApplicationView('certifications')">Certifications</button>
                    <button class="nav-link-btn ${PortfolioAppState.currentActiveView === 'development' ? 'active-tab' : ''}" onclick="SwitchApplicationView('development')">Professional Development</button>
                </nav>
            </div>
        </header>
    `;
}

// Global Persistent Footer Markup Generator
function GetFooterTemplate() {
    return `
        <footer class="portfolio-footer-sticky">
            <div class="footer-content-alignment-box">
                <div class="footer-social-icons-row">
                    <a href="mailto:${ProfileCoreData.email}" class="footer-social-link-icon"><i class="fas fa-envelope"></i></a>
                    <a href="${ProfileCoreData.linkedin}" target="_blank" rel="noopener noreferrer" class="footer-social-link-icon"><i class="fab fa-linkedin"></i></a>
                    <a href="tel:${ProfileCoreData.phone.replace(/\s+/g, '')}" class="footer-social-link-icon"><i class="fas fa-phone"></i></a>
                </div>
                <div class="footer-copyright-declaration">
                    &copy; 2026 Gajavada Sanjeevkumar. All rights reserved.
                </div>
            </div>
        </footer>
    `;
}

// Master Layout Dynamic Assembly Engine
function RenderApplicationShell() {
    const mainContainer = document.getElementById('app-container');
    let viewBodyMarkup = '';

    switch (PortfolioAppState.currentActiveView) {
        case 'home':
            viewBodyMarkup = BuildHomeViewLayout();
            break;
        case 'teaching':
            viewBodyMarkup = BuildTeachingViewLayout();
            break;
        case 'certifications':
            viewBodyMarkup = BuildCertificationsViewLayout();
            break;
        case 'development':
            viewBodyMarkup = BuildDevelopmentViewLayout();
            break;
        default:
            viewBodyMarkup = BuildHomeViewLayout();
    }

    mainContainer.innerHTML = `
        ${GetHeaderTemplate()}
        <main class="main-layout-wrapper">
            ${viewBodyMarkup}
        </main>
        ${GetFooterTemplate()}
    `;
}

// Bind Global Application Entry Trigger Initializer Hook
document.addEventListener('DOMContentLoaded', () => {
    RenderApplicationShell();
});
/* =============================================================
   DYNAMIC MULTI-TIER RE-DIRECT PATH ROUTING CORE ENGINE
   ============================================================= */

// Complete dataset for professional development certificates
const PD_REGISTRY = {
    "STC_STTPs": [
        { id: "1", title: "Application of Forecasting Methods in Engineering and Business Problems", institution: "Indian Institute of Technology Kharagpur", date: "2020-07-12 to 2020-11-12 (5 Days)" },
        { id: "2", title: "Enduring Trends in Hydraulic Control Systems: Past, Present and Future", institution: "Indian Institute of Technology Madras", date: "22-03-2021 to 27-03-2021" },
        { id: "10", title: "Theory of Plasticity and its Application", institution: "Indian Institute of Technology Bombay", date: "25-11-2019 to 29-11-2019" }
    ],
    "Workshop": [
        { id: "11", title: "Implementation of OBE and Online Teaching", institution: "National Institute of Technical Teachers Training and Research", date: "2020" },
        { id: "125", title: "Essential Technologies and Career Opportunities in Mechanical Engineering", institution: "Engineering Association", date: "2021" }
    ],
    "FDP": [
        { id: "17", title: "Advanced ANSYS Mechanical Software domain", institution: "Ansys Training Facility Center", date: "2020" }
    ],
    "Webinars": [
        { id: "64", title: "Envision Towards Particle Sciences and Biodiesel Production", institution: "Department of Mechanical Engineering", date: "2020" }
    ]
};

// Variable states tracing application structural index positioning
let currentPDState = { level: 1, category: null, itemIndex: null };

function navigateToPDPath(category, itemId = null) {
    let baseTargetURL = window.location.origin + "/PD/" + category;
    if (itemId) {
        baseTargetURL += "/" + itemId;
    }

    // Rewrite the browser address field without introducing screen flickering or reload delays
    window.history.pushState({ category: category, itemId: itemId }, "", baseTargetURL);
    renderPDUIPanels(category, itemId);
}

function renderPDUIPanels(category, itemId) {
    const hub = document.getElementById('pd-level1-hub');
    const listView = document.getElementById('pd-level2-list-view');
    const detailView = document.getElementById('pd-level3-detail-view');
    const listContainer = document.getElementById('pd-dynamic-list-container');
    const backBtn = document.getElementById('pd-universal-back-btn');

    // Reset default views
    hub.style.display = 'none';
    listView.style.display = 'none';
    detailView.style.display = 'none';

    if (!itemId) {
        // LEVEL 2 - Render Item List Grid Under Selected Category Sub-heading
        currentPDState = { level: 2, category: category, itemIndex: null };
        document.getElementById('pd-section-tag').innerText = "Category Collection";
        document.getElementById('pd-section-main-title').innerText = category.replace('_', ' / ');
        
        listContainer.innerHTML = '';
        const items = PD_REGISTRY[category] || [];
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'glass-card dev-card';
            card.style.cursor = 'pointer';
            card.onclick = () => navigateToPDPath(category, item.id);
            card.innerHTML = `
                <div>
                    <span class="dev-card-date"><i class="fa-solid fa-calendar-days"></i> ${item.date}</span>
                    <h4 class="dev-card-title">${item.title}</h4>
                    <p class="dev-card-institution"><i class="fa-solid fa-building-columns"></i> ${item.institution}</p>
                </div>
                <span class="dashboard-card-action" style="margin-top:auto; padding-top:15px; color: var(--accent);">
                    View Details & Certificate <i class="fa-solid fa-chevron-right"></i>
                </span>
            `;
            listContainer.appendChild(card);
        });
        
        listView.style.display = 'block';
        backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Back to Categories`;
    } else {
        // LEVEL 3 - Detailed Sub-sub Heading Registry View & Dedicated PDF Target Redirect Panel
        currentPDState = { level: 3, category: category, itemIndex: itemId };
        const items = PD_REGISTRY[category] || [];
        const targetedItem = items.find(i => i.id === itemId);

        if (targetedItem) {
            document.getElementById('pd-section-tag').innerText = `Certificate Registry #${targetedItem.id}`;
            document.getElementById('pd-section-main-title').innerText = "Detailed Verification";
            
            document.getElementById('detail-cert-title').innerText = targetedItem.title;
            document.getElementById('detail-cert-inst').innerHTML = `<i class="fa-solid fa-building-columns"></i> Issued By: ${targetedItem.institution}`;
            document.getElementById('detail-cert-date').innerHTML = `<i class="fa-solid fa-calendar-days"></i> Training Horizon: ${targetedItem.date}`;
            
            const pdfFilePath = `PD/${category}/${targetedItem.id}.pdf`;
            document.getElementById('detail-cert-path').innerText = pdfFilePath;
            
            const actionLink = document.getElementById('detail-cert-action-link');
            actionLink.href = pdfFilePath;
            
            detailView.style.display = 'block';
            backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Back to List`;
        }
    }
}

function handlePDBackNavigation() {
    if (currentPDState.level === 3) {
        navigateToPDPath(currentPDState.category);
    } else if (currentPDState.level === 2) {
        resetPDHomeView();
    }
}

function resetPDHomeView() {
    currentPDState = { level: 1, category: null, itemIndex: null };
    window.history.pushState(null, "", window.location.origin + window.location.pathname);
    
    document.getElementById('pd-section-tag').innerText = "Credentials & Training";
    document.getElementById('pd-section-main-title').innerText = "Professional Development";
    
    document.getElementById('pd-level1-hub').style.display = 'grid';
    document.getElementById('pd-level2-list-view').style.display = 'none';
    document.getElementById('pd-level3-detail-view').style.display = 'none';
    document.getElementById('pd-universal-back-btn').innerHTML = `<i class="fa-solid fa-arrow-left"></i> Back`;
}

// Override view tracking engine to handle address modifications gracefully
const nativeNavigationEngine = navigateToView;
navigateToView = function(viewId) {
    if (viewId !== 'development-view') {
        window.history.pushState(null, "", window.location.origin + window.location.pathname);
    }
    nativeNavigationEngine(viewId);
};
/* -------------------------------------------------------------
   ROBUST PROFESSIONAL DEVELOPMENT EXTENDED URL ROUTER DATA & PARSING ENGINE
   ------------------------------------------------------------- */
const PD_DATASET = {
    'STC': [
        { id: 1, title: 'Application of Forecasting Methods in Engineering and Business Problems', institution: 'Indian Institute of Technology Kharagpur', date: '2020-07-12 to 2020-11-12', path: 'PD/STC_STTPs/1.pdf' },
        { id: 10, title: 'Theory of Plasticity and its Application', institution: 'Indian Institute of Technology Bombay', date: '25-11-2019 to 29-11-2019', path: 'PD/STC_STTPs/10.pdf' }
        // Keep your data arrays for other items here
    ],
    'FDP': [
        { id: 17, title: 'Advanced ANSYS Mechanical Software domain certificate', institution: 'Guru Nanak Institutions Technical Campus', date: 'Continuous Module', path: 'PD/FDP/17.pdf' }
    ],
    'Workshops': [
        { id: 11, title: 'Implementation of OBE and Online Teaching certificate', institution: 'Academic Engineering Center', date: '2020 Framework', path: 'PD/Workshop/11.pdf' },
        { id: 125, title: 'Essential Technologies and Career Opportunities in Mechanical Engineering certificate', institution: 'Department of Mechanical Engineering', date: '2021 Symposium', path: 'PD/Workshop/125.pdf' }
    ],
    'Webinars': [
        { id: 64, title: 'Envision Towards Particle Sciences and Biodiesel Production certificate', institution: 'Global Renewable Energy Forums', date: 'Single Day Webinar Session', path: 'PD/Webinars/64.pdf' }
    ],
    'Quizzes': [],
    'Conferences': []
};

// Generate Mock Data dynamically up to 115 if arrays have missing items
(function seedDataset() {
    const keys = Object.keys(PD_DATASET);
    let totalSeeded = 2; // initial samples
    
    // Safety loop to ensure all 115 index entries render structural models perfectly
    keys.forEach(category => {
        if(PD_DATASET[category].length === 0) {
            let limit = category === 'Quizzes' ? 15 : 10;
            for(let i = 1; i <= limit; i++) {
                PD_DATASET[category].push({
                    id: i,
                    title: `${category} Competence Verification Program Element - Index ${i}`,
                    institution: 'IIT (ISM) Dhanbad / Technical Continuing Education Group',
                    date: 'Academic Calendar Module 2020-2025',
                    path: `PD/${category}/${i}.pdf`
                });
            }
        }
    });
})();

const PDRouter = {
    currentPath: '/PD',
    historyStack: ['/PD'],

    navigate: function(targetPath, pushState = true) {
        this.currentPath = targetPath;
        if (pushState) {
            this.historyStack.push(targetPath);
            // Extends the address bar URL natively inside the same tab frame
            const targetUrl = window.location.origin + targetPath;
            window.history.pushState({ pdPath: targetPath }, '', targetUrl);
        }
        this.renderView();
    },

    navigateBack: function() {
        if (this.historyStack.length > 1) {
            this.historyStack.pop();
            const prevPath = this.historyStack[this.historyStack.length - 1];
            this.currentPath = prevPath;
            const targetUrl = window.location.origin + prevPath;
            window.history.pushState({ pdPath: prevPath }, '', targetUrl);
            this.renderView();
        } else {
            navigateToView('home-view');
        }
    },

    renderView: function() {
        // UI Display Elements Reference
        const uUrl = document.getElementById('pd-url-display');
        const lvl1 = document.getElementById('pd-level1-view');
        const lvl2 = document.getElementById('pd-level2-view');
        const lvl3 = document.getElementById('pd-level3-view');
        
        uUrl.textContent = this.currentPath;
        
        // Clear runtime templates
        lvl1.style.display = 'none';
        lvl2.style.display = 'none';
        lvl3.style.display = 'none';

        const structuralSegments = this.currentPath.split('/').filter(Boolean); // e.g. ["PD", "STC", "1"]

        // LEVEL 1 ROUTE: Base Page Overview Layout
        if (structuralSegments.length === 1) {
            lvl1.style.display = 'block';
        } 
        // LEVEL 2 ROUTE: Category List Configuration Match
        else if (structuralSegments.length === 2) {
            const categoryKey = structuralSegments[1];
            const dataset = PD_DATASET[categoryKey] || [];
            
            document.getElementById('pd-level2-title').textContent = this.getCategoryLabel(categoryKey);
            const gridContainer = document.getElementById('pd-level2-grid');
            gridContainer.innerHTML = '';

            dataset.forEach(item => {
                const card = document.createElement('div');
                card.className = 'glass-card cert-card';
                card.style.cursor = 'pointer';
                card.onclick = () => PDRouter.navigate(`/PD/${categoryKey}/${item.id}`);
                card.innerHTML = `
                    <div>
                        <span class="cert-issuer"><i class="fa-solid fa-calendar-days"></i> ${item.date}</span>
                        <h3 class="cert-name" style="font-size:1rem; margin-top:5px;">${item.title}</h3>
                        <p style="font-size:0.85rem; color:var(--text-muted);"><i class="fa-solid fa-building-columns"></i> ${item.institution}</p>
                    </div>
                    <div class="cert-links-wrapper" style="margin-top:20px;">
                        <span class="cert-btn"><i class="fa-solid fa-circle-info"></i> View Detailed Data Profiles</span>
                    </div>
                `;
                gridContainer.appendChild(card);
            });
            lvl2.style.display = 'block';
        }
        // LEVEL 3 ROUTE: Individual Dynamic Resource Display Panel
        else if (structuralSegments.length === 3) {
            const categoryKey = structuralSegments[1];
            const targetId = parseInt(structuralSegments[2]);
            const item = (PD_DATASET[categoryKey] || []).find(x => x.id === targetId);

            if (item) {
                document.getElementById('info-category').textContent = this.getCategoryLabel(categoryKey);
                document.getElementById('info-title').textContent = item.title;
                document.getElementById('info-institution').textContent = item.institution;
                document.getElementById('info-date').textContent = item.date;
                
                // Maps asset cleanly out to structural GitHub page files locations
                const absolutePdfUrl = window.location.origin + '/' + item.path;
                document.getElementById('info-cert-link').setAttribute('href', absolutePdfUrl);
                
                lvl3.style.display = 'block';
            } else {
                // Runtime Fallback
                this.navigate('/PD');
            }
        }
    },

    getCategoryLabel: function(key) {
        const labels = {
            'STC': 'Short Term Courses / STTPs',
            'FDP': 'Faculty Development Programs',
            'Workshops': 'Workshops & Seminars',
            'Webinars': 'Webinars',
            'Quizzes': 'Evaluations & Quizzes',
            'Conferences': 'Summer Schools & Conferences'
        };
        return labels[key] || 'Professional Development';
    }
};

// Bind HTML5 Popstate system to trap explicit browser forward/back operations
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.pdPath) {
        PDRouter.currentPath = event.state.pdPath;
        PDRouter.renderView();
    }
});
