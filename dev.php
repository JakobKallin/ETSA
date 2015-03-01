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
	alter_dom($path, 'remove_quiz_link');
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