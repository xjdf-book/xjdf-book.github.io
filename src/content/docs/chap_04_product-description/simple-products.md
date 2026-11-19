---
title: Simple Products
---

Most standard printing products are simple products. Technically, simple products are characterized by having one product part only. Examples include flyers, folded leaflets, posters, letter heads, etc. Even magazines may be simple products as long as they do not contain multiple product parts such as a separate cover and body. In XJDF, simple products can be specified by a single Product node in the ProductList element.

All examples in this chapter represent common configurations of standard print products. However, the specification is able to define additional details for each Product and Intent element as demonstrated in the examples. For instance, the MediaIntent is used with just a single `@MediaQuality` attribute in most examples. It should be noted that the specification also defines quite a few more attributes for the purpose of describing a printing substrate. Apart from `@MediaQuality`, there are attributes such as `@Weight`, `@Thickness`, `@MediaColor`, `@GrainDirection`, etc. In order to get a deeper understanding of XJDF and how the specification is structured, it is advisable to read it in parallel when going through the XJDF examples.

## Product: Flyers

This flyer example illustrates a typical product description of 1.000 flyers in size A6. The flyers are printed in CMYK (*Cyan*, *Magenta*, *Yellow*, *Black*) on both sides of a 135 gsm gloss paper.

```xml title="Example: product description - Flyer"
[...]
<Product Amount="1000" DescriptiveName="FLYER A6">
    <Intent Name="ColorIntent">
        <ColorIntent>
            <SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                Surface="Front"/>
            <SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                Surface="Back"/>
        </ColorIntent>
    </Intent>
    <Intent Name="LayoutIntent">
        <LayoutIntent FinishedDimensions="297.64 419.53 0.0"
            Pages="2" Sides="TwoSidedHeadToHead"/>
    </Intent>
    <Intent Name="MediaIntent">
        <MediaIntent MediaQuality="135_GLOSS"/>
    </Intent>
</Product>
[...]
```

The product descriptions begin with a product element. The number of copies (here: 1,000), as well as a short human readable description, are attributes of this Product element. All physical characteristics of the flyer are specified in the Intent subnodes.

The final size of the A6 flyer is defined in `//LayoutIntent/@FinishedDimensions`. The attribute `@FinishedDimensions` “specifies the width (X), height (Y) and depth (Z) [...], respectively, of the finished product after all finishing operations, including folding, trimming, etc. If the Z coordinate is 0, it SHALL be ignored” [@xjdf_ip1, chap. 4 Table 4.33: LayoutIntent/@FinishedDimensions]. The dimensions are encoded in dtp points.

`//LayoutIntent/@Pages` “specifies the number of finished pages (surfaces) of the product component, including blank pages. This value SHALL be an even number” [@xjdf_ip1, chap. 4 Table 4.33: LayoutIntent/@Pages].

The attribute `//LayoutIntent/@Sides` defines how the pages have to be exposed. The value “TwoSidedHeadToHead” means “imposed on the front and back sides so that the head (top) of page contents backs up to each other” [@xjdf_ip1, chap. A Table A.35: Sides (TwoSidedHeadToHead)].

The four process colors (*Cyan*, *Magenta*, *Yellow* and *Black*) are explicitly listed in `//ColorIntent/SurfaceColor/@ColorsUsed`. Although both sides of the flyer are identical they have to be defined individually for each side (front and back).

The substrate of the flyer is identified by the attribute `//MeidaIntent/@MediaQuality`. The value “135_GLOSS” is a non-standard value and has to be synchronized between the linked systems manually. In this example, “135_GLOSS” refers to the requested 135 gsm gloss paper.

## Product: Folded Leaflets

This product description exemplifies the specification of 750 6-panel Z-folded leaflets. The product is printed in CMYK on a 135 gsm matt substrate:

```xml title="Example: product description - Folded Leaflet"
[...]
<Product Amount="750" DescriptiveName="Folded Leaflet 6-Panels">
    <Intent Name="LayoutIntent">
        <LayoutIntent Dimensions="841.89 595.28"
            FinishedDimensions="280.63 595.28 0.0" Pages="2"
            Sides="TwoSidedHeadToHead"/>
    </Intent>
    <Intent Name="FoldingIntent">
        <FoldingIntent FoldCatalog="F6-2"/>
    </Intent>
    <Intent Name="ColorIntent">
        <ColorIntent>
            <SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                Surface="Front"/>
            <SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                Surface="Back"/>
        </ColorIntent>
    </Intent>
    <Intent Name="MediaIntent">
        <MediaIntent MediaQuality="135_MATT"/>
    </Intent>
</Product>
[...]
```

The definition of the folded leaflet is quite similar to the description of the A6 flyer above. The differences are in the additional attribute `//LayoutIntent/@Dimensions` and the FoldingIntent element.

Describing folded leaflets, the attribute `//LayoutIntent/@Dimensions` defines the paper-size of the open (unfolded) product, while `//LayoutIntent/@FinishedDimensions` defines the closed (folded) product.

