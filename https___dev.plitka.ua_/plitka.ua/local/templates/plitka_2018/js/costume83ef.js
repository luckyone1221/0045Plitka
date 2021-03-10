jQuery(function($) {

    $(document).on('keyup', 'input[name="LOGIN"]', function () {
        let value = $(this).val();
        if ($(this).val().length == 1) {
            if (isNaN(parseInt($(this).val()))) {
                $(this).attr('maxlength', '30');
            } else {
                if (value == 3) {
                    $(this).val('+' + value);
                } else if (value == 8) {
                    $(this).val('+3' + value);
                } else {
                    $(this).val('+38' + value);
                }
                $(this).attr('maxlength', '13');
            }
        }
    })

    $(document).on('keyup', 'input[name="PHONE"]', function () {
        let value = $(this).val();
        if ($(this).val().length == 1) {
            if (isNaN(parseInt($(this).val()))) {
                $(this).val('');
            } else {
                if (value == 3) {
                    $(this).val('+' + value);
                } else if (value == 8) {
                    $(this).val('+3' + value);
                } else {
                    $(this).val('+38' + value);
                }
                $(this).attr('maxlength', '13');
            }
        }
    })

    /*$('input[name="PHONE"]').mask('+380999999999');*/

    $(document).on('keyup', '#forgot_form input', function () {
        let $this = $(this);
        $(this).parents('#forgot_form').find('input').each(function (index) {
            if ($this.prop('name') == $(this).prop('name')) {
                return true;
            }
            $(this).prop('disabled', true);
        });
    })

    $('.dds_auth_modal').magnificPopup({
        type:'inline',
    });



    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'EMAIL') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    if(window.location.hash == "#reload"){
        let reviewTab;
        $('#tabs-coll').tabs();

        $('#tabs-coll li a').each(function (key, value) {
            if ($(this).attr('data-review-tab') == 'Y') {
                reviewTab = key;
                $( "#tabs-coll" ).tabs( "option", "active", reviewTab );
            }

        })


        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tq_review_container").offset().top
        }, 750);
    }

});


