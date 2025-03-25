// import CCVLogo from "@/public/images/ccv-logo.svg";
import CCVLogo from "@/components/assets/CCVLogo"
import {
    FaArrowRight,
  } from "react-icons/fa";
  import {
    MdLocationPin,
    MdOutlinePhoneInTalk,
  } from "react-icons/md";

// Footer link component
interface FooterLinkProps {
    href: string;
    label: string;
  }
  
const FooterLink = ({ href, label }: FooterLinkProps) => {
return (
    <li>
    <a
        href={href}
        className="flex items-center text-sm tracking-wider uppercase transition-colors duration-300 text-sunglow-400 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
    >
        {label}
        <FaArrowRight className="block ml-2" />
    </a>
    </li>
);
};

// Footer link section component
interface FooterSectionProps {
    links: Array<{ href: string; label: string }>;
    className?: string;
    listClassName?: string;
  }
  
const FooterSection = ({ links, className = "" }: FooterSectionProps) => {
return (
    <div className={"mb-10 w-full border-b border-brown bg-brown" + className}>
    <ul className="flex flex-col gap-x-0 gap-y-4 justify-center mb-8 w-full sm:flex-wrap sm:gap-x-8 sm:gap-y-4 sm:flex-row">
        {links.map((link, index) => (
        <FooterLink key={index} href={link.href} label={link.label} />
        ))}
    </ul>
    </div>
);
};

// export function EventSection({
export const Footer = () => {
    
    const quickNavLinks = [
      { href: "https://www.brown.edu/about/visit", label: "Visit Brown" },
      {
        href: "https://www.brown.edu/Facilities/Facilities_Management/maps/",
        label: "Campus Map",
      },
      { href: "https://www.brown.edu/a-z", label: "A to Z" },
      { href: "https://www.brown.edu/about/contact-us", label: "Contact Us" },
    ];
  
    const footerNavLinks = [
      { href: "https://www.brown.edu/news", label: "News" },
      { href: "https://events.brown.edu/", label: "Events" },
      { href: "https://dps.brown.edu/", label: "Campus Safety" },
      {
        href: "https://www.brown.edu/website-accessibility",
        label: "Accessibility",
      },
      { href: "https://www.brown.edu/careers", label: "Careers at Brown" },
    ];
  
    return (
      <footer className="flex flex-col justify-start items-start sm:justify-center sm:items-center w-full bg-brown text-university-gray-100">
        <div className="px-6 py-8 w-full lg:max-w-5xl sm:max-w-3xl md:mt-8">
          <div className="flex flex-col justify-start items-start mb-8 space-y-2 sm:justify-center sm:items-center md:mb-16">
            <div className="text-xs tracking-widest uppercase text-neutral-400">
              Brown University
            </div>
            <div className="flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8">
              <div className="font-serif text-base text-white sm:text-lg">
                <MdLocationPin className="inline-block mr-2 text-stone-400" />
                Providence, RI 02912
              </div>
              <div className="font-serif text-base text-white sm:text-lg">
                <MdOutlinePhoneInTalk className="inline-block mr-2 text-stone-400" />
                401-863-1000
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full text-secondary-yellow-500 group-hover:text-black">
            {/* Quick Navigation */}
            <FooterSection links={quickNavLinks} />
  
            {/* Footer Navigation */}
            <FooterSection links={footerNavLinks} className="lg:border-b-0 text-secondary-yellow-500 group-hover:text-black" />
            </div>
              <div className="flex flex-row w-full sm:justify-center sm:items-center text-secondary-yellow-500 group-hover:text-black">
                <a
                  href="https://alumni-friends.brown.edu/giving"
                  className="group flex justify-center items-center px-6 py-4 text-sm tracking-widest  text-secondary-yellow-500 group-hover:text-black uppercase border border-secondary-yellow-500 hover:bg-econdary-yellow-500 hover:text-secondary-yellow-500 "
                >
                  Give to Brown
                  <FaArrowRight className="inline-block ml-2 text-secondary-yellow-500 group-hover:text-black" />
                </a>
              </div>
            </div>
  
        {/* Copyright Section */}
        <div className="flex flex-row items-center justify-between px-6 py-4 w-full bg-[#412D22] font-serif text-base text-neutral-400 md:px-24 md:text-lg">
          <div>&copy; Brown University</div>
          <img src={CCVLogo} alt="ccv logo" width={0} height={30} />
        </div>
      </footer>
    );
  };

  export default { Footer, FooterLink, FooterSection }