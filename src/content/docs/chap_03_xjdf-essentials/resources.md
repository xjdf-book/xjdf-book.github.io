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

“A RunList defines one or more printable logical documents or document sets that MAY be defined in one or more external [...] files” [@xjdf_ip1, chap. 6.73 "RunList"]. A RunList is mainly used in prepress processes as well as in web-to-print scenarios, in order to reference the customer artworks or other digital data to be processed. The RunList in the example above has a FileSpec subelement which references a file using an URL.

The RunList element is a subelement of Resource and the Resource element is a subelement of ResourceSet. Even when just a single Resource element has to be specified, the whole element’s structure has to be declared. At first glance, this may appear to be over-engineered, but having a unique, stable and extensible structure is essential for the quality and long-term stability of a data format. This structure guarantees simplicity for simple use cases but can also describe complex scenarios by simply extending the XJDF elements with additional attributes. 

The attribute `//ResourceSet/@Name` is required for each ResourceSet element and “specify the name of the explicit resource that this ResourceSet represents. Child resource elements of this ResourceSet SHALL NOT contain resources that do not match `@Name`. 
The attribute `//ResourceSet/@Usage` defines the usage of the ResourceSet within the XJDF Document. Valid values are “Input” and “Output”. The value “Input” defining the ResourceSet is an input resource of the Gray Box, whereas the value “Output” specifies that the ResourceSet has to be produced as output by the Gray Box. In some cases, ResourceSets may contain Resources which are neither input nor output of processes. Resources can also be linked to resources such as the Media resource in the Folding Example above. In that case, the attribute `//ResourceSet/@Usage` doesn’t need to be written. The following is an extract of the appropriate part in the Folding Example:

```xml title="Example: Extract Folding Example - References of Resources"
[...]
<xjdf:ResourceSet Name="Component" Usage="Input">
    <xjdf:Resource ExternalID="COMP_ID_UNFOLDED">
        <xjdf:Component Dimensions="841.88 595.27 0.42" 
            MediaRef="MEDIA-ID" />
    </xjdf:Resource>
</xjdf:ResourceSet>
<xjdf:ResourceSet Name="Component" Usage="Output">
    <xjdf:Resource ExternalID="COMP_ID_FOLDED">
        <xjdf:Component Dimensions="280.69 595.27 1.26"
            MediaRef="MEDIA-ID" />
    </xjdf:Resource>
</xjdf:ResourceSet>
[...]
<xjdf:ResourceSet Name="Media">
    <xjdf:Resource ID="MEDIA-ID">
        <xjdf:Media MediaType="Paper" Thickness="150" Weight="135" 
            ISOPaperSubstrate="PS3" />
    </xjdf:Resource>
</xjdf:ResourceSet>
[...]
```

In this extract of the folding example there are three ResourceSet elements. Each ResourceSet element contains an individual Resource element. The upper two ResourceSet elements describe the input and the output components of the folding process (see attribute `//ResourceSet/@Usage`), whereas the lower one specifies details about the paper substrate (Media). The lower ResourceSet “Media” does not contain any @Usage attribute at all. Media is neither an input nor an output resource of folding directly, but it is linked by the two Component resources in order to specify details about the paper substrate. The Media can be referenced by its unique ID “MEDIA-ID”. The identifier of the Media resource is NOT an attribute of the Media element directly, but rather an attribute of the generic Resource element (see `//Resource/@ID` equals “MEDIA-ID”). Both Component resources are linking the Media via the attribute `//Component/@MediaRef` = “MEDIA-ID”.

## Partitioning of Resources
When describing a logical set of resources in a ResourceSet, XJDF provides a partitioning mechanism for the purpose of identifying the appropriate resource. Partitioning defines the context in which the individual resource element is used. The following example outlines a RunList of a customer’s artwork, separated into two files, one per side:

```xml title="Example: RunList Resource Partitioned by Side"
[...]
<xjdf:ResourceSet Name="RunList">
    <xjdf:Resource>
        <xjdf:Part Side="Front" />
        <xjdf:RunList>
            <xjdf:FileSpec URL="http://example.org/files/my-page-1.pdf"/>
        </xjdf:RunList>
    </xjdf:Resource>
    <xjdf:Resource>
        <xjdf:Part Side="Back" />
        <xjdf:RunList>
            <xjdf:FileSpec URL="http://example.org/files/my-page-2.pdf"/>
        </xjdf:RunList>
    </xjdf:Resource>
</xjdf:ResourceSet>
[...]
```

In addition to the specific resource element, there is a second subelement “Part” in the Resource element. The Part element is the key element for the partitioning of resources. “The Part elements identify the partition context of the Resource element” [@xjdf_ip1, chap. 6 Table 6.1: Resource/Part]. In the example above, the RunList resources are partitioned by `@Side`. The attribute `//Part/@Side` “denotes the side of the Sheet” [@xjdf_ip1, chap. 6 Table 6.6: Part/Side]. The upper RunList resource in the example references the file of the front page (`//Part/@Side = ”Front”`), while the lower RunList resource references the back page (`//Part/@Side = ”Back”`).
The chronology of the sub-elements in element //Resource is given by the XJDF Specification. If it exists, the Part element has to be the first element within the Resource element.

