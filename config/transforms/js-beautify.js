/**
 * JS-Beautify plugin
 * ---
 * For CSS, HTML & JS tidying.
 *
 * About Eleventy Transforms.
 * Where HTML-Minifier-Terser plugin used as one of the examples.
 * - https://www.11ty.dev/docs/transforms/
 *
 * Plugin documentation / repository:
 * - [npm](https://www.npmjs.com/package/js-beautify)
 * - [GitHub repo](https://github.com/beautifier/js-beautify)
 * - [REPL](https://beautifier.io/)
 * 		To see the results of settings, live.
 *
 * @todo: Add CSS & JS tidying for non-minified versions of these files.
 *
 */

import JS_BEAUTIFY from "js-beautify";
import { isEnvironment } from "../utils.js";

export default {
	html,
};

/**
 * Tidy HTML
 * ---
 */
export function html(content) {
	if (!(this.page.outputPath || "").endsWith(".html")) {
		return content;
	}

	return JS_BEAUTIFY.html(content, {
		indent_size: "2",
		max_preserve_newlines: "-1",
		indent_scripts: "normal",
		wrap_line_length: "120",
		indent_inner_html: true,
	});
}
