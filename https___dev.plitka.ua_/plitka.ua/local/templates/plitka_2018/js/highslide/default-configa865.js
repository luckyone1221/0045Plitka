hs.graphicsDir = '/local/templates/plitka/js/highslide/graphics/';
hs.outlinesDir = 'outlines/';
hs.align = 'center';
hs.transitions = ['expand', 'crossfade'];
hs.outlineType = 'rounded-white';
hs.fadeInOut = true;
hs.dimmingOpacity = 0.0;
hs.wrapperClassName = 'controls-in-bottom';
hs.marginBottom = 50;
hs.showCredits = false;


hs.addSlideshow({
    interval: 5000,
    repeat: false,
    useControls: true,
    fixedControls: 'fit',
    overlayOptions: {
        opacity: 0.75,
        position: 'bottom center',
        hideOnMouseOut: false
    }
});

