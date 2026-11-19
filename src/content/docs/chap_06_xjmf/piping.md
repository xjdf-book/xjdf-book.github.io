---
title: Piping (Overlapping Processing)
---

Up to now, XJMF Messages and XJDF Documents have only been presented for communication purposes within a production hierarchy. The MIS sends job information to lower level controllers and devices for execution, and, when finished, the information is sent back to the MIS system. In such an architecture, all processes are executed in serial (one after another), or sometimes even in parallel (especially in prepress data preparation). However, XJMF also provides communication methods for linking devices directly to each other.

“Some processes, e.g. a long print run, take a long time to complete while constantly creating intermediate output that is already available for processing by a subsequent process prior to completion of the initial process. In overlapping processing, the controller sends an XJDF to the initial device and does not wait until the first XJDF has been processed before sending a subsequent XJDF that describes the next process step of the same job to a different device.

The subsequent device MAY begin processing as soon as the initial device has produced sufficient resources for the subsequent device. The communication between the devices SHOULD use CommandPipeControl messages” [@xjdf_ip1, chap. 9.3.5 "Overlapping Processing"].

XJMF Piping can also be used in fully automated digital production lines, such as a Book-on-Demand production system. This type of system consists of a digital press of vendor A, and a finishing unit of vendor B. Both devices have to work closely together. For instance, when the press is interrupted, the finishing unit also has to pause, and vice versa. Another case would be that of the finishing unit wasting a book. In this situation, the press requires the information to reprint the book. All of these procedures and more can be standardized by way of using XJMF Pipes.

As piping is an advanced XJMF functionality, its details and intricacies are are beyond the scope of this book but can be found in the XJDF Specification in the chapter “9.3.5 Overlapping Processing”.
