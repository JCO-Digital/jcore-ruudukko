<?php
/**
 * Plugin bootstrap.
 *
 * @package Jcore\Ruudukko
 */

namespace Jcore\Ruudukko;

use Jcore\Update\Config\UpdateConfig;
use Jcore\Update\Hooks\PluginUpdateHooks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Wires the plugin to its hooks.
 */
final class Plugin {

	/**
	 * The single instance.
	 *
	 * @var Plugin|null
	 */
	private static ?Plugin $instance = null;

	/**
	 * Returns the single instance.
	 *
	 * @return Plugin
	 */
	public static function instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Registers every hook. Called once on `plugins_loaded`.
	 *
	 * @return void
	 */
	public function boot(): void {
		$this->register_updater();

		add_filter( 'block_type_metadata', array( $this, 'stamp_block_version' ) );
		add_filter( 'wp_theme_json_data_default', array( $this, 'enable_block_gap' ) );
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Gives the plugin's blocks the plugin version.
	 *
	 * Core versions a block's stylesheets with the `version` from block.json,
	 * so without this a release would keep serving cached CSS.
	 *
	 * @param array $metadata Block metadata read from block.json.
	 *
	 * @return array
	 */
	public function stamp_block_version( array $metadata ): array {
		$build = wp_normalize_path( JCORE_RUUDUKKO_PATH . 'build/' );

		if ( str_starts_with( $metadata['file'] ?? '', $build ) ) {
			$metadata['version'] = JCORE_RUUDUKKO_VERSION;
		}

		return $metadata;
	}

	/**
	 * Hooks the plugin into the J&Co Digital update service.
	 *
	 * The library is vendored into the release; a source checkout without a
	 * `composer install` simply runs without update checks.
	 *
	 * @return void
	 */
	private function register_updater(): void {
		if ( ! class_exists( UpdateConfig::class ) ) {
			return;
		}

		$config = new UpdateConfig(
			pluginFile: JCORE_RUUDUKKO_FILE,
			slug: 'jcore-ruudukko',
			version: JCORE_RUUDUKKO_VERSION,
			apiBaseUrl: 'https://update.jcore.fi/v1',
		);

		( new PluginUpdateHooks( $config ) )->register();
	}

	/**
	 * Turns on the block spacing control for the grid.
	 *
	 * Themes that set `settings.spacing.blockGap` to null, as JCORE themes do,
	 * hide it for every block. The grid applies the gap itself rather than
	 * through core's layout styles, so it is enabled here, at block level in
	 * the default layer: a theme can still turn it off for `jcore/grid`.
	 *
	 * @param \WP_Theme_JSON_Data $theme_json Core's default theme.json data.
	 *
	 * @return \WP_Theme_JSON_Data
	 */
	public function enable_block_gap( $theme_json ) {
		return $theme_json->update_with(
			array(
				'version'  => 3,
				'settings' => array(
					'blocks' => array(
						'jcore/grid' => array(
							'spacing' => array( 'blockGap' => true ),
						),
					),
				),
			)
		);
	}

	/**
	 * Registers every block in build/ from the manifest wp-scripts generates.
	 *
	 * @return void
	 */
	public function register_blocks(): void {
		$build    = JCORE_RUUDUKKO_PATH . 'build';
		$manifest = $build . '/blocks-manifest.php';

		if ( ! is_readable( $manifest ) ) {
			return;
		}

		$blocks = require $manifest;

		// WordPress 6.8 registers the whole collection in one call.
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( $build, $manifest );
		} else {
			wp_register_block_metadata_collection( $build, $manifest );

			foreach ( array_keys( $blocks ) as $block ) {
				register_block_type( $build . '/' . $block );
			}
		}

		$this->set_block_translations( array_column( $blocks, 'name' ) );
	}

	/**
	 * Points the blocks' editor scripts at the translations in languages/.
	 *
	 * Core only looks for them under wp-content/languages, which is empty for a
	 * plugin that is not distributed through wordpress.org.
	 *
	 * @param string[] $names Block names.
	 *
	 * @return void
	 */
	private function set_block_translations( array $names ): void {
		$registry = \WP_Block_Type_Registry::get_instance();

		foreach ( $names as $name ) {
			$block_type = $registry->get_registered( $name );

			if ( null === $block_type ) {
				continue;
			}

			foreach ( $block_type->editor_script_handles as $handle ) {
				wp_set_script_translations( $handle, 'jcore-ruudukko', JCORE_RUUDUKKO_PATH . 'languages' );
			}
		}
	}
}
