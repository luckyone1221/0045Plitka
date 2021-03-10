if (typeof createOffersSlider == "undefined") {
    function createOffersSlider(sliderId) {
        if((typeof sliderId == 'string' || typeof sliderId == 'number') && sliderId.length > 0) {
            var sliderOptions = {
                minSlides: 1,
                maxSlides: 5,
                slideWidth: 270,
                slideMargin: 55,
                infiniteLoop: false,
                hideControlOnEnd: false,
                controls: true,
                responsive: true
            };
            return $("#"+sliderId+"_container").bxSlider(sliderOptions);
        }

    }
}