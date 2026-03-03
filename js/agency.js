/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (https://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see https://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

function closeOpenModalOnEsc(event) {
	var key = event.key || event.keyCode || event.which;
	if (key === 'Escape' || key === 'Esc' || key === 27) {
		$('.modal.in').modal('hide');
	}
}

window.addEventListener('keydown', closeOpenModalOnEsc, true);

$(document).on('hide.bs.modal', '.modal', function() {
	var active = document.activeElement;
	if (active && this.contains(active)) {
		active.blur();
	}
});

$(document).on('hidden.bs.modal', '.modal', function() {
	if (document.activeElement === document.body) return;
	document.body.focus();
});

$(document).on('hidden.bs.modal', '.modal', function() {
	if (location.hash === '#' + this.id) {
		history.replaceState(null, '', location.pathname + location.search);
	}
});
