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


function arrayRandomChoice(array){
    
    let x = Math.round(Math.random() * (array.length-1));
    return array[x];
}

let rectDOM = document.querySelectorAll(".rect");

let fromRandom = [0, 99, 'center'];
let colorLetters = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

function colorGenerator(colArr){
    
    let color = '#';
    
    for (let i = 0; i < 3; i++){
        color += arrayRandomChoice(colArr);
    }
    return color;
    
}

let delay = 100;
let duration = 1000;

function animeLoop(index){
    
    anime({

        targets: rectDOM,

        backgroundColor: [
            {value: colorGenerator(colorLetters), duration: duration},
            {value: colorGenerator(colorLetters), duration: duration},
        ],

        scale: [
            {value: "+=1.2", duration: duration},
            {value: "1", duration: duration},
        ],
        
        border: [
            {value: "1px solid transparent", duration: duration},
            {value: "1px solid black", duration: duration},
            {value: "1px solid transparent", duration: duration},
        ],

        duration: 1000,

        easing: anime_transitions.easeInBack,

        delay: anime.stagger(delay, {grid: [10,10], from: index-1}),
    });
    
}


for (let i =0 ; i < rectDOM.length; i++){
    
    rectDOM[i].addEventListener('click', () => {
        animeLoop(i+1);
    });
    
}