import React from "react"
import { StyledTabs } from "@/components/StyledTabs"
import { ProjectEstimateTab } from "@/components/ProjectEstimateTab"

export function ProjectEstimationSection() {
  const tabs = [
    {
      value: "xs",
      label: "Extra Small",
      content: (
        <ProjectEstimateTab
          title={"Unsupervised Cell Segmentation in 3D Data"}
          description={
            "A 3D visualization pipeline and application that researchers use to identify, label, and count cells in mouse brain scans."
          }
          group={"Department of Neuroscience"}
          pi={"Alexander Jaworski"}
          goal={
            "CCV was responsible for developing a Python-based application that integrated pre-trained deep learning models to analyze 3D image data for automated cell segmentation and structured result generation. The project included implementing a complete processing pipeline, integrating the application as a plugin within Napari, and deploying the final solution on the lab's PC for routine use."
          }
          image={"/images/projects/cell-seg-3d.webp"}
          attribution={"Images by Hanna Hameedy"}
          alt={
            "Display of initial brain scan, adjusting hyper parameters, finding binary map of the region of interest, and finally finding labels located in the region of interest"
          }
        />
      ),
    },
    {
      value: "sm",
      label: "Small",
      content: (
        <ProjectEstimateTab
          title={
            "Assessing Ethylene Glycol Monomethyl Ether (EGME) impact on sperm small RNAs in Rattus norvegicus"
          }
          description={
            "A bioinformatics pipeline and analysis of small RNAs including miRNA, piRNA, tRNAs for assessing the impact of the EGME toxin on sperm small RNA in rats with implications for reproductive health."
          }
          group={"Department of Pathology and Laboratory Medicine"}
          pi={"Daniel Spade"}
          goal={
            "Codify a reproducible bioinformatics pipeline with conda environments and singularity images to process and annotate small RNAs that is generalized, and analyze differential expression of different small RNAs, annotate RNA targets and compute overlap, and perform pathway analysis with the end goal of a publication."
          }
          image={"/images/projects/covid19.png"}
          alt={"Molecular structure of EGME"}
        />
      ),
    },
    {
      value: "md",
      label: "Medium",
      content: (
        <ProjectEstimateTab
          title={"MAPPS App"}
          description={
            "A mobile application used to track participants  in an indoor environment to simulate the transfer of a pathogen."
          }
          image={"/images/projects/mapps.webp"}
          group={"Department of Epidemiology, School of Public Health"}
          pi="Mark Lurie"
          goal={
            "CCV was responsible for developing a cross-platform mobile application, which included designing and implementing native code to facilitate interaction with Bluetooth devices. Additionally, CCV managed the submission process for the app to both the iOS and Android app stores."
          }
          alt={"Mobile app phone mockups of the MAPPS app"}
        />
      ),
    },
    {
      value: "lg",
      label: "Large",
      content: (
        <ProjectEstimateTab
          title={"Ice Floe Tracker"}
          description={
            "An open-source Julia package for tracking Arctic Ocean ice floes using data from the Aqua and Terra Earth-observation satellites."
          }
          group={"Wilhelmus Lab, School of Engineering"}
          pi={"Monica Martinez Wilhelmus"}
          goal={
            "CCV was responsible for translating code from MATLAB to Julia, reimplementing functionality that was available in MATLAB but not in Julia. The team added versatile interfaces, including functions for interactive analyses, and introduced new variants of processing steps, such as an alternative image segmentation algorithm."
          }
          image={"/images/projects/icefloe.webp"}
          alt={"Wilhelm Lab Home Page"}
        />
      ),
    },
  ]

  return (
    <>
      <StyledTabs position="center" tabs={tabs} />
    </>
  )
}
