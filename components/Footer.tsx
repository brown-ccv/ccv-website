import React from "react"
import { ArrowRightIcon, MapPinIcon, PhoneCallIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { text: "VISIT BROWN", href: "https://brown.edu" },
  { text: "CAMPUS MAP", href: "https://brown.edu" },
  { text: "RESERVATIONS", href: "https://brown.edu" },
  { text: "ACCESSIBILITY", href: "https://brown.edu" },
  { text: "CAREERS AT BROWN", href: "https://brown.edu" },
  { text: "GIVE TO BROWN", href: "https://brown.edu" },
]

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#3A3A3A] to-[#272727]">
      <div className="pt-[51px] px-[102px] flex flex-col">
        <div className="flex flex-wrap justify-between">
          <div className="w-1/2 h-full">
            <p className="text-cream text-base">BROWN UNIVERSITY</p>

            <div className="flex items-center mt-12 space-x-6">
              <MapPinIcon className="w-[15px] h-[15px] text-white" />
              <p className="font-semibold text-white text-xl">
                Providence, RI 02912
              </p>
              <div className="ml-8 flex items-center">
                <PhoneCallIcon className="w-[21px] h-[21px] text-cream" />
                <p className="font-semibold text-white text-xl ml-2">401-863-1000</p>
              </div>
            </div>

            <div className="flex flex-wrap mt-10">
              {footerLinks.slice(0, 2).map((link, index) => (
                <div key={index} className="flex items-center mr-8 mb-4">
                  <a
                    href={link.href}
                    className="text-secondary-500 text-[15px] hover:underline"
                  >
                    {link.text}
                  </a>
                  <ArrowRightIcon className="w-3.5 h-2.5 ml-1.5 text-secondary-500" />
                </div>
              ))}
            </div>

            <Separator className="my-10 w-[750px] bg-white" /> {/* Make sure it's still centered */}

            <div className="flex flex-wrap mt-10 mb-10">
              {footerLinks.slice(2, 5).map((link, index) => (
                <div key={index} className="flex items-center mr-8 mb-4">
                  <a
                    href={link.href}
                    className="text-secondary-500 text-[15px] hover:underline"
                  >
                    {link.text}
                  </a>
                  <ArrowRightIcon className="w-3.5 h-2.5 ml-1.5 text-secondary-500" />
                </div>
              ))}
            </div>
          </div>

          <Separator orientation="vertical" className="mx-10 w-[1px] h-[300px] bg-white" />

          <div className="w-1/3">
            <img
              className="w-[218px] h-[61px] object-cover"
              alt="Brown University Logo"
              src="https://c.animaapp.com/VOhWj8ET/img/logo-together-1@2x.png"
            />

            <p className="font-serif italic text-cream text-xl mt-10">
              The campaign for building <br />
              on distinction
            </p>

            <div className="flex items-center mt-16">
              <a
                href={footerLinks[5].href}
                className="text-secondary-500 text-[15px] hover:underline"
              >
                {footerLinks[5].text}
              </a>
              <ArrowRightIcon className="w-3.5 h-2.5 ml-1.5 text-secondary-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black flex items-center px-[102px] mt-auto py-10">
        <p className="text-cream text-base">© Brown University</p>
      </div>
    </footer>
  )
}
