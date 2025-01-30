/**
 * String filters
 * ---
 */

export default {
	debug,
	fallback,
};

/**
 * Individual functions, exported individually
 * ---
 */

import { inspect } from "node:util";
// * Bun includes various node APIs for compatibility
// * cf. https://bun.sh/docs/runtime/nodejs-apis

/**
 * Debug: output data object to HTML.
 * Nicer presentation than simple `JSON.stringify()` of LiquidJS `json`.
 * Example usage: {{ page | debug }}
 * ---
 * @param   {String}  content
 * @return  {String}
 */
export function debug(content) {
	return `<pre>${inspect(content)}</pre>`;
}

/**
 * Provide a fallback string in event data is missing.
 * ---
 * @param   {String}  content
 * @param   {Number|String}  alternative
 * @return  {String}
 */
export function fallback(content, alternative = "") {
	if (!content) {
		return alternative;
	}
	return content;
}
