import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./scss/layouts/Base.scss";
import { AuthenticationPage } from "./components/layouts/AuthenticationPage";
import { AdminPage } from "./components/layouts/AdminPage";
import { CreatePostPage } from "./components/layouts/CreatePostPage";
import { DataContextProvider } from "./context/DataContext";
import { EditPostPage } from "./components/layouts/EditPostPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <DataContextProvider>
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
            <Route
              path="/post/:id"
              element={
                localStorage.getItem("token") ? (
                  <EditPostPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </DataContextProvider>
      <Footer />
    </>
  );
}

export default App;
