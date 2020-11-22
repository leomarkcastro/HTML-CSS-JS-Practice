/*jslint browser:true */
/*jslint esnext:true */
/*jslint node:true */
/*jslint devel:false */
/*jslint jquery:false*/


export class ScrollWatch{
    constructor(target, offset){
        this.offset = offset;
        this.target = target;
    }
    
    percentBottom(){
        
        this.docTop = this.target.offsetTop;
        this.docHeight = this.target.offsetHeight;
        let winTop = window.scrollY;
        let winHeight = window.innerHeight;
        let winBot = winTop + winHeight;
        
        let scrollPercent = (winBot - this.docTop + this.offset) / this.docHeight;
        
        let scrollPercentRounded = Math.min(100,Math.max(0,Math.round(scrollPercent * 100)));
        
        return scrollPercentRounded;
    }
    
    percentTop(){
        
        this.docTop = this.target.offsetTop;
        this.docHeight = this.target.offsetHeight;
        let winTop = window.scrollY;
        let winBot = winTop;
        
        let scrollPercent = (winBot - this.docTop + this.offset) / this.docHeight;
        
        let scrollPercentRounded = Math.min(100,Math.max(0,Math.round(scrollPercent * 100)));
        
        return scrollPercentRounded;
    }
    
    getBool(){
        return {
            Bottom: this.percentBottom() == 100 ? true : false,
            Top: this.percentTop() == 100 ? true : false,
        };
    }
    
}