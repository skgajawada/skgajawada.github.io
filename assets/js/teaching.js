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

${subject.courses.length} Course Offering(s)

</p>

<a
href="#/teaching/${subject.id}"
class="card-link">

View Courses
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

<a
href="#/teaching"
class="btn btn-outline">

<i class="fas fa-arrow-left"></i>

Back

</a>

<h1 class="section-title"
style="margin:0;">

${currentSubject.title}

</h1>

</div>

<div class="cards-grid">

${currentSubject.courses.map(course=>`
<div class="card reveal" style="padding:1.5rem;">
<h3 class="card-title">${course.institution}</h3>
<p><strong>Program:</strong> ${course.program}</p>
<p><strong>Branch:</strong> ${course.branch}</p>
<p><strong>Batch:</strong> ${course.batch}</p>
<p><strong>Semester:</strong> ${course.semester||"-"}</p>
<p><strong>Regulation:</strong> ${course.regulation||"-"}</p>
<a href="#/teaching/${currentSubject.id}/${course.id}" class="btn btn-primary" style="display:block;text-align:center;margin-top:1rem;">
<i class="fas fa-book-open"></i>
Course Materials
</a>
</div>
`).join("")}
</div>
</section>
`;
}
const currentCourse=currentSubject.courses.find(c=>c.id===courseParam);
if(!currentCourse){
return`
<section class="fade-in">
<h2>Course Not Found</h2>
<a href="#/teaching/${currentSubject.id}" class="btn btn-primary">Back</a>
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
<h3>${currentCourse.institution}</h3>
<p><strong>Program:</strong> ${currentCourse.program}</p>
<p><strong>Branch:</strong> ${currentCourse.branch}</p>
<p><strong>Batch:</strong> ${currentCourse.batch}</p>
<p><strong>Semester:</strong> ${currentCourse.semester||"-"}</p>
<p><strong>Regulation:</strong> ${currentCourse.regulation||"-"}</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:25px;">
<a href="assets/teaching/${currentCourse.folder}/information.json" target="_blank" class="btn btn-primary">Information</a>
<a href="assets/teaching/${currentCourse.folder}/Notes/" target="_blank" class="btn btn-outline">Notes</a>
<a href="assets/teaching/${currentCourse.folder}/PPT/" target="_blank" class="btn btn-outline">PPT</a>
<a href="assets/teaching/${currentCourse.folder}/QB/" target="_blank" class="btn btn-outline">QB</a>
<a href="assets/teaching/${currentCourse.folder}/Papers/" target="_blank" class="btn btn-outline">Papers</a>
<a href="assets/teaching/${currentCourse.folder}/Videos/" target="_blank" class="btn btn-outline">Videos</a>
<a href="assets/teaching/${currentCourse.folder}/Books/" target="_blank" class="btn btn-outline">Books</a>
<a href="assets/teaching/${currentCourse.folder}/Downloads/" target="_blank" class="btn btn-outline">Downloads</a>
</div>
</div>
</section>
`;
}

}
