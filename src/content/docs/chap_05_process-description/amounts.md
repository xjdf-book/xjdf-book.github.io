---
title: Amounts
---

In a production process, the element “AmountPool is a container for the amount-related metadata of the Resource [...]. The interpretation of the amounts specified in an AmountPool depends on the context of the AmountPool” [@xjdf_ip1, chap. 6.1.1 "AmountPool"]. AmountPool elements defined within `/XJDF/ResourceSet` elements specify the planned and provided amounts of resources consumed, produced, etc., whereas AmountPool elements defined within the `/XJDF/AuditPool` element or within XJMF Messages specify the actual amounts.

Below is an extract from the Collecting example. This code snippet shows the section where the AmountPool element is written in the output component resource. In such a case, the AmountPool specifies the planned amount of output components to be produced (here: 1,050 items) as the element is seen in the context of the output component ResourceSet element:

```xml title="Example: Planned Amount Extract of the Collecting Example"
<xjdf:XJDF JobID="JOB-1234" Types="Collecting Stitching Trimming"
        xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0">
    [...]
    <xjdf:ResourceSet Name="Component" Usage="Output">
        <xjdf:Resource ExternalID="COMP-MAGAZINE">
            <xjdf:AmountPool>
                <xjdf:PartAmount Amount="1050" />
            </xjdf:AmountPool>
            <xjdf:Component Dimensions="841.88 595.27 5.26" />
        </xjdf:Resource>
    </xjdf:ResourceSet>
    [...]
</xjdf:XJDF>
```

AmountPool is an optional subelement of the Resource element. If present, it has to be written at the first position. The planned amount value is defined in the `@Amount` attribute of the PartAmount element within the AmountPool. The value specifies the “amount, excluding waste, in units defined in `ResourceSet/@Unit` or implied by” [@xjdf_ip1, chap. 6 Table 6.3: PartAmount/@Amount] default units. **Note: Units other than those defined as default units in the XJDF Specification SHOULD NOT be specified.**

In addition to the `@Amount` attribute, the PartAmount element provides further attributes such as `@Waste`, in order to specify more amount-related information. More details about these attributes can be found in the XJDF Specification.

Planned amounts are amounts intended to be consumed or produced within a Gray Box. In contrast to the planned amounts, the actual amounts represent the real resource consumption and production. Actual amounts can either be specified post facto, recorded within the AuditPool, or in real time during the production phase within XJMF Messages. Both methods - the AuditPool and the XJMF Messages - make use of the ResourceInfo element in order to specify the actual amounts. The following XJDF snippet shows post facto recorded amount details within the AuditPool. This method is valid after job completion, when the device returns the job information back to the leading system (MIS or Controller):

```xml title="Example: Actual Amount within an AuditPool element"
<xjdf:XJDF JobID="JOB-1234" Types="Collecting Stitching Trimming"
        xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0">
  [...]
  <xjdf:AuditPool>
      <xjdf:AuditResource>
          <xjdf:Header ID="I43" DeviceID="DEV_ID"
                  Time="2017-01-11T13:58:19Z" />
          <xjdf:ResourceInfo>
              <xjdf:ResourceSet Name="Component" Usage="Output">
                  <xjdf:Resource ExternalID="COMP-MAGAZINE">
                      <xjdf:AmountPool>
                          <xjdf:PartAmount Amount="1053" Waste="89" />
                      </xjdf:AmountPool>
                      <xjdf:Component Dimensions="841.88 595.27 5.26" />
                  </xjdf:Resource>
              </xjdf:ResourceSet>
          </xjdf:ResourceInfo>
      </xjdf:AuditResource>
  </xjdf:AuditPool>
  [...]
</xjdf:XJDF>
```

The AuditPool provides a specific AuditResource subelement in order to specify post facto recorded resource consumption and production. As is the case with all audit element types, the AuditResource element also requires a Header element for the metadata of the audit entry itself. The actual amount of information has to be written into the ResourceInfo element. Each AuditResource requires exactly one ResourceInfo element. A ResourceInfo element may contain a ResourceSet element which is a rough copy of the corresponding ResourceSet element located directly under the XJDF root element. Both ResourceSet elements have nearly identical structures; only a few values are different.

In the two examples above, the AuditPool example and the extract of the Collecting example, both have the identical ResourceSet element structure. Only some attributes in the subelements of Resource differ. For instance, in the AuditPool example, the `@Amount` value in PartAmount has been changed from 1,050 to 1,053. There is also an additional `@Waste` attribute. The reason this discrepancy comes about is due to the first example specifying the planned amount (1,050 items) of output components, while the second example specifies both the actual amount of output components produced, as well as those delegated to waste (1,053 and 89, respectively) recorded post facto. Here, post facto denotes the final values after job completion.

In order to track multiple resources, multiple ResourceSet elements are required. Each ResourceSet element has to be located within an individual AuditResource element.

In addition to the planned amounts and the actual amounts after job completion, XJDF also provides a mechanism for tracking the resource consumption and production live, that is, during job processing, using XJMF Messages. More about XJMF Messages is explained in the next chapter. Nevertheless, here is an example of such an XJMF Message containing actual amounts of information from a job running currently:

```xml title="Example: Actual Amount within an XJMF Message"
<xjdf:XJMF xmlns:xjdf="http://www.CIP4.org/JDFSchema_2_0">
    <xjdf:Header ID="I2" DeviceID="DEV_ID"
            Time="2017-01-11T21:15:32+02:00" />
    <xjdf:SignalResource>
        <xjdf:Header ID="I43" DeviceID="DEV_ID"
                Time="2017-01-11T21:15:32+02:00" />
        <xjdf:ResourceInfo JobID="JOB-1234" Speed="6000">
            <xjdf:ResourceSet Name="Component" Usage="Output">
                <xjdf:Resource ExternalID="COMP-MAGAZINE">
                    <xjdf:AmountPool>
                        <xjdf:PartAmount Amount="243" Waste="75" />
                    </xjdf:AmountPool>
                    <xjdf:Component Dimensions="841.88 595.27 5.26" />
                </xjdf:Resource>
            </xjdf:ResourceSet>
        </xjdf:ResourceInfo>
    </xjdf:SignalResource>
</xjdf:XJMF>
```

The SignalResource element in the XJMF Message is the equivalent of the AuditResource element in the AuditPool. Both elements require a Header element and, additionally, one or multiple ResourceInfo elements in order to define the actual amounts. Since the amount in the XJMF message represents the status of the current processing job on the executing device, the `@Amount` value is 243, while `@Waste` takes on a value of 75. Both values should increase from one message to the next.

One difference between the ResourceInfo element in an XJMF Message and the AuditPool are the additional attributes provided in the message. As an XJMF message does not define any job context in the root element, the JobID has to be written into the ResourceInfo. What’s more, there may be some additional attributes in the message which provide information about the current job being run, such as the speed at which it is completing. More about XJMF Messages in the next chapter.

Generally, the AmountPool element can be specified in each Resource element. Most resources are categorized as input and output resources (see `@Usage` equals “Input” or “Output”). Input resources are resources being consumed by a Gray Box, whereas output resources are those being produced. Amounts can be used in both types of resources at the same time. For instance, the amount of paper provided to the press in order to produce the job is defined in the input resource, while the expected amount of printed sheets (components) produced is defined in the output resource. The AuditPool, as well as the XJMF Message, allow for the tracking of the actual amounts using the appropriate ResourceSet elements as needed.
