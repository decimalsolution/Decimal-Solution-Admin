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
  Users,
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
      { label: "View Services", link: routeNames.general.viewService },
    ],
  },
  {
    label: "Projects",
    icon: Devices,
    links: [
      { label: "Add Project", link: routeNames.general.addProject },
      { label: "View Projects", link: routeNames.general.viewProjects },
    ],
  },
  {
    label: "Products",
    icon: BrandVite,
    links: [
      { label: "Add Product", link: routeNames.general.addProduct },
      { label: "View Products", link: routeNames.general.viewProducts },
    ],
  },
  {
    label: "Jobs",
    icon: Briefcase,
    links: [
      { label: "Add Job", link: routeNames.general.addJob },
      { label: "View Jobs", link: routeNames.general.viewJobs },
      { label: "Job Applications",link: routeNames.general.jobApplications },
    ],
  },
  {
    label: "Team",
    icon: Users,
    links: [
      { label: "Add Team Member", link: routeNames.general.addTeam },
      { label: "View Team Members", link: routeNames.general.viewTeams },
    ],
  },
  {
    label: "Blogs",
    icon: BrandBlogger,
    links: [
      { label: "Add Blog", link: routeNames.general.addBlog },
      { label: "View Blogs", link: routeNames.general.viewBlogs },
    ],
  },
  {
    label: "About Us",
    icon: AddressBook,
    link: routeNames.general.aboutUs,
  },
  {
    label: "Settings",
    icon: Settings,
    link: routeNames.general.settings,
  },
];
