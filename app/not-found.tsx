import ExternalLink from "@/components/ui/external-link"
import { Button } from "@/components/ui/button"
import React from "react"
import Hero from "@/components/Hero"

export default function NotFound() {
  return (
    <div>
      <Hero title="Oops!" description="It looks like this page does not exist">
        <Button variant="primary_filled" size="xl">
          <ExternalLink href="/" external={false}>
            Return Home
          </ExternalLink>
        </Button>
      </Hero>
    </div>
  )
}
