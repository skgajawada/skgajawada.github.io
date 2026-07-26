// TEACHING PAGE
class TeachingPage extends Component {

async render(params){

const data=await DataManager.getTeaching();

const subjectId=params&&params[0];

if(!subjectId){

return`

<section class="fade-in">

<h1 class="section-title">
Teaching
</h1>

<div class="cards-grid stagger-container">

${data.subjects.map(subject=>`

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

<a href="#/teaching/${subject.id}"
class="card-link">

View Details
<i class="fas fa-arrow-right"></i>

</a>

</div>

</div>

`).join("")}

</div>

</section>

`;

}

const subject=data.subjects.find(
s=>s.id===subjectId
);

if(!subject){

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

${subject.title}

</h1>

</div>

<div class="card reveal"
style="
max-width:900px;
margin:auto;
padding:40px;
border-radius:20px;
box-shadow:0 15px 40px rgba(0,0,0,.08);
">

${subject.teaching.map(item=>`

<div style="
margin-bottom:35px;
padding-bottom:25px;
border-bottom:1px solid #e5e7eb;
">

<h3 style="
color:#2563eb;
margin-bottom:15px;
font-size:1.4rem;
">

<i class="fas fa-university"></i>

${item.institution}

</h3>

<p style="
font-weight:600;
margin-bottom:15px;
">

${item.department}

</p>

${item.offerings.map(off=>`

<div style="
padding-left:20px;
margin-bottom:15px;
">

<p>

● <strong>Batch :</strong> ${off.batch}

</p>

<p>

● <strong>Semester :</strong> ${off.semester}

</p>

</div>

`).join("")}

</div>

`).join("")}
<div style="text-align:center;margin-top:40px;">
    <a href="assets/teaching/${subject.folder}/index.html"
       target="_blank"
       class="btn btn-primary"
       style="padding:16px 45px;font-size:1.05rem;border-radius:10px;">
        <i class="fas fa-folder-open"></i>
        Access Course Materials
    </a>
</div>
</div>

</section>

`;

}

}
