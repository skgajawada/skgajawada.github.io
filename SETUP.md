# Setup Guide - Gajavada Sanjeevkumar Premium Portfolio

## 📋 Quick Start

Your premium portfolio website is now live! Here's what you need to do next.

## 🎯 Step 1: Access Your Site

Your portfolio is automatically deployed to:
**https://skgajawada.github.io**

## 📝 Step 2: Update Your Content

### 2.1 Update Personal Information
Edit `assets/data/portfolio-data.json`:

```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "institution": "Your Institution",
  "email": "your.email@example.com",
  "phone": "+91-XXXXXXXXXXXXX",
  "location": "Your Location",
  "profileImage": "assets/images/profile.jpg"
}
```

### 2.2 Add Your Profile Photo
1. Place your profile photo at `assets/images/profile.jpg` (400x400px recommended)
2. Or update the path in portfolio-data.json

### 2.3 Update Your Bio & Career Details
Fill in these sections in `portfolio-data.json`:
- Biography (3-4 paragraphs)
- Career Objective
- Research Vision
- Research Philosophy
- Administrative Responsibilities
- Personal Interests

### 2.4 Add Professional Experience
```json
"experience": [
  {
    "title": "Job Title",
    "company": "Company Name",
    "location": "City, Country",
    "startDate": "2020-01",
    "endDate": "Present",
    "icon": "fa-briefcase",
    "description": "Your role description",
    "achievements": [
      "Achievement 1",
      "Achievement 2"
    ]
  }
]
```

### 2.5 Add Education Details
```json
"education": [
  {
    "degree": "PhD (Design Engineering)",
    "institution": "IIT (ISM) Dhanbad",
    "field": "Design Engineering",
    "year": "2022-Present",
    "cgpa": "8.5",
    "icon": "fa-graduation-cap",
    "achievements": ["Achievement 1"]
  }
]
```

### 2.6 Add Projects
```json
"projects": [
  {
    "id": 1,
    "title": "Project Name",
    "description": "Project description",
    "category": "research",  // research, academic, industrial
    "technologies": ["MATLAB", "Python"],
    "image": "fa-project-diagram",  // Font Awesome icon
    "results": "Project outcomes",
    "github": "https://github.com/...",
    "link": ""
  }
]
```

### 2.7 Update Skills
```json
"skills": {
  "programming": [
    { "name": "MATLAB", "proficiency": 90 },
    { "name": "Python", "proficiency": 85 }
  ],
  "engineering": [...],
  "datascience": [...],
  "soft": [...]
}
```

### 2.8 Update Social Links
```json
"socialLinks": {
  "email": "your.email@gmail.com",
  "googleScholar": "https://scholar.google.com/citations?user=...",
  "orcid": "https://orcid.org/0000-0000-0000-0000",
  "github": "https://github.com/yourprofile",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "instagram": "https://instagram.com/yourprofile",
  "twitter": "https://twitter.com/yourprofile"
}
```

## 🏆 Step 3: Professional Development Certificates

### 3.1 Certificate Structure
Your certificates are in `assets/data/certificates.json`

**6 Categories:**
1. **STC** - Short Term Courses / STTPs
2. **WS** - Workshops / Seminars
3. **FDP** - Faculty Development Programs
4. **WEB** - Webinars
5. **QZ** - Quizzes
6. **CONF** - Conferences

### 3.2 Certificate Entry Format
```json
{
  "id": 1,
  "category": "STC",
  "categoryName": "Short Term Courses / STTPs",
  "name": "Application of Forecasting Methods",
  "type": "Short Term Course",
  "startDate": "2020-07-12",
  "endDate": "2020-12-11",
  "duration": "5 Days",
  "department": "Department Name",
  "organization": "Organization Name",
  "venue": "Location",
  "association": "AICTE-QIP",
  "certificateFile": "STC_001.pdf",
  "certificateImage": "STC_001.jpg"
}
```

### 3.3 Upload Certificate Files
1. Create folder: `assets/certificates/`
2. Place PDF files: `STC_001.pdf`, `STC_002.pdf`, etc.
3. Place image files: `STC_001.jpg`, `STC_002.jpg`, etc.
4. Update filenames in certificates.json

