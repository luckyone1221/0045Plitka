if (typeof initSortForm == "undefined") {
    function initSortForm(pageVar){
        function SetSortField(sortname, sortorder) {
            $("#sort_field").attr('value', sortname);
            $("#sort_order").attr('value', sortorder);
            $("#sortform").submit();
        }

        function SetPerPage(page_number) {
            $("input#"+pageVar).attr('value', page_number);
            $("form#form_"+pageVar).submit();
        }

        $("body").on("click", ".jq-selectbox__dropdown ul li[data-id='sort_options']", function(e){
            var sortname = $(e.target).data("sortname");
            var sortorder = $(e.target).data("sortorder");
            SetSortField(sortname, sortorder);
        });

        $("body").on("click", ".jq-selectbox__dropdown ul li[data-id='"+pageVar+"']", function(e){
            var page_number = $(e.target).data("page");
            SetPerPage(page_number);
        });
        $('select').styler({'selectSmartPositioning': false});
    }

}

$(function() {
    var new_block_hide_height = $("#panel").height()+$("header").height()+150;
    var newBlock = $('.one-carus-item.hidden-block');
    var newBlockIsHidden = false;
    var previousBlock = $('.one-carus-item:nth-child(2)');
    var hideNewBlock =  (window.innerWidth < 1180) ? true : false;
    function toggleNewBlock(){
        if ($(window).scrollTop() > new_block_hide_height || hideNewBlock)
        {
            if(!newBlockIsHidden) {
                newBlock.fadeOut(300, function () {
                    newBlock.appendTo('body');
                    newBlockIsHidden = true;
                });
            }
        }
        else
        {
            if(newBlockIsHidden) {
                previousBlock.after(newBlock);
                newBlock.fadeIn(300);
                newBlockIsHidden = false;
            }
        }
    }
    $(window).resize(function() {
        hideNewBlock = (window.innerWidth < 1180) ? true : false;
        toggleNewBlock();
    });
    $(window).scroll(function() {
        toggleNewBlock();
    });
});

