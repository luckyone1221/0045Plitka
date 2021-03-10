function isotopeAjaxLoader(id)
{
    if(!id)
    {
        console.log('Error: empty isotope ajax id');
        return false;
    }

    var navCompileId = [];

    switch(id)
    {
        case 'collection':
            navCompileId = ['collection'];
            break;
        case 'news':
            navCompileId = ['news'];
            break;
        case 'article':
            navCompileId = ['article'];
            break;
        case 'sale':
            navCompileId = ['sale'];
            break;
        case 'all':
        default:
            navCompileId = [
                'all',
                'collection',
                'news',
                'article',
                'sale'
            ];
            break;
    }
    var loaderContainer = $('#isotope-ajax-loader-'+id);
    loaderContainer.addClass('loading');
    var url = window.location.pathname;
    var params = compileIsotopeAjaxParamString(navCompileId);
    params = replaceQueryParam('content_request_type', id, params);
    BX.ajax({
        url: url + params,
        method: 'GET',
        dataType: 'html',
        timeout: 30,
        async: true,
        processData: true,
        scriptsRunFirst: true,
        emulateOnload: true,
        start: true,
        cache: false,
        onsuccess: function(result){
            var items = $(result).find('.element-item');
            if(items.length <= 0)
            {
                loaderContainer.find('a').text('Все элементы загружены').attr('onclick', 'return false;');
            }
            else
            {
                $grid = $('.grid');
                $grid.on( 'layoutComplete', function( event, laidOutItems ) {
                    if(typeof countersUpdateEvent === 'function')
                    {
                        countersUpdateEvent();
                    }
                });
                items.imagesLoaded().always( function() {
                    $grid.isotope( 'insert', items );
                });
            }
            loaderContainer.removeClass('loading');
            incrementIsotopeAjaxNavPage(navCompileId);
        }.bind(this),
        onfailure: function(){
            alert('Произошла ошибка. Повторите попытку позже или обратитесь к администратору.')
        }
    });

    /*if(params.indexOf(navId) < 0)
    {
        if(params.indexOf("?") < 0)
            params = params+navId+"/page-"+number_page+"/";
        else
            params = params+navId+"/page-"+number_page+"/";

        params = params+"?AJAX_CONTENT_ID=<?=$arParams['AJAX_ID'];?>";
        params = params+"&AJAX_CONTENT_LOADING=Y";
        params = params+decodeURIComponent(window.location.search);
    }

    */
}

function replaceQueryParam(param, newval, search)
{
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');
    return (query.length > 2 ? query + "&" : "?") + param + "=" + newval
}

function compileIsotopeAjaxParamString(navCompileId)
{
    var params = decodeURIComponent(window.location.search);

    for(i in navCompileId)
    {
        nav = navCompileId[i];
        var currentPage = $('#isotope-ajax-loader-'+nav+'-page');
        if(currentPage.length > 0)
        {
            var nextPage = parseInt(currentPage.val()) + 1;
            params = replaceQueryParam(nav, 'page-'+nextPage, params);
        }
    }

    return params;
}

function incrementIsotopeAjaxNavPage(navCompileId)
{
    for(i in navCompileId)
    {
        nav = navCompileId[i];
        var currentPage = $('#isotope-ajax-loader-'+nav+'-page');
        var nextPage = parseInt(currentPage.val()) + 1;
        currentPage.val(nextPage);
    }
}


$(function () {
    var $filtersBlock = $('#filters');
    var currentTab = $filtersBlock.find('li.active');
    var navId = currentTab.data('nav-id');
    if(!!navId)
    {
        $('#isotope-ajax-loader-'+navId).show();
    }

    $('body').on('click', '#filters li', function (e){
        var navId = $(e.currentTarget).data('nav-id');
        if(!!navId)
        {
            $('.isotope-ajax-loader').hide('fast', function(){
                $('#isotope-ajax-loader-'+navId).show();
            });
        }
    });

    $('body').on('click', '.action--click-Showinc', function(e){
        var $this = $(this);
        var $item = $this.closest('.element-item');
        if( $item.is('.news, .sale') ){
            if( $(this).attr('href').indexOf(/action|content/) ){
                $.get('/ajax/inc_show.php?id='+$item.find('.one-home-it-view').attr('data-counter-id').split('-')[1]);
            }
        }
    });
});