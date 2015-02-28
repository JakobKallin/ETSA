$(document).ready(function() {
	$('.current-year').replaceWith(function() {
		return $.fn.year_dropdown(1981, 2014, $(this).text());
	});
});
