import React from "react"
import Hero from "@/components/Hero"
import ButtonLink from "@/components/button/ButtonLink"

export default function NotFound() {
  return (
    <>
      <Hero title="Oops!" description="It looks like this page does not exist">
        <ButtonLink
          external={false}
          href={"/"}
          variant="primary_filled"
          size="lg"
        >
          Return Home
        </ButtonLink>
      </Hero>
    </>
  )
}
