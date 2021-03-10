function getBrandByLetter(letter) {
    $("#alphabet li, .brand-shop-one").css('display', 'none');
    $(".letter_"+letter).css('display', 'block');
}

$(document).ready(function(){
    $('.filter-hamburger a.filter-toggle').click(function() {
        $('.filter-hamburger').toggleClass('active');
        $('.cont_sb_l').slideToggle('slow');
    });

    if(window.innerWidth <= 768)
    {
        $('.cont_sb_l').hide();
    }

});

$(window).resize(function(){
    if(window.innerWidth <= 768)
    {
        $('.cont_sb_l').hide();
    }
    else{
        $('.cont_sb_l').show();
    }


});