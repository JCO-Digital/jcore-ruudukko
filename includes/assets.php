<?php
/**
 * Registers the assets for the plugin.
 *
 * @package jcore-ruudukko
 */

namespace Jcore\Ruudukko;

/**
 * Handles registering the plugin styles and scripts.
 * These can be enqueued by the plugin as needed.
 *
 * @return void
 */
function register_plugin_assets(): void {
	style_register(
		'jcore-ruudukko',
		'dist/css/index.css',
	);
}

function enqueue_plugin_assets(): void {
	wp_enqueue_style( 'jcore-ruudukko' );
}
