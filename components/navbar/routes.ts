import { NavSection } from "@/components/navbar/navbar-types"
import {
  FaBook,
  FaBuilding,
  FaCloud,
  FaCompass,
  FaDesktop,
  FaDollarSign,
  FaEnvelope,
  FaFileImport,
  FaPenNib,
  FaRobot,
  FaUser,
  FaUserCheck,
  FaUserGraduate,
  FaUserPlus,
  FaWindowRestore,
} from "react-icons/fa"

export const routes: NavSection[] = [
  {
    name: "Services",
    groups: [
      {
        name: "Compute Infrastructure",
        routes: [
          {
            name: "Rates",
            href: "/services/rates",
            description: "Learn about the cost of our compute infrastructure",
            icon: FaDollarSign,
          },
          {
            name: "Oscar",
            href: "/services/oscar",
            description: "Brown's high-performance computing cluster",
            icon: FaCloud,
          },
          {
            name: "Stronghold",
            href: "/services/stronghold",
            description: "Brown's highly secure computing & storage enclave",
            icon: FaWindowRestore,
          },
          {
            name: "Storage and Transfer",
            href: "/services/storage",
            description: "Brown's storage options",
            icon: FaFileImport,
          },
          {
            name: "Virtual Machine Hosting",
            href: "/services/virtual-machine-hosting",
            description: "Brown-hosted Windows and Linux servers",
            icon: FaDesktop,
          },
        ],
      },
      {
        name: "Research Support & Consulting",
        routes: [
          {
            name: "Project Consulting",
            href: "/services/project-consulting",
            description:
              "We help with: Computational Biology, AI / Machine Learning, Software Engineering, Scientific Visualization, and more",
            icon: FaCompass,
          },
          {
            name: "Workshops and Tutorials",
            href: "/services/workshops",
            description:
              "Trainings on using computational tools and techniques",
            icon: FaUserCheck,
          },
          {
            name: "Department Support",
            href: "/services/department-support",
            description: "We provide advanced support for specific departments",
            icon: FaBuilding,
          },
          {
            name: "Classroom Support",
            href: "/services/classroom",
            description:
              "We provide technology and training for teaching with code",
            icon: FaUserGraduate,
          },
        ],
      },
    ],
  },
  {
    name: "Portfolio",
    groups: [
      {
        name: "",
        routes: [
          // {
          //   name: "Collaborations",
          //   href: "/portfolio/collaborations",
          //   description: "*Coming Soon*",
          //   icon: FaHandshake,
          // },
          // {
          //   name: "Software",
          //   href: "/portfolio/software",
          //   description: "*Coming Soon*",
          //   icon: FaCode,
          // },
          // {
          //   name: "Workshops and Talks",
          //   href: "/portfolio/workshops-and-talks",
          //   description: "*Coming Soon*",
          //   icon: FaChalkboardTeacher,
          // },
          {
            name: "Publications",
            href: "https://publications.ccv.brown.edu",
            description: "",
            icon: FaBook,
          },
        ],
      },
    ],
  },
  {
    name: "AI",
    groups: [
      {
        name: "",
        routes: [
          {
            name: "AI Tools",
            href: "/ai/ai-tools",
            description: "",
            icon: FaRobot,
          },
          {
            name: "AI on Oscar",
            href: "/ai/ai-oscar",
            description: "",
            icon: FaCloud,
          },
        ],
      },
    ],
  },
  {
    name: "About",
    groups: [
      {
        name: "",
        routes: [
          {
            name: "About Us",
            href: "/about/us",
            description: "",
            icon: FaUser,
          },
          {
            name: "Contact Us",
            href: "/about/help#contact-us",
            description: "",
            icon: FaEnvelope,
          },
          {
            name: "Grant and Publication Materials",
            href: "/about/grant-and-publication-materials",
            description: "",
            icon: FaPenNib,
          },
          {
            name: "Careers",
            href: "/about/careers",
            description: "",
            icon: FaUserPlus,
          },
        ],
      },
    ],
  },
]
