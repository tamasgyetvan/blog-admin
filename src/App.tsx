import { Navigate, Route } from "react-router-dom";
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
                <AuthenticationPage></AuthenticationPage>
              )
            }
          ></Route>
          <Route
            path="/home"
            element={
              localStorage.getItem("token") ? (
                <AdminPage></AdminPage>
              ) : (
                <Navigate to="/"></Navigate>
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
