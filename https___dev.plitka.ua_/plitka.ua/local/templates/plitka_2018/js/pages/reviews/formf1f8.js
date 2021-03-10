function activateReviewForm(formId){
    $("form#"+formId).unbind('submit').submit(function(e){
        e.preventDefault();
        var request = $.ajax({
            url: "/local/ajax/reviews/add.php",
            method: "POST",
            data:  $( this ).serialize(),
            dataType: "json"
        });

        container = $(this).parents('.reviews_block').find('.result-block');
        $(container).empty().removeClass('error, success');
        request.done(function( response ) {
            if(response.success){
                $.each(response.result, function(i, val) {
                    container.append('<p>'+val+'</p>');
                });
                $(container).addClass('success');
                $("form#"+formId).fadeOut('fast', function(){
                    $(this).remove();
                });
            }
            else{
                $.each(response.errors, function(i, val) {
                    container.append('<p>'+val+'</p>');
                });
                $(container).addClass('error');
            }

        });

        request.fail(function( jqXHR, textStatus ) {
            $(container).html(textStatus);
            $(container).addClass('error');
        });
    });
}