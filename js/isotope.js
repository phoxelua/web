$(document).ready(function() {
	$('#bulk').isotope();
	
	$('a.button').click(function(e) {
        e.preventDefault();
		var to_filter = $(this).attr('rel');
		if(to_filter == 'all') {
            $('#bulk').isotope({filter: '.box'});
		} else {
            $('#bulk').isotope({filter: '.'+ to_filter});
		}
		
	});
});