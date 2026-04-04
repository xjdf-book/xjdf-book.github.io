// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeCitation from 'rehype-citation';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'XJDF Book',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xjdf-book/xjdf-book.github.io' }],
			sidebar: [
				{
					label: 'Introduction',
					autogenerate: { directory: 'introduction' },
				},
				{
					label: 'Major Changes in XJDF',
					items: [
						{ label: 'Major Changes', slug: 'major-changes/major-changes' },
					],
				}
			],
		}),
	],
	markdown: {
		rehypePlugins: [
			[rehypeCitation, { bibliography: './src/data/references.bib' }]
		],
	},
});
