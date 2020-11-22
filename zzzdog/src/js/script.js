/*jslint browser:true */
/*jslint esnext:true */
/*jslint node:false */
/*jslint devel:false */
/*jslint jquery:false*/

/*************************************************/
/***********     ill1
/*************************************************/

let isSpinning = true;
let isMoving1 = false;

document.querySelector('.zdog-canvas1').addEventListener('mouseenter',()=>{
    isMoving1 = true;
});
document.querySelector('.zdog-canvas1').addEventListener('mouseleave',()=>{
    isMoving1 = false;
});

let illo = new Zdog.Illustration({
    element: ".zdog-canvas1",
    dragRotate: true,
    
    onDragStart: function() {
        isSpinning = false;
    },
    
    onDragEnd: function(){
        isSpinning = true;
    },
    
    
});

new Zdog.Ellipse({
    addTo: illo,
    diameter: 150,
    stroke: 20,
    color: '#00f',
    translate: {z: -60},
});

new Zdog.Ellipse({
    addTo: illo,
    diameter: 150,
    stroke: 20,
    color: '#0ff',
    translate: {z: -20},
});

new Zdog.Ellipse({
    addTo: illo,
    diameter: 150,
    stroke: 20,
    color: '#ff0',
    translate: {z: 20},
});

new Zdog.Ellipse({
    addTo: illo,
    diameter: 150,
    stroke: 20,
    color: '#f00',
    translate: {z: 60},
});

let x = 0;
let xs = 1;

function animate() {
    
    if (isMoving1){
        
        if(isSpinning){
            illo.rotate.x = x;
            illo.rotate.y = x;
            illo.zoom = x/4 + 3.14/2;
            x += 0.03 * xs;

            if ((x >= 3.14) || (x <= -3.14)){
                xs *= -1;
            }

        }


        
    }
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
}

animate();

/*************************************************/
/***********     ill2
/*************************************************/

document.querySelector('.zdog-canvas1').addEventListener('mouseenter',()=>{
    isMoving = true;
});
document.querySelector('.zdog-canvas1').addEventListener('mouseleave',()=>{
    isMoving = false;
});

let ill2 = new Zdog.Illustration({
    
    element: ".zdog-canvas2",
    
    
    dragRotate: true,
    
});


let ill2_orb = new Zdog.Shape({
    stroke: 80,
    color: 'red',
    addTo: ill2,
});


new Zdog.Shape({
    stroke: 30,
    color: "blue",
    addTo: ill2_orb,
    
    translate: {
        y: 75,
        z: 25
    },
});


function animate_2(){
    
    ill2.rotate.x += 0.05;
    ill2.rotate.y += 0.075;
    ill2.rotate.z += 0.025;
    
    ill2.updateRenderGraph();
    
    requestAnimationFrame(animate_2);
    
}

animate_2();











