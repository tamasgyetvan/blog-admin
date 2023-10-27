import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.scss";
import { AuthenticationPage } from "./components/pages/AuthenticationPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AdminPage } from "./components/pages/AdminPage";
import { CreatePostPage } from "./components/pages/CreatePostPage";
import { DataContextProvider } from "./context/DataContext";
import { EditPostPage } from "./components/pages/EditPostPage";

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
