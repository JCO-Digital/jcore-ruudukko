import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { generateGridProps } from '../shared/utils';

export default function save( { attributes } ) {
	return (
		<section
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( generateGridProps( attributes ) )
			) }
		/>
	);
}
