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

function App() {
  const assets = useSelector((state) => state.assets);
  const assetsCCat = useSelector((state) => state.assets.getAssets);
  const dispatch = useDispatch();

  return (
    <div>
      <NavBar className="" />
      <div className="App">
        <LeftPane />
        <div className="feed w-100">
          <Routes>
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/assets" element={<AssetsPage />} />
            <Route path="/categories/assets/:id" element={<AssetsPage />} />
            <Route path="/addasset" element={<AddAssetForm />} />
          </Routes>
        </div>
        <RightPane />
      </div>
    </div>
  );
}

export default App;
