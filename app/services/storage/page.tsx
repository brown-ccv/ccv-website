import React from "react"
import { Hero } from "@/components/Hero"
import { getMDXMetadata } from "@/lib/mdx-utils"
import StorageTool from "@/components/storage/StorageTool"
import { SelectedAnswers } from "@/lib/storage-types"
import services from "@/content/services/storage-features.json"
import questions from "@/content/services/storage-questions.json"
import ButtonLink from "@/components/button/ButtonLink"
import { ScrollButton } from "@/components/button/ScrollButton"
import Icon from "@/components/ui/RenderIcon"

export default async function CompareStorageOptions() {
  const metadata = getMDXMetadata("content/services/storage.mdx")
  let initialSelectedAnswers: SelectedAnswers = {}
  questions.map((question: any, index: number) => {
    initialSelectedAnswers[question.id] = question.default_answer
  })

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://brown.atlassian.net/servicedesk/customer/portal/16"
          external
        >
          Request Storage
        </ButtonLink>
        <ScrollButton
          variant="primary_filled"
          size="lg"
          id="table"
          aria-describedby="table-nav-desc"
          aria-label="Scroll to comparison table section"
        >
          Compare Storage
          <Icon iconName="FaAngleDoubleDown" aria-hidden="true" />
        </ScrollButton>
      </Hero>

      <StorageTool
        questions={questions}
        initialSelectedAnswers={initialSelectedAnswers}
        services={services}
      />
    </>
  )
}
