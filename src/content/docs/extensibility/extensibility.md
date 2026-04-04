---
title: Extensibility
---

The XJDF Specification allows several methods for extending the data format. However, the extensions must not duplicate the functionality which is defined in XJDF. As XJDF is a holistic approach in the graphic arts industry, it is strongly recommended to use the standard elements and attributes as much as possible instead of introducing new private extensions. The XJDF Specification has grown based on extensive expert discussions across different system vendors, consultants and users for quite some time. The outcome of these discussions is this structure as described in the specification. The structure ensures long-term stability and extensibility simultaneously. In some cases, the introduction of new custom extension may appear as a shortcut or even as a simplification. However, private tags may harm the long-term stability and extensibility of an XJDF Interface. 

**When missing functionality, the preferred way is to start a new discussion in the CIP4s issue tracking system (JIRA) (see chapter “Spec Authoring Process”). The result of the discussion is either a solution of how to resolve the request using the current standard methods, or an extension or modification of the specification for the next version of XJDF. Within the interim period, private namespaces can be used.**

“Attributes in a foreign namespace MAY be added to any XJDF element. Elements in a foreign namespace SHALL NOT be specified in XJDF elements other than Notification, Resource and Intent elements” [@xjdf_ip1, chap. 3.5.1 "Foreign Namespaces"]. Therefore, XJDF provides the following methods for extending the data format:

* Custom intents and resources
* Custom processes
* Custom values in NMTOKEN lists.
* Custom notifications

When working with private namespaces it is recommended to have only one namespace URI and only one standardized prefix per company. Once introduced, neither the namespace URI nor the prefix should be changed. “Elements in a foreign namespace SHALL be specified after any elements in the XJDF namespace” [@xjdf_ip1, chap. 3.5.1 "Foreign Namespaces"].

## Custom Intents and Resources
XJDF provides the ability to extend the data format by new private intents and resources. The following example illustrates how to add a custom resource:

```xml title="Example: Custom Resources"
<xjdf:XJDF Types="ProcessName" JobID="5" 
        xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0"
        xmlns:foo="http://example.org/foo">
    [...]
    <xjdf:ResourceSet Name="foo:bar">
        <xjdf:Resource>
            <foo:bar attribute="myAttributeValue" />
        </xjdf:Resource>
    </xjdf:ResourceSet>
    [...]
</xjdf:XJDF>
```

In the first step, a new foreign namespace has been introduced in the XJDF root node. In this case, this namespace URI is *"http://example.org/foo”* and is prefixed by “foo”. The new custom specific resource element is a subelement of Resource. The full name of the element (including the prefix) is the value of the @Name attribute in ResourceSet.

The introduction of a new custom intent element is quite similar to the introduction of a custom resource. The following is an example as an illustration:

```xml title="Example: Custom Intents"
<xjdf:XJDF Types="ProcessName" JobID="5" 
        xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0"
        xmlns:foo="http://example.org/foo">
    [...]
    <xjdf:ProductList>
        <xjdf:Product>
            <xjdf:Intent Name="foo:bar">
                <foo:bar attribute="myAttributeValue" />
            </xjdf:Intent>
        </xjdf:Product>
    </xjdf:ProductList>
    [...]
</xjdf:XJDF>
```

## Custom Processes
Processes can also be extended in XJDF. “XJDF defines a basic set of process types. However, because XJDF allows flexible encoding, this list, by definition, will not be complete. Vendors that have specific processes that do not fit in the general XJDF processes and that are not combinations of individual XJDF processes [...] can create process XJDF of their own type” [@xjdf_ip1, chap. 3.5.5 "Extending Process Types"].

The company's standardized namespace URI and prefix should be written in the XJDF root element. In order to introduce the new process, the process’s name, including the company’s prefix, has to be written in the @Types attribute. Both values have to be separated by a colon (“:”). 


## Custom Values in NMTOKEN lists.
“Many Resources contain attributes of type NMTOKEN and some of these have a set of predefined, suggested enumerative values. These lists MAY be extended with private keywords” [@xjdf_ip1, chap. 3.5.4 "Extending NMTOKEN Lists"].

```xml title="Example: Custom NMTOKEN Values"
<xjdf:XJDF Types="ProcessName" JobID="5"
    xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0" >
    [...]
    <xjdf:ProductList>
        <xjdf:Product Amount="250">
            <xjdf:Intent Name="ColorIntent">
                <xjdf:FoldingIntent FoldCatalog="F6-MY-FOLD" />
            </xjdf:Intent>
            [...]
        </xjdf:Product>
    </xjdf:ProductList>
    [...]
</xjdf:XJDF>
```

As `@FoldCatalog` attributes are of type NMTOKEN, they can be extended by new values. This example shows the introduction of a new custom fold scheme “F6-MY-FOLD”. When extending NMTOKEN lists by custom values, no custom namespace declaration is required. 


## Custom Notifications
Notifications are another element which can be extended by custom subelements. More details about custom notifications can be found in the specification.