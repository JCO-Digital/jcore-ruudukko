import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { generateColumnProps } from '../shared/utils';

export default function save( { attributes } ) {
	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( generateColumnProps( attributes ) )
			) }
		/>
	);
}
