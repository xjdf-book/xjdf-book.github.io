// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import { unified } from '@astrojs/markdown-remark';
import rehypeCitation from 'rehype-citation';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'XJDF Book',
			plugins: [starlightThemeRapide()],
			components: {
				Footer: './src/components/footer.astro',
			},
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
