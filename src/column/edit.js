import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import BreakpointControls from '../shared/breakpoint-controls';
import { MAX_COLUMNS } from '../shared/constants';
import { generateColumnProps } from '../shared/utils';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { useBreakpoints, span, breakpoints } = attributes;

	// An empty column shows a large appender; a filled one, the small one.
	const hasChildren = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockCount( clientId ) > 0,
		[ clientId ]
	);

	const innerBlocksProps = useInnerBlocksProps(
		useBlockProps( generateColumnProps( attributes ) ),
		{
			renderAppender: hasChildren
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'jcore-ruudukko' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Use breakpoints', 'jcore-ruudukko' ) }
						help={
							useBreakpoints
								? __(
										'Set the span per breakpoint.',
										'jcore-ruudukko'
								  )
								: __(
										'Use one span at every width.',
										'jcore-ruudukko'
								  )
						}
						checked={ useBreakpoints }
						onChange={ ( value ) =>
							setAttributes( { useBreakpoints: value } )
						}
					/>
					{ useBreakpoints ? (
						<BreakpointControls
							label={ __( 'Span', 'jcore-ruudukko' ) }
							value={ breakpoints }
							onChange={ ( value ) =>
								setAttributes( { breakpoints: value } )
							}
						/>
					) : (
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __( 'Span', 'jcore-ruudukko' ) }
							value={ span }
							onChange={ ( value ) =>
								setAttributes( { span: value ?? 1 } )
							}
							min={ 1 }
							max={ MAX_COLUMNS }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
