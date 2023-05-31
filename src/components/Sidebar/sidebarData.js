import {
  AddressBook,
  Book2,
  BrandBlogger,
  BrandVite,
  Briefcase,
  Category2,
  Devices,
  Graph,
  Settings,
  Users
} from "tabler-icons-react";
import { routeNames } from "../../Routes/routeNames";
export const sidebarData = [
  {
    label: "Dashboard",
    icon: Graph,
    link: routeNames.general.landing,
  },
  {
    label: "Services",
    icon: Category2,
    links: [
      { label: "Add Service", link: routeNames.general.addService },
      { label: "View Services", link: routeNames.general.landing },
    ],
  },
  {
    label: "Projects",
    icon: Devices,
    links: [
      { label: "Add Project", link: routeNames.general.landing },
      { label: "View Projects", link: routeNames.general.landing },
    ],
  },
  {
    label: "Products",
    icon: BrandVite,
    links: [
      { label: "Add Product", link: routeNames.general.landing },
      { label: "View Products", link: routeNames.general.landing },
    ],
  },
  {
    label: "Jobs",
    icon: Briefcase,
    links: [
      { label: "Add Service", link: routeNames.general.landing },
      { label: "View Services", link: routeNames.general.landing },
    ],
  },
  {
    label: "Team",
    icon: Users,
    links: [
      { label: "Add Service", link: routeNames.general.landing },
      { label: "View Services", link: routeNames.general.landing },
    ],
  },
  {
    label: "Blogs",
    icon: BrandBlogger,
    links: [
      { label: "Add Blog", link: routeNames.general.landing },
      { label: "View Blogs", link: routeNames.general.landing },
    ],
  },
  {
    label: "Job Applications",
    icon: Book2,
    links: [{ label: "View Applications", link: routeNames.general.landing }],
  },
  {
    label: "Contact Us",
    icon: AddressBook,
    link: routeNames.general.landing,
  },
  {
    label: "Settings",
    icon: Settings,
    link: routeNames.general.landing,
  },
];