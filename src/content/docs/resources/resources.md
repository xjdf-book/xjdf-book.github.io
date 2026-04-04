---
title: Resources
---

“Resource elements are child elements of a ResourceSet and describe the physical or logical entity in the partition context [...]. For instance a ResourceSet/@Name="ExposedMedia" can specify a set of printing plates and each child Resource element will describe an individual plate” [@xjdf_ip1, chap. 6.1 "Resource"]. Resources are usually associated with a specific process, but they can also be associated with Products. Each Resource element is part of a specific ResourceSet. A “ResourceSet describes a set of one or more Resource elements that are logically grouped together” [@xjdf_ip1, chap. 3.3 "ResourceSet"]. 
The following example shows a simple RunList resource as an illustration of the fundamental XML structure of resources:

```xml title="Example: RunList Resource"
[...]
<xjdf:ResourceSet Name="RunList" Usage="Input" >
    <xjdf:Resource>
        <xjdf:RunList>
            <xjdf:FileSpec URL="http://example.org/artwork/my.pdf"/>
        </xjdf:RunList>
    </xjdf:Resource>
</xjdf:ResourceSet>
[...]
```

...to be continued...