import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routeNames } from "./Routes/routeNames";
import GeneralLayout from "./Layout/GeneralLayout";

function App() {
  return (
    <Routes>
      <Route path={routeNames.general.landing} element={<GeneralLayout />}>
        <Route path={routeNames.general.landing} element={<></>} />
      </Route>
    </Routes>
  );
}

export default App;
