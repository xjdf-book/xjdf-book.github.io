---
title: Identifiers
---

The XJDF Specification defines several types of identifiers (IDs) in order to identify resources, jobs, devices etc. This section gives a brief introduction to the most important IDs, what they are responsible for, and their appropriate scope. An identifier has to be unique within its scope. For instance, the scope “Production” means the identifier has to be unique within the whole production system. A production system may cover several sites. The following table contains the most significant XJDF IDs:



| ID Name | Description | Scope | Example |
| ------- | ----------- | ----- | ------- |
| `ExternalID` | Unique identifiers of physical resources. | Production | `COMP-34` |  
| `ID` / `IDRef` | Unique identifiers and references within a single XJDF Document | Document | `j3hduw83` |
| `Partition Key` | Unique identifier of a specific partition. | Production | `SHEET-1` |
| `JobID` | Unique identifier of a job. | Production | `JB-124` |
| `JobPartID` | Identifies one or more worksteps of the same type | Production | `Front` |
| `DeviceID` | Unique identifier of a device. | Production | `PRESS-1` |


## ExternalID
The @ExternalID is “an ID of the resource as defined in the MIS system. For instance item codes or article numbers or identifiers on semi-finished products or Resource elements. @ExternalID shall be used to uniquely identify resources and products for the purpose of inventory tracking” [@xjdf_ip1, chap. 6 Table 6.1: Resource/ExternalID].
Generally, each resource can be assigned by an item code, article number, or identifiers. An ExternalID has to be unique within a whole production system. Once defined, the resource’s ExternalID should not be changed.

```xml title="Example: ExternalID in Resources"
[...]
<xjdf:ResourceSet Name="Component" Usage="Input">
    <xjdf:Resource ExternalID="COMP_ID_UNFOLDED">
        <xjdf:Component Dimensions="841.88 595.27 0.42"
            MediaRef="MEDIA-ID"/>
    </xjdf:Resource>
</xjdf:ResourceSet>
<xjdf:ResourceSet Name="Component" Usage="Output">
    <xjdf:Resource ExternalID="COMP_ID_FOLDED">
        <xjdf:Component Dimensions="280.69 595.27 1.26"
            MediaRef="MEDIA-ID"/>
    </xjdf:Resource>
</xjdf:ResourceSet>
[...]
```

This example is an extract of the Folding Example and shows two ResourceSet elements, each containing a Component Resource. Both Resource elements describe semi-finished goods. The upper one is the description of the unfolded sheet as input resource, whereas the lower one refers to the specification of the folded sheet as the output resource of the folding process. Both resources are identified by an individual `@ExternalID` attribute. The input resource is identified by `@ExternalID = "COMP_ID_UNFOLDED”` and the output resource is identified by `@ExternalID = "COM_ID_FOLDED"`. Both identifiers identify the appropriate resources during their lifecycle. During the folding process, the lifecycle of the component `COMP_ID_UNFOLDED` ends, while the lifecycle of `COMP_ID_FOLDED` begins.
In a real-world scenario, the ExternalID may be printed out on a label and stuck on the component’s pile for identification. This enables users to easily identify the individual components in the warehouse. 


## ID / IDRef
ID / IDRef attributes are for internal document references only. The values of these attributes may change from one transaction to the next. ID / IDRefs must not be used to identify resources within the production workflow. Valid locations for IDs are the attributes `//ResourceSet/@ID` and `//Resource/@ID`. 
“Unless otherwise specified, an `@IDREF` or `@IDREFS` will refer to an individual Resource rather than an entire ResourceSet” [@xjdf_ip1, chap. 3.3 "ResourceSet"].

```xml title="Example: Internal document reference using ID / IDRef"
[...]
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

This example is also an extract of the Folding Example. The first ResourceSet contains a Component resource and the second one a Media resource. The Media resource is referenced by the Components `@MediaRef` attribute. The value of the attribute `//Component/@MediaRef` is equals to the ID value of the Media Resource (see `//ResourceSet/Resource/@ID`). This reference is used to obtain additional information about the paper of the component.

The `MEDIA-ID` is NOT the global identifier of the paper or pile in the company. The IDs value is for internal document references only and may change from one transaction to the next. A global media identifier would have to be written as the value of the @ExternalID attribute. 

## Partition Key
... to be continued...