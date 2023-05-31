import React from "react";
import { sidebarData } from "./sidebarData";
import { SideBar } from "./Sidebar";

const AdminSideBar = () => {
  return <SideBar sideBarLinks={sidebarData} />;
};

export default AdminSideBar;
