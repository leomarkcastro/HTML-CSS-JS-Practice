class ScrollWatch{
    constructor(target, offset){
        this.docTop = target.offsetTop;
        this.docHeight = target.offsetHeight;
        this.offset = offset;
    }
    
    percent(){
        
        let winTop = window.scrollY;
        let winHeight = window.innerHeight;
        let winBot = winTop + winHeight;
        
        let scrollPercent = (winBot - this.docTop + this.offset) / this.docHeight;
        
        let scrollPercentRounded = Math.min(100,Math.max(0,Math.round(scrollPercent * 100)));
        
        return scrollPercentRounded;
    }
    
    getBool(){
        return this.percent() > 0 ? true : false;
    }
}