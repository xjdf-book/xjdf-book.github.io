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

const BIB_LABELS: Record<string, string> = {
	xjdf_ip1: 'XJDF Specification: IP Review 1 (2016)',
	prosi_2015: 'Prosi, XJDF - The evolution of JDF (2015)',
	cip4_2016: 'CIP4 Website (2016)',
	xml_namespaces_2009: 'W3C Namespaces in XML 1.0 (2009)',
	printtalk_2015: 'PrintTalk Specification DRAFT 1.6 (2015)',
	jdf_1_5: 'JDF Specification 1.5 (2013)',
	cip4_base_ics: 'CIP4 Base ICS 1.5 (2013)',
	cip4_misfin_ics: 'CIP4 MIS Finishing ICS 1.3 (2011)',
	cip4_tsc_2005: 'CIP4 TSC Procedures (2005)',
	cip4_interop_2016: 'CIP4 InterOp (2016)',
};

function cleanMdxToMarkdown(raw: string): string {
	// Strip YAML frontmatter
	let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
	// Strip ESM import lines
	body = body.replace(/^import\s+.*?;?\s*$/gm, '');
	// Convert <figure> ... <figcaption>Figure: ...</figcaption> </figure> (including multi-image figures) to Markdown blockquote caption
	body = body.replace(
		/<figure>[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>\s*<\/figure>/g,
		(_, caption) => `> *[${caption.trim()}]*`
	);
	// Convert any remaining inline <Image ... alt="..." /> (e.g. inside Markdown tables) to *[Image: alt]*
	body = body.replace(/<Image[^>]*alt="([^"]*)"[^>]*\/>/g, '*[Image: $1]*');
	// Resolve Pandoc/BibTeX citations [@key, ...] to human-readable citations in llms-full.txt
	body = body.replace(/\[@([a-zA-Z0-9_]+)(?:,\s*([^\]]+))?\]/g, (match, key, locator) => {
		const label = BIB_LABELS[key] || key;
		return locator ? `(${label}, ${locator})` : `(${label})`;
	});
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
