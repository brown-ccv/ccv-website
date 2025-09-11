import { Marquee } from "@/components/magicui/marquee"
import ReviewCard from "@/components/card/ReviewCard"

const reviews = [
  {
    name: "Beth Brainerd",
    department: "Ecology and Evolutionary Biology",
    review:
      "Over the past 15 years I have had numerous highly productive collaborations with research software engineers at CCV. We developed several open-source software packages for X-ray motion analysis and data management that have been tremendously valuable for my research program and for my field more generally. This work was supported by five extramural grants. CCV staff helped with the development of the grant proposals and the software products as well as the funding were direct results of the software engineering expertise provided by CCV.",
    img: "/images/home/testimonials/beth_brainerd.jpg",
  },
  {
    name: "Chris Horvat",
    department: "Earth, Environmental, and Planetary Sciences",
    review:
      "Collaborating with Anna and her colleagues at CCV has been a pleasure. Anna helped get a complex visualization project from concept to deployment in just a few months, preventing countless headaches along the way. I recommend CCV to anyone seeking a high-quality team of data and software engineers to accelerate their research.",
    img: "/images/home/testimonials/chris_horvat.png",
  },
  {
    name: "John",
    department: "@john",
    review: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    department: "@jane",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    department: "@jenny",
    review: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    department: "@james",
    review: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
]

export function Testimonials() {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
