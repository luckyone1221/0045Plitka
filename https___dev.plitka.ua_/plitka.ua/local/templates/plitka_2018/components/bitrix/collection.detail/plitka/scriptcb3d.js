$(document).ready(function(){
    $('.call-nav-in, .compl-tov-in, .call-slid-big').show();
    $('.info-about').fadeIn('fast', function(){
        $('.coll-right ').css('height', 'auto');
        $(this).readmore({
            collapsedHeight: 150,
            embedCSS: false,
            moreLink: '<a href="#">Читать далее >>></a>',
            lessLink: '<a href="#">Свернуть</a>',
        });
    });

    $('.call-slid-big').bxSlider({
        pagerCustom: '.call-nav-in',
        mode: 'fade',
        touchEnabled:false,
        onSliderLoad: function(){
            $(".call-slid-big").css("visibility", "visible");
        }
    });

    $('.call-nav-in').bxSlider({
        slideWidth: 75,
        slideMargin: 11,
        minSlides:1,
        pager: false,
        moveSlides: 1,
        maxSlides: 4,
        controls: true,
        infiniteLoop: false,
        touchEnabled: false,
        onSliderLoad: function(){
            $(".call-nav-in").css("visibility", "visible");
        }
    });
    
    var tabsContainer = $( "#tabs-coll" );
    var tabsLinkContainers = tabsContainer.find('.link-acc');
    var tabsLinks = tabsLinkContainers.find('a');

    if ($(window).width() < 790) {
        tabsContainer.tabs({
            collapsible: true,
        });
    }
    else {
        tabsContainer.tabs();
    }


    function mobileTabActivate(tab){
        var currentIndex = tabsLinkContainers.index(tab.parentElement);
        if ($(tab).hasClass("act")) {
            tabsLinks.removeClass("act");
            tabsContainer.tabs({ active: false });
        }
        else {
            tabsLinks.removeClass("act");
            $(tab).addClass("act");
            tabsContainer.tabs({ active: currentIndex });
            return false;
        }
    }

    $(tabsLinks).click(function(e) {
        e.preventDefault();
        mobileTabActivate(this);
    });
    
});