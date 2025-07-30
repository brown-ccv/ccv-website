import { Card, CardContent } from "@/components/ui/card"
import { FaCalendarAlt } from "react-icons/fa"
import { SectionHeader } from "@/components/ui/section-header"
import { cardVariants } from "@/components/ui/variants"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"

export const EventCard = () => {
  return (
    <Card className={cn(cardVariants({ variant: "default" }))}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <SectionHeader 
            title="Events" 
            align="center" 
            bars={true}
            icon={<FaCalendarAlt />}
            className="mb-2"
          />
          <h3 className="font-serif italic text-black text-xl mb-6">
            What's next at CCV
          </h3>
          <div className="flex justify-center w-full">
            <ButtonLink
              className="mt-0 mx-4"
              variant="primary_filled"
              size="lg"
              href="https://events.brown.edu/ccv/all"
              external={true}
            >
              View All Events
            </ButtonLink>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 