$(document).on('submit','#auth_form_modal',function () {

    var input = $(this).find('.validate-input .input100');
    var check = true;

    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
        }
    }

    if (check) {
        BX.ajax.runComponentAction('DBdev:tq_auth',
            'Auth', { // Вызывается без постфикса Action
                mode: 'class',
                data: {login:$(this).find('input[name="LOGIN"]').val(),password:$(this).find('input[name="PASSWORD"]').val()}, // ключи объекта data соответствуют параметрам метода
            })
            .then(function(response) {
                if(response.data.STATUS === 'SUCCESS'){
                    window.location.hash = 'reload';
                    window.location.reload();

                } else {
                    $('.error-box').html(response.data.MESSAGE).show();
                }
            });
        return false;
    } else {
        return false;
    }

})




function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
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