import LandingPage from "@pages/LandingPage";
import HomePage from "@pages/HomePage";
import ShelterPage from "@pages/ShelterPage";
import SpecificShelterPage from "@pages/SpecificShelterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/shelter-details" element={<SpecificShelterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
