import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.scss";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AdminPage } from "./pages/AdminPage";
import { CreatePostPage } from "./pages/CreatePostPage";

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
                <Navigate to="/home" />
              ) : (
                <AuthenticationPage />
              )
            }
          />
          <Route
            path="/home"
            element={
              localStorage.getItem("token") ? (
                <AdminPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create_post"
            element={
              localStorage.getItem("token") ? (
                <CreatePostPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
