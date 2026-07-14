/*=========================================================
                WEBSITE INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded",function(){

    initializeLoader();

    initializeNavbar();

    initializeMobileMenu();

    initializeScrollTop();

    initializeDarkMode();

    initializeRevealAnimation();

    initializeCounters();

    initializeSmoothScroll();

    initializeCurrentYear();

});

/*=========================================================
                    LOADER
=========================================================*/

function initializeLoader(){

    const loader=document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",function(){

        loader.style.opacity="0";

        loader.style.visibility="hidden";

    });

}

/*=========================================================
                STICKY NAVBAR
=========================================================*/

function initializeNavbar(){

    const header=document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll",function(){

        if(window.scrollY>80){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    });

}

/*=========================================================
                MOBILE MENU
=========================================================*/

function initializeMobileMenu(){

    const button=document.querySelector(".mobile-menu");

    const menu=document.querySelector(".nav-links");

    if(!button || !menu) return;

    button.addEventListener("click",function(){

        menu.classList.toggle("active");

    });

}

/*=========================================================
                SCROLL TOP
=========================================================*/

function initializeScrollTop(){

    const button=document.getElementById("scrollTop");

    if(!button) return;

    window.addEventListener("scroll",function(){

        if(window.scrollY>500){

            button.classList.add("show");

        }

        else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",function(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*=========================================================
                DARK MODE
=========================================================*/

function initializeDarkMode(){

    const button=document.querySelector(".theme-btn");

    if(!button) return;

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark");

    }

    button.addEventListener("click",function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

        }

        else{

            localStorage.setItem("theme","light");

        }

    });

}

/*=========================================================
            SCROLL REVEAL
=========================================================*/

function initializeRevealAnimation(){

    const elements=document.querySelectorAll(

        ".fade-up,.fade-left,.fade-right,.zoom"

    );

    const observer=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(function(item){

        observer.observe(item);

    });

}

/*=========================================================
                COUNTERS
=========================================================*/

function initializeCounters(){

    const counters=document.querySelectorAll("[data-count]");

    counters.forEach(function(counter){

        const target=+counter.dataset.count;

        let value=0;

        const speed=Math.ceil(target/80);

        function update(){

            value+=speed;

            if(value>=target){

                counter.innerHTML=target;

            }

            else{

                counter.innerHTML=value;

                requestAnimationFrame(update);

            }

        }

        update();

    });

}

/*=========================================================
                SMOOTH SCROLL
=========================================================*/

function initializeSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor){

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(

                this.getAttribute("href")

            );

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/*=========================================================
                ACTIVE NAVIGATION
=========================================================*/

const sections=document.querySelectorAll("section");

const links=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",function(){

    let current="";

    sections.forEach(function(section){

        const top=section.offsetTop-120;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    links.forEach(function(link){

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/*=========================================================
                CURRENT YEAR
=========================================================*/

function initializeCurrentYear(){

    const year=document.getElementById("year");

    if(year){

        year.innerHTML=new Date().getFullYear();

    }

}
