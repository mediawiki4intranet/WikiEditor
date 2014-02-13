/*
 * JavaScript for WikiEditor Dialogs
 */

$.wikiEditor.addHook( function() {
	if ( !$.wikiEditor.isSupported( $.wikiEditor.modules.dialogs ) ) {
		return;
	}
	
	// Replace icons
	$.wikiEditor.modules.dialogs.config.replaceIcons( $( this ) );
	
	// Add dialogs module
	$( this ).wikiEditor( 'addModule', $.wikiEditor.modules.dialogs.config.getDefaultConfig() );
} );
