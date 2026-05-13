import { Hero } from "@/components/Hero"
import { ButtonLink } from "@/components/button/ButtonLink"
import ProjectConsultingContent from "@/content/routes/services/project-consulting.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata(
  "src/content/routes/services/project-consulting.mdx"
)

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default function ProjectConsulting() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description}>
        <div className="flex flex-col items-start">
          <div className="flex w-full flex-col flex-wrap items-start gap-4 xl:flex-row">
            {frontMatter.links.map((link: any, index: number) => (
              <ButtonLink
                key={index}
                variant="primary_filled"
                size="lg"
                href={link.target}
              >
                {link.text}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Hero>
      <ProjectConsultingContent />
    </>
  )
}
