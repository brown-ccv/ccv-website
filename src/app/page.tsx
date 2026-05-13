// app/page.tsx
import { MainHero } from "@/components/Hero"
import { HeroCard } from "@/components/card/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel"
import { StyledCarouselItem } from "@/components/carousel/StyledCarousel"
import { EventSectionClient } from "@/components/EventSectionClient"
import React from "react"
import { ScrollButton } from "@/components/button/ScrollButton"
import { ButtonLink } from "@/components/button/ButtonLink"
import { readContentFile } from "@/utils/content"
import {
  ContentHeader,
  ContentSection,
  ContentSubHeader,
} from "@/components/ContentSection"
import { FaCalendarAlt } from "react-icons/fa"
import { getMDXMetadata } from "@/utils/mdx"
import { CopyableText } from "@/components/CopyableText"

export default async function Home() {
  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{
    carousel: StyledCarouselItem[]
  }>("src/content/data/featured-carousel.yaml")
  const featuredCarouselData = featuredCarouselRaw.data.carousel
  const metadata = getMDXMetadata("src/content/routes/home.mdx")

  try {
    return (
      <>
        <MainHero
          image={"/images/hero/ccv-original.webp"}
          title={metadata.title}
          description={metadata.description}
        >
          <ButtonLink
            variant="primary_filled"
            size="lg"
            href="/about/help#contact-us"
          >
            Work with Us
          </ButtonLink>
          <ScrollButton id="events" variant="secondary_filled" size="lg">
            View Events
          </ScrollButton>
        </MainHero>
        <HeroCard />
        <ImpactBanner />
        <div>
          <CopyableText>
            <a href="mailto:support@brown.edu">support@brown.edu</a>
          </CopyableText>
          <ContentSection title="Featured Projects" className="px-none">
            <FeaturedCarousel carouselData={featuredCarouselData} />
          </ContentSection>
          <ContentSection title="Events" icon={<FaCalendarAlt />} align="left">
            <ContentHeader>
              <ContentSubHeader>
                <>
                  <h3 className="font-serif font-normal italic">
                    What's next at CCV
                  </h3>
                  <ButtonLink
                    variant="primary_filled"
                    size="lg"
                    href="https://events.brown.edu/ccv/all"
                  >
                    View All Events
                  </ButtonLink>
                </>
              </ContentSubHeader>
            </ContentHeader>
            <EventSectionClient />
          </ContentSection>
        </div>
      </>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="my-6 px-2">
        <p>{err.message}</p>
      </div>
    )
  }
}