Partitioning is not a standard XML mechanism but rather a singularity of XJDF. “Part elements define the context in which the individual Resource is used. Resource partitions are uniquely identified by the Resource/Part elements” [@xjdf_ip1, chap. 6.1.5 "Part"]. Partitioning has been introduced in order to simplify the structure of resources. In XJDF, only resources can be partitioned. 
As Part is the key element for partitioning, its attributes define how resources can be partitioned. Therefore, these attributes are also known as “Partition Keys”. Further examples of partition keys include `@ProductPart`, `@Separation`, and `@PartVersion`. 
The partition key `@ProductPart` “references the `//Product/@ID` that this Part applies to” [@xjdf_ip1, chap. 6 Table 6.6: Part/ProductPart] (product intent). The key `@Separation` “identifies a color separation” [@xjdf_ip1, chap. 6 Table 6.6: Part/Separation] such as “Cyan”, “Magenta”, “Yellow”, “Black” and `@PartVersion` is a “Version identifier (e.g., the language version of a catalog)” [@xjdf_ip1, chap. 6 Table 6.6: Part/ProductVersion]. The full list of all valid partition keys can be found in the XJDF Specification in the chapter “6.1.5 Part”. 

Below is an example using the partition key `@Separation` as a means of defining the logical group of four printing plates required by a four colored printing job. Each printing plate applies to a different separation (Cyan, Magenta, Yellow, Black), but logically, they are in the same group of resources. Technically, each printing plate is expressed by an individual ExposedMedia resource, but all four resources are sub-elements of the same ResourceSet:

```xml title="Example: Extract of ResourceSets of a ConventionalPrinting XJDF"
<XJDF JobID="JOB-42" Types="ConventionalPrinting"
      xmlns="http://www.CIP4.org/JDFSchema_2_0">
   [...]
   <ResourceSet Name="ExposedMedia" Usage="Input" ProcessUsage="Plate">
       <Resource>
           <Part Separation="Cyan"/>
           <ExposedMedia MediaRef="MEDIA-PLATE-ID" PlateType="Exposed" />
       </Resource>
       <Resource>
           <Part Separation="Magenta"/>
           <ExposedMedia MediaRef="MEDIA-PLATE-ID" PlateType="Exposed" />
       </Resource>
       <Resource>
           <Part Separation="Yellow"/>
           <ExposedMedia MediaRef="MEDIA-PLATE-ID" PlateType="Exposed" />
       </Resource>
       <Resource>
           <Part Separation="Black"/>
           <ExposedMedia MediaRef="MEDIA-PLATE-ID" PlateType="Exposed" />
       </Resource>
   </ResourceSet>
   [...]
</XJDF>
```

The ResourceSet in the example above is of type “ExposedMedia” and contains the four printing plates - one per color separation. All ExposedMedia resources are partitioned by the partition key “Separation”. Each resource can therefore be assigned to its respective separation.

A Part element may also define multiple partition keys, and a Resource element may even contain multiple Part elements. “If multiple Part elements are specified within one Resource, the Resource specifies one entity that applies to both parts” [@xjdf_ip1, chap. 6.1.5 "Part"]. Here: an example with two language versions where both scenarios occur:

```xml title="Example: Multiple Part elements per Resource"
[...]
<xjdf:ResourceSet Name="ExposedMedia">
    <xjdf:Resource>
        <xjdf:Part Separation="Cyan" PartVersion="German" />
        <xjdf:Part Separation="Cyan" PartVersion="English" />
        <xjdf:ExposedMedia MediaRef="MEDIA-PLATE-ID" />
    </xjdf:Resource>
    <xjdf:Resource>
        <xjdf:Part Separation="Magenta" PartVersion="German" />
        <xjdf:Part Separation="Magenta" PartVersion="English" />
        <xjdf:ExposedMedia MediaRef="MEDIA-PLATE-ID" />
    </xjdf:Resource>
    <xjdf:Resource>
        <xjdf:Part Separation="Yellow" PartVersion="German" />
        <xjdf:Part Separation="Yellow" PartVersion="English" />
        <xjdf:ExposedMedia MediaRef="MEDIA-PLATE-ID" />
    </xjdf:Resource>
    <xjdf:Resource>
        <xjdf:Part Separation="Black" PartVersion="German" />
        <xjdf:ExposedMedia MediaRef="MEDIA-PLATE-ID" />
    </xjdf:Resource>
    <xjdf:Resource>
        <xjdf:Part Separation="Black" PartVersion="English" />
        <xjdf:ExposedMedia MediaRef="MEDIA-PLATE-ID" />
    </xjdf:Resource>
</xjdf:ResourceSet>

<xjdf:ResourceSet Name="Media">
    <xjdf:Resource ID="MEDIA-PLATE-ID">
        <xjdf:Media MediaType="Plate" />
    </xjdf:Resource>
</xjdf:ResourceSet>
[...]
```

This partitioning example describes a set of five printing plates (ExposedMedia) of a language versioned print job. The printing plates of the separations Cyan, Magenta, and Yellow are the same for both versions (“German” and “English”), while the separation Black is individual per version. Two Part elements imply that this printing plate is being used in both print runs (“German” and “English”).

This versioning method in printing assumes that all the versioning of the print product is being done in the Black separation only. The color separations (Cyan, Magenta and Yellow) are equal in both versions. The consumption of three plates, as well as the corresponding make-ready time, can therefore be saved in order to reduce the production costs.
