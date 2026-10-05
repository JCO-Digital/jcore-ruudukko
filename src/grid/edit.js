import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';

import BreakpointControls from '../shared/breakpoint-controls';
import { generateGridProps } from '../shared/utils';

import './editor.scss';

// A new grid starts with two columns rather than an empty container.
const TEMPLATE = [ [ 'jcore/column' ], [ 'jcore/column' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { blockType, autoSize, minSize, breakpoints, centerRows } =
		attributes;

	// The inner blocks render straight into the grid, with no wrapper, so the
	// editor is laid out by the same stylesheet as the front end.
	const innerBlocksProps = useInnerBlocksProps(
		useBlockProps( generateGridProps( attributes ) ),
		{ orientation: 'horizontal', template: TEMPLATE }
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'jcore-ruudukko' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Auto columns', 'jcore-ruudukko' ) }
						help={
							autoSize
								? __(
										'Fit as many columns as the minimum width allows.',
										'jcore-ruudukko'
								  )
								: __(
										'Set the number of columns per breakpoint.',
										'jcore-ruudukko'
								  )
						}
						checked={ autoSize }
						onChange={ ( value ) =>
							setAttributes( { autoSize: value } )
						}
					/>
					{ autoSize ? (
						<TextControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __(
								'Minimum column width',
								'jcore-ruudukko'
							) }
							placeholder="360px"
							value={ minSize }
							onChange={ ( value ) =>
								setAttributes( { minSize: value } )
							}
						/>
					) : (
						<BreakpointControls
							value={ breakpoints }
							onChange={ ( value ) =>
								setAttributes( { breakpoints: value } )
							}
						/>
					) }
					{ blockType === 'flex' && ! autoSize && (
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Centre the last row',
								'jcore-ruudukko'
							) }
							help={ __(
								'Only applies when the last row has fewer columns than the rest.',
								'jcore-ruudukko'
							) }
							checked={ centerRows }
							onChange={ ( value ) =>
								setAttributes( { centerRows: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<section { ...innerBlocksProps } />
		</>
	);
}
