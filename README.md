<div align="center">
  <img src="src/assets/book-cover.png" alt="XJDF Book Cover" width="240" />

  # XJDF – Exchange Job Definition Format

  **The technical guide and introduction to XJDF (JDF 2.0) and XJMF for the graphic arts industry**

  [![Read Online](https://img.shields.io/badge/Read_Online-xjdf--book.github.io-blue?style=for-the-badge)](https://xjdf-book.github.io)
  [![Publish Book](https://img.shields.io/github/actions/workflow/status/xjdf-book/xjdf-book.github.io/publish.yml?branch=main&style=for-the-badge&label=Build_%26_Deploy)](https://github.com/xjdf-book/xjdf-book.github.io/actions/workflows/publish.yml)
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
3. **[XJDF Essentials](https://xjdf-book.github.io/chap_03_xjdf-essentials/xjdf-essentials/)**
   - [XJDF Essentials & Common XML Structure](https://xjdf-book.github.io/chap_03_xjdf-essentials/xjdf-essentials/)
   - [Resources & Partitioning](https://xjdf-book.github.io/chap_03_xjdf-essentials/resources/)
   - [Extensibility & Foreign Namespaces](https://xjdf-book.github.io/chap_03_xjdf-essentials/extensibility/)
   - [Identifiers, Units, Data Types & Fold Catalog](https://xjdf-book.github.io/chap_03_xjdf-essentials/identifiers/)
4. **[Product Description](https://xjdf-book.github.io/chap_04_product-description/product-description/)**
   - [Product Intents Overview](https://xjdf-book.github.io/chap_04_product-description/product-description/)
   - [Simple Products (Flyers, Folded Leaflets, Banners)](https://xjdf-book.github.io/chap_04_product-description/simple-products/)
   - [Complex Products (Magazines, Notepads)](https://xjdf-book.github.io/chap_04_product-description/complex-products/)
   - [Complex Products with Non-Print Parts (Roll-up Displays)](https://xjdf-book.github.io/chap_04_product-description/non-print-product-parts/)
   - [Web-To-Print Job Submission & Status Feedback (PrintTalk 2.0)](https://xjdf-book.github.io/chap_04_product-description/web-to-print/)
5. **[Process Description](https://xjdf-book.github.io/chap_05_process-description/process-description/)**
   - [Processes & Gray Boxes](https://xjdf-book.github.io/chap_05_process-description/process-description/)
   - [Combined Processes](https://xjdf-book.github.io/chap_05_process-description/combined-processes/)
   - [ProcessUsage](https://xjdf-book.github.io/chap_05_process-description/process-usage/)
   - [CombinedProcessIndex](https://xjdf-book.github.io/chap_05_process-description/combined-process-index/)
   - [Amounts (Planned vs. Actual)](https://xjdf-book.github.io/chap_05_process-description/amounts/)
6. **[XJMF – Exchange Job Messaging Format](https://xjdf-book.github.io/chap_06_xjmf/xjmf/)**
   - [Architecture & XJMF Overview](https://xjdf-book.github.io/chap_06_xjmf/xjmf/)
   - [Message Families (Query, Response, Command, Signal)](https://xjdf-book.github.io/chap_06_xjmf/message-families/)
   - [Subscriptions & Persistent Channels](https://xjdf-book.github.io/chap_06_xjmf/subscriptions/)
   - [Submission of XJDF Documents (Queues)](https://xjdf-book.github.io/chap_06_xjmf/submission/)
   - [Interchange Protocol, ZIP Packaging & Error Handling](https://xjdf-book.github.io/chap_06_xjmf/interchange-protocol/)
   - [XJMF Bootstrapping (Service Discovery)](https://xjdf-book.github.io/chap_06_xjmf/bootstrapping/)
   - [Piping (Overlapping Processing)](https://xjdf-book.github.io/chap_06_xjmf/piping/)
7. **[ICS – Interoperability Conformance Specification](https://xjdf-book.github.io/chap_07_ics/ics/)**
8. **[Authoring Process](https://xjdf-book.github.io/chap_08_authoring-process/authoring-process/)** — CIP4 JIRA workflow, meetings, InterOp, and ICS workgroups
9. **Appendix**
   - [List of Abbreviations](https://xjdf-book.github.io/chap_09_appendix/abbreviations/)
   - [Glossary](https://xjdf-book.github.io/chap_09_appendix/glossary/)

---

## Local Development

This site is built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

### Prerequisites
- [Node.js](https://nodejs.org/) (v22 or newer recommended)
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
- **Author**: [Dr. Stefan Meissner](https://www.linkedin.com/in/meissners)
