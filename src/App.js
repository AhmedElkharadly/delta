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
import { useState } from "react";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const user = useSelector((state) => state?.login.user);
  const authrized = user[0] !== undefined;
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const goToLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };
  const goToSignup = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };
  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };
  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };
  const handleShowRegisterForm = () => setShowRegisterForm(true);
  const handleShowLoginForm = () => setShowLoginForm(true);

  return (
    <div>
      <NavBar className="" />
      <div className="App">
        <LeftPane />
        <div className="feed w-100">
          <Routes>
            <Route
              path="/"
              element={authrized ? <div>Hello</div> : <Login />}
            />
            <Route
              path="/categories"
              element={authrized ? <CategoriesPage /> : <Login />}
            />
            <Route
              path="/categories/assets"
              element={authrized ? <AssetsPage /> : <Login />}
            />
            <Route
              path="/categories/assets/:id"
              element={authrized ? <AssetsPage /> : <Login />}
            />
            <Route
              path="/addasset"
              element={authrized ? <AddAssetForm /> : <Login />}
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
      <Login
        goToSignup={goToSignup}
        show={showLoginForm}
        handleClose={handleCloseLoginForm}
        handleShow={handleShowLoginForm}
      />
    </div>
  );
}

export default App;
