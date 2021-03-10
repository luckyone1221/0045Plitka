$(document).ready(function() {
	$("#tabs1 a").click(function() {
		var $self = $(this);
	    $([document.documentElement, document.body]).animate({
	        scrollTop: $($self.attr('href')).offset().top
	    }, 800);
	});

	// $('#tabs1 .cont_sb_l.tabs_b.fl.clf').stickySidebar({
	$('#tabs1 .sticky-block').stickySidebar({
	    topSpacing: 30,
	    resizeSensor: true,
	    stickyClass: "is-stick-sidebar",
	    minWidth: '900px'
	});
});