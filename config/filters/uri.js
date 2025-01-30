/**
 * URI / URL filters
 * ---
 */

export default {
	absoluteUrl,
};

/**
 * Individual functions, exported individually
 * ---
 */

import { URL } from "node:url";
// * Bun includes various node APIs for compatibility
// * cf. https://bun.sh/docs/runtime/nodejs-apis

/**
 * Return the absolute URL from an 11ty permalink/filename &
 * base URL parameter, e.g. `app.site.url`
 * ---
 * @note: Free version of this filter comes with RSS plugin;
 * @todo: Comment-out this version if using RSS plugin &
 * 		  leave as reference only.
 * ---
 * @param   {String}  url
 * @param   {String}  base
 * @return  {String}
 */
export function absoluteUrl(url, base) {
	try {
		return new URL(url, base).toString();
	} catch (e) {
		throw `(${e}) Tried to convert ${url} with ${base} (invalid url).`;
	}
}
