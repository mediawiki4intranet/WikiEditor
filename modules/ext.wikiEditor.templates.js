/*
 * JavaScript for WikiEditor Templates
 */

$.wikiEditor.addHook( function() {
	// Disable for template namespace
	if ( mw.config.get( 'wgNamespaceNumber' ) === 10 ) {
		return true;
	}
	// Add templates module
	$( this ).wikiEditor( 'addModule', 'templates' );
} );
