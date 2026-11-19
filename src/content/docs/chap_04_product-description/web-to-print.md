---
title: Web-To-Print Job Submission
---

In a real-world scenario, XJDF product descriptions are mainly used in Web-To-Print environments. A webshop or any other kind of external system normally doesn’t possess knowledge about the internal production processes of a printing house. Therefore, in a Web-To-Print scenario, the external system should only define the product details and include some additional information (resources) such as the customer details, the delivery date, and a link to the customer's artwork. Based on this information, the MIS system is able to compute or map the XJDF product description to a pre-configured production workflow. Most MIS systems would be able to do this in a fully automated state.

In a Web-To-Print scenario, the XJDF is technically embedded in a PrintTalk 2.0 document. PrintTalk can be seen as an envelope around the XJDF. “PrintTalk is an XML standard that provides a single format for Print Providers to collaboratively communicate Business Transactions and specifications of Print Product both with their Print Buyers and among themselves. Print industry professionals from a wide range of organizations contributed to the design of PrintTalk. Such organizations include eCommerce companies, print Business Management Systems, print providers, and print equipment manufactures” [@printtalk_2015, chap. 1 "Introduction"].

The communication with external systems is generally based on PrintTalk 2.0. XJDF and PrintTalk 2.0 go hand in hand. Automated status feedback to the external system are standardized with XJDF and PrintTalk 2.0 as well.

The following is a PrintTalk / XJDF example of a Web-To-Print job submission of 1,000 flyers in DIN A6 printed in four colors on a 135gsm glossy substrate. Apart from the product description, the XJDF also contains details about the customer, the delivery date, the job priority, and references to the customer’s artwork:

```xml title="Example: Web-To-Print Job Submission via PrintTalk and XJDF"
<ptk:PrintTalk xmlns:ptk="http://www.printtalk.org/schema_2_0"
    xmlns="http://www.CIP4.org/JDFSchema_2_0"
    Timestamp="2016-10-18T20:03:38Z" payloadID="5b7b63e8" >
  <ptk:Request>
    <ptk:PurchaseOrder BusinessID="CART-42">
      <XJDF JobID="JOB-42" Types="Product">
          <ProductList>
              <Product Amount="1000" DescriptiveName="FLYER">
                  <Intent Name="ColorIntent">
                      <ColorIntent>
                          <SurfaceColor
                                  ColorsUsed="Cyan Magenta Yellow Black"
                                  Surface="Front"/>
                          <SurfaceColor
                                  ColorsUsed="Cyan Magenta Yellow Black"
                                  Surface="Back"/>
                      </ColorIntent>
                  </Intent>
                  <Intent Name="LayoutIntent">
                      <LayoutIntent
                              FinishedDimensions="297.64 419.53 0.0"
                              Pages="2" Sides="TwoSidedHeadToHead"/>
                  </Intent>
                  <Intent Name="MediaIntent">
                      <MediaIntent MediaQuality="135_GLOSS"/>
                  </Intent>
              </Product>
          </ProductList>
          <ResourceSet Name="CustomerInfo">
              <Resource>
                  <CustomerInfo CustomerID="CUSTOMER-ID"/>
              </Resource>
          </ResourceSet>
          <ResourceSet Name="NodeInfo">
              <Resource>
                  <NodeInfo End="2016-10-20T16:00:00Z"
                      JobPriority="80"/>
              </Resource>
          </ResourceSet>
          <ResourceSet Name="RunList">
              <Resource>
                  <RunList>
                      <FileSpec
                          URL="http://example.org/artwork.pdf"/>
                  </RunList>
              </Resource>
          </ResourceSet>
      </XJDF>
    </ptk:PurchaseOrder>
  </ptk:Request>
</ptk:PrintTalk>
```

