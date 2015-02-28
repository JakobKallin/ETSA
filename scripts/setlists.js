$(document).ready(function() {
	$('td.setlist').each(function() {
		var setlist = $('<ol class="setlist"/>');
		var songs = $(this).attr('title').split(/\n+/);
		$.each(songs, function(index, song) {
			$('<li/>').text(song).appendTo(setlist);
		});
		setlist.hide();
		
		var link = $(' <a href="">(setlist)</a>').click(function() {
			setlist.toggle();
			return false;
		});
		
		$(this).append(link);
		$(this).append(setlist);
		$(this).removeAttr('title');
	});
});