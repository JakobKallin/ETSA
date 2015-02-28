(function($) {
	$.fn.year_dropdown = function(first_year, last_year, initial_year) {
		var dropdown = $('<select/>');
		for ( var year = first_year; year <= last_year; year++ ) {
			var option = $('<option>' + year + '</option>');
			if ( year == initial_year ) {
				option.attr('selected', true);
			}
			dropdown.prepend(option);
		}
		
		dropdown.change(function() {
			if ( dropdown.val() !== initial_year ) {
				location.href = '/shows/' + dropdown.val() + '/';
			}
		});
		
		return dropdown;
	};
})(jQuery);