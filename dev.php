<?php

function map_path($path, $callback) {
	$subnames = scandir($path);
	foreach ( $subnames as $subname ) {
		if ( $subname !== '.' and $subname !== '..' and $subname !== '.git' ) {
			$subpath = $path . '/' . $subname;
			if ( is_dir($subpath) ) {
				map_path($subpath, $callback);
			}
			else if ( preg_match('/\.html$/', $subpath) ) {
				$callback($subpath);
			}
		}
	}
}

map_path('.', function($path) {
	alter_dom($path, 'remove_dynamic_record_preview_content');
});

function alter_contents($path, $callback) {
	$contents = file_get_contents($path);
	$new_contents = $callback($contents);
	file_put_contents($path, $new_contents);
}

function alter_dom($path, $callback) {
	alter_contents($path, function($contents) use($callback) {
		$dom = new DOMDocument();
		$dom->loadHTML($contents);
		$callback($dom);
		return $dom->saveHTML();
	});
}

function format_html($html) {
	$dom = new DOMDocument();
	$dom->loadHTML($html);
	$dom->formatOutput = true;
	$dom->preserveWhiteSpace = false;
	return $dom->saveHTML();
}

function remove_contact_form($doc) {
	$form = $doc->getElementById('contact');
	if ( $form ) {
		$form->parentNode->removeChild($form);
	}
}

function remove_contact_link($doc) {
	$xq = new DomXPath($doc);
	$link = $xq->query('//p[@class="note center clear"]')->item(0);
	if ( $link ) {
		$link->parentNode->removeChild($link);
	}
}

function remove_quiz_link($doc) {
	$xq = new DomXPath($doc);
	$link = $xq->query('//li[a[@href="/other/quizzes/"]]')->item(0);
	if ( $link ) {
		$link->parentNode->removeChild($link);
	}
}

function remove_statistics_link($doc) {
	$link = $doc->getElementById('menu-statistics');
	if ( $link ) {
		$link->parentNode->removeChild($link);
	}
}

function remove_show_page_statistics_link($doc) {
	$xq = new DomXPath($doc);
	$link = $xq->query('//a[text()="(more statistics)"]')->item(0);
	if ( $link ) {
		$link->parentNode->removeChild($link);
	}
}

function remove_upcoming_show_count($doc) {
	$xq = new DomXPath($doc);
	$count = $xq->query('//a[@href="/shows/#upcoming"]//span[@class="recent"]')->item(0);
	if ( $count ) {
		$count->parentNode->removeChild($count);
	}
}

function remove_dynamic_record_preview_content($doc) {
	$xq = new DomXPath($doc);
	$nodes = $xq->query('//div[@class="preview"]//tr[.//th[text()="Trivia"]]');
	foreach ( $nodes as $node ) {
		$node->parentNode->removeChild($node);
	}
	
	$xq = new DomXPath($doc);
	$nodes = $xq->query('//div[@class="preview"]//tr[.//th[text()="Charts"]]');
	foreach ( $nodes as $node ) {
		$node->parentNode->removeChild($node);
	}
	
	// Remove remaining empty tables.
	$nodes = $xq->query('//div[@class="preview"][not(.//tr)]');
	foreach ( $nodes as $node ) {
		$node->parentNode->removeChild($node);
	}
}