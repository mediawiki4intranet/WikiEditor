/*
 * JavaScript for WikiEditor Template Editor
 */

$.wikiEditor.addHook( function() {
	// Disable in template namespace
	if ( mw.config.get( 'wgNamespaceNumber' ) === 10 ) {
		return true;
	}
	// Add template editor module
	$( this ).wikiEditor( 'addModule', 'templateEditor' );
});
