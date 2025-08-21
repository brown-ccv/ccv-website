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
        <h3 className="text-center">*Coming Soon*</h3>
        // <ProjectEstimateTab
        //   title={""}
        //   description={""}
        //   group={""}
        //   time={""}
        //   goal={""}
        //   image={""}
        //   alt={""}
        // />
      ),
    },
    {
      value: "md",
      label: "Medium",
      content: (
        <h3 className="text-center">*Coming Soon*</h3>
        // <ProjectEstimateTab
        //   title={""}
        //   description={
        //     ""
        //   }
        //   image={""}
        //   group={""}
        //   time={""}
        //   goal={""}
        //   alt={""}
        // />
      ),
    },
    {
      value: "lg",
      label: "Large",
      content: (
        <ProjectEstimateTab
          title={"Soma Pain and Recovery"}
          description={
            "A web and mobile app that combines symptom tracking with neuroscientific assessments and tailored interventions. SOMA is designed to directly support individuals on their journeys to overcome pain. SOMA is designed to directly support individuals on their journeys to overcome pain."
          }
          group={"Performance and Energy Aware Computing Lab"}
          time={"2+ years"}
          goal={"SOMA is designed to improve the lives of people living with chronic pain by enabling clinicians to improve treatment options for patients."}
          image={"/images/services/consulting/project-estimation/soma.png"}
          alt={"Screenshots of the SOMA app"}
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
