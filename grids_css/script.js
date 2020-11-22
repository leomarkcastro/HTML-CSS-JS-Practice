/*jslint browser:true */
/*jslint esnext:true */
/*jslint node:false */
/*jslint devel:false */
/*jslint jquery:false*/

let granimInstance = new Granim({
    element: '#background',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ]
        }
    }
});