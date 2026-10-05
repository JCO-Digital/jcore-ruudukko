<?php
/**
 * Plugin Name:       JCORE Ruudukko
 * Plugin URI:        https://github.com/JCO-Digital/jcore-ruudukko
 * Description:       Grid and flex column blocks for laying out content in the block editor.
 * Version:           0.4.0
 * Requires at least: 6.7
 * Tested up to:      7.1
 * Requires PHP:      8.2
 * Author:            J&Co Digital Oy
 * Author URI:        https://jco.fi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jcore-ruudukko
 * Domain Path:       /languages
 *
 * @package Jcore\Ruudukko
 */

namespace Jcore\Ruudukko;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'JCORE_RUUDUKKO_VERSION', '0.4.0' );
define( 'JCORE_RUUDUKKO_FILE', __FILE__ );
define( 'JCORE_RUUDUKKO_PATH', plugin_dir_path( __FILE__ ) );

// The update library is vendored into the release, but a source checkout has
// no vendor directory until `composer install` has run.
if ( is_readable( JCORE_RUUDUKKO_PATH . 'vendor/autoload.php' ) ) {
	require_once JCORE_RUUDUKKO_PATH . 'vendor/autoload.php';
}

require_once JCORE_RUUDUKKO_PATH . 'includes/class-plugin.php';

add_action(
	'plugins_loaded',
	static function (): void {
		Plugin::instance()->boot();
	}
);

// Registered at file scope, not in Plugin::boot(): other JCORE components read
// this list while plugins are still loading.
add_filter(
	'jcore_plugins_loaded',
	static function ( array $plugins ): array {
		$plugins['jcore-ruudukko'] = __DIR__;

		return $plugins;
	}
);
