import React from "react"
import { Hero } from "@/components/Hero"
import { ButtonLink } from "@/components/button/ButtonLink"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
}
export default function NotFound() {
  return (
    <>
      <Hero title="Oops!" description="It looks like this page does not exist">
        <ButtonLink href={"/"} variant="primary_filled" size="lg">
          Return Home
        </ButtonLink>
      </Hero>
    </>
  )
}
