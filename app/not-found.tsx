import React from "react"
import Hero from "@/components/Hero"
import ButtonLink from "@/components/ui/ButtonLink"

export default function NotFound() {
  return (
    <div>
      <Hero title="Oops!" description="It looks like this page does not exist">
        <ButtonLink
          external={false}
          href={"/"}
          variant="primary_filled"
          size="xl"
        >
          Return Home
        </ButtonLink>
      </Hero>
    </div>
  )
}
