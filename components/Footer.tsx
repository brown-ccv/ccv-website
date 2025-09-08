import CCVLogo from "@/components/assets/CCVLogo"
import { CarbonBadge } from "@/components/CarbonBadge"
import { FaArrowRight } from "react-icons/fa"
import { MdEmail, MdLocationPin, MdOutlinePhoneInTalk } from "react-icons/md"
import ButtonLink from "@/components/button/ButtonLink"
import { CopyableEmail } from "@/components/CopyableEmail"

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
        className="flex items-center text-sm uppercase tracking-wider text-sunglow-400 transition-colors duration-300 hover:text-white"
      >
        {label}
        <FaArrowRight className="ml-2 block" />
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
      <ul className="mb-8 flex w-full flex-col justify-center gap-x-0 gap-y-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
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
    <footer className="flex w-full flex-col bg-gradient-to-b from-gradient-light to-gradient-dark text-neutral-800 sm:items-center">
      <div className="w-full px-6 py-8 sm:max-w-3xl sm:px-8 md:mt-8 lg:max-w-5xl">
        <div className="mb-8 flex flex-col space-y-2 sm:items-center md:mb-16">
          <div className="text-xs uppercase tracking-widest text-cream">
            Brown University
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-8 sm:space-y-0">
            <div className="font-serif text-md text-white sm:text-lg xl:text-xl">
              <MdLocationPin
                aria-label="Map Pin"
                className="mr-2 inline-block text-stone-400"
              />
              Providence, RI 02912
            </div>
            <div className="font-serif text-md text-white sm:text-lg xl:text-xl">
              <MdOutlinePhoneInTalk
                aria-label="Phone Icon"
                className="mr-2 inline-block text-stone-400"
              />
              401-863-1000
            </div>
            <div className="font-serif text-md text-white sm:text-lg xl:text-xl">
              <MdEmail
                aria-label="Email Icon"
                className="mr-2 inline-block text-stone-400"
              />
              <CopyableEmail email="support@ccv.brown.edu" />
            </div>
          </div>
        </div>

        <nav className="flex w-full flex-col text-sunglow-400">
          {/* Quick Navigation */}
          <FooterSection links={quickNavLinks} />

          {/* Footer Navigation */}
          <FooterSection links={footerNavLinks} className="lg:border-b-0" />
        </nav>

        <div className="flex w-full sm:justify-center">
          <ButtonLink
            href="https://alumni-friends.brown.edu/giving"
            className="group flex items-center justify-center border border-sunglow-400 px-6 py-4 text-sm uppercase tracking-widest text-white hover:bg-sunglow-400 hover:text-black sm:px-8"
          >
            Give to Brown
            <FaArrowRight className="ml-2 inline-block text-sunglow-400 group-hover:text-black" />
          </ButtonLink>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex w-full flex-col items-center justify-between bg-black px-6 py-4 font-serif text-md text-cream sm:flex-row sm:px-8 md:px-12 md:text-lg lg:px-32 xl:px-40">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <CCVLogo />
          <p>&copy; Brown University</p>
        </div>
        <div className="scale-75 sm:scale-100">
          <CarbonBadge className="scale-75 sm:scale-100" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
