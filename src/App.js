import "./App.css";
import LeftPane from "./Components/sideBar";
import RightPane from "./Components/details";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import AssetsPage from "./pages/AssetsPage";
import AddAssetForm from "./Components/AddAssetForm";
import RegistrationForm from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";

function App() {

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const user = useSelector((state) => state?.login.user);
  const authrized = user[0] !== undefined;
  
  const goToLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };
  const goToSignup = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };
  
  const handleCloseRegisterForm = () => setShowRegisterForm(false);
  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowRegisterForm = () => setShowRegisterForm(true);
  const handleShowLoginForm = () => setShowLoginForm(true);


  return (
    <div className="">
      <NavBar />
      <div className="App">
        <LeftPane />
        <div className="feed w-100">
          <Routes>
            <Route
              path="/"
              element={
                authrized ? (
                  <div>Hello</div>
                ) : (
                  <Login
                    goToSignup={goToSignup}
                    show={true}
                    handleClose={handleCloseLoginForm}
                    handleShow={handleShowLoginForm}
                  />
                )
              }
            />
            <Route
              path="/categories"
              element={
                authrized ? (
                  <CategoriesPage />
                ) : (
                  <Login
                    goToSignup={goToSignup}
                    show={true}
                    handleClose={handleCloseLoginForm}
                    handleShow={handleShowLoginForm}
                  />
                )
              }
            />
            <Route
              path="/categories/assets"
              element={
                authrized ? (
                  <AssetsPage />
                ) : (
                  <Login
                    goToSignup={goToSignup}
                    show={true}
                    handleClose={handleCloseLoginForm}
                    handleShow={handleShowLoginForm}
                  />
                )
              }
            />
            <Route
              path="/categories/assets/:id"
              element={
                authrized ? (
                  <AssetsPage />
                ) : (
                  <Login
                    goToSignup={goToSignup}
                    show={true}
                    handleClose={handleCloseLoginForm}
                    handleShow={handleShowLoginForm}
                  />
                )
              }
            />
            <Route
              path="/addasset"
              element={
                authrized ? (
                  <AddAssetForm />
                ) : (
                  <Login
                    goToSignup={goToSignup}
                    show={true}
                    handleClose={handleCloseLoginForm}
                    handleShow={handleShowLoginForm}
                  />
                )
              }
            />
          </Routes>
        </div>
        <RightPane />
      </div>
      <RegistrationForm
        goToLogin={goToLogin}
        show={showRegisterForm}
        handleClose={handleCloseRegisterForm}
        handleShow={handleShowRegisterForm}
      />
    </div>
  );
}

export default App;
