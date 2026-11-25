// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import { unified } from '@astrojs/markdown-remark';
import rehypeCitation from 'rehype-citation';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

// https://astro.build/config
export default defineConfig({
	site: 'https://xjdf-book.github.io',
	integrations: [
		starlight({
			title: 'XJDF Book',
			description: 'The technical guide and introduction to XJDF (JDF 2.0) and XJMF for the graphic arts industry by Dr. Stefan Meissner.',
			favicon: '/favicon.svg',
			logo: {
				light: './src/assets/header-logo-light.png',
				dark: './src/assets/header-logo-dark.png',
				replacesTitle: true,
			},
			plugins: [starlightThemeRapide()],
			customCss: ['./src/styles/custom.css'],
			components: {
				Footer: './src/components/footer.astro',
				Hero: './src/components/hero.astro',
				Sidebar: './src/components/sidebar.astro',
			},
			expressiveCode: {
				plugins: [pluginLineNumbers()],
			},
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'author',
						content: 'Dr. Stefan Meissner',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'article:author',
						content: 'https://www.linkedin.com/in/meissners',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://xjdf-book.github.io/og-image.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:type',
						content: 'image/png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:width',
						content: '1200',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:height',
						content: '630',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:alt',
						content: 'XJDF – Exchange Job Definition Format by Dr. Stefan Meissner',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://xjdf-book.github.io/og-image.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image:alt',
						content: 'XJDF – Exchange Job Definition Format by Dr. Stefan Meissner',
					},
				},
				{
					tag: 'script',
					attrs: {
						'data-goatcounter': 'https://xjdf-book.goatcounter.com/count',
						async: true,
						src: '//gc.zgo.at/count.js',
					},
				},
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xjdf-book/xjdf-book.github.io' }],
			sidebar: [
				{ label: 'Introduction', slug: 'chap_01_introduction/introduction' },
				{ label: 'Major Changes in XJDF', slug: 'chap_02_major-changes/major-changes' },
				{ label: 'XJDF Essentials', slug: 'chap_03_xjdf-essentials/xjdf-essentials' },
				{ label: 'Product Description', slug: 'chap_04_product-description/product-description' },
				{ label: 'Process Description', slug: 'chap_05_process-description/process-description' },
				{ label: 'XJMF - Exchange Job Messaging Format', slug: 'chap_06_xjmf/xjmf' },
				{ label: 'ICS - Interoperability Conformance Specification', slug: 'chap_07_ics/ics' },
				{ label: 'Authoring Process', slug: 'chap_08_authoring-process/authoring-process' },
				{ label: 'Appendix', slug: 'chap_09_appendix/appendix' },
			],
		}),
	],
	markdown: {
		processor: unified({
			rehypePlugins: [
				[rehypeCitation, { bibliography: './src/data/references.bib' }]
			],
		}),
	},
});
