import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Landing from "./pages/landing";
import Operator from "./pages/operator";

import { useDispatch } from "react-redux";
import { initializeSocket } from './utils/socket';

const BACKEND_URL = 'http://54.195.214.72:4000';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeSocket(dispatch, BACKEND_URL);
  }, []);
  
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
