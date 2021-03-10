$(document).ready(function() {
    $(".accordion").accordion({
        collapsible: true,
        closedSign: false,
        speed: 500,
        openedSign: false,
        active: '.selected'
    });

    $('body').on('click', '.contacts_menu a.ui-accordion-header', function(){
        window.location.href =  $(this).attr('href');
    });
});