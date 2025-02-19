<?php
/**
 * Hooks for the plugin.
 *
 * @package jcore-grid
 */

namespace Jcore\Grid;

// Initializes all classes.
add_action(
	'plugins_loaded',
	static function () {
	}
);

add_action(
	'init',
	__NAMESPACE__ . '\register_plugin_assets'
);


add_action(
	'admin_notices',
	__NAMESPACE__ . '\handle_notices'
);

add_filter( 'plugin_action_links_jcore-grid/jcore-grid.php', __NAMESPACE__ . '\settings_link' );
/**
 * Add settings link to plugin listing.
 *
 * @param array $links Array of plugin action links.
 * @return array Modified array of plugin action links.
 */
function settings_link( $links ) {
	// Build and escape the URL.
	$url = esc_url(
		add_query_arg(
			'page',
			'jcore-grid-settings',
			get_admin_url() . 'admin.php'
		)
	);
	// Create the link.
	$settings_link = "<a href='$url'>" . __( 'Settings', 'jcore-grid' ) . '</a>';
	// Add the link to the end of the array.
	array_push(
		$links,
		$settings_link
	);
	return $links;
}
