---
layout: home
title: Eleventy starter project
---

# Eleventy starter project

This experimental project to trial my ideal Eleventy starter set-up. 

Currently, this involves:

* [Bun](https://bun.sh) as package manager &amp; unit testing framework; 
	<br><small>Bun could easily be swapped out for _node_, at this stage</small>
* [Eleventy](https://www.11ty.dev) for static site generation
* [Vite](https://vite.dev) for <mark>JavaScript</mark> & <mark>CSS</mark> bundling via the [eleventy-plugin-vite](https://www.11ty.dev/docs/server-vite/).

Let's see how this goes...

## Features

* Home &amp; 404 pages
* Starter CSS, including dark/light themes
* CSS post-processing using [Lightning CSS](https://lightningcss.dev/)
* Critical CSS, generated and inlined by [rollup-plugin-critical](https://github.com/nystudio107/rollup-plugin-critical). 
* Main CSS file is loaded using [Scott Jehl's `media` loading strategy](https://www.filamentgroup.com/lab/load-css-simpler/)
* Loads `.env` file for project secrets, using [dotenvx](https://dotenvx.com/docs/)
* Placeholder favicon sets to differentiate <mark>DEV</mark> / <mark>PROD</mark> environments
* Site SEO &amp; meta files:
   * `humans.txt`
   * `robots.txt`
   * `site.webmanifest`
   * `sitemap.xml`
* GitHub Pages `config.yml`
* [Biome](https://biomejs.dev/) configuration for formatting &amp; linting

## Planned features

1. RSS feed
2. Social media `<meta>`-tags & imagery
