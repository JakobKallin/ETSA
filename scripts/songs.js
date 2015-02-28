$(document).ready(function() {
	function markRowParity(table) {
		var rows = $('tbody tr:visible', table);
		var even = false;
		rows.each(function() {
			if ( even ) {
				$(this).removeClass('odd');
				$(this).addClass('even');
			} else {
				$(this).removeClass('even');
				$(this).addClass('odd');
			}
			even = !even;
		});
	}
	
	$.tablesorter.addWidget({
		id: 'rowParity',
		format: markRowParity
	});
	
	var song_table = $('#song-table');
	var song_tbody = $('tbody', song_table).first();
	var search_form = $(
		'<form>' +
		'<table class="horizontal"><tbody><tr>' +
		'<th><label for="song-search">Search</label></th>' +
		'<td><input type="text" id="song-search"></td>' +
		'</tr></tbody></table>' +
		'</form>');
	search_form.insertAfter($('#songs .note').first());
	
	var no_results_row = $(
		'<tr class="note"><td colspan="6">' +
		'There were no results for the query you entered.' +
		'</td></tr>');
	
	var search_input = $('#song-search');
	search_input.quicksearch(
		'#song-table tbody tr',
		{
			hide: function() {
				$(this).removeClass('matched');
				$(this).addClass('unmatched');
			},
			show: function() {
				$(this).removeClass('unmatched');
				$(this).addClass('matched');
			},
			onAfter: function() {
				markRowParity(song_table);
				if ( $('tr:visible:not(.note)', song_tbody).size() === 0 ) {
					no_results_row.prependTo(song_tbody);
				} else {
					no_results_row.remove();
				}
			}
		}
	);
	
	song_table.tablesorter({
		cssHeader: 'sortable',
		cssAsc: 'ascending',
		cssDesc: 'descending',
		headers: {
			0: {sorter: 'text'}
		},
		widgets: ['rowParity'],
		textExtraction: function(node) {
			return $(node).text().replace('ü', 'u').replace('Ü', 'U');
		}
	});
	
	song_table.trigger('sorton', [[[0, 0]]]);
});
