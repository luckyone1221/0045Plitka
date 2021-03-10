$(document).ready(function() {
    
    $('.item_cat a').click(function() {
        $('.item_cat a').toggleClass('arr_pos');
        $('.hidden_nav').toggleClass('open_nav');
    });
    $('#hsow_frm').click(function() {
        $('.form').toggleClass('dn_b');
    });

    /*menu index collapsing*/
    $('a.arr_nav').hover(function(){

    },function(){
        $('.item_cat .hidden_nav').removeClass('open_nav');
    });
    $('.item_cat .hidden_nav').hover(function(){
        $(this).addClass('open_nav');
    },function(){
        $(this).removeClass('open_nav');
    });
    /*menu superfish*/
    $('ul.sb_nav').superfish({
        delay:       800,
        animation: {opacity: 'show'},
        animationOut:  {opacity:'hide'},
        speed:       'fast',
        speedOut: 1
    });
    $('.sb_nav_box').mouseleave(function(event) {
        $('ul.sb_nav li').removeClass('sfHover');
    });

    /*quick hack to get mobile menu work*/
    $("a.parent-menu-href").click(function () {
        window.location = $(this).attr('href');
        return false;
    });

    /*Back to top button*/
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /*header phone tabs*/
    $("#tabs").tabs();
    $("header .tabs_cont").fadeIn('slow');

    /*footer menu*/
    $('.art_title').click(function() {
        $(this).toggleClass('arr_f');
    });
    $('.art_title').click(function() {
        if ( $(this).siblings('.footer div ul').is(':hidden')) {
            $(this).siblings('.footer div ul').slideDown('slow');
        } else {
            $(this).siblings('.footer div ul').slideUp();
        }
    });

    $('.home-slick-wrap').slick();

    $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        sortBy: [ 'sort', 'date' ],
        //layoutMode: 'fitRows',
        sortAscending: {
            sort: true,
            date: false
        },
        getSortData: {
            sort: '[data-sort] parseInt',
            date: '[data-date-sort] parseInt'
        }
    });

    $grid.imagesLoaded().always( function() {
        $grid.isotope('layout');
    });


    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };


// bind filter button click
    $('#filters').on( 'click', 'a', function(event) {
        if( window.innerWidth < 767 ){
            var $filtersBlock = $(this).closest('#filters');
            if( !$filtersBlock.hasClass('show-all') ){
                $filtersBlock.addClass('show-all');
                $filtersBlock.find('li').show();
                return true;
            } else {
                $filtersBlock.removeClass('show-all');
            }
        }
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
        event.preventDefault();
    });

// change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function(event) {
            $buttonGroup.find('.active').removeClass('active');
            $( this ).parent().addClass('active');
            event.preventDefault();
        });
    });

    var allowedHashFilters = {
        '#news': '.news',
        '#article': '.article',
        '#sale': '.sale',
        '#collection': '.collection'
    };

    hash = window.location.hash;
    if(allowedHashFilters.hasOwnProperty(hash))
    {

       var activeTab = $('#filters').find("a[data-filter='"+allowedHashFilters[hash]+"']");
       activeTab.click();
       $([document.documentElement, document.body]).animate({
            scrollTop: activeTab.offset().top
        }, 2000);
    }

    if( $(window).width() < 768) {

        $('.home-item-tabs > span').click(function(event) {
            $(this).addClass('open');
            $('.home-item-tabs li').fadeIn();
        });

        $('.home-item-tabs li').click(function(event) {
            $('.home-item-tabs li').fadeOut();
            $('.home-item-tabs > span').removeClass('open');
        });
    }

    $('.left-mob-menu li:not(.no-sub) a').click(function(event) {
        var parent = $(this).parent();
        if(parent.hasClass('open'))
        {
            parent.removeClass('open');
            parent.find('.sub-mob-menu').fadeOut();
        }
        else
        {
            $('.sub-mob-menu').fadeOut(0);
            $('.left-mob-menu li').removeClass('open');
            $(this).parent().toggleClass('open');
            $(this).parent().find('.sub-mob-menu').fadeToggle();
        }
        //event.preventDefault();

    });

    $(document).click(function(e) {
        if (!$(e.target).is('.left-mob-menu li a, .left-mob-menu li *')) {
            $('.sub-mob-menu').fadeOut(0);
            $('.left-mob-menu li').removeClass('open');
        }
    });

    $('.search-form-show').click(function(event) {
        $('.search-mob').fadeIn();
        $('.sub-mob-menu').fadeOut(0);
        $('.left-mob-menu li').removeClass('open');
        event.preventDefault();
    });

    $('.search-mob-conc').click(function(event) {
        $('.search-mob').fadeOut();
        event.preventDefault();
    });

    $('.menu-right-mob-tit').click(function(event) {
        $('.header-hide-menu').fadeOut(0);
        $('.head-menu-line-right ul').fadeToggle();
    });

    $('.header-menu-cat > a').click(function(event) {
      //  $('.head-menu-line-right ul').fadeOut();
        $('.header-hide-menu').fadeToggle();
        event.preventDefault();
    });

    $(document).click(function(e) {
        if (!$(e.target).is('.header-menu-cat *')) {
            $('.header-hide-menu').fadeOut(0);
        }
    });
});
