import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routeNames } from "./Routes/routeNames";
import GeneralLayout from "./Layout/GeneralLayout";
import { AddService } from "./Pages/Services/AddService";
import ViewServices from "./Pages/Services/ViewSerivces";
import { AddProject } from "./Pages/Projects/AddProject";
import ViewProjects from "./Pages/Projects/ViewProjects";

function App() {
  return (
    <Routes>
      <Route path={routeNames.general.landing} element={<GeneralLayout />}>
        <Route path={routeNames.general.addService} element={<AddService />} />
        <Route
          path={routeNames.general.viewService}
          element={<ViewServices />}
        />
        <Route path={routeNames.general.addProject} element={<AddProject />} />
        <Route path={routeNames.general.viewProjects} element={<ViewProjects />} />
      </Route>
    </Routes>
  );
}

export default App;
