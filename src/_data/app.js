/**
 * App: General project-level data
 * ---
 * Values accessed throughout 11ty via `app.KEY_NAME`
 *
 * @return  {Object}
 */

import UTILS from "../../config/utils.js";

export default {
	env: UTILS.getEnvironment(),
	language: UTILS.getLanguage(),
	locale: UTILS.getLocale(),
	isProduction: UTILS.isEnvironment("PROD"),
	hosting: UTILS.getHosting(),
	version: UTILS.getProjectVersion(),

	// Project information
	author: {
		name: "Lucy Barker (GenieMouse)",
		email: "hello@geniemouse.com",
		website: "https://geniemouse.com",
		location: "By the sea",
	},
	// rss: {
	// 	name: "RSS feed title",
	// 	description: "RSS feed description.",
	// },
	site: {
		name: "Eleventy starter",
		description: "An Eleventy starter project",
		url: process.env.URL || "http://localhost:8080",
		type: "Person", // Publisher/Blog schema: https://schema.org/BlogPosting
	},
	// socials: {
	// 	bluesky: {},
	// 	instagram: {},
	// 	facebook: {},
	// 	linkedin: {},
	// 	mastodon: {},
	// 	og: {
	// 		// OpenGraph/Twitter card defaults
	// 		image: "/assets/images/opengraph-default.jpg",
	// 		alt: "Eleventy/Decap CMS sandbox",
	// 	},
	// 	threads: {},
	// 	twitter: {
	// 		id: "", // @site: Profile of this site/company
	// 		creator: "", // @author: Profile of site developer
	// 	},
	// },
	theme: {
		color: "#0371d3", // Default application theme color
		bgcolor: "#011c35", // Placeholder background color, pre-CSS load
	},
};
