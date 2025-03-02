/**
 * App: General project-level data
 * ---
 * Values accessed throughout 11ty via `app.KEY_NAME`
 *
 * @return  {Object}
 */

export default {
	// Project information
	author: {
		name: process.env.AUTHOR_NAME,
		email: process.env.AUTHOR_EMAIL,
		website: process.env.AUTHOR_WEBSITE,
		location: process.env.AUTHOR_LOCATION,
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
