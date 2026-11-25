---
title: Major Changes in XJDF
description: Key architectural and XML structure improvements in XJDF compared to JDF 1.x, including data model simplifications, removal of the process network, and modern HTTP/ZIP transport.
---

XJDF is the successor to JDF and introduces several major architectural and structural changes. This chapter is aimed at readers with prior experience in JDF 1.x; readers new to JDF may safely skip ahead to the next chapter.

All changes in XJDF were designed with backward compatibility in mind. CIP4 provides tooling to convert JDF Documents into XJDF Documents and vice versa. This converter is part of CIP4's Java JDF Library (“JDFLibJ”) and is also integrated into the CIP4 JDFEditor. These conversion capabilities ensure that XJDF and JDF can coexist smoothly during the transition phase.

Most changes were discussed openly in the public CIP4 JIRA issue tracker (see *https://jira.cip4.org*), where background information, rationales, and trade-offs are documented in detail. Some early architectural decisions, however, were made prior to the introduction of JIRA (before July 2014) and are recorded in earlier XJDF working group meeting minutes.

## Improvements to the Data Model
To eliminate redundancy and simplify XJDF Documents, several improvements were made to the underlying data model. The primary goal was to design a structure that guarantees **exactly one** valid location for each piece of information: either the information is present at the expected location, or it does not exist in the document at all. Ambiguity in JDF 1.x documents was one of the main causes of compatibility issues between third-party systems.

A notable improvement in this area is the consolidation of the `LayoutPreparationParams` and `StrippingParams` elements into the `Layout` element. Historically, all three elements were used to describe aspects of imposition. To ensure unambiguous representation in XJDF Documents, the data from all three elements has been unified into `Layout`.

Furthermore, XJDF no longer distinguishes between physical resources and process parameters, eliminating abstract asset elements. Replacing abstract elements with explicit ones was a key design principle in XJDF, making both the specification and the resulting XML documents much easier to read and implement.

In addition, many individual elements have been streamlined. For example, the `RunList` element has been simplified by making `FileSpec` a direct child element of `RunList`:

```xml title="Example: RunList in XJDF"
<RunList NPage="6" Pages="0 ~ 5" Run="1">
    <FileSpec URL="File:///File1.pdf"/>
</RunList>
```

Finally, all deprecated elements and attributes from JDF 1.x have been removed. The major version transition from JDF to XJDF provided an ideal opportunity to clean up legacy constructs.

## Simplifications in the XML Structure
The structural changes in XJDF aim to make the format more developer-friendly, efficient, and platform-independent. Specifically, this has been achieved by aligning XJDF with standard XML conventions and tools such as XPath, XML Schema (XSD), and automated source code generators. Developers can become productive with XJDF much faster because they can rely on standard XML tooling and require less JDF-specific domain logic.

One major structural change is that `XJDF` nodes are no longer nested: every document has exactly one root `XJDF` node. This flattens the hierarchy, improves document consistency, and makes the XML significantly easier to read.

Another major change is the removal of XML hierarchy inheritance. In JDF 1.x, attribute and resource inheritance across nested nodes required custom parsing logic because standard XML tools do not support JDF-style inheritance out of the box. In particular, inheritance was heavily used for resource partitioning, which has been completely redesigned in XJDF. Partitioning is now limited to resources (which also encompass former parameters) and is represented using flat lists rather than deeply nested element hierarchies. Partitioning of product intents has been removed entirely, and the attributes formerly defined by `@PartIDKeys` have been migrated to a dedicated `Part` child element inside `Resource`. Partitioning is covered in detail in the next chapter.

All JDF data types have also been reviewed and replaced with standard XML Schema data types wherever possible. For instance, maintaining a custom “JDF String” data type offered no practical benefit, so XJDF uses the standard `xsd:string` type instead. Similarly, all JDF “Span” data types have been replaced by explicit single attribute values. The number of internal cross-references (`@ID` / `@IDRef` attributes) has also been drastically reduced. Because heavy use of `ID` / `IDRef` pointers makes XML documents hard to follow, cross-references have been restricted to a small number of well-defined elements and use cases.

The handling of foreign namespaces has been tightened as well. Custom elements are no longer permitted at arbitrary positions in an XJDF Document; instead, they are restricted to a few explicitly designated extension points.

Overall, these changes simplify the XJDF structure, maximize compatibility with standard XML tooling, and reduce the complexity of XJDF Documents, XML Schemas, and the specification itself.

## Removal of the Process Network
Because JDF 1.x was designed as a complete job ticket describing the entire production lifecycle of a print job, the process network was deeply embedded in every document. A JDF Document always defined a network of processes along with the intermediate products (components) flowing between them. This made JDF Documents complex even when expressing a single, simple process step. In addition, state and status tracking information was stored directly inside the JDF Document and had to be updated continuously. Technically, the process network was represented by `ResourceLink` elements connecting processes via their input and output resources, while status information was distributed across numerous status attributes.

Because XJDF no longer models process networks, `ResourceLink` elements have been merged directly into `Resource` and `ResourceSet` elements, and process status attributes have been removed from the job ticket. Both workflow orchestration and status tracking are now handled internally by the managing application (e.g., the MIS). At the same time, XJDF still supports combining multiple process steps within a single transaction, allowing each transaction to be addressed as an individual Gray Box.

## Removal of Implementation-Specific Details
Because JDF 1.x described an entire process network, the JDF Specification effectively dictated how an MIS had to operate internally. It assumed a central master JDF Document managed by the MIS containing all job and process details. Consequently, the specification prescribed the entire lifecycle of how a JDF Document had to be created, modified, and shared across third-party applications and devices—including rules for spawning individual JDF nodes from a master document, locking sections of the ticket, and merging spawned nodes back into the master document, as well as detailed state-machine rules for process status handling.

XJDF, by contrast, is designed purely as a data interchange format and no longer prescribes internal implementation details. XJDF Documents are generated at runtime when a transaction begins and can be discarded once the transaction completes. All information required for the transaction is encoded into the XJDF Document and sent to the target device. The target device extracts the relevant instructions and can then discard the document. Because an XJDF Document contains only the information pertinent to the receiving application or device, status and workflow network data are no longer needed.

As a result, XJDF Documents are much shorter and far less complex, and the XJDF Specification no longer dictates how XJDF-enabled systems must be architected internally.

## Technology Update
JDF was originally designed in the late 1990s. Over the following years, few changes were made to its core XML structure or transport technology stack; most work focused on expanding the print production data model rather than modernizing the underlying technology.

XJDF brings several overdue technology updates. Legacy transport mechanisms such as hotfolders—which were still mandated in JDF 1.x—are no longer part of the specification. Instead, job and message transport in XJDF is standardized around HTTP and HTTPS.

Another important update concerns the packaging format. In JDF 1.x, all artifacts belonging to a transaction were bundled using MIME packages. Today, MIME packaging is rarely used outside of email protocols, whereas ZIP has become the universal standard for archiving and compressing files across all major platforms and programming languages. Consequently, XJDF replaces MIME packaging with standard ZIP archives, and MIME packages are no longer supported.

## Extension of Scope
When JDF was conceived, cross-company web communication was still in its infancy, and direct integration with external systems such as e-commerce storefronts or cloud services was virtually nonexistent. Accordingly, JDF was designed primarily for in-house shop-floor communication. It assumed the role of an all-encompassing internal ecosystem within a print shop, which made it cumbersome to connect with external web applications or customer ERP systems.

Connecting external business systems was the original motivation behind PrintTalk. Technically, PrintTalk acts as a business transaction envelope around a JDF payload. However, because JDF 1.x did not allow simple product descriptions without embedded process logic, even a basic job submission via PrintTalk remained unnecessarily complicated. As a result, communication with external systems has largely been dominated by proprietary, non-standard formats.

In addition to making XJDF easier and more cost-effective to implement, its streamlined structure broadens the scope of the standard beyond the shop floor. Because XJDF is a pure data interchange format, it can be used seamlessly across organizational boundaries—connecting web-to-print storefronts, print broker platforms, and customer ERP systems directly to an MIS. Furthermore, XJDF provides a clean foundation for cloud and SaaS offerings in the graphic arts industry, such as “Color Management in the Cloud” or “Preflight in the Cloud” services.

## Device Capabilities
“Individual devices will never implement the entire XJDF Specification. Meaningful communication between a Controller and a Device is only possible if the Controller is aware of the limitations of the Device” [@xjdf_ip1, chap. 9.9 "Use of XML Schema for Capability Descriptions"]. JDF 1.x included its own dedicated language for describing device capabilities (defined in Chapter 11 of the JDF Specification).

For simplicity and tool compatibility, custom JDF Device Capabilities have been replaced in XJDF by standard XML Schemas (XSD). Although standard XML Schema does not express complex cross-attribute constraints, the universal availability of XSD validation tools ensures far better alignment with mainstream XML technologies. “CIP4 provides scheme for the entire XJDF Specification and reduced scheme for ICS Documents. Vendors are encouraged to provide XML Schemes that define the supported XJDF features of their Devices” [@xjdf_ip1, chap. 9.9 "Use of XML Schema for Capability Descriptions"].
