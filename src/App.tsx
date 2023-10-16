import { Navigate, Route, RouterProvider, redirect } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.scss";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AdminPage } from "./pages/AdminPage";
function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/home"></Navigate>
              ) : (
                <AuthenticationPage />
              )
            }
          ></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
