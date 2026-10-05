import { __ } from '@wordpress/i18n';

export const breakpoints = [
	{ label: __( 'Extra small', 'jcore-ruudukko' ), value: 'xs' },
	{ label: __( 'Small', 'jcore-ruudukko' ), value: 'sm' },
	{ label: __( 'Medium', 'jcore-ruudukko' ), value: 'md' },
	{ label: __( 'Large', 'jcore-ruudukko' ), value: 'lg' },
	{ label: __( 'Extra large', 'jcore-ruudukko' ), value: 'xl' },
	{ label: __( 'Super large', 'jcore-ruudukko' ), value: 'xxl' },
];

// Matches the range the stylesheets generate classes for.
export const MAX_COLUMNS = 6;
