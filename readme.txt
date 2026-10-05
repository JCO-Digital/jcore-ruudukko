=== JCORE Ruudukko ===
Contributors: jcodigital
Tags: blocks, grid, columns, layout
Requires at least: 6.7
Tested up to: 7.1
Requires PHP: 8.2
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Grid and column blocks for laying out content in the block editor.

== Description ==

JCORE Ruudukko adds a **Jcore Grid** block and the **Jcore Column** blocks that go in it. The grid comes in two variations, switchable at the top of the block's settings sidebar:

* **Jcore Grid** – a CSS grid, with every row aligned to the same columns.
* **Jcore Flex Columns** – columns that wrap, where an incomplete last row can be centred.

= Features =

* **Auto columns** – fit as many columns as a minimum width allows, with no breakpoints to manage.
* **Columns per breakpoint** – or set the number of columns for each of six breakpoints, from extra small to super large.
* **Column spans** – let a column span several columns, once for every width or per breakpoint.
* **Block spacing** – set the gap between columns per block, from the theme's spacing presets or as any length.
* **Background, colour and spacing** – both blocks support background images and colours, padding and margin.
* **Automatic updates** – through the J&Co Digital update service.

= Breakpoints =

Extra small applies from 0, then small from 360px, medium from 768px, large from 992px, extra large from 1200px and super large from 1536px: the shared JCORE breakpoints from `@jcodigital/jcore-media`, so grids switch where JCORE themes do.

= Theming =

A theme sets the defaults in its `theme.json`, with no CSS needed:

`
"settings": {
	"custom": {
		"ruudukko": {
			"gap": "var(--wp--preset--spacing--40)",
			"columnMin": "300px"
		}
	}
}
`

* **Gap** – without `gap`, the theme's block gap (`--wp--style--block-gap`) is used, or 1.5rem. Block spacing set on a block overrides it. The Block spacing control is shown for the grid even in themes that turn block gap off globally; a theme can hide it with `settings.blocks.jcore/grid.spacing.blockGap` set to `false`.
* **Minimum column width** – for auto columns; 360px without `columnMin`. A width set on a block overrides it.
* **Using the classes outside the block** – the stylesheet only loads on pages with a grid. A theme that writes the `jgrid` or `jflex` classes into its own templates should enqueue it with `wp_enqueue_style( 'jcore-grid-style' );`.

= External services =

The plugin checks for updates against `https://update.jcore.fi`, operated by J&Co Digital Oy. It sends the plugin slug and the installed version, and the site URL as the request's origin. No visitor or content data is involved.

= Source code =

The blocks are built with `@wordpress/scripts`. Their readable source is published at https://github.com/JCO-Digital/jcore-ruudukko.

== Installation ==

1. Upload the `jcore-ruudukko` folder to `/wp-content/plugins/`, or install the zip from the Plugins screen.
2. Activate the plugin.
3. Add a **Jcore Grid** block in the editor.

== Upgrade Notice ==

= 1.0.0 =

Grids now have a gap by default (the theme's block gap), and grid columns are sized equally even when their content is wide. The stylesheet only loads on pages that contain a grid.

== Changelog ==

= 1.0.0 (2026-10-05) =

* Feature: rename to jcodigital/jcore-ruudukko and move to the jcore-update release workflow (BREAKING CHANGE)

= v0.4.0 (2025-10-17) =

* Refactor: Use min-width for media queries

= v0.3.0 (2025-05-16) =

* Feature: update package namespace

= v0.2.3 (2025-05-14) =

* Build: Try to fix build process.

= v0.2.2 (2025-05-14) =

* CI: push only on tag

= v0.2.1 (2025-05-14) =

* Build: add versionSync script and tags as github action trigger.

= v0.2.0 (2025-05-14) =

* Feature: Renamed plugin to jcore-ruudukko
* Fix: cleanup
* Fix: remove autoloader (not needed)

= v0.1.1 (2025-02-24) =

* Feature: basic block funtions work now.
* Feature: Breakponit editor.
* Feature: added breakpoints
* Feature: Added styling options to the blocks and added a front-end style sheet for development.
* Fix: readme cleanup
* Fix: placeholder js
* Fix: release should work now
* CI: added guthub action
* Add all files