The Z coordinate in `//LayoutIntent/@FinishedDimensions` can normally be omitted by setting it to zero. It is difficult to calculate the exact height of a folded leaflet in advance due to heavily predictable production parameters such as the pressure during folding, paper characteristics, etc.

The element FoldingIntent describes the desired fold of the final product. The XJDF Specification comes with a catalog of predefined commonly used folding schemes. The attribute `@FoldCatalog` “describes the folding scheme according to the folding catalog” [@xjdf_ip1, chap. 4 Table 4.30: FoldingIntent/@FoldingCatalog]. Further details about the folding schemes and the XJDF folding catalog can be read in chapter “Folding Schemes and Pagination”.

The element FoldingIntent can also define individual folds. Orientation details of how the individual folds or the folding schemes are to be applied can also be specified using this element. Additional details can be found in the specification.

## Product: Banner with Grommets

Banner with grommets is a typical wide format print product. The following example outlines how to specify 10 banners (200 cm x 100 cm) printed on a 500 gsm PVC substrate. The product is a one sided print in CMYK. Additionally, the banner has grommets on the upper and lower (long) edge. The distance between the edge of the banner and the grommets is 5 cm, while the center-to-center distance between the grommets measures 10 cm:

```xml title="Example: product description - Banner with Grommets"
[...]
<Product Amount="10" DescriptiveName="Banner with Grommets">
    <Intent Name="LayoutIntent">
        <LayoutIntent FinishedDimensions="5669.29 2834.65 0.0"
            Pages="2" Sides="OneSided"/>
    </Intent>
    <Intent Name="HoleMakingIntent">
        <HoleMakingIntent>
            <HolePattern Center="141.73 141.73" Extent="56.69 0.0"
                    Shape="Round" Pitch="283.46 0.0" HoleCount="19"
                    Reinforcement="Grommet"
                    CenterReference="TrailingEdge" />
            <HolePattern Center="141.73 2692.91" Extent="56.69 0.0"
                    Shape="Round" Pitch="283.46 0.0" HoleCount="19"
                    Reinforcement="Grommet"
                    CenterReference="TrailingEdge" />
        </HoleMakingIntent>
    </Intent>
    <Intent Name="ColorIntent">
        <ColorIntent>
            <SurfaceColor ColorsUsed="Cyan Magenta Yellow Black"
                Surface="Front"/>
        </ColorIntent>
    </Intent>
    <Intent Name="MediaIntent">
        <MediaIntent MediaQuality="500_PVC"/>
    </Intent>
</Product>
[...]
```

The product description of the banner with grommets closely resembles the former description as well. In contrast to the flyer, this product is a one sided print only. This is specified by the attribute `//LayoutIntent/@Sides` = “OneSided” and the fact that there is only one definition for the front side in ColorIntent. The value “OneSided” means the “page contents SHALL be imposed on the front side” [@xjdf_ip1, chap. A Table A.35: Sides (OneSided)].

Even though the product is one-sided, the attribute `//LayoutIntent/@Pages` has to be set to “2”. Recall that `//LayoutIntent/@Pages` “specifies the number of finished pages (surfaces) of the product component, including blank pages. This value SHALL be an even number” [@xjdf_ip1, chap. 4 Table 4.33: LayoutIntent/@Pages].

The element HoleMakingIntent provides the “information that identifies the type of holemaking operation, or, alternatively, an explicit list of holes” [@xjdf_ip1, chap. 4.9 "HoleMakingIntent"]. HoleMakingIntent contains one or several HolePattern elements. Each HolePattern element describes one or a set of holes in the final product. In this case, an explicit set of holes is described.

The description of a set of holes begins with the definition of the first hole. The attribute `@Center` describes the “position of the center of the hole” [@xjdf_ip1, chap. 8 Table 8.18: HolePattern/@Center]. `@Extend` specifies the “size [...] of each hole, in points. If `@Shape` is "Round", only the first entry of `@Extent` is evaluated and defines the hole diameter” [@xjdf_ip1, chap. 8 Table 8.18: HolePattern/@Extent]. The shape of the set of holes can be defined using the element `@Shape`. The attributes `@HoleCount` and `@Pitch` describe a set of holes in a line. Whereas `@HoleCount` “specifies the number of consecutive holes and spaces [...]” [@xjdf_ip1, chap. 8 Table 8.18: HolePattern/@HoleCount], the attribute `@Pitch` “represents the distance between the centers of two adjacent holes” [@xjdf_ip1, chap. 8 Table 8.18: HolePattern/@Pitch].

The grommets are reinforcements of a hole. The reinforcement can be defined in the appropriate attribute `@Reinforcement` = “Grommet”.

HoleMakingIntent is not only for explicit hole definitions of a banner as shown in this example; it was originally introduced to describe standard holes as commonly known for letterheads, etc. The XJDF Specification defines a large set of predefined standards of hole types and hole patterns. More extensive details about hole making can be found in the specification.
