import { Hero } from "@/components/Hero"
import ButtonLink from "@/components/button/ButtonLink"
import ProjectConsultingContent from "@/content/services/project-consulting.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function ProjectConsulting() {
  const metadata = getMDXMetadata("content/services/project-consulting.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <div className="flex flex-col items-start">
          <div className="flex w-full flex-col flex-wrap items-start gap-4 xl:flex-row">
            {metadata.links.map((link: any, index: number) => (
              <ButtonLink
                key={index}
                variant="secondary_filled"
                size="xl"
                href={link.target}
                external={!link.target.startsWith("/")}
              >
                {link.text}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Hero>
      <div className="prose prose-lg max-w-none flex-1">
        <ProjectConsultingContent />
      </div>
    </>
  )
}
