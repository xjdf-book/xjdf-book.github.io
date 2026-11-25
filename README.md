<div align="center">
  <img src="src/assets/book-cover.png" alt="XJDF Book Cover" width="240" />

  # XJDF – Exchange Job Definition Format

  **The technical guide and introduction to XJDF (JDF 2.0) and XJMF for the graphic arts industry**

  [![Read Online](https://img.shields.io/badge/Read_Online-xjdf--book.github.io-blue?style=for-the-badge)](https://xjdf-book.github.io)
  [![Publish Book](https://img.shields.io/github/actions/workflow/status/xjdf-book/xjdf-book.github.io/publish.yml?style=for-the-badge&label=Build_%26_Deploy)](https://github.com/xjdf-book/xjdf-book.github.io/actions/workflows/publish.yml)
  [![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
  [![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/meixxi)
</div>

---

## About the Book

The **Exchange Job Definition Format (XJDF)** is the next major version of the Job Definition Format (JDF), an XML-based job ticket standard for the graphic arts industry managed by the [CIP4 Organization](https://www.cip4.org/).

Whereas original versions of JDF were designed around a complete electronic job ticket passed across devices, XJDF (JDF 2.0) is designed as a streamlined data interchange format describing the interface between management applications (such as MIS, production control, and prepress workflow systems) and executing devices.

Written by **Dr. Stefan Meissner** (*Chairman of the CIP4 XJDF Workgroup*), this book provides a practical technical introduction to XJDF and XJMF, explaining the core concepts, XML structures, product and process views, messaging workflows, and the CIP4 specification authoring process.

👉 **[Read the book online at https://xjdf-book.github.io](https://xjdf-book.github.io)**

---

## Table of Contents

1. **[Introduction](https://xjdf-book.github.io/chap_01_introduction/introduction/)** — History from CIP3/PPF and JDF 1.x to XJDF
2. **[Major Changes in XJDF](https://xjdf-book.github.io/chap_02_major-changes/major-changes/)** — Data model improvements, XML simplifications, removal of the process network, and technology updates
3. **[XJDF Essentials](https://xjdf-book.github.io/chap_03_xjdf-essentials/xjdf-essentials/)** — Product vs. process view, Gray Boxes, Common XML Structure, Resources & Partitioning, Extensibility, Identifiers, Units, Data Types & Fold Catalog
4. **[Product Description](https://xjdf-book.github.io/chap_04_product-description/product-description/)** — Product Intents, Simple Products (Flyers, Folded Leaflets, Banners), Complex Products (Magazines, Notepads), Non-Print Parts (Roll-up Displays), and Web-To-Print Job Submission (PrintTalk 2.0)
5. **[Process Description](https://xjdf-book.github.io/chap_05_process-description/process-description/)** — Processes & Gray Boxes, Combined Processes, ProcessUsage, CombinedProcessIndex, and Amounts (Planned vs. Actual)
6. **[XJMF – Exchange Job Messaging Format](https://xjdf-book.github.io/chap_06_xjmf/xjmf/)** — Architecture, Message Families (Query, Response, Command, Signal), Subscriptions & Persistent Channels, Submission of XJDF Documents (Queues), Interchange Protocol, ZIP Packaging, Error Handling, Bootstrapping, and Piping
7. **[ICS – Interoperability Conformance Specification](https://xjdf-book.github.io/chap_07_ics/ics/)** — Base ICS, domain ICS documents, conformance levels, and system interoperability
8. **[Authoring Process](https://xjdf-book.github.io/chap_08_authoring-process/authoring-process/)** — CIP4 JIRA workflow, meetings, InterOp, and ICS workgroups
9. **[Appendix](https://xjdf-book.github.io/chap_09_appendix/appendix/)** — List of Abbreviations & Glossary

---

## AI & LLM Integration

This book provides machine-readable context files following the [llms.txt standard](https://llmstxt.org/):
- **[`https://xjdf-book.github.io/llms.txt`](https://xjdf-book.github.io/llms.txt)** — Concise index of all chapters and metadata
- **[`https://xjdf-book.github.io/llms-full.txt`](https://xjdf-book.github.io/llms-full.txt)** — Complete book text in a single Markdown file for LLM context windows and RAG pipelines

---

## Local Development

This site is built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

### Prerequisites
- [Node.js](https://nodejs.org/) (v24 or newer recommended)
- `npm`

### Commands

```bash
# Install dependencies
npm install

# Start local development server at http://localhost:4321
npm run dev

# Build production static site into ./dist
npm run build

# Preview production build locally
npm run preview
```

---

## Feedback & Contributions

Found a typo, erratum, or have suggestions for improvement?
Please [open an issue](https://github.com/xjdf-book/xjdf-book.github.io/issues) or submit a pull request on GitHub.

---

## Publication Details

- **Title**: *XJDF – Exchange Job Definition Format* (Online Edition)
- **Author**: [Dr. Stefan Meissner](https://meixxi.github.io/) ([LinkedIn](https://www.linkedin.com/in/meissners))
- **License**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Citation**: Meissner, Stefan. *XJDF – Exchange Job Definition Format*. Online Edition, `https://xjdf-book.github.io` (CC BY 4.0).
