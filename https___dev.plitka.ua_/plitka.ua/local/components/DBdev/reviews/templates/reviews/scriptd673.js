$(function () {

    $(document).on('click', '.nsLikeUp', function () {
            $this = $(this);
            let id = $this.attr('data-id');
            $.ajax({
                url: '/local/components/DBdev/reviews/templates/reviews/ajax.php',
                type: "POST",
                dataType:'json',
                data: {id:id,action:'like'},
                success: function (data) {
                    if(data.STATUS=='SUCCESS'){
                        $this.find('span').text(data.COUNT);
                        $this.addClass('activeUp');
                        $this.removeClass('nsLikeUp');
                        $this.parents('.one-comm-like').find('.nsLikeDown').removeClass('nsLikeDown');
                    }else{
                        alert(data.MESSAGE)
                    }

                }
            });
    })

    $(document).on('click', '.nsLikeDown', function () {
            $this = $(this);
            let id = $this.attr('data-id');
            $.ajax({
                url: '/local/components/DBdev/reviews/templates/reviews/ajax.php',
                type: "POST",
                data: {id:id,action:'dislike'},
                dataType:'json',
                success: function (data) {
                    if(data.STATUS=='SUCCESS'){
                        $this.find('span').text(data.COUNT);
                        $this.addClass('activeDown');
                        $this.removeClass('nsLikeDown');
                        $this.parents('.one-comm-like').find('.nsLikeUp').removeClass('nsLikeUp');
                    }else{
                        alert(data.MESSAGE)
                    }
                }
            });

    })


    $(document).on('click', '.nsClose', function () {
        $(this).parents('.form-inside-comm').slideToggle();
        return false;
    })

    $(document).on('submit', '.nsReviewAnswer', function () {
        let $this = $(this);

        $.ajax({
            url: window.location.href,
            type: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function (data) {
                var $ansDom = $this.parents('.form-inside-comm').siblings('.comm-was-send');
                    $ansDom.find('.was-send-text').text(data.MESSAGE);
                if( data.STATUS == 'SUCCESS' ){
                    $ansDom.slideDown();
                    $this.parents('.form-inside-comm').slideUp();
                }
            }
        });
        return false;
    })

    $(document).on('submit', '#nsSendReview', function () {
        var $this = $(this);
        /*var formdata = new FormData();
        var filedata = document.getElementsByName("files[]");
        var i = 0, len = filedata[0].files.length, file;
        for (; i < len; i++) {
            file = filedata[0].files[i];
            formdata.append("files[]", file);
        }*/
        formData = new FormData($this.get(0));
        $.ajax({
            url: window.location.href,
            type: "POST",
            contentType: false,
            processData: false,
            data: formData,
            dataType:'html',
            success: function (data) {
                $('#tq_review_container').html($(data).find('#tq_review_container').html())
            }
        });


        return false;
    })
    $(document).on('click','[data-showall]',function () {
        
        var $this = $(this);
        $.ajax({
            url: '/local/components/DBdev/reviews/templates/reviews/ajax.php',
            type: "POST",
            data: {id:$this.attr('data-showall'),collectionid:$this.attr('data-collection'),action:'get_reviews'},
            dataType:'html',
            success: function (data) {
               $this.parents('.all-comm-inside').html(data);
               //console.log(data);
            }
        });
        
        //$('.one-comm-inside', $(this).parent()).removeClass('hidden');
        //$(this).addClass('hidden');
    })


    $(document).on('submit', '#addFile form', function () {

        if ($('#nsSendReview').find('#sendFiles').length == 0) {
            $('#nsSendReview').append('<input type="file" name="files[]" id="sendFiles" multiple style="display: none"/>');
        }
        let filesInput = document.getElementById('sendFiles');
        filesInput.files = document.getElementById('file').files;

        if (typeof document.getElementsByClassName('more-inp')[1] !== 'undefined') {
            if ($('#nsSendReview').find('#sendMoreFiles').length == 0) {
                $('#nsSendReview').append('<input type="file" name="moreFiles[]" id="sendMoreFiles" multiple style="display: none"/>');
            }
            let filesMoreInput = document.getElementById('sendMoreFiles');

            filesMoreInput.files = document.getElementsByClassName('more-inp')[1].files;
        }
        return false;


    })

    /*$(document).on('submit','#addFile form',function () {

        $('#nsSendReview').append('<input type="hidden" name="files[]" value="'+$(this).find('#file').val()+'" miltiple>');


    })*/

})

/*$(document).on('click','#tq_review a[data-toggle="modal"]',function () {
    var curElement = $(this).closest('.one-comm-photo');
    var curIndex = $(curElement).index();

    $('.modal-gall-min-in .slick-slide:eq('+curIndex+')').click();

    $('.modal-gall-in').slick("refresh");
})*/
