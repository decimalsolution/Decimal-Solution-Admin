import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routeNames } from "./Routes/routeNames";
import GeneralLayout from "./Layout/GeneralLayout";
import { AddService } from "./Pages/Services/AddService";
import ViewServices from "./Pages/Services/ViewSerivces";
import { AddProject } from "./Pages/Projects/AddProject";
import ViewProjects from "./Pages/Projects/ViewProjects";
import { AddProduct } from "./Pages/Products/AddProduct";
import ViewProducts from "./Pages/Products/ViewProducts";
import { AddJob } from "./Pages/Jobs/AddJob";
import ViewJobs from "./Pages/Jobs/ViewJobs";
import { AddTeam } from "./Pages/Team/AddTeam";
import ViewTeams from "./Pages/Team/ViewTeamMembers";
import { AddBlog } from "./Pages/Blog/AddBlog";
import ViewBlogs from "./Pages/Blog/ViewBlogs";
import { Settings } from "./Pages/Settings";
import { AboutUs } from "./Pages/AboutUs";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path={routeNames.general.login} element={<Login />} />
      <Route path={routeNames.general.landing} element={<GeneralLayout />}>
        <Route path={routeNames.general.landing} element={<Dashboard />} />
        <Route path={routeNames.general.addService} element={<AddService />} />
        <Route
          path={routeNames.general.viewService}
          element={<ViewServices />}
        />
        <Route path={routeNames.general.addProject} element={<AddProject />} />
        <Route
          path={routeNames.general.viewProjects}
          element={<ViewProjects />}
        />
        <Route path={routeNames.general.addProduct} element={<AddProduct />} />
        <Route
          path={routeNames.general.viewProducts}
          element={<ViewProducts />}
        />
        <Route path={routeNames.general.addJob} element={<AddJob />} />
        <Route path={routeNames.general.viewJobs} element={<ViewJobs />} />
        <Route path={routeNames.general.addTeam} element={<AddTeam />} />
        <Route path={routeNames.general.viewTeams} element={<ViewTeams />} />
        <Route path={routeNames.general.settings} element={<Settings />} />
        <Route path={routeNames.general.aboutUs} element={<AboutUs />} />
        <Route path={routeNames.general.addBlog} element={<AddBlog />} />
        <Route path={routeNames.general.viewBlogs} element={<ViewBlogs />} />
      </Route>
    </Routes>
  );
}

export default App;
