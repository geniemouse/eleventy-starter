/**
 * English language pack
 * ---
 * Dictionary of phrases used in project templates & client-side JavaScript.
 * Expose as necessary.
 *
 * @return  {Object}
 */

export default {
	close: "Close",
	// A11y/UI close buttons text, not always visible.

	footer: {
		company: "GenieMouse Ltd.",
		rights: "All rights reserved.",
		strapline: "This site hosted by GitHub Pages.",
	},

	footnotes: "Footnotes",
	// Markdown-generated footnotes heading.

	menu: "Menu",
	// A11y/UI menu button, not always visible.

	new_tab: "Opens in a new browser tab",
	// A11y requirement: warn of links opening in a new browser tab/window.
	// Shouldn't be opening new tabs, but left in just in case...

	// Pagination & pagination-counter component phrases:
	pagination: {
		counter: "Page {0} / {1}",
		first: "First",
		heading: "Other pages", // Heading default text
		last: "Last",
		next: "Next",
		page: "Page",
		previous: "Previous",
	},

	skip_content: "Skip to content",
	// A11y requirement: provide a link that a visitor (using keyboard/
	// switch navigation) can use to jump straight to page content.
	// Link usually styled to be visible only when it has focus.
};