The PrintTalk envelop consists of the PrintTalk root element, a Request element, and a PurchaseOrder element. The PurchaseOrder element is referred to as a business object and places the embedded XJDF in the proper context of a job submission. Besides the business object PurchaseOrder, PrintTalk provides further contexts such as RFQ, OrderStatusResponse, etc., for organizing the communication between print buyers and print providers. The attribute `//PurchaseOrder/BusinessID` can be seen as a shopping cart identifier. More details on PrintTalk can be found in the PrintTalk Specification on the CIP4 website (*http://www.cip4.org*).

The embedded XJDF starts with the product description of the flyer. The description of the flyer is identical to that of the one previously explained. Furthermore, the XJDF Document contains resources. “The CustomerInfo resource contains information about the customer who ordered the job” [@xjdf_ip1, chap. 6.24 "CustomerInfo"]. In this example, only the customer’s identifier has been defined. “The NodeInfo resource contains information about planned scheduling. It allows the MIS to plan, schedule and invoice jobs or job parts” [@xjdf_ip1, chap. 6.60 "NodeInfo"]. The RunList resource references the artwork data of the flyer.

This example contains only information which is fundamental to a Web-To-Print job submission. The XJDF Specification provides the ability to define quite a few more details. The delivery address, for instance, can be written in a DeliveryParms resource. Should a very specific production detail be requested by the customer (e.g., a special screening technology), it would also be valid to include an additional resource element for the purpose of describing this detail.

## Status Feedback in a Web-To-Print environment

Job Submission is just the one direction of communication supported by PrintTalk and XJDF. The way back is also standardized by both of these data formats. Within Web-To-Print environments, PrintTalk is being used to transfer XJDF Milestones as well as other relevant information back to the calling external system. XJDF Milestones are a mechanism “to track certain overall milestones concerning the entire job across all resources and processes in order to display this to the operator” [@xjdf_ip1, chap. 7.10.3.3 "Milestone"] or in relation to a Web-To-Print environment connected to the external system which submitted the appropriate print job. PrintTalk also supports DeliveryParams in an OrderStatusResponse business object. DeliveryParams can be used to return tracking codes of the shipping provider, including other shipping information, back to the customer. In the following example, a full PrintTalk OrderStatusResponse is shown which contains the XJDF Milestone “PressCompleted” for the job “JOB-42”. The milestone “PressCompleted” defines that “all press worksteps of the job have been completed” [@xjdf_ip1, chap. A Table A.51: PressCompleted].

```xml title="Example: Web-To-Print Status Feedback via PrintTalk and XJDF"
<ptk:PrintTalk xmlns:ptk="http://www.printtalk.org/schema_2_0"
        xmlns="http://www.CIP4.org/JDFSchema_2_0"
        Timestamp="2016-10-20T22:42:38Z" payloadID="fd891889" >
    <ptk:Request>
        <ptk:OrderStatusResponse BusinessID="CART-43"
                BusinessRefID="CART-42">
            <Notification JobID="Job-42" Class="Event">
                <Milestone MilestoneType="PressCompleted" />
            </Notification>
        </ptk:OrderStatusResponse>
    </ptk:Request>
</ptk:PrintTalk>
```

Just as the PrintTalk Job Submission begins, so, too begins the status feedback with a PrintTalk and Request element. Both examples differ in the business object. In the former example, the business object was PurchaseOrder; here, it is a OrderStatusResponse. The OrderStatusResponse refers to the origin PurchaseOrder using the attribute `//OrderStatusResponse/@BusinessRefID`. The value of `//PurchaseOrder/@BusinessID` and `//OrderStatusResponse/@BusinessRefID` are identical.

The OrderStatusResponse contains the XJDF Notification element to define the milestone value. In the following table, milestones which are relevant to a WebToPrint environment are listed in chronological order:

| MilestoneType | Description |
| --- | --- |
| `DigitalArtArrived` | “Digital content has been received” [@xjdf_ip1, chap. A Table A.51: DigitalArtArrived]. This milestone is sent when all digital data has been transferred successfully to the printing house. |
| `PrePressInProgress` | “At least one of the Prepress worksteps of the job is in progress status” [@xjdf_ip1, chap. A Table A.51: PrePressInProgress]. This milestone is sent as soon as the first part of the print job is being processed in prepress. |
| `PrePressCompleted` | “All Prepress worksteps of the job have been completed. [...] In conventional prepress, this is the case when all plates have been made” [@xjdf_ip1, chap. A Table A.51: PrePressCompleted]. |
| `PressInProgress` | “At least one of the Press worksteps of the job is in progress status” [@xjdf_ip1, chap. A Table A.51: PressInProgress]. This milestone is sent as soon the first part of the print job is printed. |
| `PressCompleted` | “All Press worksteps of the job have been completed” [@xjdf_ip1, chap. A Table A.51: PressCompleted]. This milestone has been sent as soon as the last part of the print job has printed. |
| `PostPressInProgress` | “At least one of the Postpress worksteps of the job is in progress status” [@xjdf_ip1, chap. A Table A.51: PostPressInProgress]. This milestone is sent as soon the first part of the print job is being finished. |
| `PostPressCompleted` | “All Postpress worksteps including packing of the job have been completed“ [@xjdf_ip1, chap. A Table A.51: PostPressCompleted]. This milestone is sent as soon as the last part of the print job has been finished. |
| `ShippingInProgress` | “Final product is being shipped” [@xjdf_ip1, chap. A Table A.51: ShippingInProgress]. This milestone is sent as soon as the print job is committed to the shipping provider. This milestone feedback may contain an additional DeliveryParams element in order to give feedback about tracking numbers, number of packages or weight. |
| `ShippingCompleted` | “Final product was delivered to the customer or distributors” [@xjdf_ip1, chap. A Table A.51: ShippingCompleted]. This milestone is sent when shipping has been completed successfully. |

PrintTalk OrderStatusResponse messages containing an XJDF Notification and / or DeliveryParams element, providing an adequate status feedback mechanism to keep external systems up to date on their submitted print jobs.
