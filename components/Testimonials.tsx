import { Marquee } from "@/components/magicui/marquee"
import ReviewCard from "@/components/card/ReviewCard"
import reviews from "@/content/home/reviews.json"

export function Testimonials() {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <>
      {/*Desktop Marquee*/}
      <div className="not-prose relative hidden w-full flex-col items-center justify-center overflow-hidden lg:flex">
        <Marquee pauseOnHover className="[--duration:99s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:99s]">
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
