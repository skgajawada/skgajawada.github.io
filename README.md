# 🎓 Gajavada Sanjeevkumar – Academic & Research Portfolio

A lightweight, modular academic and research portfolio built as a client-side Single Page Application (SPA) using Vanilla JavaScript. This framework separates content from layout logic using a completely JSON-driven design, incorporating custom client routing, modular page injection, and data summaries.

---

## 📸 Portfolio Preview

---

## 🌐 Live Demo

* **Portfolio Website:** [https://skgajawada.github.io](https://skgajawada.github.io)
* **GitHub Repository:** [https://github.com/skgajawada/skgajawada.github.io](https://github.com/skgajawada/skgajawada.github.io)

---

## 📖 About the Project

This repository hosts my personal academic and professional portfolio engineered as a clean Single Page Application (SPA). By leveraging native web APIs without modern framework dependencies, the portal keeps content data parameters inside structured datasets, keeping data updates separate from the core operational script logic.

The application tracks academic milestones, engineering projects, course instructional modules, and verified professional development history using asynchronous data feeds and interactive templates.



## ✔️ Key Features

* **Responsive Design:** Responsive layouts optimized for desktop, tablet, and mobile devices.
* **Vanilla JavaScript SPA:** Zero reliance on bloated node modules or heavy framework layers.
* **Custom Hash-Based Router:** Lightweight route parsing that handles nested sub-paths smoothly.
* **JSON-Driven Core:** Total isolation between the display code and your personal data profiles.
* **Dynamic Statistics:** Automatic run-time tracking and tallies of your active certifications.
* **Integrated Academic Subsystems:** Specialized views for engineering projects, instructional assets, and external course logs.
* **Analytics Component:** Clean visual metrics dashboard using low-overhead HTML5 canvas objects.

---

## 📊 Repository Statistics

| Operational Core | Current Benchmark |
| --- | --- |
| Website Modules | 10+ Modules |
| Professional Development Categories | 6 Main Classes |
| MOOC Platforms Tracks | 6 Vendors |
| Active Instructional Subjects | 10+ Courses |
| Professional Development Logs | Dynamic (100+) |
| Validated MOOC Records | Dynamic (30+) |
| Deployment Pipeline | GitHub Pages |

---

## ✨ Highlights & Architecture

### Custom Routing Control

A lightweight engine built directly on browser window history interfaces, capturing state changes to replace views contextually without full page refreshes.

### Complete Content Decoupling

Data arrays load asynchronously when the application initializes. Modifying text parameters, expanding course histories, or dropping in new records only requires updating static array files without altering core scripts.

### Client-Side Analytics Engine

Utilizes integrated graphing libraries to render clean category distributions, experience timelines, and skill matrices using standard canvas drawing APIs.

---

## 📚 Website Modules

| Module | Description |
| --- | --- |
| 🏠 **Home** | Landing dashboard featuring career overview summaries, quick navigation links, and total count statistics. |
| 👤 **About** | Academic bio covering primary research focuses, engineering specialities, and educational paths. |
| 💼 **Experience** | Professional timeline displaying active academic positions, research fellowships, and institutional appointments. |
| 🎓 **Education** | Summary mapping degrees, qualification parameters, and institutional metrics. |
| 👨‍🏫 **Teaching** | Instructional log tracking semesters taught, subject syllabi, class groups, and downloadable course guides. |
| 📂 **Projects** | Categorized index of academic, research, and coding initiatives with descriptions and code links. |
| 🏆 **Professional Development** | Log sheet archiving FDPs, STTPs, technical workshops, and conference appearances. |
| 💻 **MOOCs Certifications** | Platform-specific learning registry complete with validation paths and direct credential links. |
| 📊 **Analytics** | Graphical statistics screen translating portfolio counts into clean data summaries. |
| 📞 **Contact** | Secure channels mapping formal outreach details, institution profiles, and networks. |

---

## 🏗️ SPA Architecture

The application uses a centralized router to resolve routes and dynamically render the required page components:

```text
                     Browser
                        │
                        ▼
                Hash-Based Router
                        │
                        ▼
                 Route Resolution
                        │
                        ▼
                Component Loader
                        │
                        ▼
                   DataManager
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
portfolio-data   professional-       mooc-
.json            development.json    certifications.json
                        │
                        ▼
               Reusable Components
                        │
                        ▼
             Dynamic Page Rendering

```

---

## ⚙️ Dynamic JSON Architecture

Portfolio content is cleanly maintained inside external data files. The application reads these records asynchronously to build interactive layout views dynamically using your exact repository properties:

```json
{
  "categories": [
    {
      "id": "fdp",
      "name": "Faculty Development Programs",
      "icon": "fa-chalkboard-teacher"
    }
  ],
  "certificates": [
    {
      "id": "cert-001",
      "title": "Advanced Mechanical Systems",
      "issuer": "NPTEL / IIT Madras",
      "date": "2025-10",
      "category": "fdp",
      "verificationUrl": "https://nptel.ac.in/noc/",
      "documentPath": "assets/certificates/fdp/advanced-mech.pdf"
    }
  ]
}

```

---

## 📁 Project Structure

```text
skgajawada.github.io/
│
├── index.html
├── README.md
├── sitemap.xml
│
└── assets/
    │
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   ├── app.js
    │   └── router.js
    │
    ├── data/
    │   ├── portfolio-data.json
    │   ├── professional-development.json
    │   ├── mooc-certifications.json
    │   └── teaching-data.json
    │
    ├── certificates/
    │   ├── professional-development/
    │   └── moocs/
    │
    ├── teaching/
    │
    ├── documents/
    │
    └── images/

```

---

## 🔄 Routing & Deep Linking

The router binds directly to browser URL adjustments, managing interface shifts smoothly via location hash variations:

* **Core Section Target:** `#/professional-dev`
* **Deep Linked Argument:** `#/professional-dev/fdp`

### Sample Navigation Paths

```text
#/home
#/about
#/experience
#/teaching/machine-design
#/moocs/coursera

```

---

## 🔧 Technologies Used

| Category | Technology |
| --- | --- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Styling** | CSS Grid, Flexbox, CSS Custom Properties, Media Queries |
| **Data Management** | JSON, Fetch API, JavaScript Promises, LocalStorage |
| **Visualization** | Chart.js |
| **Icons & Design** | Font Awesome v6 Vector Icons |
| **Hosting & Deployment** | GitHub Pages Pipeline |

---

## 🛠️ Installation & Setup

Because the application uses the Fetch API to load operational JSON data records asynchronously, modern browsers require local execution to occur over an active local web server. Direct file system launching (`file://`) will trigger CORS security blockades.

### 1. Clone the Files

```bash
git clone https://github.com/skgajawada/skgajawada.github.io.git
cd skgajawada.github.io

```

### 2. Initiate Local Server

#### Environment Option A: Python 3

```bash
python -m http.server 8000

```

#### Environment Option B: Node.js npm utilities

```bash
npx live-server

```

*Alternatively:*

```bash
npx http-server -p 8000

```

#### Environment Option C: VS Code Extension

Open the directory within Visual Studio Code, right-click `index.html`, and execute the `Open with Live Server` control flag.

### 3. Open the Dashboard

Navigate your web client interface directly to:

```text
http://localhost:8000

```

---

## 🎨 Customization Guide

Rebuilding this framework to represent alternative credentials requires modifying the properties held inside the structured JSON tracking sheets found under `assets/data/`:

* **`portfolio-data.json`** -> Swap biographies, alter standard metrics, adjust technical skill blocks, and map timeline entries.
* **`teaching-data.json`** -> Reconfigure subjects, insert active syllabus objects, update student batches, and link curriculum downloads.
* **`professional-development.json`** and **`mooc-certifications.json`** -> Insert new validation rows, platform descriptors, tracking codes, and credential names.

---

## 🔒 Privacy & Data Policy

* **Telemetry Tracking:** The implementation does not execute analytical telemetry, deploy advertising pixels, or share user behavioral metrics.
* **Cookies Usage:** The platform functions fully without writing system tracking files or persistent tracking configurations.
* **Data Locality:** All graph evaluation, formatting, layout orchestration, and dashboard rendering loops process purely inside the local browser context.

---

## 📝 Changelog

### Version 2.1.0

* Added fully functional Teaching Resources & Professional Development Modules portals.
* Incorporated custom asynchronous JSON mapping layers across modules.
* Added native Chart.js configurations to structure statistical data views.
* Fixed deep link string resolution anomalies inside the router subroutines.

### Version 2.0.0

* Migrated the portfolio from static multi-page files to a streamlined Vanilla JavaScript SPA structure.

### Version 1.0.0

* Initial deployment version utilizing basic structural elements.

---

## 📄 Terms of Use & Intellectual Property

Copyright © 2026 **Gajavada Sanjeevkumar**. All rights reserved.

The layout architecture, underlying component injection framework, styling models, and custom routing scripts are available for open educational configuration and personal design reuse. However, all academic records, specific text assessments, research files, publications, and associated structural credentials remain the exclusive intellectual property of the author and cannot be repurposed or republished without explicit written permission.

---

## 📞 Contact & Professional Profiles

### Contact Information

* 📧 **Email:** skgajawada@gmail.com
* 🎓 **Affiliation:** Research Scholar, Department of Mechanical Engineering, IIT (ISM) Dhanbad
* 📍 **Location:** Dhanbad, Jharkhand, India

### Online Profiles

| Platform | Link |
| --- | --- |
| 🌐 **Portfolio Website** | [https://skgajawada.github.io](https://skgajawada.github.io) |
| 💻 **GitHub** | [https://github.com/skgajawada](https://github.com/skgajawada) |
| 💼 **LinkedIn** | [https://linkedin.com/in/skgajawada](https://linkedin.com/in/skgajawada) |
| 🚀 **LeetCode** | [https://leetcode.com/u/skgajawada/](https://leetcode.com/u/skgajawada/) |
| 🎓 **Google Scholar** | [https://scholar.google.com/citations?user=skgajawada](https://scholar.google.com/citations?user=skgajawada) |
| 📚 **ResearchGate** | [https://www.researchgate.org/profile/skgajawada](https://www.researchgate.org/profile/skgajawada) |
| 🆔 **ORCID** | [https://orcid.org/0000-0000-0000-0000](https://orcid.org/0000-0000-0000-0000) |
| 🐦 **X (Twitter)** | [https://x.com/sk_gajawada](https://x.com/sk_gajawada) |
| 📸 **Instagram** | [https://www.instagram.com/skgajawada/](https://www.instagram.com/skgajawada/) |
| 👥 **Facebook** | [https://www.facebook.com/skgajawada/](https://www.facebook.com/skgajawada/) |
| 🎥 **YouTube** | [https://www.youtube.com/@skgajawada](https://www.youtube.com/@skgajawada) |
| 💬 **WhatsApp** | [https://wa.me/skgajawada](https://wa.me/skgajawada) |
| ✈️ **Telegram** | [https://t.me/skgajawada](https://t.me/skgajawada) |

---

## 🙏 Acknowledgements

* **Indian Institute of Technology (ISM) Dhanbad** for providing institutional infrastructure, computing resources, and academic support.
* **The Open-Source Community** for developing high-performance frontend libraries like Chart.js and Font Awesome graphics packages.
* **Open-source contributors** whose libraries, utilities, and tools support the development and maintenance of this project.
* **GitHub and GitHub Pages** for modern hosting environments and automated deployment pipelines.

---

## ⭐ Repository Status

| Feature | Status |
| --- | --- |
| Responsive Design | ✅ |
| Mobile Friendly | ✅ |
| SPA Routing | ✅ |
| JSON-driven Architecture | ✅ |
| Teaching Portal | ✅ |
| Professional Development | ✅ |
| MOOCs Module | ✅ |
| Analytics Dashboard | ✅ |
| GitHub Pages Deployment | ✅ |
| Active Development | ✅ |

---

# 🎓 Gajavada Sanjeevkumar

**Research Scholar**

Department of Mechanical Engineering

Indian Institute of Technology (ISM) Dhanbad

🌐 [https://skgajawada.github.io](https://skgajawada.github.io)

Built with HTML5 • CSS3 • Vanilla JavaScript • Chart.js

© 2026 Gajavada Sanjeevkumar. All Rights Reserved.

⭐ If you found this repository useful, consider giving it a Star!
