$(document).ready(function () {
    $('.tq_review_list').bxSlider({
        mode: 'horizontal',
        responsive: true,
        captions: true,
        shrinkItems: true,
        touchEnabled: false,
        slideWidth: 420,
        minSlides :1,
        maxSlides :3,
        prevSelector :'.tq_prev',
        nextSelector :'.tq_next',
        controls :{
            prevSelector :'.tq_next',
            nextSelector :'.tq_prev',
        }
    });

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
})