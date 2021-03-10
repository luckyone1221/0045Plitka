$(document).ready(function () {
    $("#tabs_maps").tabs({
        activate: function( event, ui ) {
            var map = $(ui.newPanel).find('.bx-google-map').attr('id');
            var myMap = document.getElementById(map);
            google.maps.event.trigger(myMap, 'resize');
            var strMapId = map.replace('BX_GMAP_', '');
            var obMap = GLOBAL_arMapObjects[strMapId];
            obMap.setCenter(window.arMapPlacemarks[strMapId].getPosition());
        }
    });

    $('.open-tab').click(function (event) {
        event.preventDefault();
        $('#tabs_maps').tabs("option", "active", $(this).data("tab-index"));
        $('html, body').animate({
            scrollTop: $("#tabs_maps").offset().top
        }, 2000);
    });
});