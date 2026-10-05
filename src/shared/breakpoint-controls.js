import { __ } from '@wordpress/i18n';
import { RangeControl, ToggleControl } from '@wordpress/components';

import { breakpoints, MAX_COLUMNS } from './constants';

/**
 * A toggle and a column count for every breakpoint.
 *
 * A breakpoint that is switched off is removed from the object rather than
 * set to undefined: an undefined value still produces a class in the editor,
 * which is then missing when the post is reloaded and fails validation.
 *
 * @param {Object}   props
 * @param {Object}   props.value    Column count keyed by breakpoint.
 * @param {Function} props.onChange Called with the new object.
 * @param {string}   props.label    Label for the column count.
 * @return {Element} The controls.
 */
export default function BreakpointControls( { value, onChange, label } ) {
	function update( bp, count ) {
		const next = { ...value };
		if ( count ) {
			next[ bp ] = count;
		} else {
			delete next[ bp ];
		}
		onChange( next );
	}

	return breakpoints.map( ( bp ) => (
		<section className="jcore-ruudukko-breakpoint" key={ bp.value }>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ bp.label }
				checked={ !! value[ bp.value ] }
				onChange={ ( enabled ) => update( bp.value, enabled ? 2 : 0 ) }
			/>
			{ !! value[ bp.value ] && (
				<RangeControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ label ?? __( 'Columns', 'jcore-ruudukko' ) }
					value={ value[ bp.value ] }
					onChange={ ( count ) => update( bp.value, count ) }
					min={ 1 }
					max={ MAX_COLUMNS }
				/>
			) }
		</section>
	) );
}
