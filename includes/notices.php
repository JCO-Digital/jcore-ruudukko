<?php
/**
 * Handles notices.
 *
 * @package jcore-ruudukko
 */

namespace Jcore\Ruudukko;

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
					'jcore-ruudukko'
				),
				admin_url( 'admin.php?page=jcore-ruudukko-settings&tab=general' )
			),
			array(
				'type' => 'error',
			)
		);
}
