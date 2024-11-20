import Link from "next/link"
import LogoBrown from "@/components/assets/LogoBrown"
import LogoCcv from "@/components/assets/LogoCcv"

export default function Footer() {
  const navigation = [
    {
      title: "Services",
      href: "/services",
      routes: [
        { title: "Classroom", href: "/services/classroom" },
        { title: "Computing", href: "/services/computing" },
        {
          title: "Campus File Storage and Transfer",
          href: "/services/file-storage-and-transfer",
        },
        { title: "Rates", href: "/services/rates" },
        { title: "Visualization Systems", href: "/services/visualization" },
        { title: "Consulting", href: "/services/consulting" },
      ],
    },
    {
      title: "Documentation",
      href: "/documentation",
      routes: [
        { title: "Oscar", href: "https://docs.ccv.brown.edu" },
        {
          title: "Stronghold",
          href: "/services/computing#data-risk-level-3-computing-(stronghold)",
        },
        { title: "Globus", href: "/services/file-storage-and-transfer#globus" },
        { title: "Jupyter Hub", href: "/services/classroom#jupyterhub" },
      ],
    },
    {
      title: "Our Work",
      href: "/our-work",
      routes: [
        { title: "Collaborations", href: "#" },
        {
          title: "Software",
          href: "/our-work/software",
        },
        {
          title: "Workshops and Talks",
          href: "/our-work/workshops-and-talks",
        },
        {
          title: "Publications",
          href: "https://publications.ccv.brown.edu",
        },
      ],
    },
    {
      title: "Help",
      href: "/help",
      routes: [
        { title: "Submit a Ticket", href: "mailto:support@ccv.brown.edu" },
        {
          title: "Discourse",
          href: "https://ask.cyberinfrastructure.org/c/brown-research-computing/37",
        },
        {
          title: "Slack",
          href: "https://ccv-share.slack.com/signup#/",
        },
        {
          title: "Office Hours",
          href: "https://events.brown.edu/ccv/month",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
      routes: [
        { title: "Mission", href: "/about#mission" },
        {
          title: "Office of Information Technology",
          href: "/about#office-of-information-technology",
        },
        {
          title: "Our Teams",
          href: "/about#our-teams",
        },
        {
          title: "People",
          href: "/about#people",
        },
        {
          title: "Opportunities",
          href: "/about#opportunities",
        },
        {
          title: "Events",
          href: "https://events.brown.edu/ccv/month",
        },
        {
          title: "Facilities Statement",
          href: "/about#facilities-statement",
        },
        {
          title: "Diversity Statement",
          href: "/about#diversity-statement",
        },
      ],
    },
    {
      title: "Blog",
      href: "/blog",
      routes: [],
    },
  ]
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:col-span-2">
            {navigation.map((contents) => {
              return (
                <div key={contents.href}>
                  <p
                    href={contents.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {contents.title}
                  </p>
                  <ul role="list" className="mt-6 space-y-2">
                    <li>
                      <Link
                        href={contents.href}
                        className="text-sm leading-6 text-secondary-blue-700 hover:text-black hover:border-b-2"
                      >
                        Explore {contents.title}
                      </Link>
                    </li>
                    {contents.routes.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-secondary-blue-700 hover:text-black hover:border-b-2"
                        >
                          {item.title}
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
          &copy; 2024 Center for Computation and Visualization, Brown University
          | 180 George St, Providence RI 02906
        </p>
      </div>
    </footer>
  )
}
