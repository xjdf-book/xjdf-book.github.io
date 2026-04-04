// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeCitation from 'rehype-citation';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'XJDF Book',
			expressiveCode: {
				plugins: [pluginLineNumbers()],
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xjdf-book/xjdf-book.github.io' }],
			sidebar: [
				{
					label: 'XJDF Book',
					items: [
						{ label: 'Introduction', slug: 'introduction/introduction' },
						{ label: 'Major Changes in XJDF', slug: 'major-changes/major-changes' },
						{ label: 'XJDF Essentials', slug: 'xjdf-essentials/xjdf-essentials' },
						{ label: 'Resources', slug: 'resources/resources' },
						{ label: 'Extensibility', slug: 'extensibility/extensibility' },
						{ label: 'Identifiers', slug: 'identifiers/identifiers' }
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
