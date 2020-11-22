/*jslint browser:true */
/*jslint esnext:true */
/*jslint node:false */
/*jslint devel:false */
/*jslint jquery:false*/

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


let rectDOM = document.querySelectorAll(".rect");

function randomVal(){
    anime({
        targets: ".rect",
        
        width: () => { return Math.random()*1000; },
        backgroundColor: () => { return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*200})`; },
        
        duration: 500,
        
        //direction: "alternate",
        easing: anime_transitions.easeInOutBack,
        
        complete: randomVal,
        
        delay: anime.stagger(50),
        delay: anime.stagger(50, {from: 'center'}),
        
    });
    
}

randomVal();

/*
document.addEventListener('wheel', (e) => {
    
    if(e.deltaY > 0){
        anime({
            targets: ".rect",
            skewX: "+=20deg",

        });
        
    }
    else if(e.deltaY < 0){
        anime({
            targets: ".rect",
            skewX: "-=20deg",

        });
        
    }

    
});
*/



/*************************************************/
/***********     scrollwatch
/*************************************************/


let DOMc = document.querySelector('.c3');

let SW = new ScrollWatch(DOMc, 0);

window.addEventListener("scroll", () => {
    console.log(SW.percent());
    
});



