/**
 * Collections
 * ---
 */

export default {
	markdownPages,
	siteMapOrder,
};

/**
 * Individual functions, exported individually
 * ---
 */

/**
 * Collect all markdown files.
 * ---
 * @param   {Object}  collection
 * @return  {Array}
 */
export function markdownPages(collection) {
	return collection.getFilteredByGlob("./src/**/*.md");
}

/**
 * Collect & order markdown pages via `page_weight` frontmatter property,
 * for `sitemap.xml` output.
 * e.g.
 * 0 - homepage
 * 10 - hub pages
 * 100 - article pages
 * ---
 * @param   {Object}  collection
 * @return  {Array}
 */
export function siteMapOrder(collection) {
	return (
		markdownPages(collection)
			// Filter for exclusion
			.filter((page) => page.url && page.data.excludeFromSitemap != true)
			// Sort by `page_weight` frontmatter, then page title
			.sort((a, b) => {
				const sorting = a.data.page_weight - b.data.page_weight;
				if (sorting !== 0) {
					return sorting;
				}
				return a.data.title - b.data.title;
			})
	);
}
