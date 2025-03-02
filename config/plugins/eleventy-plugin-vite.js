import path from "node:path";
import fs from "node:fs";

import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import CriticalCssPlugin from "rollup-plugin-critical";

import { getBase, getStaticFileBanner } from "../utils.js";

export default function runViteForBundlingAssets(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		tempFolderName: ".11ty-vite", // Default name of the temp folder
		// `viteOptions` equivalent to vite.config.js file
		// cf. Vite documentation for more settings:
		// -- https://vite.dev/config/
		viteOptions: {
			appType: "custom",
			base: getBase({ trailingSlash: true }),
			publicDir: "public", // Vite requirement: build processing dir
			clearScreen: false,
			assetsInclude: ["**/site.webmanifest", "**/*.txt", "**/*.xml"],
			css: {
				// Vite experimental feature:
				// Enable CSS sourcemaps during development
				devSourcemap: true,
				transformer: "lightningcss",
				lightningcss: {
					targets: browserslistToTargets(browserslist()),
				},
			},
			// Development
			server: {
				mode: "development",
				middlewareMode: true,
				open: true,
			},
			// Production
			// Use `bun preview` command to serve `_site` locally
			build: {
				mode: "production",
				sourcemap: true,
				cssMinify: "lightningcss",
				// Rollup JavaScript compiler configuration
				// cf. documentation for more settings:
				// -- https://rollupjs.org/configuration-options/
				rollupOptions: {
					external: [],
					output: {
						assetFileNames: "css/[name].[hash].css",
						chunkFileNames: "js/[name].[hash].js",
						entryFileNames: "js/[name].[hash].js",
						banner: `${getStaticFileBanner()}`,
					},
					plugins: [
						CriticalCssPlugin({
							criticalBase: "./_site/",
							criticalUrl: "./_site/",
							criticalPages: [
								{ uri: "index.html", template: "index" },
								{ uri: "404.html", template: "404" },
							],
							criticalConfig: {
								// @info: [Critical options - full list](https://github.com/addyosmani/critical#options)
								inline: true,
								penthouse: {
									// @info: [Penthouse options - full list](https://github.com/pocketjoso/penthouse)
									forceInclude: [],
								},
							},
						}),

						RemoveUnwantedFilesPlugin([
							{ name: "README.md", recursive: false },
						]),
					],
				},
			},
		},
	});
}

/**
 * Custom Rollup utilities & plugins
 * ---
 */

/**
 * Remove listed files from Eleventy's output directory,
 * usually named `./_site`.
 * ---
 *
 * Problem:
 * Vite won't allow selective copying from its `./public` assets folder, so the
 * placeholder file saved there gets dumped into the root of Eleventy's site
 * output folder.
 *
 * Tried these solutions previously, with no success:
 * 1). Using rollup's `external` configuration property to ignore the
 * 	   placeholder file.
 * 2). `rollup-plugin-delete` to delete the placeholder file after
 * 	   it's copied over.
 *
 * @param   {Array}  files  -- Array of objects, e.g.
 * 		`{ name: "SUB_DIRECTORY/FILE_NAME", recursive: BOOLEAN }`
 */
function RemoveUnwantedFilesPlugin(files) {
	return {
		name: "remove-files",
		writeBundle(outputOptions, inputOptions) {
			var { dir } = outputOptions;
			files.forEach((file) => {
				var absolute_filepath = path.resolve(dir, file.name);
				fs.rm(absolute_filepath, { recursive: file.recursive }, () =>
					console.log(`Deleted ${absolute_filepath}`),
				);
			});
		},
	};
}
