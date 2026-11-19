# AGENTS.md

## Project Overview
This repository hosts the online edition of the **XJDF Book** (*XJDF - Exchange Job Definition Format* by Dr. Stefan Meissner), published at `https://xjdf-book.github.io`.

The site is built as a static documentation website using **Astro 7** and **Starlight** (`@astrojs/starlight`), originally migrated from a Google Docs HTML export (`raw/XJDFBook.html` and `raw/images/`).

## Tech Stack & Dependencies
- **Framework**: Astro (`^7.4.13`) with Starlight (`^0.43.1`)
- **Markdown Processor**: `@astrojs/markdown-remark` (`unified()` pipeline configured in `astro.config.mjs`)
- **Citations / Bibliography**: `rehype-citation` backed by `src/data/references.bib`
- **Code Blocks**: Expressive Code with `@expressive-code/plugin-line-numbers`
- **Image Optimization**: `sharp` via `astro:assets` `<Image />` component
- **CI/CD**: GitHub Actions (`.github/workflows/publish.yml`) deploying `dist/` to GitHub Pages on pushes to `main`

## Commands
- `npm run dev` / `npm start` — Start the local Astro dev server
- `npm run build` — Build the production static site into `dist/` (also runs Pagefind search indexing)
- `npm run preview` — Preview the production build locally

## Repository Structure
- `astro.config.mjs` — Starlight configuration, explicit sidebar definition, Expressive Code plugins, and `unified` markdown processor with `rehype-citation`.
- `src/content.config.ts` — Astro Content Collections configuration using Starlight's `docsLoader()` and `docsSchema()`.
- `src/content/docs/` — Book chapters and pages in `.md` and `.mdx` formats:
  - `index.mdx` — Splash landing page with book cover and abstract
  - `chap_01_introduction/` — Chapter 1: Introduction
  - `chap_02_major-changes/` — Chapter 2: Major Changes in XJDF
  - `chap_03_xjdf-essentials/` — Chapter 3: XJDF Essentials (`xjdf-essentials.mdx`, `resources.md`, `extensibility.md`, `identifiers.mdx`)
  - `chap_04_product-description/` — Chapter 4: Product Description (`product-description.md`, `simple-products.md`, `complex-products.md`, `non-print-product-parts.mdx`, `web-to-print.md`)
  - `chap_05_process-description/` — Chapter 5: Process Description (`process-description.mdx`, `combined-processes.mdx`, `process-usage.mdx`, `combined-process-index.md`, `amounts.md`)
  - `chap_06_xjmf/` — Chapter 6: XJMF - Exchange Job Messaging Format (`xjmf.mdx`, `message-families.md`, `subscriptions.mdx`, `submission.mdx`, `interchange-protocol.mdx`, `bootstrapping.mdx`, `piping.md`)
  - `chap_07_ics/` — Chapter 7: ICS - Interoperability Conformance Specification (`ics.mdx`)
  - `chap_08_authoring-process/` — Chapter 8: Authoring Process (`authoring-process.mdx`)
  - `chap_09_appendix/` — Chapter 9: Appendix (`abbreviations.md`, `glossary.md`)
- `src/assets/` — Optimized images imported by `.mdx` pages:
  - `src/assets/diagram/` — Architectural and technical diagrams (`.jpg`)
  - `src/assets/spec-screen/` — Screenshots and excerpts from the XJDF Specification, fold catalog, and JIRA (`.png`, `.jpg`)
- `src/data/references.bib` — BibTeX database used by `rehype-citation`
- `src/components/footer.astro` — Custom Starlight `Footer` override (includes "Buy me a coffee" button)
- `raw/` — Original Google Docs HTML export (`raw/XJDFBook.html` and `raw/images/`), kept as historical reference

## Authoring & Formatting Conventions
When editing existing chapters or adding new content, maintain visual and structural consistency across the entire book:

1. **File Extensions (`.md` vs `.mdx`)**:
   - Use `.mdx` whenever a page embeds images (so `import { Image } from 'astro:assets'` can be used) or other Astro/JSX components.
   - Use `.md` for text/code/table-only pages.
   - Be careful in `.mdx` files to wrap raw angle-bracket placeholders in prose (such as `` `<ICSName>_L<ICSLevel>-<ICSVersion>` ``) in inline code backticks so the MDX parser does not treat them as JSX tags.

2. **Inline XML Attributes & XPath Expressions**:
   - Always wrap XML attributes and XPath expressions in inline code backticks in prose and tables: e.g., `@Types`, `@JobID`, `@MediaQuality`, `//Product/@IsRoot`, `//ResourceSet/@Usage`, `Header/@refID`.

3. **Code Blocks**:
   - Use fenced XML (or Java) code blocks with a `title` attribute formatted as `title="Example: ..."`.
   - Use single quotes (`'...'`) when quoting terms inside the `title="..."` attribute so the attribute delimiters do not break:
     ````markdown
     ```xml title="Example: XJDF Gray Box 'Folding'"
     <XJDF JobID="JOB-42" Types="Folding"
             xmlns="http://www.CIP4.org/JDFSchema_2_0">
         [...]
     </XJDF>
     ```
     ````
   - Line numbers are enabled globally via `@expressive-code/plugin-line-numbers`; do not add per-block `showLineNumbers=true`.

4. **Figures & Images**:
   - Place diagrams in `src/assets/diagram/` and specification/UI screenshots in `src/assets/spec-screen/`.
   - Import images relatively at the top of `.mdx` files (after frontmatter) and wrap them in `<figure>` with `<Image />` and `<figcaption>Figure: ...</figcaption>`:
     ```mdx
     import diagramExample from '../../../assets/diagram/example.jpg';
     import { Image } from 'astro:assets';

     <figure>
       <Image src={diagramExample} alt="Short description" />
       <figcaption>Figure: Short description</figcaption>
     </figure>
     ```

5. **Citations**:
   - Use Pandoc/BibTeX citation syntax processed by `rehype-citation`, referencing keys in `src/data/references.bib`:
     - Specification sections: `[@xjdf_ip1, chap. 5.1 "Combining Individual Process Steps"]`
     - Specification tables: `[@xjdf_ip1, chap. 3 Table 3.4: ResourceSet/@Usage]`
     - Other sources: `[@cip4_2016]`, `[@prosi_2015]`, `[@printtalk_2015, chap. 1 "Introduction"]`, `[@jdf_1_5, chap. 6.2.33 "RIPing"]`, `[@cip4_base_ics, chap. 4.2 "Interoperability of Levels"]`
   - Place the closing quotation mark before the citation and the sentence period after the citation: `“...quoted text” [@xjdf_ip1, chap. X.Y "Title"].`

6. **Sidebar Navigation**:
   - The sidebar in `astro.config.mjs` is manually curated rather than autogenerated. Whenever adding, renaming, or moving a page in `src/content/docs/`, update the `sidebar` array in `astro.config.mjs` and run `npm run build` to verify all slugs resolve.
