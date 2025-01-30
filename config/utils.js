/**
 * Eleventy custom utilities
 * ---
 * Separate file, so these can be more easily unit tested, as required.
 */

export default {
	getCurrentYear,
	getEnvironment,
	getHosting,
	getLanguage,
	getLocale,
	getProjectVersion,
	getStaticFileBanner,
	isEnvironment,
};

/**
 * Utility functions, exported individually
 * ---
 */

import { readFile } from "node:fs/promises";
// * Bun includes various node APIs for compatibility
// * cf. https://bun.sh/docs/runtime/nodejs-apis

const pkg = JSON.parse(
	await readFile(new URL("../package.json", import.meta.url)),
);
//  * ^^ Why not import is ESM format directly? e.g.
//  * `import pkg from "../package.json" with { type: "json" };`
//  * Eleventy throwing errors during `serve` / `watch` behaviour.
//  *
//  * (TMP?) Solution: revert to node's `readFile` to
//  * parse the JSON in the mean time.
//  */

/**
 * Programmatically return the current year.
 * Output: "2025"
 * @todo @improvement:
 * 		Twin this with Netlify's Functions (similar to Cron Jobs) to
 * 		rebuild site annually on New Year's Day
 * 		- https://docs.netlify.com/functions/scheduled-functions/
 * ---
 * @return  {String}
 */
export function getCurrentYear() {
	return `${new Date().getFullYear()}`;
}

/**
 * Use Eleventy's `ELEVENTY_RUN_MODE` property to
 * return production/development status
 *
 * - `process.env.ELEVENTY_RUN_MODE` returns 'build'/'serve'/'watch'
 * - More information: https://www.11ty.dev/docs/environment-vars/
 *
 * Could do this via command-line with a custom environment;
 * 11ty supplied version is sufficient for current requirements.
 * ---
 * @return  {String}  - "PRODUCTION|DEVELOPMENT"
 */
export function getEnvironment() {
	return (
		(
			process.env.ELEVENTY_RUN_MODE !== "build"
				? "development"
				: "production"
		)
			// Test the negative expression; ensures the fall-back value
			// defaults to (the safer) `PRODUCTION` over "DEVELOPMENT"
			.toUpperCase()
	);
}

/**
 * Site hosted locally or live?
 * ---
 * @return  {String} -- `LOCAL` / `LIVE`
 */
export function getHosting() {
	return (
		(process.env.URL?.includes("localhost") ? "local" : "live")
			// Test the negative expression; ensures the fall-back value
			// defaults to (the safer) `PRODUCTION` over "DEVELOPMENT"
			.toUpperCase()
	);
}

/**
 * Project language from `package.json`.
 * Output: "en"
 * ---
 * @return  {String}
 */
export function getLanguage() {
	return pkg.language;
}

/**
 * Project locale from `package.json`.
 * Output: "en-GB"
 * ---
 * @return  {String}
 */
export function getLocale() {
	return pkg.locale;
}

/**
 * Project version number from `package.json`.
 * Output: "v1.0.0"
 * ---
 * @return  {String}
 */
export function getProjectVersion() {
	return `v${pkg.version}`;
}

/**
 * Create a banner for injecting into auto-generated files.
 * @note: Default opening comment `/*!` is ignored by many minifier packages;
 *        intended for licensing & legally required texts.
 * ---
 * @param 	{Object} 	bannerOptions
 * @return  {String}
 */
export function getStaticFileBanner(
	bannerOptions = { commentStart: "/*!", commentEnd: "*/" },
) {
	const { commentStart, commentEnd } = bannerOptions;
	return [
		`${commentStart}`,
		` * @title: ${pkg.name}`,
		` * @version: ${pkg.version}`,
		` * @date: ${new Date().toUTCString()}`,
		`${commentEnd}`,
	].join("\n");
}

/**
 * Quick environment check
 * ---
 * @param   {String}  value  -- Which environment? `PRODUCTION` / `DEVELOPMENT`
 * @return  {Boolean}
 */
export function isEnvironment(value) {
	// Using `String.includes()` so long/short value variants work,
	// e.g. "PROD" & "PRODUCTION"
	return getEnvironment().toUpperCase().includes(value.toUpperCase());
}
