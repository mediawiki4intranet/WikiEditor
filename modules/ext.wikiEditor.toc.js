/*
 * JavaScript for WikiEditor Table of Contents
 */

$.wikiEditor.addHook( function() {
	// Add table of contents module
	$( this ).wikiEditor( 'addModule', 'toc' );
} );
