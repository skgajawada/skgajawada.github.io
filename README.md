# Gajavada Sanjeevkumar - Premium Portfolio Website

## 🎓 Overview
A comprehensive, interactive premium portfolio website showcasing professional development, academic achievements, research interests, and technical expertise.

## ✨ Features

### 🎨 Design & UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Toggle**: Easy theme switching with localStorage persistence
- **Smooth Animations**: Advanced CSS animations, fade-in effects, and scroll reveals
- **Interactive Components**: Engaging cards, timelines, and filters
- **Modern UI**: Clean, professional design with gradient accents

### 📑 Pages & Sections

1. **Home Page**
   - Hero section with profile image
   - Key statistics dashboard
   - Research interests showcase
   - Quick access cards to all sections

2. **About Me**
   - Biography
   - Career objective
   - Research vision & philosophy
   - Administrative responsibilities
   - Personal interests

3. **Professional Experience**
   - Interactive timeline
   - Job positions and tenure
   - Responsibilities and achievements
   - Company details and locations

4. **Education**
   - Degree timeline
   - Institutions and years
   - CGPA and achievements
   - Certifications

5. **Academic Projects**
   - Project gallery with filters
   - Technology tags
   - Project descriptions
   - GitHub links
   - Category filtering (Research, Academic, Industrial)

6. **Professional Development** ⭐
   - 6 category pages (STTPs, Workshops, FDPs, Webinars, Quizzes, Conferences)
   - 115 certificates with detailed information
   - PDF and image downloads
   - Certificate verification system
   - Organized by category with URL routing
   - `/PD/{category}/{id}` URL pattern

7. **Skills**
   - Skill proficiency levels (0-100%)
   - Visual progress bars
   - Categories: Programming, Engineering, Data Science, Soft Skills
   - Gradient skill bars

8. **Contact**
   - Contact information display
   - Contact form
   - Social media links
   - Email integration

### 🎯 Advanced Features

- **Single Page Application (SPA)**: URL-based routing without page reloads
- **Analytics Dashboard**: Charts and statistics visualization
- **Visitor Counter**: Tracks unique page visits
- **Mobile Responsive**: Hamburger menu for mobile devices
- **Smooth Scroll**: Enhanced navigation experience
- **Form Validation**: Contact form with validation
- **Social Links Integration**: LinkedIn, GitHub, Google Scholar, ResearchGate, etc.
- **PDF Download Support**: Direct download of certificates and CV

## 📁 Project Structure

```
skgajawada.github.io/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── style.css         # Main styles
│   │   ├── animations.css    # Animation definitions
│   │   └── dark-mode.css     # Dark mode theme
│   ├── js/
│   │   ├── app.js            # App initialization
│   │   ├── router.js         # SPA router & pages
│   │   ├── dark-mode.js      # Dark mode toggle
│   │   ├── animations.js     # Scroll reveals & effects
│   │   ├── professional-dev.js  # PD page logic
│   │   └── analytics.js      # Analytics dashboard
│   ├── data/
│   │   ├── portfolio-data.json    # Personal & content data
│   │   └── certificates.json      # 115 certificates
│   ├── images/
│   │   └── profile.jpg       # Profile photo placeholder
│   └── certificates/         # Certificate PDFs & images
└── README.md
```

## 🚀 Installation & Usage

### Local Development
1. Clone the repository
2. Run a local server (Python, PHP, or Node.js)
3. Open `http://localhost:port` in your browser
4. Toggle dark mode with the moon icon
5. Navigate using the navigation menu or direct URL hashes

### GitHub Pages
- Site is automatically deployed to `https://skgajawada.github.io`
- Changes to `main` branch are automatically published

## 📊 Navigation Routes

```
#/home                              Home page
#/about                             About section
#/experience                        Professional experience
#/education                         Education timeline
#/projects                          Projects gallery
#/professional-dev                  Professional development overview
#/professional-dev/{category}       Category certificates (e.g., #/professional-dev/STC)
#/professional-dev/{category}/{id}  Individual certificate detail (e.g., #/professional-dev/STC/1)
#/skills                            Skills & expertise
#/contact                           Contact information
#/analytics                         Analytics dashboard
```

## 🎨 Customization

### Update Content
1. Edit `assets/data/portfolio-data.json` with your information
2. Add certificate details to `assets/data/certificates.json`
3. Update social links in the footer
4. Modify color variables in `assets/css/style.css`

### Color Scheme
Edit `:root` variables in `style.css`:
```css
--primary: #3498db;
--secondary: #2ecc71;
--accent: #e74c3c;
```

### Add Certificates
- Place PDF files in `assets/certificates/` folder
- Update `certificates.json` with file names
- Images will auto-link to PDFs

## 🌙 Dark Mode
- Toggle with the moon icon in navbar
- Theme preference saved in localStorage
- Automatic system preference detection

## 📱 Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: Below 768px

## 🔗 Social Links
Update in `portfolio-data.json`:
- Google Scholar
- ORCID
- ResearchGate
- GitHub
- LinkedIn
- Email
- And more...

## 📝 Content Areas Awaiting Updates

The following sections have placeholder text and should be updated:
- [ ] Biography
- [ ] Career Objective
- [ ] Research Vision
- [ ] Administrative Responsibilities
- [ ] Professional Experience details
- [ ] Education details
- [ ] Projects list
- [ ] Subjects taught

## 🎬 Features in Action

### Animations
- Fade-in on scroll
- Staggered card animations
- Smooth page transitions
- Hover effects
- Pulse and bounce animations

### Interactive Elements
- Filterable project gallery
- Expandable timelines
- Animated skill bars
- Modal certificate viewer
- Contact form

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js for analytics
- **Icons**: Font Awesome 6.4
- **Hosting**: GitHub Pages
- **Design Principles**: Mobile-first, responsive

## 📊 Performance
- Lightweight (~50KB gzipped)
- Fast load times
- Optimized animations
- Minimal dependencies

## 🤝 Contributing
To contribute improvements or bug fixes:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License
Copyright © 2026 Gajavada Sanjeevkumar. All rights reserved.

## 📞 Contact
- Email: sanjeevkumargajawada@gmail.com
- Location: Dhanbad, Jharkhand, India
- GitHub: https://github.com/skgajawada

---

**Last Updated**: July 18, 2026
**Version**: 1.0.0 - Premium Edition
