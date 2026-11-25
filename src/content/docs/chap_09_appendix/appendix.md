---
title: Appendix
description: List of abbreviations, acronyms, and glossary of core XJDF and XJMF terminology.
---

## List of Abbreviations

| Acronym | Definition |
| --- | --- |
| CMYK | Cyan, Magenta, Yellow, and Key (Black) four-color process color space |
| DTP | Desktop Publishing Point (1/72 of an inch) |
| ICS | Interoperability Conformance Specification |
| JDF | Job Definition Format (version 1.x) |
| JMF | Job Messaging Format (version 1.x) |
| MIS | Management Information System |
| PTK | PrintTalk |
| RIP | Raster Image Processor |
| TSC | Technical Steering Committee (CIP4 architectural review board) |
| XJDF | Exchange Job Definition Format (JDF version 2.x) |
| XJMF | Exchange Job Messaging Format (JMF version 2.x) |

## Glossary

| Term | Definition |
| --- | --- |
| Controller | “Controllers route XJDF information to the appropriate devices. The minimum requirement of a controller is that it can initiate processes on at least one device, or at least one other slave controller that will then initiate processes on a device” [@xjdf_ip1, chap. 2.1.4.4 "Controller"]. |
| Device | “The most basic function of a device is to execute the information specified and routed by a controller. Devices SHALL be able to execute the instructions that are specified in XJDF and [...] can perform the physical execution. [...] Devices MAY, however, support XJMF messaging in order to interact dynamically with a controller” [@xjdf_ip1, chap. 2.1.4.2 "Device"]. |
| Gray Box | A core abstraction in XJDF (carried over from JDF 1.x) sitting between a Black Box (where only external inputs and outputs are visible) and a White Box (where all internal operations are exposed). Every system or device integrated via XJDF is modeled conceptually as a Gray Box. |
| MIS | “The highest level controller in a workflow is known as a Management Information Systems or MIS. It is responsible for dictating and monitoring the execution of all of the diverse aspects of the workflow. This task is facilitated by access to production information, either in real time using XJMF messaging or post facto using the audit records within a returned XJDF.” [@xjdf_ip1, chap. 2.1.4.5 "Management Information System - MIS"]. |
| Process | “Processes [...] define individual workflow steps that are assumed to be executed by a single-purpose device. Many devices, however, are able to combine the functionality of multiple single-purpose devices and execute more than one process” [@xjdf_ip1, chap. 5.1 "Combining Individual Process Steps"]. |
