<?php
/**
 * Handles notices.
 *
 * @package jcore-grid
 */

namespace Jcore\Grid;

/**
 * Handles notices.
 *
 * @return void
 */
function handle_notices(): void {

		wp_admin_notice(
			sprintf(
			// translators: 1: Url to the options page.
				__(
					'Test error',
					'jcore-grid'
				),
				admin_url( 'admin.php?page=jcore-grid-settings&tab=general' )
			),
			array(
				'type' => 'error',
			)
		);
}
