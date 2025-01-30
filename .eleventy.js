/**
 * Load environment variables
 * ---
 * Read any `.env` file secrets into project environment variables,
 * accessed via `process.env`
 */
import { config } from "@dotenvx/dotenvx";
config();

// Import LiquidJS, so all LiquidJS filters can be accessed in this project
import LIQUID from "liquidjs";

// Bug? 11ty doesn't seem to handle multi-level imports, e.g. manifest files.
// Solution: Resorting to importing files individually
import COLLECTIONS from "./config/collections/collections.js";
import DATE_FILTERS from "./config/filters/dates.js";
import STRING_FILTERS from "./config/filters/string.js";
import URI_FILTERS from "./config/filters/uri.js";

import PLUGIN_VITE from "./config/plugins/eleventy-plugin-vite.js";

import TRANSFORM_MINIFIER from "./config/transforms/html-minifier-terser.js";
import TRANSFORM_TIDY from "./config/transforms/js-beautify.js";

import UTILS from "./config/utils.js";

/**
 * Set 11ty folders
 * ---
 */
const SITE_CONFIG = {
	templateFormats: ["html", "liquid", "md", "njk"],
	htmlTemplateEngine: "liquid",
	dir: {
		input: "src",
		output: "_site",
		// ^^ `output` value must not clash with
		// 	   Vite's `publicDir` property value (default: `public`)
		data: "_data",
		includes: "_includes",
		layouts: "_layouts",
	},
};

export default function (eleventyConfig) {
	/**
	 * Passthrough files & folders
	 * ---
	 */

	["./public", "./src/images", "./src/css", "./src/js"].forEach((path) =>
		eleventyConfig.addPassthroughCopy(path),
	);

	// Move favicons to root directory
	// ---
	// 1.) Different favicon sets depending on `production|development`
	// 	   environments; help distinguish open tabs in browser.
	// 2). Pass favicons to Vite's `publicDir` directory so Vite can
	// 	   copy them over to Eleventy's output site root.
	eleventyConfig.addPassthroughCopy({
		[`./favicons/${UTILS.getEnvironment().toLowerCase()}`]: "/public",
	});

	/**
	 * Liquid templating configuration
	 * ---
	 */

	eleventyConfig.setLiquidOptions({
		// Out-of-the-box, LiquidJS treats empty strings & zeros as truthy!
		// Let's switch to more familiar JS behaviour to avoid gotchas.
		jsTruthy: true,
	});

	/**
	 * Custom collections
	 * ---
	 */

	eleventyConfig.addCollection("markdownPages", COLLECTIONS.markdownPages);
	eleventyConfig.addCollection("siteMapOrder", COLLECTIONS.siteMapOrder);

	/**
	 * Custom content filters
	 * ---
	 * Prefer adding LiquidJS filters over custom versions, to
	 * prevent unnecessary extra work.
	 */

	// Add all LiquidJS filters from the get-go.
	// cf. following link for full list & documentation:
	// - https://liquidjs.com/filters/overview.html
	Object.keys(LIQUID.filters)
		.filter((filter) => {
			// Filter-out anything that is already included in 11ty, or
			// causes errors / build breakage
			return ![
				"raw", // Breaks build / Errors
				"slugify", // 11ty has own version
			].some((item) => filter.includes(item));
		})
		.forEach((filter) =>
			eleventyConfig.addFilter(filter, LIQUID.filters[filter]),
		);

	eleventyConfig.addFilter("absoluteUrl", URI_FILTERS.absoluteUrl);
	eleventyConfig.addFilter("debug", STRING_FILTERS.debug);
	eleventyConfig.addFilter("fallback", STRING_FILTERS.fallback);
	eleventyConfig.addFilter("formatDate", DATE_FILTERS.formatDate);
	eleventyConfig.addFilter("toISODateTime", DATE_FILTERS.toISODateTime);

	/**
	 * Global data (in addition to `./src/_data/` files)
	 * ---
	 */

	eleventyConfig.addGlobalData("copyright", () => UTILS.getCurrentYear());
	eleventyConfig.addGlobalData("dictionary", async () => {
		var dictFile = await import(
			`./src/_data/dict.${UTILS.getLanguage()}.js`
		);
		return dictFile.default;
	});
	eleventyConfig.addGlobalData("generated", () => new Date());

	/**
	 * Layout aliases
	 * ---
	 */

	eleventyConfig.addLayoutAlias("base", "base.liquid");
	eleventyConfig.addLayoutAlias("home", "home.liquid");

	/**
	 * Plugins
	 * ---
	 */

	PLUGIN_VITE(eleventyConfig);

	/**
	 * Transforms
	 * ---
	 */

	eleventyConfig.addTransform("minify_html", TRANSFORM_MINIFIER);
	eleventyConfig.addTransform("tidy_html", TRANSFORM_TIDY.html);

	/**
	 * Watch targets
	 * ---
	 */

	eleventyConfig.addWatchTarget("./config/utils.js");
	eleventyConfig.addWatchTarget("./src/css/");
	eleventyConfig.addWatchTarget("./src/js/");

	/**
	 * Eleventy events
	 * ---
	 * Documentation:
	 * - https://www.11ty.dev/docs/events/
	 */
	// eleventyConfig.on(
	// 	"eleventy.before",
	// 	async ({ dir, runMode, outputMode }) => {
	// 		// console.log("LiquidJS filters: ", LIQUID.filters);
	// 		// console.log("eleventyConfig: ", eleventyConfig);
	// 		// console.log("Environment variables: ", process.env);
	// 	},
	// );

	return SITE_CONFIG;
}
