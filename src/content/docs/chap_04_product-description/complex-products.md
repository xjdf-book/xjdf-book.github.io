---
title: Complex Products
---

Simplicity was one of the major design criteria for XJDF. The goal was to find an XML structure which would allow simple products to be described in a simple manner, but the same structure must also be able to describe complex products by simply extending it with further elements and attributes. The concept of Product elements for describing products and product parts and Intent elements for the characterization of the appropriate product parts ensures that this requirement is satisfied.

This is a fundamental advantage of XJDF in contrast to many non-standard data structures. The XJDF structure ensures stability, and - at the same time - guarantees long-term extensibility of system interfaces. XJDF maintain interface stability even when the product descriptions become increasingly more complex over time.

Complex products are those consisting of at least two product parts, such as a magazine with an additional cover. Complex magazines typically differ at least in the paper quality of cover and body. Additionally, the cover may also have some additional finishings, such as UV-Coating, etc.

Another example of a complex product is notepads. A notepad is built from a pre-determined number of identical sheets glued together on a side specified by the user. In some situations, a notepad may also have a backboard.

Both products are different, but can be specified in the same way. They consist of a root product containing a BindingIntent element and one or more child products. Each child product characterizes a single product part of the final product, for instance the cover or body of a magazine. The child products are referenced by the BindingIntent element of the root product.

Currently, there are only three kinds of intent types in the specification which allow the referencing of child products: AssemblingIntent, BindingIntent, and VariableIntent. AssemblingIntent “specifies the creation of a composite component by providing page location, position and attachment method of the respective child products that shall be assembled with the parent product” [@xjdf_ip1, chap. 4.3 "AssemblingIntent"]. BindingIntent “specifies the binding intent for an XJDF job using information that identifies the desired type of binding and which sides SHALL be bound” [@xjdf_ip1, chap. 4.4 "BindingIntent"]. VariableIntent “specifies the variations of the content for printed data with variable content such as lottery tickets or direct mail” [@xjdf_ip1, chap. 4.15 "VariableIntent"].

All three intent types reference their corresponding child products using the attribute `@ChildRefs`. The value of this attribute is a list of product IDs. The order of the IDs in such lists is crucial. Below is the BindingIntent extract of the previous Collecting example:

```xml title="Example: BindingIntent with ChildRefs"
<xjdf:Intent Name="BindingIntent">
    <xjdf:BindingIntent BindingOrder="Collecting" BindingSide="Left"
        BindingType="SaddleStitch" ChildRefs="COVER_ID BODY_ID"/>
</xjdf:Intent>
```

This BindingIntent element contains three attributes for the specification of the binding characterization. The last attribute `@ChildRefs` refers to the two product parts (child products) by their corresponding IDs “COVER_ID” and “BODY_ID”. When using `@BindingOrder` = “Collecting”, the first ID in the list is the outer product part (here: COVER_ID).

All simple products, root products, and product parts are sub-elements of one and the same ProductList element. From a hierarchical perspective, there is no difference between the individual product elements. This structure simplifies the read and write operations of applications dealing with product descriptions.

Once multiple subelements are in ProductList, the attribute `//Product/@IsRoot` indicates the type of the appropriate Product element. “If true, this Product is a self-contained product. If false, this Product is a child product of another Product, such as a cover or insert” [@xjdf_ip1, chap. 4 Table 4.1: Product/@IsRoot].

Root product and child products may both define an attribute `@Amount`. The attribute `@Amount` in the root product specifies the number of required copies of the final product, whereas the amount in a child product defines the number of units needed in order to produce one final product. For example, when specifying 100 notepads at 25 pages each, the root product attribute `@Amount` is 100, while the child products `@Amount` attribute is 25. The total number of child products needed in order to produce the 100 notepads is 2,500 (100 notepads x 25 pages).

The attribute `@Amount` is optional. If the attribute `@Amount` is not specified in a child product, it defaults to a value of 1.

## Product: Magazine with Cover

The following example illustrates the product description of 1,000 saddle stitched magazines with twenty-four pages in DIN A4, including an premium cover. The cover consists of 4 pages and is printed in CMYK on a 135 gsm matt paper with an UV Gloss Varnishing on the outside. The body consists of 20 pages and is printed single colored black on an 80 gsm matt paper. The binding is on the left:

```xml title="Example: product description of a Magazine with Cover"
[...]
<xjdf:ProductList>
    <xjdf:Product Amount="1000" DescriptiveName="My Magazine A4"
            IsRoot="true">
        <xjdf:Intent Name="BindingIntent">
            <xjdf:BindingIntent BindingOrder="Collecting"
                BindingSide="Left" BindingType="SaddleStitch"
                ChildRefs="COVER-ID BODY-ID"/>
        </xjdf:Intent>
    </xjdf:Product>
    <xjdf:Product ID="COVER-ID" IsRoot="false">
        <xjdf:Intent Name="ColorIntent">
            <xjdf:ColorIntent>
                <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                    Coatings="GlossUV" Surface="Front"/>
                <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                    Surface="Back"/>
            </xjdf:ColorIntent>
        </xjdf:Intent>
        <xjdf:Intent Name="LayoutIntent">
            <xjdf:LayoutIntent Sides="TwoSidedHeadToHead" Pages="4"
                FinishedDimensions="841.88 595.27 0.0"/>
        </xjdf:Intent>
        <xjdf:Intent Name="MediaIntent">
            <xjdf:MediaIntent MediaQuality="135_MATT"/>
        </xjdf:Intent>
    </xjdf:Product>
    <xjdf:Product ID="BODY-ID" IsRoot="false">
        <xjdf:Intent Name="ColorIntent">
            <xjdf:ColorIntent>
                <xjdf:SurfaceColor ColorsUsed="Black" Surface="Front"/>
                <xjdf:SurfaceColor ColorsUsed="Black" Surface="Back"/>
            </xjdf:ColorIntent>
        </xjdf:Intent>
        <xjdf:Intent Name="LayoutIntent">
            <xjdf:LayoutIntent Sides="TwoSidedHeadToHead" Pages="20"
                FinishedDimensions="841.88 595.27 0.0"/>
        </xjdf:Intent>
        <xjdf:Intent Name="MediaIntent">
            <xjdf:MediaIntent MediaQuality="80_MATT"/>
        </xjdf:Intent>
    </xjdf:Product>
</xjdf:ProductList>
[...]
```

