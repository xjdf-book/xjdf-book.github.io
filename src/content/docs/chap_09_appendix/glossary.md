---
title: "Appendix: Glossary"
---

| Term | Definition |
| --- | --- |
| Controller | “Controllers route XJDF information to the appropriate devices. The minimum requirement of a controller is that it can initiate processes on at least one device, or at least one other slave controller that will then initiate processes on a device” [@xjdf_ip1, chap. 2.1.4.4 "Controller"]. |
| Device | “The most basic function of a device is to execute the information specified and routed by a controller. Devices SHALL be able to execute the instructions that are specified in XJDF and [...] can perform the physical execution. [...] Devices MAY, however, support XJMF messaging in order to interact dynamically with a controller” [@xjdf_ip1, chap. 2.1.4.2 "Device"]. |
| Gray Box | Gray Box is a commonly used term in XJDF. The term has been adopted from JDF 1.x and describes something between a Black Box and a White Box. A Black Box is a device or a system where only the input and output parameters are known. In contrast, a White Box describes a device or a system in which the internals are also known. The term Gray Box describes something in between. Each system being integrated using XJDF is conceptually a Gray Box. |
| MIS | “The highest level controller in a workflow is known as a Management Information Systems or MIS. It is responsible for dictating and monitoring the execution of all of the diverse aspects of the workflow. This task is facilitated by access to production information, either in real time using XJMF messaging or post facto using the audit records within a returned XJDF.” [@xjdf_ip1, chap. 2.1.4.5 "Management Information System - MIS"]. |
| Process | “Processes [...] define individual workflow steps that are assumed to be executed by a single-purpose device. Many devices, however, are able to combine the functionality of multiple single-purpose devices and execute more than one process” [@xjdf_ip1, chap. 5.1 "Combining Individual Process Steps"]. |
