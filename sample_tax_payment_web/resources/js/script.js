$(document).ready(function() {
   
    $('.js--anim').waypoint(function(direction) {
        $('.js--anim').addClass('animate__animated animate__fadeInUp');
    },{
        offset: "50%"
    });
    
    $('.js--anim2').waypoint(function(direction) {
        $('.js--anim2').addClass('animate__animated animate__fadeInUp');
    },{
        offset: "50%"
    });
    
});