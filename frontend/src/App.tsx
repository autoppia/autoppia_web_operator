import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Landing from "./pages/landing";
import Operator from "./pages/operator";

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Operator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
