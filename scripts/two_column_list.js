$(document).ready(function() {
	$('ul.two-column, ol.two-column').each(function() {
		var tag_name = this.tagName.toLowerCase();
		var median = Math.ceil($(this).children().size() / 2);
		
		if ( $(this).children().size() >= 5 ) {
			var left = $(document.createElement(tag_name));
			left.attr('class', 'left');
			
			var right = $(document.createElement(tag_name));
			right.attr('class', 'right');
			
			$(this).children().each(function(index) {
				if ( index < median ) {
					left.append(this);
				} else {
					right.append(this);
				}
			});
			
			$(this).replaceWith(left);
			right.insertAfter(left);
		}
	});
});