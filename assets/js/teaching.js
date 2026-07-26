// TEACHING PAGE
class TeachingPage extends Component {

async render(params){

const teaching=await DataManager.getTeaching();
const subjectParam=params&&params[0];
const courseParam=params&&params[1];

if(!subjectParam){

return`

<section class="fade-in">

<h1 class="section-title">
Teaching
</h1>

<div class="cards-grid stagger-container">

${teaching.subjects.map(subject=>`

<div class="card fade-in"
onclick="navigateTo('#/teaching/${subject.id}')"
style="cursor:pointer;">

<div class="card-icon">
<i class="fas ${subject.icon}"></i>
</div>

<div class="card-content">

<h3 class="card-title">
${subject.title}
</h3>

<p class="card-description">
${subject.teaching.length} Institution(s)
</p>

<a href="#/teaching/${subject.id}" class="card-link">
View Teaching Details
<i class="fas fa-arrow-right"></i>
</a>

</div>

</div>

`).join("")}

</div>

</section>

`;

}

const currentSubject=
teaching.subjects.find(
s=>s.id===subjectParam
);

if(!currentSubject){

return`

<section class="fade-in">

<h2>Subject Not Found</h2>

<a href="#/teaching"
class="btn btn-primary">

Back

</a>

</section>

`;

}

if(!courseParam){

return`

<section class="fade-in">

<div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;">

<a href="#/teaching"
class="btn btn-outline">

<i class="fas fa-arrow-left"></i>

Back

</a>

<h1 class="section-title"
style="margin:0;">

${currentSubject.title}

</h1>

</div>

${currentSubject.teaching.map((college,index)=>`

<div class="card reveal" style="padding:1.8rem;margin-bottom:2rem;">

<h2 style="color:var(--primary-color);margin-bottom:0.8rem;">
<i class="fas fa-university"></i>
${college.institution}
</h2>

<p style="margin-bottom:1rem;">
<strong>${college.department}</strong>
</p>

<ul style="margin-left:1.2rem;line-height:1.9;">

${college.offerings.map(off=>`

<li>
<strong>Academic Year :</strong> ${off.academicYear}<br>
<strong>Year :</strong> ${off.year}<br>
<strong>Semester :</strong> ${off.semester}<br>
<strong>Branch :</strong> ${off.branch}<br>
<strong>Section :</strong> ${off.section}
</li>
<br>

`).join("")}

</ul>

<div style="text-align:center;margin-top:2rem;">

<a href="#/teaching/${currentSubject.id}/course${index}"

class="btn btn-primary">

<i class="fas fa-folder-open"></i>

Access Course Materials

</a>

</div>

</div>

`).join("")}

</section>

`;

}
const currentCourseIndex=parseInt(courseParam.replace("course",""));
const currentCollege=currentSubject.teaching[currentCourseIndex];

if(!currentCollege){

return`

<section class="fade-in">

<h2>Teaching Record Not Found</h2>

<a href="#/teaching/${currentSubject.id}" class="btn btn-primary">
Back
</a>

</section>

`;

}

return`

<section class="fade-in">

<div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;">

<a href="#/teaching/${currentSubject.id}" class="btn btn-outline">

<i class="fas fa-arrow-left"></i>

Back

</a>

<h1 class="section-title" style="margin:0;">

${currentSubject.title}

</h1>

</div>

<div class="card">

<h2 style="color:var(--primary-color);">
<i class="fas fa-university"></i>
${currentCollege.institution}
</h2>

<p style="margin-bottom:1.5rem;">
<strong>${currentCollege.department}</strong>
</p>

${currentCollege.offerings.map(off=>`

<div style="padding:1rem;border:1px solid var(--border-color);border-radius:10px;margin-bottom:1rem;">

<p><strong>Academic Year :</strong> ${off.academicYear}</p>

<p><strong>Year :</strong> ${off.year}</p>

<p><strong>Semester :</strong> ${off.semester}</p>

<p><strong>Branch :</strong> ${off.branch}</p>

<p><strong>Section :</strong> ${off.section}</p>

</div>

`).join("")}

<hr style="margin:30px 0;">

<div style="text-align:center;">

<a href="assets/teaching/${currentSubject.folder}/index.html"
target="_blank"
class="btn btn-primary"
style="padding:14px 30px;font-size:1.05rem;">

<i class="fas fa-folder-open"></i>

Access Course Materials

</a>

</div>

</div>

</section>

`;

}

}
