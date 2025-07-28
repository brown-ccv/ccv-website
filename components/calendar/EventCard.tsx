import { Card, CardContent } from "@/components/ui/card"
import { FaCalendarAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import ExternalLink from "@/components/ui/external-link"
import { SectionHeader } from "@/components/ui/section-header"

export const EventCard = () => {
  return (
    <Card className="w-fit">
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
            <Button className="mr-0" variant="primary_filled" size="lg">
              <ExternalLink href="https://events.brown.edu/ccv/all" external={true}>
                View All Events
              </ExternalLink>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 