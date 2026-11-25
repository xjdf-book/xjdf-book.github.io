# AGENTS.md

## Project Overview
This repository hosts the online edition of the **XJDF Book** (*XJDF - Exchange Job Definition Format* by Dr. Stefan Meissner), published at `https://xjdf-book.github.io`.

The site is built as a static documentation website using **Astro 7** and **Starlight** (`@astrojs/starlight`), originally migrated from a Google Docs HTML export (`raw/XJDFBook.html` and `raw/images/`).

## Tech Stack & Dependencies
- **Framework**: Astro (`^7.4.13`) with Starlight (`^0.43.1`) and `starlight-theme-rapide`
- **Markdown Processor**: `@astrojs/markdown-remark` (`unified()` pipeline configured in `astro.config.mjs`)
- **Citations / Bibliography**: `rehype-citation` backed by `src/data/references.bib`
- **Code Blocks**: Expressive Code with `@expressive-code/plugin-line-numbers`
- **Image Optimization**: `sharp` via `astro:assets` `<Image />` component
- **CI/CD**: GitHub Actions (`.github/workflows/publish.yml`) deploying `dist/` to GitHub Pages on version tags matching `x.y.z` (`[0-9]+.[0-9]+.[0-9]+`)

## Commands
- `npm run dev` / `npm start` — Start the local Astro dev server
- `npm run build` — Build the production static site into `dist/` (also runs Pagefind search indexing)
- `npm run preview` — Preview the production build locally

## Repository Structure
- `astro.config.mjs` — Starlight configuration, explicit sidebar definition, global meta/analytics `<head>` tags, Expressive Code plugins, and `unified` markdown processor with `rehype-citation`.
- `src/content.config.ts` — Astro Content Collections configuration using Starlight's `docsLoader()` and `docsSchema()`.
- `src/content/docs/` — Book chapters and pages in `.md` and `.mdx` formats (one page per chapter):
  - `index.mdx` — Splash landing page with book cover, abstract, and author/citation section
  - `chap_01_introduction/introduction.md` — Chapter 1: Introduction
  - `chap_02_major-changes/major-changes.md` — Chapter 2: Major Changes in XJDF
  - `chap_03_xjdf-essentials/xjdf-essentials.mdx` — Chapter 3: XJDF Essentials
  - `chap_04_product-description/product-description.mdx` — Chapter 4: Product Description
  - `chap_05_process-description/process-description.mdx` — Chapter 5: Process Description
  - `chap_06_xjmf/xjmf.mdx` — Chapter 6: XJMF - Exchange Job Messaging Format
  - `chap_07_ics/ics.mdx` — Chapter 7: ICS - Interoperability Conformance Specification
  - `chap_08_authoring-process/authoring-process.mdx` — Chapter 8: Authoring Process
  - `chap_09_appendix/appendix.md` — Chapter 9: Appendix (Abbreviations & Glossary)
- `src/pages/` — Static endpoint generators:
  - `src/pages/llms.txt.ts` — Generates `/llms.txt` (concise LLM index of the book and chapters)
  - `src/pages/llms-full.txt.ts` — Generates `/llms-full.txt` (compiles the entire book from `src/content/docs/` into a single clean Markdown document at build time)
- `src/components/` — Custom Starlight component overrides:
  - `src/components/head.astro` — Starlight `Head` override injecting Schema.org JSON-LD (`Book`, `WebSite`, `TechArticle`/`Chapter`, `BreadcrumbList`, `Person`) and Highwire Press / Google Scholar `citation_*` meta tags
  - `src/components/hero.astro` — Starlight `Hero` override for the start page (theme-aware `XJDF` title logo, book cover, version/build timestamp, and `CC BY 4.0` license badge)
  - `src/components/sidebar.astro` — Starlight `Sidebar` override pinning author, version, build timestamp, `CC BY 4.0` license, and Imprint & Privacy links at the bottom of the navigation pane
  - `src/components/footer.astro` — Starlight `Footer` override (includes localized "Buy me a coffee" button and book/legal metadata)
- `src/styles/custom.css` — Custom theme styling (active green sidebar highlight, header logo sizing, justified landing page abstract)
- `src/assets/` — Optimized images imported by `.mdx` pages and components:
  - `src/assets/book-cover.png` — Book cover image on the splash page
  - `src/assets/header-logo-light.png` & `src/assets/header-logo-dark.png` — Top-left navigation bar lockup (`XJDF | Exchange Job Definition Format`)
  - `src/assets/xjdf-logo-light.png` & `src/assets/xjdf-logo-dark.png` — Hero `XJDF` wordmark logos
  - `src/assets/diagram/` — Architectural and technical diagrams (`.jpg`)
  - `src/assets/spec-screen/` — Screenshots and excerpts from the XJDF Specification, fold catalog, and JIRA (`.png`, `.jpg`)
- `public/` — Static assets served at the site root:
  - `public/favicon.svg` — Vector SVG of the red `X` mark
  - `public/og-image.png` — `1200×630` Open Graph social preview card
  - `public/bmc-button.svg` — Local "Buy me a coffee" SVG button (zero third-party tracking)
  - `public/robots.txt` — Crawler rules and `Sitemap` pointer welcoming search and AI crawlers
- `src/data/references.bib` — BibTeX database used by `rehype-citation`
- `LICENSE` & `CITATION.cff` — `CC BY 4.0` license text and GitHub citation metadata
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

6. **Keeping Navigation, SEO, and AI/LLM Files in Sync**:
   - Every chapter page in `src/content/docs/` must include both `title` and `description` in its YAML frontmatter (used for `<meta name="description">`, `og:description`, and `TechArticle` JSON-LD in `src/components/head.astro`).
   - Whenever adding, renaming, moving, or changing the scope of a chapter in `src/content/docs/`, you **must** update all of the following places to keep them in sync:
     1. `astro.config.mjs` — Update the manually curated `sidebar` array.
     2. `src/pages/llms.txt.ts` — Update the chapter list and descriptions in `/llms.txt`.
     3. `src/pages/llms-full.txt.ts` — Update the `CHAPTER_FILES` array so `/llms-full.txt` includes the chapter in the correct reading order.
     4. `README.md` — Update the *Table of Contents* section.
   - Whenever updating book/author/license metadata, keep `package.json`, `astro.config.mjs`, `src/components/head.astro`, `src/components/hero.astro`, `src/components/sidebar.astro`, `src/components/footer.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `CITATION.cff`, `LICENSE`, and `README.md` aligned.
   - Always run `npm run build` after changes to verify that all routes, `/llms.txt`, `/llms-full.txt`, and `/sitemap-index.xml` build cleanly.
