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
