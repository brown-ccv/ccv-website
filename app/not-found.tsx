import ExternalLink from "@/components/ui/external-link"
import { Button } from "@/components/ui/button"
import React from "react"
import Hero from "@/components/Hero"
import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <Hero title="Oops!" description="It looks like this page does not exist">
        <Button variant="primary_filled" size="xl">
          <Link href="/">Return Home</Link>
        </Button>
      </Hero>
    </div>
  )
}
