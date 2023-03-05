import "./App.css";
import LeftPane from "./Components/sideBar";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import AssetsPage from "./pages/AssetsPage";
import AddAssetForm from "./Components/AddAssetForm";
import RegistrationForm from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./Components/NavBar";
import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const user = useSelector((state) => state?.login.user);
  const authrized = user[0] !== undefined;
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
    setShowRegisterForm(false);
  };
  const goToSignup = () => {
    setShowRegisterForm(true);
    navigate("/login");
  };

  const handleCloseRegisterForm = () => setShowRegisterForm(false);
  const handleShowRegisterForm = () => setShowRegisterForm(true);
  const handleShowLoginForm = () => navigate("/login");
  return (
    <div className="">
      {authrized ? (
        <div>
          <NavBar />
          <div className="App">
            <LeftPane />
            <div className="feed w-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/assets" element={<AssetsPage />} />
                <Route path="/categories/assets/:id" element={<AssetsPage />} />
                <Route path="/addasset" element={<AddAssetForm />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/categories" element={<Login />} />
          <Route path="/categories/assets" element={<Login />} />
          <Route path="/categories/assets/:id" element={<Login />} />
          <Route path="/addasset" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<RegistrationForm />} />
        </Routes>
      )}
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
