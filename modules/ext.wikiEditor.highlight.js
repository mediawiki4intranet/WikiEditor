/*
 * JavaScript for WikiEditor Highlighting
 */

$.wikiEditor.addHook( function() {
	// Add highlight module
	$( this ).wikiEditor( 'addModule', 'highlight' );
} );
