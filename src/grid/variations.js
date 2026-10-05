import { __ } from '@wordpress/i18n';

// Grid and flex share the block and its settings; the variations only switch
// blockType, and appear both in the inserter and as transforms.
const variations = [
	{
		name: 'jcore-grid',
		title: __( 'Jcore Grid', 'jcore-ruudukko' ),
		icon: 'grid-view',
		description: __(
			'Lay out columns in a grid, with every row aligned.',
			'jcore-ruudukko'
		),
		attributes: { blockType: 'grid' },
		isActive: [ 'blockType' ],
		isDefault: true,
		scope: [ 'inserter', 'transform' ],
	},
	{
		name: 'jcore-flex',
		title: __( 'Jcore Flex Columns', 'jcore-ruudukko' ),
		icon: 'columns',
		description: __(
			'Lay out columns that wrap, with an incomplete last row that can be centred.',
			'jcore-ruudukko'
		),
		attributes: { blockType: 'flex' },
		isActive: [ 'blockType' ],
		scope: [ 'inserter', 'transform' ],
	},
];

export default variations;
