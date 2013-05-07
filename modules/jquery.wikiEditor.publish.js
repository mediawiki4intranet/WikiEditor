/* Publish module for wikiEditor */
/*jshint onevar:false */
( function ( $ ) {

$.wikiEditor.modules.publish = {

/**
 * Internally used functions
 */
fn: {
	/**
	 * Creates a publish-staying-in-edit-mode button within a wikiEditor
	 * @param context Context object of editor to create module in
	 * @param config Configuration object to create module from
	 */
	create: function ( context, config ) {
		if ( !document.editform ) {
			return;
		}
		var saving = false;
		context.$controls.show();
		context.$buttons.show();
		// Do not use context.fn.addButton as it prevents Enter click on other form fields to correctly submit the form
		var btn = $( '<input type="button" disabled="disabled" id="wikieditor-publish-button" />' )
			.val( $.wikiEditor.autoMsg( { captionMsg: 'wikieditor-publish-button-publish' }, 'caption' ) )
			.appendTo( context.$buttons );
		var doSave = function( newsection ) {
			var sect = ( document.editform.wpSection || {} ).value;
			var d = {
				action: 'edit',
				format: 'json',
				title: mw.config.get( 'wgPageName' ),
				summary: document.editform.wpSummary.value,
				text: context.$textarea.val(),
				basetimestamp: document.editform.wpEdittime.value,
				token: document.editform.wpEditToken.value,
				minor: ( document.editform.wpMinoredit || {} ).checked ? 1 : undefined,
				watch: ( document.editform.wpWatchthis || {} ).checked ? 1 : undefined
			};
			if ( sect ) {
				d.section = sect;
			}
			$.ajax( {
				url: mw.util.wikiScript( 'api' ),
				type: 'POST',
				dataType: 'json',
				data: d,
				success: function ( data ) {
					if ( data.error ) {
						console.log( data.error );
						alert( mw.msg( 'wikieditor-publish-error', data.error.info ) );
					} else {
						if ( data.edit.newtimestamp ) {
							document.editform.wpEdittime.value = data.edit.newtimestamp.replace( /\D+/g, '' );
						}
						btn.prop( 'disabled', true );
						if ( newsection ) {
							document.editform.wpSection.value = sect = newsection;
						}
						if ( sect ) {
							$.ajax( {
								url: mw.util.wikiScript( 'api' ),
								type: 'POST',
								dataType: 'json',
								data: {
									action: 'parse',
									format: 'json',
									page: mw.config.get( 'wgPageName' ),
									prop: 'wikitext',
									section: sect
								},
								success: function ( data ) {
									if ( data.parse && data.parse.wikitext && data.parse.wikitext['*'] !== undefined ) {
										context.$textarea.val( data.parse.wikitext['*'] );
									}
								}
							} );
						}
					}
				},
				complete: function() {
					document.getElementById( 'wpSave' ).disabled = false;
					saving = false;
				}
			});
		}
		btn.click( function () {
			if ( saving ) {
				return;
			}
			saving = true;
			document.getElementById( 'wpSave' ).disabled = true;
			var sect = ( document.editform.wpSection || {} ).value;
			if ( sect == 'new' ) {
				// Query for the last section number before saving
				// X+1 will be the new section number
				$.ajax( {
					url: mw.util.wikiScript( 'api' ),
					type: 'POST',
					dataType: 'json',
					data: {
						action: 'parse',
						format: 'json',
						page: mw.config.get( 'wgPageName' ),
						prop: 'sections'
					},
					success: function( data ) {
						if ( data.parse && data.parse.sections ) {
							doSave( parseInt( data.parse.sections[data.parse.sections.length-1].index ) + 1 );
						} else {
							if ( data.error ) {
								console.log( data.error );
								alert( mw.msg( 'wikieditor-publish-error', data.error.info ) );
							}
							document.getElementById( 'wpSave' ).disabled = false;
							saving = false;
						}
					},
					error: function() {
						document.getElementById( 'wpSave' ).disabled = false;
						saving = false;
					}
				} );
			} else {
				doSave();
			}
			return false;
		} );
		var chg = function() {
			btn.prop( 'disabled', false );
			return true;
		};
		context.$textarea.bind( 'cut paste keypress change', chg );
	}
}

};

}( jQuery ) );
