// app/page.tsx
import { MainHero } from "@/components/Hero"
import { HeroCard } from "@/components/card/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel"
import { StyledCarouselItem } from "@/components/carousel/StyledCarousel"
import EventSectionClient from "@/components/EventSectionClient"
import React from "react"
import { ScrollButton } from "@/components/button/ScrollButton"
import ButtonLink from "@/components/button/ButtonLink"
import { readContentFile } from "@/lib/content-utils"
import {
  ContentHeader,
  ContentSection,
  ContentSubHeader,
  ContentTitle,
} from "@/components/ContentSection"
import { FaCalendarAlt } from "react-icons/fa"

export default async function Home() {
  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{
    carousel: StyledCarouselItem[]
  }>("content/home/featured-carousel.yaml")
  const featuredCarouselData = featuredCarouselRaw.data.carousel

  try {
    return (
      <>
        <MainHero
          image={"/images/hero/ccv-original.webp"}
          title="Center for Computation and Visualization"
          description="Advancing computational research with scientific and computing expertise."
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
          <ContentSection className="px-none">
            <ContentHeader>
              <ContentTitle title="Featured Projects" />
            </ContentHeader>
            <FeaturedCarousel carouselData={featuredCarouselData} />
          </ContentSection>
          <ContentSection id="events" align="left">
            <ContentHeader>
              <ContentTitle title="Events" icon={<FaCalendarAlt />} />
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
