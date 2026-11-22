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
						{ label: 'Product Description', slug: 'chap_04_product-description/product-description' },
						{ label: 'Simple Products', slug: 'chap_04_product-description/simple-products' },
						{ label: 'Complex Products', slug: 'chap_04_product-description/complex-products' },
						{ label: 'Non-Print Product Parts', slug: 'chap_04_product-description/non-print-product-parts' },
						{ label: 'Web-To-Print Job Submission', slug: 'chap_04_product-description/web-to-print' },
					],
				},
				{
					label: 'Process Description',
					items: [
						{ label: 'Process Description', slug: 'chap_05_process-description/process-description' },
						{ label: 'Combined Processes', slug: 'chap_05_process-description/combined-processes' },
						{ label: 'ProcessUsage', slug: 'chap_05_process-description/process-usage' },
						{ label: 'CombinedProcessIndex', slug: 'chap_05_process-description/combined-process-index' },
						{ label: 'Amounts', slug: 'chap_05_process-description/amounts' },
					],
				},
				{
					label: 'XJMF - Exchange Job Messaging Format',
					items: [
						{ label: 'XJMF', slug: 'chap_06_xjmf/xjmf' },
						{ label: 'Message Families', slug: 'chap_06_xjmf/message-families' },
						{ label: 'Subscriptions', slug: 'chap_06_xjmf/subscriptions' },
						{ label: 'Submission of XJDF Documents', slug: 'chap_06_xjmf/submission' },
						{ label: 'Interchange Protocol', slug: 'chap_06_xjmf/interchange-protocol' },
						{ label: 'XJMF Bootstrapping', slug: 'chap_06_xjmf/bootstrapping' },
						{ label: 'Piping (Overlapping Processing)', slug: 'chap_06_xjmf/piping' },
					],
				},
				{
					label: 'ICS',
					items: [
						{ label: 'ICS - Interoperability Conformance Specification', slug: 'chap_07_ics/ics' },
					],
				},
				{
					label: 'Authoring Process',
					items: [
						{ label: 'Authoring Process', slug: 'chap_08_authoring-process/authoring-process' },
					],
				},
				{
					label: 'Appendix',
					items: [
						{ label: 'List of Abbreviations', slug: 'chap_09_appendix/abbreviations' },
						{ label: 'Glossary', slug: 'chap_09_appendix/glossary' },
					],
				}
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