### 3.4 Certificate URL Structure
```
https://skgajawada.github.io/#/professional-dev/STC         → List all STTCs
https://skgajawada.github.io/#/professional-dev/STC/1       → Certificate detail
https://skgajawada.github.io/#/professional-dev/FDP         → List all FDPs
https://skgajawada.github.io/#/professional-dev/FDP/18      → Individual FDP
```

## 🎨 Step 4: Customization

### 4.1 Change Color Scheme
Edit `assets/css/style.css` root variables:

```css
:root {
    --primary: #3498db;      /* Main blue */
    --secondary: #2ecc71;    /* Green accent */
    --accent: #e74c3c;       /* Red accent */
    --dark: #2c3e50;         /* Dark color */
}
```

### 4.2 Add/Modify Animations
Edit `assets/css/animations.css` for animation effects.

### 4.3 Dark Mode Colors
Edit `assets/css/dark-mode.css` for dark theme.

## 📂 Step 5: File Structure to Complete

```
✓ index.html                        (Done)
✓ assets/css/                       (Done)
✓ assets/js/                        (Done)
✓ assets/data/                      (Done)
✗ assets/images/profile.jpg         (ADD YOUR PHOTO)
✗ assets/certificates/              (ADD YOUR PDFs)
  ├─ STC_001.pdf
  ├─ STC_001.jpg
  ├─ FDP_018.pdf
  ├─ FDP_018.jpg
  └─ ... (all 115 certificates)
✗ assets/data/cv.pdf               (ADD YOUR CV)
```

## 🚀 Step 6: Deploy Changes

1. **Git Commit**
   ```bash
   git add .
   git commit -m "Update portfolio content with personal information"
   git push origin main
   ```

2. **GitHub Pages Deployment**
   - Changes push automatically
   - Site updates in 1-2 minutes
   - Visit https://skgajawada.github.io

## 🔗 Navigation Routes

| Route | Page |
|-------|------|
| `#/home` | Homepage |
| `#/about` | About Me |
| `#/experience` | Professional Experience |
| `#/education` | Education Timeline |
| `#/projects` | Projects Gallery |
| `#/professional-dev` | PD Overview |
| `#/professional-dev/STC` | STTCs/STTPs |
| `#/professional-dev/STC/1` | Certificate Detail |
| `#/skills` | Skills & Expertise |
| `#/analytics` | Analytics Dashboard |
| `#/contact` | Contact Page |

## 📊 Features Available

✅ Dark Mode Toggle
✅ Responsive Design (Mobile, Tablet, Desktop)
✅ Smooth Animations
✅ Interactive Timelines
✅ Project Filtering
✅ Professional Development System
✅ Analytics Dashboard
✅ Visitor Counter
✅ Contact Form
✅ Social Media Links
✅ Certificate Manager
✅ Skill Proficiency Bars
✅ PDF Download Support

## 🆘 Troubleshooting

### Images Not Loading
- Check file path is correct
- Ensure file extension is lowercase
- Use placeholder if image missing (auto-handled)

### Certificate PDFs Not Downloading
- Verify file exists in `assets/certificates/`
- Check filename matches JSON entry exactly
- Use lowercase extensions (.pdf, .jpg)

### Dark Mode Not Working
- Check browser localStorage is enabled
- Try clearing browser cache
- Ensure dark-mode.js is loaded

### Pages Not Loading
- Verify hash route format: `#/route-name`
- Check router.js is loaded
- Clear browser cache and reload

## 💡 Tips

1. **Keep URLs clean**: Use lowercase, hyphens in URLs
2. **Image optimization**: Compress images before uploading
3. **Content updates**: Can edit JSON files without rebuilding
4. **Backup**: Keep local copy of all data
5. **Testing**: Test on mobile and desktop before publishing

## 📧 Need Help?

Refer to:
- `README.md` - Full documentation
- Code comments in JS files
- Portfolio data structure examples

## ✨ Next Steps

1. ✅ Add profile photo
2. ✅ Update personal information
3. ✅ Add experience & education
4. ✅ Upload certificates (all 115)
5. ✅ Add project details
6. ✅ Update skills & proficiency
7. ✅ Test all pages & animations
8. ✅ Share your portfolio!

---

**Your premium portfolio is ready to showcase your achievements!** 🎓✨
