---
title: Introduction
description: History and evolution of print production standards from CIP3/PPF and JDF 1.x to the Exchange Job Definition Format (XJDF / JDF 2.0).
---

“CIP4 was formed in September of 2000. Its predecessor, CIP3, was formed by Heidelberg in 1995 and was managed by the Fraunhofer Institute for Computer Graphics. CIP3 created the Print Production Format (PPF), which has found some success in ink key presetting and postpress operations” [@cip4_2016]. JDF is the successor to PPF and was initially published in 2001. The first version of JDF served as a “straw man” document intended to spark further discussion.

“JDF 1.1 and 1.1a were published in April and October of 2002, resulting in the first versions of JDF that could be implemented by vendors. At Drupa 2004, the first wave of JDF-enabled products hit the market. Since then, JDF has been updated several times. In each of these updates, the basic structure of JDF has been preserved and the specification expanded to include broader aspects of print production. Initially optimized for sheetfed offset printing, JDF has been expanded to include digital printing, preflighting, web offset printing, packaging, layout applications, newsprint, and more” [@cip4_2016].

“JDF is designed as a digital representation of the entire job ticket. The assumption [...] was that JDF would be passed entirely from one device to another. Therefore, all aspects of and relationships between processes in a single job in the graphic arts need to be encoded into a single JDF file. This design has one major drawback: the JDF file contains data that may be irrelevant to the recipient. For instance, a RIP might receive JDF instructions that contain all necessary data for RIPping, but additionally, a set of printing instructions dedicated to a printing press and further postpress instructions for finishing devices as well” [@prosi_2015]. This makes parsing and interpreting a JDF file complex and error-prone. As a result, JDF has rarely been used in the way its creators originally envisioned.

Today, most applications and devices rely on their own internal data models and use JDF primarily as an interface technology. Because JDF was designed to represent the entire job ticket, however, these interface documents remain unnecessarily complex. A substantial amount of information must be encoded and transferred merely to preserve structural integrity, leading to costly implementations and frequent interoperability issues.

Nevertheless, the JDF Specification remains one of the most valuable reference documents in the graphic arts industry. No other publication describes print production in such a detailed, structured, and comprehensive manner. The JDF Specification is the result of more than two decades of global expert collaboration.

One of the greatest achievements of the JDF Specification is the establishment of a common nomenclature across the graphic arts industry. Prior to JDF, each sector of the industry (e.g., sheetfed offset printing, web offset printing, and newspaper printing) used its own terminology. The JDF Specification brought standardization by creating a comprehensive data model covering all major aspects of print production. Having matured over nearly 20 years, most parts of the specification have become rock-solid. Stability is a key quality criterion when designing long-term cross-vendor or cross-company interfaces, and the JDF Data Model provides both long-term stability and extensibility.

The idea behind XJDF is to build a modern data interchange format for the graphic arts industry founded on the domain knowledge and long-term experience gained from JDF. XJDF is the next major version of JDF, designed to meet modern integration requirements where lightweight, reliable data exchange between systems is paramount. Whereas a JDF Document defines the entire production process of a print job, XJDF Documents are designed strictly as interface documents that describe only the information relevant to the two communicating parties.

This approach significantly reduces complexity while improving usability and interoperability. Under the hood, a large and complex JDF Document can be broken down into several concise, easy-to-use XJDF Documents. Removing the embedded process network logic and streamlining the XML structure yields substantial benefits in XJDF:

* Lower barrier to entry for new implementations
* A flatter learning curve for developers
* Higher interoperability between third-party systems
* Reduced implementation and maintenance costs
* Seamless compatibility with standard XML tooling (XPath, XML Schema, and code generation tools)
