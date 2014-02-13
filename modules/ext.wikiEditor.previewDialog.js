/*
 * JavaScript for WikiEditor Preview Dialog
 */

$.wikiEditor.addHook( function() {
	// Add preview module
	$( this ).wikiEditor( 'addModule', 'previewDialog' );
} );
