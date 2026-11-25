import type { APIRoute } from 'astro';

const content = `# XJDF – Exchange Job Definition Format

> A practical introduction and technical implementation guide to the Exchange Job Definition Format (XJDF / JDF 2.0), the Exchange Job Messaging Format (XJMF), and the CIP4 specification authoring process for the graphic arts industry.

- **Author**: Dr. Stefan Meissner (https://meixxi.github.io/ | https://www.linkedin.com/in/meissners)
- **Website**: https://xjdf-book.github.io/
- **Full Book Text (LLM Context)**: https://xjdf-book.github.io/llms-full.txt
- **License**: Creative Commons Attribution 4.0 International (CC BY 4.0) — https://creativecommons.org/licenses/by/4.0/
- **Citation**: Meissner, Stefan. *XJDF – Exchange Job Definition Format*. Online Edition, https://xjdf-book.github.io/ (CC BY 4.0).

## Chapters

- [Chapter 1: Introduction](https://xjdf-book.github.io/chap_01_introduction/introduction/): Background on the CIP4 Organization, the evolution from JDF 1.x to XJDF (JDF 2.0), and how to navigate this book.
- [Chapter 2: Major Changes in XJDF](https://xjdf-book.github.io/chap_02_major-changes/major-changes/): Architectural shift from monolithic JDF job tickets to modular XJDF execution instructions, schema simplification, and XML data structure updates.
- [Chapter 3: XJDF Essentials](https://xjdf-book.github.io/chap_03_xjdf-essentials/xjdf-essentials/): Core XJDF concepts: the root \`<XJDF>\` node, product vs. process view, gray box simplification, \`ResourceSet\` and \`Resource\`, \`Part\` partitioning, \`AuditPool\`, DTP units, and the XJDF Fold Catalog.
- [Chapter 4: Product Description](https://xjdf-book.github.io/chap_04_product-description/product-description/): Describing print products in XJDF using \`ProductList\`, \`Product\`, and \`Intent\` resources (\`ColorIntent\`, \`FoldingIntent\`, \`LayoutIntent\`, \`MediaIntent\`, \`BindingIntent\`, \`AssemblingIntent\`, \`HoleMakingIntent\`, \`ShapeCuttingIntent\`, \`VariableIntent\`), covering simple products, complex multi-part products, non-print parts, and Web-To-Print job submission via PrintTalk 2.0.
- [Chapter 5: Process Description](https://xjdf-book.github.io/chap_05_process-description/process-description/): Defining production processes and gray boxes in XJDF across prepress, press, and postpress—covering single and combined processes (\`Preflight\`, \`Stripping\`, \`Imposition\`, \`Interpreting\`, \`Rendering\`, \`Folding\`, \`Collecting\`, \`Stitching\`, \`Trimming\`), \`ProcessUsage\`, \`CombinedProcessIndex\`, and planned vs. actual amounts.
- [Chapter 6: XJMF – Exchange Job Messaging Format](https://xjdf-book.github.io/chap_06_xjmf/xjmf/): Device communication and job messaging with XJMF: controller architectures, queries, commands, signals, queue entries, and ZIP package exchange.
- [Chapter 7: ICS – Interoperability Conformance Specification](https://xjdf-book.github.io/chap_07_ics/ics/): How CIP4 Interoperability Conformance Specifications (ICS) define compliance levels and domain interfaces between print management and production systems.
- [Chapter 8: Authoring Process](https://xjdf-book.github.io/chap_08_authoring-process/authoring-process/): How to participate in the CIP4 specification authoring process, track JIRA issues, and contribute to the evolution of the XJDF and XJMF standards.
- [Chapter 9: Appendix](https://xjdf-book.github.io/chap_09_appendix/appendix/): Reference list of abbreviations, acronyms, and glossary definitions for XJDF, XJMF, JDF, and print production terminology.
`;

export const GET: APIRoute = () => {
	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
