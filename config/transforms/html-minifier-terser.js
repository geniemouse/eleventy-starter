/**
 * HTML-Minifier-Terser plugin
 * ---
 *
 * About Eleventy Transforms.
 * Where HTML-Minifier-Terser plugin used as one of the examples.
 * - https://www.11ty.dev/docs/transforms/
 *
 * Plugin documentation / repository:
 * - [npm](https://www.npmjs.com/package/html-minifier-terser)
 * - [GitHub repo](https://github.com/terser/html-minifier-terser)
 * - [REPL](https://terser.org/html-minifier-terser/)
 * 		To see the results of settings, live.
 *
 */

import htmlmin from "html-minifier-terser";
import { isEnvironment } from "../utils.js";

export default function minifyHTML(content) {
	if (!(this.page.outputPath || "").endsWith(".html")) {
		return content;
	}

	return htmlmin.minify(content, {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		html5: true,
		maxLineLength: 120,
		noNewlinesBeforeTagClose: true,
		preserveLineBreaks: true,
		removeComments: isEnvironment("PROD"),
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
	});
}
