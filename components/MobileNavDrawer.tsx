import {
  navItems,
  NavigationLinks,
  RouteItem,
  NavigationProps,
} from "@/components/Navbar"
import { useDrawer } from "@/components/DrawerContext"
import CCVLogo from "@/components/assets/CCVLogo"
import Link from "next/link"
import Image from "next/image"
import { MdOutlineMenu } from "react-icons/md"

export default function MobileNavButton() {
  const { openDrawer } = useDrawer()
  const handleMobileNav = () => {
    openDrawer(<NavMobile />, {
      direction: "right",
      className: "w-2/3",
      title: <Image src={CCVLogo} alt="CCV Logo" width={0} height={30} />,
    })
  }

  return (
    <div>
      <button
        className="block justify-center items-center p-2 w-10 h-10 bg-[rgb(192,4,4)] md:hidden mr-3"
        onClick={handleMobileNav}
      >
        <MdOutlineMenu className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}

const NavMobile = () => {
  return (
    <nav className="flex flex-col items-start">
      <NavItemMobile href="/" label="Home" icon={<FaHome />} />
      <NavItemMobile
        href="http://librechat.brown.edu"
        label="LibreChat"
        icon={<FaBook />}
      />
      <NavItemMobile
        href="/transcribe"
        label="Transcribe"
        icon={<FaMicrophone />}
      />
      <NavItemMobile href="/retrieval" label="Ask Oscar" icon={<FaBook />} />
    </nav>
  )
}
