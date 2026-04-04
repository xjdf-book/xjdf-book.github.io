---
title: Major Changes in XJDF
---

XJDF is the successor of JDF and comes with some major changes. This chapter is targeted at people who have prior experience with JDF 1.x. Others are recommended to skip this chapter.

All changes in XJDF were aimed to be backwards compatible. CIP4 provides tooling for converting a JDF Document to an XJDF Document and vice versa. The converter is part of the CIP4s Java JDF Library “JDFLibJ” and is also implemented in the CIP4 JDFEditor. The conversion abilities ensure a co-existence of XJDF and JDF during the interim phase. 

Most changes have been discussed openly in the public CIP4 JIRA System (see http://jira.cip4.org). Background information, as well as advantages and disadvantages of these changes, can be read in detail there. However, some decisions regarding changes were made prior to the JIRA system (before July 2014). These changes may or may not be documented in earlier XJDF meeting minutes. 

## Improvements of the Data Model
In order to reduce redundancy and increase the simplification XJDF Documents, some improvements in the JDF data model have been made. The goal was to design a data structure which ensures exactly ONE valid location for each type of information. Either the information is at the expected location, or it doesn’t exist at all anywhere in the document. The ambiguity of JDF Documents has been one reason for compatibility issues between third party systems in the history of JDF.
A notable improvement here was the migration of the elements LayoutPreparationParams and StrippingParams to the element Layout. All three elements describe imposition. This situation has a historical context. In order to improve the uniqueness of XJDF Documents, the data from three elements have been merged into Layout only.
Further, XJDF no longer differentiates between resources and parameters. XJDF therefore rid itself of the abstract asset elements. The replacement of abstract elements by explicit ones was also a design criterion in XJDF. As a result, this makes both the specification and the XML document more readable for those implementing it.
Additionally, XJDF comes with some simplifications of diverse elements. For example, the RunList Element has been simplified by directly making FileSpec a subelement of RunList:


```xml title="Example: RunList in XJDF" showLineNumbers=true
<xjdf:RunList NPage="6" Pages="0 ~ 5" Run="1">
    <xjdf:FileSpec URL="File:///File1.pdf"/>
</xjdf:RunList>
```

Deprecated elements and attributes have also been removed. The major version change from JDF to XJDF presented a good opportunity to remove all legacy elements and attributes.

## Simplifications in the XML Structure
The structural changes in XJDF are aimed at making JDF more developer friendly, efficient, and platform independent. Specifically, this has been achieved by improving the compatibility with common XML dialects and XML tools such as XPath, XML Scheme, and common source code generators. Developers therefore become familiar with XJDF more quickly because they can use standard tooling and require less specific knowledge.

One significant change here is that XJDF nodes are no longer nested. Each document has exactly one XJDF Node. This improves the uniqueness of a document, simplifies the structure, and makes the document more readable. Another change has to do with the removal of inheritance. Inheritance in XML documents is very JDF specific and always requires custom logic in order to interpret the documents correctly. Common XML tools are not designed to deal with inheritance in XML documents out of the box. In particular, inheritance was used for partitioning, which has been revised completely in XJDF. Partitioning is now only available for resources (recall that parameters have been migrated to resources) and is based on flat lists, as opposed to being based on inherited elements. Partitioning of product intents has been removed entirely. The attributes defined by PartIDKeys have been migrated to a new Part Element in the Resource Element. Partitioning will be covered in more detail later in the book.

All JDF data types have also been revised and replaced by default XML data types whenever possible. For instance, having a custom data type “JDF String” makes no sense; instead, XJDF uses the default XML data type, xsd:string. Another simplification was to replace all “Span” data types in JDF by explicit single attribute values in XJDF. The number of cross-references (ID / IDRef Elements) in XJDF Documents have also been reduced. Because ID / IDRefs references make a document difficult to read, they have been restricted to just a very few elements and situations.

The concept of foreign namespaces has been revised as well. Custom elements are no longer allowed at any position in the XJDF Document. They have been restricted to be in only a few specific locations.

The primary goal of the changes was to simplify the XJDF structure by increasing compatibility with common XML dialects and XML tools, as well as reducing the variety and complexity of XJDF Documents, XJDF schemes, and the specification. 


## Removal of the Process Network
As JDF has been designed as an entire job ticket describing a whole production process of a print job, the process network is firmly established in such documents. A JDF Document always defines a process network and the intermediate products (components) being processed. This makes a JDF Document complex, even if just a simple process is to be expressed. Additionally, all the status information is also part of the JDF Document and has to be handled correctly. 
Technically, the process network is expressed using ResourceLink elements which link processes based on their input and output resources. Status information is held in various status attributes.

Due to the fact that XJDF no longer describes process networks, ResourceLink elements have been merged into Resource elements. The status information is also no longer a part of the specification. Both the process logic and the status information have to be handled by the managing system internally. Nevertheless, XJDF still provides mechanisms to define combined processes in transactions. Each transaction can be handled as an individual Gray Box. 


## Removal of Implementation-Specific Details
Since JDF describes a whole process network, the JDF Specification defines how an MIS system has to work internally. JDF assumes there is a central JDF Document managed by the MIS which contains all the job and process details of a print job. 
The specification therefore lays out the lifecycle of how a JDF Document is to be created, modified, and shared with third party applications and devices. There are directives of how to spawn single JDF Nodes from the master document, how to lock parts in the JDF Document, and how to merge single nodes back into the master document. Furthermore, all of the process status handling is officially defined by the JDF Specification as well.

XJDF is designed to be a pure data interchange format and, as a result, no longer contains implementation-specific details. XJDF Documents are created during application runtime when a transaction begins, and are discarded at the end of the transaction.
All information being transferred must be encoded in the XJDF Document and sent to the target device. The target device extracts all required details and can discard the XJDF Document. The XJDF Document only contains the information which is relevant for the receiving application or device. There is no longer any status or process information required in the XJDF Documents. 

As a result of this streamlined process, XJDF Documents have become much shorter and less complex. The XJDF Specification no longer defines how XJDF-enabled systems function internally. In this sense, the implementation-specific details no longer exist.


## Technology Update
JDF was designed in the late nineties. Since that time, there haven’t been any significant changes implemented in the XML structure or on the technology stack. Most discussions on JDF focussed on the description and standardization of the printing process itself. The main focus was on extending the data model, rather than updating the technology.

XJDF comes with a few technology updates. Some of the technologies and methods of JDF are dated. For instance, hotfolders are no longer mandated in XJDF, though they were the official means of submission in JDF. The submission method has been limited to use of HTTP and HTTPS in XJDF.
A further technological update pertains to the packaging mechanism. In JDF, all artifacts of a single transaction could be packaged in a MIME package. MIME packages are now used primarily for email transactions only. ZIP has become the defacto standard for packaging and compressing over the last two decades. Most systems are able to process ZIP files out of the box and provide an extensive toolset for working with ZIP packages. For this reason, the packaging method in XJDF has been changed to ZIP. MIME packages are no longer supported.


## Extension of Scope
When JDF was designed, global communication was still in a very early stage. Data interaction with external systems such as websites, etc., was essentially nonexistent. The internet community had little experience with distributed systems and the corresponding software architecture.
JDF was initially designed for in-house communication only. The data format is assumed to be the leading standard in printing houses and defines an technological ecosystem rather than a simple global communication technology. The architecture of JDF makes it almost impossible to connect to websites or other external third party applications, such as a customer ERP system.

Linking external systems was the original idea behind PrintTalk. Technically speaking, PrintTalk is just an “envelope” around the JDF Document. Due to the complex structure of JDF, it is not possible to write simple and straightforward documents without any process logic. This makes it unnecessarily complex and complicated to write just a simple job submission using PrintTalk. Currently, the communication with external systems is dominated by many individual non-standard data formats.

In addition to all the simplifications that make XJDF more user friendly and more efficient to implement, its new structure also provides the foundation for extending the scope of the data format. As XJDF is designed to be a pure data interchange format, the usage of the data format is no longer limited to in-house solutions only. The new structure allows implementers to use this standard in global communication systems as well. XJDF can be used to link websites or other external third party systems such as a customer's ERP system. Additionally, XJDF may even be used in order to provide SaaS and Cloud solutions in the graphic arts industry, such as a “Color-Management-in-the-Cloud” and/or “Preflight-in-the-Cloud” service.


## Device Capabilities
“Individual devices will never implement the entire XJDF Specification. Meaningful communication between a Controller and a Device is only possible if the Controller is aware of the limitations of the Device” [@xjdf_ip1, chap. 9.9]. JDF comes with its own concept of how to describe the capabilities of a device. Chapter 11 of the JDF Specification describes how the capabilities of a device have to be defined.

For reasons of simplicity, the JDF Capabilities have been replaced with a reference to the standard XML Scheme. Although this scheme does not support constraints, the high availability of tools that are compatible with the XML Scheme ensure much better alignment with mainstream XML technology. “CIP4 provides scheme for the entire XJDF Specification and reduced scheme for ICS Documents. Vendors are encouraged to provide XML Schemes that define the supported XJDF features of their Devices” [@xjdf_ip1, chap. 9.9].