---
title: CombinedProcessIndex
---

The definition of Gray Boxes is a fundamental concept of XJDF - one that even allows for define a process twice in a Gray Box such as “Cutting Folding Cutting”.

“Cutting Folding Cutting” means a Component is being cut just before and right after the Folding process within a single process sequence. Such a sequence can be specified as usual by writing the process names into the `@Types` attribute as below:

```xml title="Example: Gray Box 'Cutting Folding Cutting'"
<xjdf:XJDF JobID="JOB-1234" Types="Cutting Folding Cutting"
        xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0">
    [...]
</xjdf:XJDF>
```

Even the Cutting process appears twice in the `@Types` list of process names - this is also a valid usage of processes. Each process listed in `@Types` may have one or multiple input resources. As mentioned above, resources are normally assigned to processes by their names (`@Name`) and their usages (`@Usage`). The attribute `@ProcessUsage` is defined in the specification in case the combination of the attributes `@Name` and `@Usage` is not unique for a single process.

When using a process twice in a Gray Box, the combination of the three attributes `@Name`, `@Usage`, and `@ProcessUsage` becomes ambiguous. Therefore, the XJDF Specification provides the attribute `@CombinedProcessIndex` as a way to solve this ambiguity issue:

```xml title="Example: Gray Box 'Cutting Folding Cutting'"
<xjdf:XJDF JobID="JOB-1234" Types="Cutting Folding Cutting"
        xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0">
    [...]
    <xjdf:ResourceSet Name="CuttingParams" Usage="Input"
            CombinedProcessIndex="0">
        <xjdf:Resource>
            <xjdf:CuttingParams>
                [...]
            </xjdf:CuttingParams>
        </xjdf:Resource>
    </xjdf:ResourceSet>
    <xjdf:ResourceSet Name="CuttingParams" Usage="Input"
            CombinedProcessIndex="2">
        <xjdf:Resource>
            <xjdf:CuttingParams>
                [...]
            </xjdf:CuttingParams>
        </xjdf:Resource>
    </xjdf:ResourceSet>
    <xjdf:ResourceSet Name="FoldingParams" Usage="Input">
        <xjdf:Resource>
            <xjdf:FoldingParams FoldCatalog="F16-7"/>
        </xjdf:Resource>
    </xjdf:ResourceSet>
    [...]
</xjdf:XJDF>
```

The attribute “`@CombinedProcessIndex` specifies the zero based indices of individual processes within the complete list of `XJDF/@Types` which this ResourceSet SHALL apply to. Multiple entries in `@CombinedProcessIndex` specify that the ResourceSet is used by the respective multiple processes. `@CombinedProcessIndex` SHALL be specified if multiple ResourceSet items with the same `@Name`, `@ProcessUsage`, and `@Usage` are specified in one XJDF. If `@CombinedProcessIndex` is not specified, the ResourceSet applies to all processes that match the `@Name`, `@ProcessUsage` and `@Usage` requirements” [@xjdf_ip1, chap. 3 Table 3.4: ResourceSet/@CombinedProcessIndex].

In XJDF, all indices start from zero. “Thus, the first index is 0, the second index is 1, etc. Note that this restriction applies to the XJDF representation only. Display of values, for instance in a user interface, is implementation defined” [@xjdf_ip1, chap. 1.9.2 "Counting in XJDF"]. The Gray Box example above contains three processes - Cutting, Folding, and then Cutting once more. The first process in the row (Cutting) has the index value “0”; the second one (Folding) takes a value “1”, while the last one (Cutting) assumes the value “2”. Since the FoldingParams resource exists only once in the XJDF Document, there is no need to write the `@CombinedProcessIndex` attribute in this resource.

This ambiguity issue may not only appear in the case of a process being defined twice in a single GrayBox. There could also be scenarios in which several processes are using the identical resource types as input or output, such as RunList or Component. Because of the absence of intermediate products in a Gray Box, this issue should normally not appear. However, if there are still special cases, these can also be resolved by using the `@CombinedProcessIndex` attribute in a ResourceSet element.
