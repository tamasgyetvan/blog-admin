import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { router } from "../src/router/Router";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
