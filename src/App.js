import { Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
// paages
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
