import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import { ContentSection } from "@/components/ui/ContentSection"
import { ButtonLink } from "@/components/ui/ButtonLink"
import {
  FeaturedCarousel,
  FeaturedCarouselItem,
} from "@/components/FeaturedCarousel"
import { readContentFile } from "@/lib/content-utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card"
import { RatesCard, RatesGrid } from "@/components/ui/RatesCard"
import { PeopleSection } from "@/components/PeopleSection"
import { Button } from "@/components/ui/Button"
import Icon from "@/components/ui/RenderIcon"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/variants"

export const MDXButton = ({ children, href, ...props }: any) => {
  return (
    <ButtonLink
      href={href}
      variant="primary_filled"
      size="lg"
      align="center"
      className="my-4"
      {...props}
    >
      {children}
    </ButtonLink>
  )
}

export const ButtonGroup = ({ children, ...props }: any) => {
  return (
    <div
      className="flex flex-col sm:flex-row flex-wrap gap-4 w-full items-start not-prose"
      {...props}
    >
      {children}
    </div>
  )
}

export const ContactCard = ({
  children,
  title,
  icon,
  align = "center",
  headerAlign,
  contentAlign,
}: any) => {
  const IconComponent = icon ? Icon : null

  return (
    <div className="flex-grow max-w-sm">
      <div className="inline-flex items-center gap-2 py-8 w-full h-full">
        <Card
          className={cn(
            "overflow-hidden flex flex-col w-full h-full",
            cardVariants({ variant: "default" })
          )}
        >
          <CardContent className="flex flex-col h-full">
            <div
              className={cn(
                "relative border-b border-neutral-300 px-4 flex",
                align === "center" ? "justify-center" : "justify-start"
              )}
            >
              <CardHeader
                className="flex gap-3 min-w-0"
                align={headerAlign || align}
              >
                <div className="flex items-start gap-2 min-w-0">
                  {IconComponent && (
                    <IconComponent
                      iconName={icon}
                      className="text-2xl flex-shrink-0 mt-1"
                    />
                  )}
                  <span className="leading-none">{title}</span>
                </div>
              </CardHeader>
            </div>
            <CardDescription
              className="pt-6 text-lg"
              align={contentAlign || align}
            >
              {children}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const ContactGrid = ({ children, align = "center", ...props }: any) => (
  <div
    className={cn(
      "flex flex-wrap gap-y-6 gap-x-6 mb-16",
      align === "center" ? "justify-center" : "justify-start"
    )}
    {...props}
  >
    {children}
  </div>
)

// Server component that loads carousel data from YAML file
async function MDXCarouselData({
  carouselContentPath,
}: {
  carouselContentPath: string
}) {
  const carouselRaw = await readContentFile<{
    carousel: FeaturedCarouselItem[]
  }>(carouselContentPath)
  const carouselData = carouselRaw.data.carousel
  return <FeaturedCarousel carouselData={carouselData} />
}

// Client component wrapper for MDX compatibility
export const MDXCarousel = ({
  carouselContentPath,
}: {
  carouselContentPath: string
}) => {
  return <MDXCarouselData carouselContentPath={carouselContentPath} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="text-xl max-w-none">{children}</div>
    ),

    // Global MDX components
    MDXButton,
    ButtonGroup,
    Button,
    ContactCard,
    ContactGrid,
    ContentSection,
    MDXCarousel,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    RatesCard,
    RatesGrid,
    PeopleSection,
    Icon,
    img: (props) => (
      <Image
        {...props}
        width={800}
        height={600}
        className="max-w-full h-auto"
      />
    ),
    ...components,
  }
}