The product description of the magazine consists of three Product elements, namely the root product and two child products (product parts). One product part specifies the cover, while the other one refers to the body of the magazine. The root product can be identified by the attribute `@IsRoot` = “true”, while the two child products take on the value “false”.

The root product contains only a BindingIntent element which refers to the appropriate product parts by its ID in the attribute `//BindingIntent/@ChildRef`. As the cover is on the outside, its ID is mentioned first.

Each product part defines a ColorIntent, LayoutIntent, and MediaIntent. Most definitions have already been explained in previous examples. The UV Coating on the outside of the cover is defined by the attribute `//ColorIntent/SurfaceColor/@Coatings`. Coatings are “materials usually applied to a full surface on press as a protective or gloss-enhancing layer over ink” [@xjdf_ip1, chap. 4 Table 4.24: SurfaceColor/@Coatings]. The coating is only specified for the front page.

As cited in the beginning of this chapter, if an element or attribute of an intent element is omitted and no additional information is specified in the description, the value defaults to ‘don’t care’. This means that the decision of providing UV coating of the inner page of the cover is left up to the print provider. In case the customer explicitly states a desire for no coating of the inner pages, this has to be specified by writing the attribute `@Coatings` = “None” for the back page. In most situations, the print provider would decide not to provide a coating if not requested, but - particularly in the case of ganging (consolidation of multiple customer jobs) - it could prove to be more cost efficient to provide an additional coating for some jobs.

This is also valid for the body description in this example. UV coating is not specified there. This also means that the customer isn’t concerned with coating. In order to explicitly define a preference of no coating, the attribute `@Coating` = “None” would have to be specified.

In practice, providing a coating, although it is not requested by the customer, is routine. There are some protective coatings which improve the stability and the time of the production process. Such a protective coating is almost transparent and cannot be recognized by the customer without expert skills. Such protective coatings make a print product more resistant to scratches, etc.

## Product: Notepad

The notepad example exemplifies how to work with amounts in child products. The example below describes 500 notepads consisting of 25 sheets each. Each sheet is printed in CMYK on the front side and single colored black on the back side. The paper quality is 80 gsm offset paper, and the gluing edge is located on the top.

```xml title="Example: product description of a Notepad"
[...]
<xjdf:ProductList>
    <xjdf:Product Amount="500" DescriptiveName="Notepad A4"
            IsRoot="true">
        <xjdf:Intent Name="BindingIntent">
            <xjdf:BindingIntent BindingOrder="Gathering"
                BindingSide="Top" BindingType="EdgeGluing"
                ChildRefs="SHEET_ID" />
        </xjdf:Intent>
    </xjdf:Product>
    <xjdf:Product Amount="25" ID="SHEET_ID" IsRoot="false">
        <xjdf:Intent Name="LayoutIntent">
            <xjdf:LayoutIntent FinishedDimensions="595.28 841.89 0.0"
                Pages="2" Sides="TwoSidedHeadToHead"/>
        </xjdf:Intent>
        <xjdf:Intent Name="ColorIntent">
            <xjdf:ColorIntent>
                <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                    Surface="Front"/>
                <xjdf:SurfaceColor ColorsUsed="Black" Surface="Back"/>
            </xjdf:ColorIntent>
        </xjdf:Intent>
        <xjdf:Intent Name="MediaIntent">
            <xjdf:MediaIntent MediaQuality="80_OFFSET"/>
        </xjdf:Intent>
    </xjdf:Product>
</xjdf:ProductList>
[...]
```

The complex product “Notepad” consists of two Product elements: a root product and a child product. The root product defines the total amount of notepads needed, as well as the binding details. The child product specifies a single sheet in the notepad. The attribute `@Amount` in the child product defines how many items of the child product are needed in order to produce one final product (root product). In this example, the customer has requested 500 notepads containing 25 sheets each. Therefore, the `@Amount` of the root product is 500, and the `@Amount` of the child product is 25. The total number of sheets to be printed in order to complete the entire customer job is 12,500 (500 notepads with 25 sheets each).

Furthermore, as the single sheets are placed on top of one another, the value of the attribute `@BindingOrder` in BindingIntent element is “Gathering”. The attributes `@BindingType` = “EdgeGluing” and `@BindingSide` = “Top”. The definition of the value “EdgeGluing” is “gluing gathered sheets at one edge of the pile [...]. Products of this type are also referred to as padded” [@xjdf_ip1, chap. 4 Table 4.10: BindingType]. Other valid values for `@BindingType` are, for instance, “Ring”, “WireComb”, “SoftCover”, “HardCover”, etc. Additional details on binding types can be found in the specification.

The BindingIntent element is just another example of the extensibility and stability of XJDF. When using XJDF as a data model, notepads are supported even though they were not considered when the interface was originally being designed. For instance, when launching a simple webshop for flyers which is connected to a production system using XJDF, the interface remains stable, even in the case of rapid product portfolio growth and branching out.
