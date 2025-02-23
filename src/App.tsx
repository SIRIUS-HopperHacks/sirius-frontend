import LandingPage from "@pages/LandingPage"
import HomePage from "@pages/HomePage"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/homepage" element={<HomePage />} />
  </Routes>
</BrowserRouter>
};

export default App;
