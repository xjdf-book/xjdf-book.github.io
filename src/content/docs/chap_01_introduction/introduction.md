---
title: Introduction
description: An Introduction.
---

“CIP4 was formed in September of 2000. Its predecessor, CIP3, was formed by Heidelberg in 1995 and was managed by the Fraunhofer Institute for Computer Graphics. CIP3 created the Print Production Format (PPF), which has found some success in ink key presetting and postpress operations” [@cip4_2016]. JDF is the successor of PPF and was initially published in 2001. The first version of JDF served as a “straw man” document and was intended for further discussion.

“JDF 1.1 and 1.1a were published in April and October of 2002, resulting in the first versions of JDF that could be implemented by vendors. At Drupa 2004, the first wave of JDF-enabled products hit the market. Since then, JDF has been updated several times. In each of these updates, the basic structure of JDF has been preserved and the specification expanded to include broader aspects of print production. Initially optimized for sheetfed offset printing, JDF has been expanded to include digital printing, preflighting, web offset printing, packaging, layout applications, newsprint, and more” [@cip4_2016].

“JDF is designed as a digital representation of the entire job ticket. The assumption [...] was that JDF would be passed entirely from one device to another. Therefore, all aspects of and relationships between processes in a single job in the graphic arts need to be encoded into a single JDF file. This design has one major drawback: the JDF file contains data that may be irrelevant to the recipient. For instance, a RIP might receive JDF instructions that contain all necessary data for RIPping, but additionally, a set of printing instructions dedicated to a printing press and further postpress instructions for finishing devices as well” [@prosi_2015]. This makes reading a JDF file complex and error-prone. As a result, JDF has not been used in the way its inventors intended. 

Nowadays, most applications and devices are based on their own data format and use JDF as an interface technology. However, due to the fact that JDF is designed as a digital representation of the entire job ticket, these interface documents are extremely complex. A lot of information has to be encoded and transferred only for reasons of integrity. This leads to expensive implementations and compatibility issues.

Nevertheless, the JDF Specification is one of the best documents in the graphic arts industry. There is no other document which describes printing in such a detailed, structured and comprehensive manner as the JDF Specification does. The JDF Specification is the result of more than 20 years of expert discussion around the globe. 
One great achievement of the JDF Specification is the creation of a common nomenclature in the graphic arts industry. Prior to JDF, each sector of the industry (e.g. sheet-fed offset printing, web offset printing, newspaper printing) had its own nomenclature. The JDF Specification brought about standardization by way of creating a comprehensive data model that took into consideration many aspects of the graphic arts industry. As the data model has been in existence for nearly 20 years now, most parts of the specification have become very stable. Stability is a major quality criterion in the designing of long-term cross-vendor or cross-company interfaces. The JDF Data Model ensures long-term stability and extensibility at the same time. 

The idea behind XJDF is to build a new data interchange format for the graphic arts industry based on the knowledge and the long-term learning experience with JDF. XJDF is the next major version of JDF and is designed to fit the modern world requirements where data exchange between systems becomes increasingly more important. Whereas a JDF Document defines the entire production process of a print job, XJDF Documents are designed as interface documents and describe only the relevant aspects needed between two parties.
This reduces complexity, while increasing usability and compatibility of XJDF. Under the hood, a large and complex JDF Document can be broken down into several small and easy to use XJDF Documents. The removal of the process logic and structural changes leads to substantial enhancements in XJDF:

* Reduction of the barrier of entry to XJDF
* Improving the learning curve with XJDF
* Increase in compatibility between systems
* Savings on the cost of implementation
* Adaption to commonly used XML Tools (XPath, XSD, Code Generation tools)

