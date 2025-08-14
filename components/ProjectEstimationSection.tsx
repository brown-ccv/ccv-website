import React from "react"
import { StyledTabs } from "@/components/StyledTabs"
import { ProjectEstimateTab } from "@/components/ProjectEstimateTab"

export const ProjectEstimationSection = () => {
  const tabs = [
    {
      value: "xs",
      label: "Extra Small",
      content: (
        <ProjectEstimateTab
          title={"Unsupervised Cell Segmentation in 3D Data"}
          description={
            "A 3D visualization pipeline and application that researchers us to identify, label, and count cells in mouse brain scans."
          }
          group={"Brown Department of Neuroscience"}
          time={"2 months"}
          goal={
            "Develop a Python-based application that integrates pre-trained deep learning models to analyze 3D image data for automated cell segmentation and structured result generation. The project includes implementing a complete processing pipeline, integrating the application as a plugin within Napari, and deploying the final solution on the lab's PC for routine use."
          }
          image={
            "/images/services/consulting/project-estimation/cell-seg-3d.png"
          }
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
          title={""}
          description={""}
          group={""}
          time={""}
          goal={""}
          image={""}
          alt={""}
        />
      ),
    },
    {
      value: "md",
      label: "Medium",
      content: (
        <ProjectEstimateTab
          title={"MAPPS"}
          description={
            "We understand pandemic infection spread models from the virus side. Less is known about human behavior. Can we design agents based on human behavior to enhance existing models?"
          }
          group={"Pandemic Center, School of Public Health"}
          time={"1 year"}
          goal={"TBD"}
          image={"/images/services/consulting/project-estimation/mapps.png"}
          alt={"MAPPS phone examples"}
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
            "Publish code written for a research project:\n" +
            "\n" +
            "As an open source package anyone could use\n" +
            "Using a programming language more commonly used in the field of study (climate science)\n" +
            "Allow analysing much larger datasets using Brown's supercomputer.\n" +
            "\n" +
            "Support a future grant application with new data."
          }
          group={"Department of Engineering"}
          time={"3 years"}
          goal={"TBD"}
          image={"/images/services/consulting/project-estimation/icefloe.png"}
          alt={"A code block displaying Julia programming language"}
        />
      ),
    },
  ]

  return (
    <>
      <StyledTabs tabs={tabs} />
    </>
  )
}
