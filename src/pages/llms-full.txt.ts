import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const CHAPTER_FILES = [
	{ slug: '', file: 'src/content/docs/index.mdx', label: 'Overview & Abstract' },
	{ slug: 'chap_01_introduction/introduction/', file: 'src/content/docs/chap_01_introduction/introduction.md', label: 'Chapter 1: Introduction' },
	{ slug: 'chap_02_major-changes/major-changes/', file: 'src/content/docs/chap_02_major-changes/major-changes.md', label: 'Chapter 2: Major Changes in XJDF' },
	{ slug: 'chap_03_xjdf-essentials/xjdf-essentials/', file: 'src/content/docs/chap_03_xjdf-essentials/xjdf-essentials.mdx', label: 'Chapter 3: XJDF Essentials' },
	{ slug: 'chap_04_product-description/product-description/', file: 'src/content/docs/chap_04_product-description/product-description.mdx', label: 'Chapter 4: Product Description' },
	{ slug: 'chap_05_process-description/process-description/', file: 'src/content/docs/chap_05_process-description/process-description.mdx', label: 'Chapter 5: Process Description' },
	{ slug: 'chap_06_xjmf/xjmf/', file: 'src/content/docs/chap_06_xjmf/xjmf.mdx', label: 'Chapter 6: XJMF - Exchange Job Messaging Format' },
	{ slug: 'chap_07_ics/ics/', file: 'src/content/docs/chap_07_ics/ics.mdx', label: 'Chapter 7: ICS - Interoperability Conformance Specification' },
	{ slug: 'chap_08_authoring-process/authoring-process/', file: 'src/content/docs/chap_08_authoring-process/authoring-process.mdx', label: 'Chapter 8: Authoring Process' },
	{ slug: 'chap_09_appendix/appendix/', file: 'src/content/docs/chap_09_appendix/appendix.md', label: 'Chapter 9: Appendix' },
];

function cleanMdxToMarkdown(raw: string): string {
	// Strip YAML frontmatter
	let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
	// Strip ESM import lines
	body = body.replace(/^import\s+.*?;?\s*$/gm, '');
	// Convert <figure> ... <figcaption>Figure: ...</figcaption> </figure> to Markdown blockquote caption
	body = body.replace(
		/<figure>\s*<Image[^>]*alt="([^"]*)"[^>]*\/>\s*<figcaption>([\s\S]*?)<\/figcaption>\s*<\/figure>/g,
		(_, _alt, caption) => `> *[${caption.trim()}]*`
	);
	// Collapse 3+ consecutive newlines
	body = body.replace(/\n{3,}/g, '\n\n');
	return body.trim();
}

export const GET: APIRoute = () => {
	const header = `# XJDF – Exchange Job Definition Format (Full Book Context for LLMs)

- **Author**: Dr. Stefan Meissner (https://meixxi.github.io/ | https://www.linkedin.com/in/meissners)
- **Canonical URL**: https://xjdf-book.github.io/
- **Concise Index**: https://xjdf-book.github.io/llms.txt
- **License**: Creative Commons Attribution 4.0 International (CC BY 4.0) — https://creativecommons.org/licenses/by/4.0/
- **Attribution / Citation Requirement**: You are free to share, quote, summarize, and adapt this work for any purpose (including commercial and AI-assisted responses) under CC BY 4.0, provided you attribute **Dr. Stefan Meissner** and link to **https://xjdf-book.github.io/**.

---
`;

	const sections = CHAPTER_FILES.map(({ slug, file, label }) => {
		const absPath = path.resolve(process.cwd(), file);
		const raw = fs.readFileSync(absPath, 'utf-8');
		const cleaned = cleanMdxToMarkdown(raw);
		const url = `https://xjdf-book.github.io/${slug}`;
		return `# ${label}\nCanonical URL: ${url}\n\n${cleaned}`;
	});

	const fullText = `${header}\n${sections.join('\n\n---\n\n')}\n`;

	return new Response(fullText, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
