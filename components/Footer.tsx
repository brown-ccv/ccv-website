import Link from "next/link"
import LogoBrown from "@/components/assets/LogoBrown"
import LogoCcv from "@/components/assets/LogoCcv"

export default function Footer() {
  const navigation = {
    services: {
      name: "Services",
      href: "/services",
      items: [
        { name: "Classroom", href: "/services/classroom" },
        { name: "Computing", href: "/services/computing" },
        {
          name: "Campus File Storage and Transfer",
          href: "/services/file-storage-and-transfer",
        },
        { name: "Rates", href: "/services/rates" },
        { name: "Visualization Systems", href: "/services/visualization" },
        { name: "Consulting", href: "/services/consulting" },
      ],
    },
    documentation: {
      name: "Documentation",
      href: "/documentation",
      items: [
        { name: "Oscar", href: "https://docs.ccv.brown.edu" },
        {
          name: "Stronghold",
          href: "/services/computing#data-risk-level-3-computing-(stronghold)",
        },
        { name: "Globus", href: "/services/file-storage-and-transfer#globus" },
        { name: "Jupyter Hub", href: "/services/classroom#jupyterhub" },
      ],
    },
    ourWork: {
      name: "Our Work",
      href: "/our-work",
      items: [
        { name: "Collaborations", href: "#" },
        {
          name: "Software",
          href: "/our-work/software",
        },
        {
          name: "Workshops and Talks",
          href: "/our-work/workshops-and-talks",
        },
        {
          name: "Publications",
          href: "https://publications.ccv.brown.edu",
        },
      ],
    },
    help: {
      name: "Help",
      href: "/help",
      items: [
        { name: "Submit a Ticket", href: "mailto:support@ccv.brown.edu" },
        {
          name: "Discourse",
          href: "https://ask.cyberinfrastructure.org/c/brown-research-computing/37",
        },
        {
          name: "Slack",
          href: "https://ccv-share.slack.com/signup#/",
        },
        {
          name: "Office Hours",
          href: "https://events.brown.edu/ccv/month",
        },
      ],
    },
    about: {
      name: "About",
      href: "/about",
      items: [
        { name: "Mission", href: "/about#mission" },
        {
          name: "Office of Information Technology",
          href: "/about#office-of-information-technology",
        },
        {
          name: "Our Teams",
          href: "/about#our-teams",
        },
        {
          name: "People",
          href: "/about#people",
        },
        {
          name: "Opportunities",
          href: "/about#opportunities",
        },
        {
          name: "Events",
          href: "https://events.brown.edu/ccv/month",
        },
        {
          name: "Facilities Statement",
          href: "/about#facilities-statement",
        },
        {
          name: "Diversity Statement",
          href: "/about#diversity-statement",
        },
      ],
    },
  }
  return (
    <footer aria-labelledby="footer-heading" className="w-full bg-neutral-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-24 lg:px-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8">
            <div className="flex w-2/3 gap-3.5">
              <LogoBrown />
              <LogoCcv />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 xl:col-span-2">
            {Object.entries(navigation).map(([_, contents]) => {
              return (
                <div key={_}>
                  <Link
                    href={contents.href}
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary-blue-700 hover:border-b-2"
                  >
                    {contents.name}
                  </Link>
                  <ul role="list" className="mt-6 space-y-2">
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
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-16">
        <p className="mb-8 text-xs text-center leading-5 text-gray-500">
          &copy; 2021 Center for Computation and Visualization, Brown University
          | 180 George St, Providence RI 02906
        </p>
      </div>
    </footer>
  )
}
