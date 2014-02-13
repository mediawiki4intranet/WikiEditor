/*
 * JavaScript for WikiEditor Preview module
 */

$.wikiEditor.addHook( function() {
	// Add preview module
	$( this ).wikiEditor( 'addModule', 'preview' );
} );
