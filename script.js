/*==================== WEBSITE INITIALIZATION ====================*/
document.addEventListener("DOMContentLoaded",()=>{
initializeLoader();
initializeHeader();
initializeMobileMenu();
initializeScrollTop();
initializeSmoothScroll();
initializeScrollReveal();
initializeCounters();
initializeCurrentYear();
initializeTheme();
});

/*==================== LOADER ====================*/
function initializeLoader(){
const loader=document.getElementById("loader");
if(!loader)return;
window.addEventListener("load",()=>{
loader.style.opacity="0";
loader.style.visibility="hidden";
setTimeout(()=>{
loader.remove();
},600);
});
}

/*==================== STICKY HEADER ====================*/
function initializeHeader(){
const header=document.querySelector("header");
if(!header)return;
window.addEventListener("scroll",()=>{
header.classList.toggle("scrolled",window.scrollY>60);
});
}

/*==================== MOBILE MENU ====================*/
function initializeMobileMenu(){
const menu=document.querySelector(".nav-links");
const button=document.getElementById("mobileMenu");
if(!menu||!button)return;
button.addEventListener("click",()=>{
menu.classList.toggle("active");
button.classList.toggle("active");
});
document.querySelectorAll(".nav-links a").forEach(link=>{
link.addEventListener("click",()=>{
menu.classList.remove("active");
button.classList.remove("active");
});
});
}

/*==================== ACTIVE NAVIGATION ====================*/
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");
window.addEventListener("scroll",()=>{
let current="";
sections.forEach(section=>{
const top=section.offsetTop-140;
if(window.scrollY>=top){
current=section.getAttribute("id");
}
});
navLinks.forEach(link=>{
link.classList.remove("active");
const href=link.getAttribute("href");
if(href&&href.includes("#"+current)){
link.classList.add("active");
}
});
});

/*==================== SCROLL TO TOP ====================*/
function initializeScrollTop(){
const button=document.getElementById("scrollTop");
if(!button)return;
window.addEventListener("scroll",()=>{
button.classList.toggle("show",window.scrollY>500);
});
button.addEventListener("click",()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
});
}

/*==================== SMOOTH SCROLL ====================*/
function initializeSmoothScroll(){
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener("click",function(e){
const target=document.querySelector(this.getAttribute("href"));
if(!target)return;
e.preventDefault();
target.scrollIntoView({
behavior:"smooth"
});
});
});
}

/*==================== SCROLL REVEAL ====================*/
function initializeScrollReveal(){
const elements=document.querySelectorAll(".fade-up,.fade-left,.fade-right,.fade-down,.zoom");
if(!elements.length)return;
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{
threshold:.15
});
elements.forEach(item=>{
observer.observe(item);
});
}

/*==================== COUNTERS ====================*/
function initializeCounters(){
const counters=document.querySelectorAll("[data-count]");
if(!counters.length)return;
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(!entry.isIntersecting)return;
const counter=entry.target;
const target=Number(counter.dataset.count);
let value=0;
const step=Math.max(1,Math.ceil(target/80));
const update=()=>{
value+=step;
if(value>=target){
counter.textContent=target;
return;
}
counter.textContent=value;
requestAnimationFrame(update);
};
update();
observer.unobserve(counter);
});
},{
threshold:.5
});
counters.forEach(counter=>{
observer.observe(counter);
});
}

/*==================== CURRENT YEAR ====================*/
function initializeCurrentYear(){
const year=document.getElementById("year");
if(year){
year.textContent=new Date().getFullYear();
}
}

/*==================== DARK MODE ====================*/
function initializeTheme(){
const button=document.getElementById("themeToggle");
if(!button)return;
const savedTheme=localStorage.getItem("theme");
if(savedTheme==="dark"){
document.body.classList.add("dark");
button.innerHTML='<i class="fa-solid fa-sun"></i>';
}
button.addEventListener("click",()=>{
document.body.classList.toggle("dark");
const dark=document.body.classList.contains("dark");
localStorage.setItem("theme",dark?"dark":"light");
button.innerHTML=dark?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
});
}
