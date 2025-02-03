/**
 * Eleventy custom utilities
 * ---
 * Separate file, so these can be more easily unit tested, as required.
 */

import pkg from "../package.json" with { type: "json" };
// @note: Running 11ty with this line will yield a
// ExperimentalWarning on command line, "Importing JSON modules
// is an experimental feature and might change at any time"

/**
 * Default export collects general project information to be
 * exposed as `eleventy.globalData.info`
 * ---
 * @return  {Object}
 */
export default function initProjectInfo() {
	return {
		base: getBase({ trailingSlash: false }),
		environment: getEnvironment(),
		language: getLanguage(),
		locale: getLocale(),
		url: getUrl(),
		version: getProjectVersion(),
		year: getCurrentYear(),
	};
}

/**
 * Utility functions, exported individually
 * ---
 * Index:
 * - getBase(options)
 * - getCurrentYear()
 * - getEnvironment()
 * - getLanguage()
 * - getLocale()
 * - getProjectVersion()
 * - getStaticFileBanner()
 * - getUrl()
 * - isEnvironment(value)
 */

/**
 * Return project `BASE` or `VITE_BASE` environment variable, if there is one.
 * Set a sensible default, if there isn't.
 * Has option to return value with or without trailing slash character.
 * ---
 * @param 	{Object} 	options -- `trailingSlash` property {Boolean}
 * 								   determines trailing slash in base path.
 * @return  {String}
 */
export function getBase(options = { trailingSlash: false }) {
	var base = (process.env.BASE || process.env.VITE_BASE || "/").trim();
	var { trailingSlash } = options;
	if (trailingSlash) {
		return base;
	}
	return base.replace(/\/$/, "");
}

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
 * Return project `URL` environment variable, if there is one.
 * Set a sensible default, if there isn't.
 * ---
 * @return  {String}
 */
export function getUrl() {
	if (process.env.URL) {
		return process.env.URL.toLowerCase().trim();
	}

	console.warn(
		"Environment variable `URL` is missing.\nUsing value `http://localhost:8080` placeholder value for this build.",
	);

	return "http://localhost:8080";
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
