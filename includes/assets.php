<?php
/**
 * Registers the assets for the plugin.
 *
 * @package jcore-grid
 */

namespace Jcore\Grid;

/**
 * Handles registering the plugin styles and scripts.
 * These can be enqueued by the plugin as needed.
 *
 * @return void
 */
function register_plugin_assets(): void {
	style_register(
		'jcore-grid',
		'dist/css/index.css',
	);
}

function enqueue_plugin_assets(): void {
	wp_enqueue_style( 'jcore-grid' );
}
