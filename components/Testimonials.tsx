import { Marquee } from "@/components/magicui/marquee"
import ReviewCard from "@/components/card/ReviewCard"
import reviews from "@/content/home/collaborators.json"
import { PeopleCard } from "@/components/card/PeopleCard"

export function Testimonials() {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <>
      <p className="px-12 text-center font-semibold sm:px-16 lg:px-14 lg:text-left xl:px-20">
        {reviews.length} collaborators
      </p>
      {/*Desktop Marquee*/}
      <div className="not-prose relative hidden w-full flex-col items-center justify-center overflow-hidden lg:flex">
        <Marquee pauseOnHover className="[--duration:55s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:55s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
      </div>
      {/*Mobile Stacked Cards*/}
      <div className="not-prose relative flex w-full flex-col items-center justify-center gap-2 lg:hidden">
        {reviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </div>
    </>
  )
}
