import LogoBrown from "@/components/assets/LogoBrown"
import LogoCcv from "@/components/assets/LogoCcv"
import Link from "next/link"

export default function Footer() {
  const navigation = {
    services: {
      name: "Services",
      href: "/services",
      items: [
        { name: "Classroom", href: "#" },
        { name: "Computing", href: "#" },
        { name: "Campus File Storage and Transfer", href: "#" },
        { name: "Rates", href: "#" },
        { name: "Visualization Systems", href: "#" },
        { name: "Consulting", href: "#" },
      ],
    },
    documentation: {
      name: "Documentation",
      href: "/documentation",
      items: [
        { name: "Oscar", href: "#" },
        { name: "Stronghold", href: "#" },
        { name: "Globus", href: "#" },
        { name: "Jupyter Hub", href: "#" },
      ],
    },
    ourWork: {
      name: "Our Work",
      href: "/our-work",
      items: [
        { name: "Collaborations", href: "#" },
        {
          name: "Software",
          href: "#",
        },
        {
          name: "Workshops and Talks",
          href: "#",
        },
        {
          name: "Publications",
          href: "#",
        },
        {
          name: "Partners",
          href: "#",
        },
      ],
    },
    help: {
      name: "Help",
      href: "/help",
      items: [
        { name: "Submit a Ticket", href: "#" },
        {
          name: "Discourse",
          href: "#",
        },
        {
          name: "Slack",
          href: "#",
        },
        {
          name: "Office Hours",
          href: "#",
        },
      ],
    },
    about: {
      name: "About",
      href: "/about",
      items: [
        { name: "Mission", href: "#" },
        {
          name: "Office of Information Technology",
          href: "#",
        },
        {
          name: "Our Teams",
          href: "#",
        },
        {
          name: "People",
          href: "#",
        },
        {
          name: "Opportunities",
          href: "#",
        },
        {
          name: "Events",
          href: "#",
        },
        {
          name: "Facilities Statement",
          href: "#",
        },
        {
          name: "Diversity Statement",
          href: "#",
        },
      ],
    },
  }
  return (
    <footer aria-labelledby="footer-heading" className="w-full bg-neutral-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8">
            <div className="flex w-2/3 gap-3.5">
              <LogoBrown />
              <LogoCcv />
            </div>
          </div>
          <div className="flex items-center mt-6 lg:mt-0 lg:justify-end space-x-6">
            Socials Here
          </div>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 gap-12 xl:col-span-2 xl:mt-0">
            {Object.entries(navigation).map(([_, contents]) => {
              return (
                <div>
                  <Link
                    href={contents.href}
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary-blue-700 hover:border-b-2"
                  >
                    {contents.name}
                  </Link>
                  <ul role="list" className="mt-6 space-y-4">
                    {contents.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-secondary-blue-700 hover:text-black"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <p className="text-xs text-center leading-5 text-gray-500">
          &copy; 2021 Center for Computation and Visualization, Brown University
          | 180 George St, Providence RI 02906
        </p>
      </div>
    </footer>
  )
}
