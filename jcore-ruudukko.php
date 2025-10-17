<?php
/**
 * Plugin Name: JCORE Ruudukko
 * Plugin URI: https://github.com/jco-digital/jcore-ruudukko
 * Description: Grid and Flex blocks for layout use in Gutenberg.
 * Version: 0.4.0
 * Author: J&Co Digital
 * Author URI: https://jco.fi
 * Domain Path: /languages
 * Text Domain: jcore-ruudukko
 *
 * @package jcore-ruudukko
 */

namespace Jcore\Ruudukko;

// Constants for the plugin.
require_once __DIR__ . '/consts.php';

// Helper functions for the plugin.
require_once __DIR__ . '/includes/helpers.php';

// Plugin notices.
require_once __DIR__ . '/includes/notices.php';

// Generic handlers for different field types.
require_once __DIR__ . '/includes/fields.php';

// Handles registering the plugin styles and scripts.
require_once __DIR__ . '/includes/assets.php';

// All hooks of the plugin are defined here.
require_once __DIR__ . '/includes/hooks.php';

// Gutenberg blocks.
require_once __DIR__ . '/includes/blocks.php';

/**
 * Run when activating the plugin and enabling autoload for specific plugin options.
 *
 * @return void
 */
function jcore_grid_activate(): void {
}
register_activation_hook( __FILE__, __NAMESPACE__ . '\jcore_grid_activate' );

/**
 * Run when deactivating the plugin and disabling autoload for specific plugin options.
 *
 * @return void
 */
function jcore_grid_deactivate(): void {
}
register_deactivation_hook( __FILE__, __NAMESPACE__ . '\jcore_grid_deactivate' );
