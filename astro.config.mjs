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
			head: [
				{
					tag: 'script',
					attrs: {
						async: true,
						src: 'https://www.googletagmanager.com/gtag/js?id=G-PKSFYWL6HW',
					},
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-PKSFYWL6HW');
					`,
				},
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xjdf-book/xjdf-book.github.io' }],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'Introduction', slug: 'chap_01_introduction/introduction' }
					],
				},
				{
					label: 'Major Changes in XJDF',
					items: [
						{ label: 'Major Changes in XJDF', slug: 'chap_02_major-changes/major-changes' }
					],
				},
				{
					label: 'XJDF Essentials',
					items: [
						{ label: 'XJDF Essentials', slug: 'chap_03_xjdf-essentials/xjdf-essentials' },
						{ label: 'Resources', slug: 'chap_03_xjdf-essentials/resources' },
						{ label: 'Extensibility', slug: 'chap_03_xjdf-essentials/extensibility' },
						{ label: 'Identifiers', slug: 'chap_03_xjdf-essentials/identifiers' },
					],
				},
				{
					label: 'Product Description',
					items: [
						{ label: 'Product Description', slug: 'chap_04_product-description/product-description' }
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
