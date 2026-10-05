# JCORE Ruudukko

Grid and column blocks for the block editor: a `jcore/grid` container and the `jcore/column` blocks that go in it.

This file covers the repository and the development workflow. What the plugin does, and how to use it, is in [readme.txt](readme.txt).

## Requirements

- PHP 8.2+
- WordPress 6.7+
- Node 22+ and [pnpm](https://pnpm.io/)
- [Composer](https://getcomposer.org/) and [WP-CLI](https://wp-cli.org/) (WP-CLI is only needed for the translation targets)

## Getting started

```sh
pnpm install
composer install
pnpm build
```

Then run a throwaway WordPress with the plugin mounted:

```sh
pnpm playground
```

That serves [WordPress Playground](https://wordpress.org/playground/) on <http://localhost:8883> from `.wp/blueprint.json`, logged in as `admin` / `password` and landing on a new post. Plugin Check is installed alongside it.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm build` | Build the blocks into `build/`, with `build/blocks-manifest.php`. |
| `pnpm start` | Same, in watch mode. |
| `pnpm check` | Everything CI lints: ESLint, Stylelint and PHPCS. |
| `pnpm lint:js` / `lint:css` / `lint:php` | One linter at a time. |
| `pnpm format` | Format `src/` with `wp-scripts format`. |
| `composer lint:fix` | Fix what PHPCBF can fix. |
| `pnpm i18n` | Regenerate the POT, the MO files and the JS translation JSON. |
| `pnpm playground` | Serve the plugin in WordPress Playground. |

A `Makefile` wraps the same scripts (`make ci` is the entry point the shared publish workflow calls); it is a shim, not a second build system.

## Layout

```
jcore-ruudukko.php           Plugin header, constants, bootstrap
includes/class-plugin.php    Updater, block registration and translations
src/
  grid/                      jcore/grid and its grid/flex variations; style.scss is the
                             front-end (and editor) layout
  column/                    jcore/column, only allowed inside a grid
  shared/                    Class helpers, breakpoint controls, breakpoint map
languages/                   .po sources; .pot, .mo and .json are generated
```

## Block markup

Both blocks are static: `save()` writes the classes into the post, and `src/shared/utils.js` decides what they are. Changing what it outputs for existing attributes invalidates every saved grid, so any such change needs a `deprecated` entry.

| Block | Classes and inline styles |
| --- | --- |
| Grid | `jgrid` or `jflex`, plus `columns-{bp}-{n}` per breakpoint when auto columns is off, and `jflex-center` for a centred last row. The minimum width is an inline `--jcore-column-min`, the block spacing an inline `--jcore-gap`. |
| Column | `span-{n}`, or `span-{bp}-{n}` per breakpoint. |

`{bp}` is one of `xs`, `sm`, `md`, `lg`, `xl` and `xxl`; the widths come from `@jcodigital/jcore-media`, shared with the JCORE themes. `{n}` runs from 1 to 6.

In `src/grid/style.scss` each class only sets a custom property (`--jcore-columns`, `--jcore-span`), and the grid and flex layouts both read them. The block gap is not serialized by core for a block without layout support, so `save()` writes it as `--jcore-gap` itself.

## Releasing

Pushing to `main` runs `.github/workflows/release.yml`:

1. **check** – lint, build, then run Plugin Check against the tree minus `.distignore`. Also runs on pull requests.
2. **release** – [foonver](https://github.com/foonly/foonver) reads the conventional commits since the last tag, bumps the version, syncs it into `jcore-ruudukko.php`, `readme.txt` and `package.json`, writes the `== Changelog ==` section of `readme.txt` and pushes the tag. Its configuration lives in `.foonver.toml`.
3. **publish** – the reusable workflow in [jcore-update](https://github.com/JCO-Digital/jcore-update) builds the zip, attaches it to a GitHub release, registers the version with `update.jcore.fi`, pushes to the dist repository and posts to Slack.

Nothing here is published to wordpress.org. Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/), or foonver will not know what to bump.

`.distignore` is the single list of what does not ship — it drives both the packaged zip and the dist repository.

## License

GPL-2.0-or-later. See [LICENSE](LICENSE).
