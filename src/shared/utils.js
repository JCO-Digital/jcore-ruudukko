/*
 * Both save functions build their markup from these, so the classes they
 * produce for a given set of attributes must never change: a different class
 * list would invalidate every block saved before.
 */

/**
 * Returns the class names and styles for a grid container.
 *
 * @param {Object} attributes Grid block attributes.
 * @return {{className: string, style: Object}} Props for useBlockProps.
 */
export function generateGridProps( attributes ) {
	const classList = [];
	const style = {};
	switch ( attributes.blockType ) {
		case 'grid':
			classList.push( 'jgrid' );
			break;
		case 'flex':
			classList.push( 'jflex' );
			break;
	}
	if ( ! attributes.autoSize ) {
		Object.keys( attributes.breakpoints ).forEach( ( bp ) => {
			classList.push(
				`columns-${ bp }-${ attributes.breakpoints[ bp ] }`
			);
		} );
	}
	if ( attributes.blockType === 'flex' && attributes.centerRows ) {
		classList.push( 'jflex-center' );
	}
	if ( attributes.minSize ) {
		style[ '--jcore-column-min' ] = attributes.minSize;
	}
	const gap = presetToCss( attributes.style?.spacing?.blockGap );
	if ( gap ) {
		style[ '--jcore-gap' ] = gap;
	}
	return { className: classList.join( ' ' ), style };
}

/**
 * Turns a spacing preset reference into the custom property behind it.
 *
 * The block gap control stores `var:preset|spacing|40` for a preset and a
 * plain CSS length otherwise.
 *
 * @param {string|undefined} value Stored value.
 * @return {string|undefined} A CSS value.
 */
export function presetToCss( value ) {
	if ( typeof value !== 'string' || ! value.startsWith( 'var:' ) ) {
		return value;
	}
	return `var(--wp--${ value.slice( 4 ).split( '|' ).join( '--' ) })`;
}

/**
 * Returns the class names for a column.
 *
 * @param {Object} attributes Column block attributes.
 * @return {{className: string, style: Object}} Props for useBlockProps.
 */
export function generateColumnProps( attributes ) {
	const classList = [];
	if ( attributes.useBreakpoints ) {
		Object.keys( attributes.breakpoints ).forEach( ( bp ) => {
			classList.push( `span-${ bp }-${ attributes.breakpoints[ bp ] }` );
		} );
	} else if ( attributes.span > 1 ) {
		classList.push( `span-${ attributes.span }` );
	}
	return { className: classList.join( ' ' ), style: {} };
}
