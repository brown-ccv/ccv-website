import CCVLogo from "@/components/assets/CCVLogo"
import { CarbonBadge } from "@/components/CarbonBadge"
import { FaArrowRight } from "react-icons/fa"
import { MdLocationPin, MdOutlinePhoneInTalk } from "react-icons/md"
import ButtonLink from "@/components/ui/ButtonLink"

// Footer link component
interface FooterLinkProps {
  href: string
  label: string
}

const FooterLink = ({ href, label }: FooterLinkProps) => {
  return (
    <li>
      <ButtonLink
        href={href}
        className="flex items-center text-sm tracking-wider uppercase transition-colors duration-300 text-sunglow-400 hover:text-white"
      >
        {label}
        <FaArrowRight className="block ml-2" />
      </ButtonLink>
    </li>
  )
}

// Footer link section component
interface FooterSectionProps {
  links: Array<{ href: string; label: string }>
  className?: string
  listClassName?: string
}

const FooterSection = ({ links, className = "" }: FooterSectionProps) => {
  return (
    <div className={"mb-10 w-full border-b border-stone-500 " + className}>
      <ul className="flex flex-col gap-x-0 gap-y-4 justify-center mb-8 w-full sm:flex-wrap sm:gap-x-8 sm:gap-y-4 sm:flex-row">
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  )
}

// Footer component based on Brown University's footer
const Footer = () => {
  const quickNavLinks = [
    { href: "https://www.brown.edu/about/visit", label: "Visit Brown" },
    {
      href: "https://www.brown.edu/Facilities/Facilities_Management/maps/",
      label: "Campus Map",
    },
    { href: "https://www.brown.edu/a-z", label: "A to Z" },
    { href: "https://www.brown.edu/about/contact-us", label: "Contact Us" },
  ]

  const footerNavLinks = [
    { href: "https://www.brown.edu/news", label: "News" },
    { href: "https://events.brown.edu/", label: "Events" },
    { href: "https://dps.brown.edu/", label: "Campus Safety" },
    {
      href: "https://www.brown.edu/website-accessibility",
      label: "Accessibility",
    },
    { href: "https://www.brown.edu/careers", label: "Careers at Brown" },
  ]

  return (
    <footer className="flex flex-col justify-start items-start sm:justify-center sm:items-center w-full bg-gradient-to-b from-gradient-light to-gradient-dark text-neutral-800">
      <div className="px-6 sm:px-8 py-8 w-full lg:max-w-5xl sm:max-w-3xl md:mt-8">
        <div className="flex flex-col justify-start items-start mb-8 space-y-2 sm:justify-center sm:items-center md:mb-16">
          <div className="text-xs tracking-widest uppercase text-cream">
            Brown University
          </div>
          <div className="flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8">
            <div className="font-serif text-base text-white sm:text-lg xl:text-xl">
              <MdLocationPin className="inline-block mr-2 text-stone-400" />
              Providence, RI 02912
            </div>
            <div className="font-serif text-base text-white sm:text-lg xl:text-xl">
              <MdOutlinePhoneInTalk className="inline-block mr-2 text-stone-400" />
              401-863-1000
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full text-sunglow-400">
          {/* Quick Navigation */}
          <FooterSection links={quickNavLinks} />

          {/* Footer Navigation */}
          <FooterSection links={footerNavLinks} className="lg:border-b-0" />
        </div>
        <div className="flex flex-row w-full sm:justify-center sm:items-center">
          <ButtonLink
            href="https://alumni-friends.brown.edu/giving"
            className="group flex justify-center items-center px-6 sm:px-8 py-4 text-sm tracking-widest text-white uppercase border border-sunglow-400 hover:bg-sunglow-400 hover:text-black"
          >
            Give to Brown
            <FaArrowRight className="inline-block ml-2 text-sunglow-400 group-hover:text-black" />
          </ButtonLink>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="content-wrapper flex flex-col sm:flex-row items-center sm:items-start justify-between py-4 bg-black font-serif text-base text-cream md:text-lg">
        <div className="flex flex-col gap-4 items-center sm:items-start order-1 sm:order-1">
          <CCVLogo />
          <div>&copy; Brown University</div>
        </div>
        <div className="order-2 sm:order-3 scale-75 sm:scale-100">
          <CarbonBadge />
        </div>
      </div>
    </footer>
  )
}

export default Footer
