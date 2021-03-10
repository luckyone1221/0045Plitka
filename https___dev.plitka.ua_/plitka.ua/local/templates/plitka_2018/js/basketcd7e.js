var smallBasket = {
    basketAddItem: function (element_id, qnt) {
        var quantity = $("#elem_measure_" + element_id).val() || $("#elem_quantity_" + element_id).val() || $("#elem_" + element_id).val();

        var qnt = parseFloat(qnt);
        if( qnt != qnt ){
            qnt = 0;
        }

        if (!quantity && qnt > 0)
        {
            quantity = qnt;
        } else if(quantity <= 0) {
            quantity = 1;
        } 

        $.ajax({
            type: "POST",
            url: "/local/ajax/basket/basket_add_element.php",
            data: {
                element_id: element_id,
                quantity: quantity
            },
            error: function (){
                alert('Произошла ошибка.');
            },
            success: function(data) {
                var result = JSON.parse(data);
                smallBasket.basketOpen();
                smallBasket.basketTopUpdate(result);
            }
        });

        return false;
    },
    basketTopUpdate: function (data){
        var topBasket = $(".basket_box");
        $(topBasket).find(".total-quantity").html(data.total_qty);
        $(topBasket).find(".total-sum").html(data.total_sum);
    },
    basketOpen: function () {
        $.post(
            '/local/ajax/basket/getsmall.php',
            function(data){
                if(data.length > 0){
                    var dontShowRegularBasket = false;
                    if(typeof $.fancybox != 'undefined')
                    {
                        var instance = $.fancybox.getInstance();
                        if(typeof instance.FullScreen != 'undefined') 
                        {
                            if (instance.FullScreen.isFullscreen() && !smallBasket.basket_open) {
                                var basketFullscreen = $('.fancybox-slide--current').first().append('<div id="basket-fullscreen"><div class="basket_dlg"></div>');
                                $(basketFullscreen).find('.basket_dlg').html(data);
                                $(basketFullscreen).animate({scrollTop: 0}, "slow");
                                dontShowRegularBasket = true;
                            }
                            instance.SlideShow.stop();
                        }

                    }
                    if(!dontShowRegularBasket) {
                        $('.basket_dlg').html(data);
                        $("#basket_dlg").css("display", "table");
                        $(".popup-overlay").css("display", "block");
                        $("html, body").animate({scrollTop: 0}, "slow");
                    }
                    var html = $('html');
                    if(html.hasClass('fancybox-enabled'))
                    {
                        html.addClass('basket-overflow');
                    }
                    smallBasket.basket_open = true;

                }
            },
            'html'
        );
        return false
    },
    basketClose: function () {
        smallBasket.basket_open = false;
        $("#basket-fullscreen").remove();
        $("#basket_dlg").css("display","none");
        $(".popup-overlay").css("display","none");
        var html = $('html');

        html.removeClass('basket-overflow');

        return false
    },
    basketClear: function () {
        $.ajax({
            type: "POST",
            url: "/local/ajax/basket/basket_clear.php",
            error: function (){
                alert('Произошла ошибка.');
            },
            success: function(data) {
                $('.basket-item').remove();
                $('.total-order-sum').text("0 грн.");
            }
        });
    },
    basketSetElementQuantity: function (element_id, element_cnt) {
        var measureInput = $('#measure_'+element_id);
        var measureRatioMode = false;
        var measureRatio = 1;
        if(measureInput.length > 0)
        {
            measureRatio = $('#measure_ratio_'+element_id).val();
            if(measureRatio)
            {
                element_cnt = parseFloat(measureRatio * element_cnt);
                element_cnt.toFixed(4);
                measureRatioMode = true;
            }

        }

        $.ajax({
            type: "POST",
            url: "/local/ajax/basket/basket_set_element_quantity.php",
            data: {
                element_id: element_id,
                element_cnt: element_cnt
            },
            error: function (){
                alert('Произошла ошибка.');
            },
            success: function(data) {
                var total = JSON.parse(data);
                smallBasket.basketTopUpdate(total);
                $('.total-order-sum').text(total['total_sum']);
                if (element_cnt > 0) {
                    $('#sum_' + element_id).text(total['current_sum']);
                }
                if(measureRatioMode)
                {
                    measureInput.val(total['measure_sum'])
                }
            }
        });
    },
    basketClearItem:function (element_id) {
        $('.row_' + element_id).remove();
        smallBasket.basketSetElementQuantity(element_id, 0);
    },
    basketRecalcItem: function (element_id) {
        var new_qty = $("#qty_"+element_id).val();
        smallBasket.basketSetElementQuantity(element_id, new_qty);
    },
    basketRecalc: function () {
        var element_id = 0;
        $(".basket_qty").each(function(index) {
            var input_id = $(this).attr("id");
            element_id = input_id.substr(4);
            smallBasket.basketRecalcItem(element_id);
        });
    },
    minusQuantity: function (item){
        var $input = $(item).parentsUntil('.num-block').find('input.in-num');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    },
    plusQuantity: function (item){
        var $input = $(item).parentsUntil('.num-block').find('input.in-num');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    },
    plusMeasure: function(itemId)
    {
        this.plusQuantity(document.getElementById('quantity_plus_'+itemId));
    },
    minusMeasure: function(itemId)
    {
        this.minusQuantity(document.getElementById('quantity_plus_'+itemId));
    },
    basket_open: false
};

// facebook
var marketing = {
    addToCart: function(mpn){
        try
        {
            fbq('track', 'AddToCart', {
               currency: 'UAH',
               content_ids: mpn,
               content_type: 'product'
            });
        } catch(e) {
            console.log('facebook targeting not loaded');
        }
    }
};