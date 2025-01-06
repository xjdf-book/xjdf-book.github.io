# Essentials
The Exchange Job Definition Format (XJDF) is designed to be a pure data interchange format. XJDF Documents are generated during application runtime to communicate with applications and devices. Each XJDF Document contains dedicated information optimized exclusively for the recipient. 

Technically, XJDF specifies two views on print that are related but not identical - the product view and the process view. The product view is the process of independent product description and describes the final product from the perspective of the print buyer. "The customer or product designer will typically describe the desired final product without knowledge of the manufacturing process." The product description includes, for instance, the size of the desired product, its paper quality, and the folding details if required. The product description is unconcerned with production details, such as the production size of the sheet on which the product is later printed or how the product is positioned on that sheet. All process-specific information is defined in the process view of the XJDF Document. The process view might describe in a very accurate way how each step in the production workflow process has to be accomplished, on which device, and at what time. The following figure illustrates both perspectives specified in an XJDF Document:

