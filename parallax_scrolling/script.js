/*jslint browser:true */
/*jslint esnext:true */
/*jslint node:false */
/*jslint devel:false */
/*jslint jquery:false*/

import {ScrollWatch} from "/scrollwatch.js";

var anime_transitions = {
    
    linear: 'linear',
    spring: (mass, stiffness, damping, velocity) => {
        return `spring(${mass}, ${stiffness}, ${damping}, ${velocity})`;
    }, 
    steps: (number) => {
        return `steps(${number})`;
    },
    easeInQuad : 'easeInQuad',
    easeOutQuad : 'easeOutQuad',
    easeInOutQuad : 'easeInOutQuad',
    easeInCubic : 'easeInCubic',
    easeOutCubic : 'easeOutCubic',
    easeInOutCubic : 'easeInOutCubic',
    easeInQuart : 'easeInQuart',	
    easeOutQuart : 'easeOutQuart',
    easeInOutQuart : 'easeInOutQuart',
    easeInQuint : 'easeInQuint',
    easeOutQuint : 'easeOutQuint',
    easeInOutQuint : 'easeInOutQuint',
    easeInSine : 'easeInSine',
    easeOutSine : 'easeOutSine',
    easeInOutSine : 'easeInOutSine',
    easeInExpo : 'easeInExpo',
    easeOutExpo : 'easeOutExpo',
    easeInOutExpo : 'easeInOutExpo',
    easeInCirc : 'easeInCirc',
    easeOutCirc : 'easeOutCirc',
    easeInOutCirc : 'easeInOutCirc',
    easeInBack : 'easeInBack',
    easeOutBack : 'easeOutBack',
    easeInOutBack : 'easeInOutBack',
    easeInBounce : 'easeInBounce',
    easeOutBounce : 'easeOutBounce',
    easeInOutBounce : 'easeInOutBounce'
};

let DOM = {
    headerSec: document.querySelector(".section_header"),
    footerSec: document.querySelector(".section_footer"),
    headerCnt: document.querySelector(".header_content"),
    footerCnt: document.querySelector(".footer_content"),
};

let Sw1 = new ScrollWatch(DOM.headerSec, 0);
let Sw2 = new ScrollWatch(DOM.footerSec, 0);

window.addEventListener("scroll", ()=>{
    
    let multiplier = 3;
    
    let ParralaxFxTop = Math.floor(Sw1.percentTop()*multiplier);
    let ParralaxFxBot = Math.floor(Sw2.percentBottom()*multiplier);
    
    
    DOM.headerCnt.style.transform = `translate3D(0,${ParralaxFxTop}px,0)`;
    DOM.footerCnt.style.transform = `translate3D(0,${-100*multiplier+ParralaxFxBot}px,0)`;
    
});

const scrollCoords = {
    y : window.pageYOffset
};

function animatee(){
    anime({
        targets: scrollCoords,
        y: `+=75`,
        duration: 1000,
        easing: anime_transitions.linear,
        
        update: ()=>{
            window.scroll(0,scrollCoords.y);
        },
        complete: animatee,
    });
    
}

animatee;