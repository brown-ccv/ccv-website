import { Hero } from "@/components/Hero"
import ButtonLink from "@/components/button/ButtonLink"
import ProjectConsultingContent from "@/content/services/project-consulting.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function ProjectConsulting() {
  const metadata = getMDXMetadata("content/services/project-consulting.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <div className="flex flex-col items-start not-prose">
          <div className="flex flex-col xl:flex-row flex-wrap gap-4 w-full items-start not-prose">
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
      <div className="prose prose-lg text-xl max-w-none">
        <ProjectConsultingContent />
      </div>
    </>
  )
}
