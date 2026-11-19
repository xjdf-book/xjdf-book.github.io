---
title: Product Description
---

Product intent (or product description) is the process independent product description of the final product. Product intent describes the final product from the perspective of the customer. Each decision on the final product being done by the designer or print buyer has to be defined as product intent. For instance, product specifications such as the final page size or the print job substrate are typically representative of product intents.

Process and production specific details such as imposition scheme or the exact media size of the printed sheet are not relevant for the customer. This kind of information has to be defined as process resources in the XJDF Document. The following XML extract shows the product description of the folding example:

```xml title="Example: product description Folded Leaflet"
[...]
<xjdf:ProductList>
    <xjdf:Product Amount="2500" DescriptiveName="My Folded Leaflet">
        <xjdf:Intent Name="LayoutIntent">
            <xjdf:LayoutIntent Dimensions="841.88 595.27"
                Sides="TwoSidedHeadToHead"
                FinishedDimensions="280.69 595.27 0.0"/>
        </xjdf:Intent>
        <xjdf:Intent Name="FoldingIntent">
            <xjdf:FoldingIntent FoldCatalog="F6-2"/>
        </xjdf:Intent>
        <xjdf:Intent Name="ColorIntent">
            <xjdf:ColorIntent>
                <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                    Surface="Front"/>
                <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                    Surface="Back"/>
            </xjdf:ColorIntent>
        </xjdf:Intent>
        <xjdf:Intent Name="MediaIntent">
            <xjdf:MediaIntent MediaQuality="135_MATT"/>
        </xjdf:Intent>
    </xjdf:Product>
</xjdf:ProductList>
[...]
```

Using product intents, most common technical product descriptions can be specified in less than 20 lines of code. “Product intent provides a description of finished products from the print buyer point of view” [@xjdf_ip1, chap. 4 "Product Intent"]. **If an element or attribute of an intent element is omitted and no additional information is specified in the description, the value defaults to ‘don’t care’. If an entire intent element that specifies a given product feature is omitted, then that feature is not requested.**

Technically, each intent element (e. g. MediaIntent, LayoutIntent, etc.) is embedded in an Intent element which contains an attribute `@Name`. The value of the attribute `@Name` is the full name of the specific intent element. Common intent elements are LayoutIntent, ColorIntent, FoldingIntent and MediaIntent.

The LayoutIntent “records the size of the finished pages for the product component [...]. It also describes how the finished pages of the product component are to be imaged onto the finished media. The size definition of the finished media describes the size of a sheet that is folded to create a product, not the size of a production sheet” [@xjdf_ip1, chap. 4.11 "LayoutIntent"].

```xml title="Example: LayoutIntent"
[...]
<xjdf:Intent Name="LayoutIntent">
    <xjdf:LayoutIntent Dimensions="841.88 595.27"
        Sides="TwoSidedHeadToHead"
        FinishedDimensions="280.69 595.27 0.0"/>
</xjdf:Intent>
[...]
```

“ColorIntent specifies the color and varnishing of the product. Each surface SHALL be specified individually in a SurfaceColor element” [@xjdf_ip1, chap. 4.5 "ColorIntent"].

```xml title="Example: ColorIntent"
[...]
<xjdf:Intent Name="ColorIntent">
    <xjdf:ColorIntent>
        <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
            Surface="Front"/>
        <xjdf:SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
            Surface="Back"/>
    </xjdf:ColorIntent>
</xjdf:Intent>
[...]
```

MediaIntent “describes the media to be used for the product component. In some cases, the exact identity of the medium is known, while in other cases, the characteristics are described and a particular stock is matched to those characteristics” [@xjdf_ip1, chap. 4.12 "MediaIntent"].

In order to simplify paper matching, the attribute `@MediaQuality` has been introduced in XJDF. “Media with the same `@MediaQuality` are identical from the customer point of view. Thus, characteristics such as weight, coatings or recycling percentage are identical whereas lot or sheet dimension may vary based on production or warehousing requirements” [@xjdf_ip1, chap. 4 Table 4.34: MediaIntent/@MediaQuality].

```xml title="Example: MediaIntent"
[...]
<xjdf:Intent Name="MediaIntent">
    <xjdf:MediaIntent MediaQuality="135_MATT"/>
</xjdf:Intent>
[...]
```

Such an abstract description of printing substrates is already broadly used in Web-To-Print scenarios. Customers are able to choose a 135 gsm gloss or a 170 gsm matt paper, but they cannot choose the exact vendor or volume of the paper. This concept has been adapted to XJDF using the attribute `@MediaQuality`.

A list of all valid `@MediaQuality` values are not part of the specification. These values have to be defined and synchronized individually between all parties in a non-standard way.

The FoldingIntent “element specifies the straight line folding, creasing and perforating of a product” [@xjdf_ip1, chap. 4.8 "FoldingIntent"]. The following is an extract of the folding example which defines an F6-2 fold:

```xml title="Example: FoldingIntent for Folding"
[...]
<xjdf:Intent Name="FoldingIntent">
    <xjdf:FoldingIntent FoldCatalog="F6-2"/>
</xjdf:Intent>
[...]
```

As specified, FoldingIntent can also being used for describing a perforation or creasing line. FoldingIntent specifies everything that can be done by a simple folding machine. Making a straight line crease or a perforation is supported by mounting a crease or perforation wheel immediately after the folding unit. For this reason, creasing and perforation are also part of FoldingIntent. Below is an example for a perforation line:

```xml title="Example: FoldingIntent for Perforating"
[...]
<xjdf:Intent Name="FoldingIntent">
    <xjdf:FoldingIntent>
        <xjdf:Perforate StartPosition="0.0 23.43"
                WorkingPath="0.0 565.68"/>
    </xjdf:FoldingIntent>
</xjdf:Intent>
[...]
```

The subelement Perforate specifies that the product has to be perforated. The attribute `@StartPosition` defines the start position, while `@WorkingPath` defines the end point relative to the start position. Since perforation lines provided by a folding machine can only be made parallel to a reference edge and only through the whole product, either the X or the Y value of the attributes `@WorkingPath` and `@StartPosition` must to be zero. There is no way to make a perforation line, for instance, only on the first half of the product. Complex perforation and creasing lines have to be specified as ShapeCuttingIntent. “ShapeCuttingIntent describes finishing of products with irregular shapes, including diecutting and adding windows to envelopes” [@xjdf_ip1, chap. 4.14 "ShapeCuttingIntent"].

All in all, the role of product intents has become significant in XJDF. In particular, when using XJDF as a pure interface technology, product intents place each XJDF Document in the proper context. Using product intents, the receiving devices do not only get a list of pre-settings and configuration details, but also additional information about the context of the current job. It is a good practice to provide the full product description of the final product in each XJDF Document.

Product intents enable XJDF to also be used in web-to-print environments and cross company communications. Product intents are designed for the automated purchasing of print jobs and for standardized links of webshops to MIS systems.
