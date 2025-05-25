import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import "./App.css";

// Pages
import Home from "./pages/home";
import Operator from "./pages/operator";
import { setEmail } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const accessToken = Cookies.get('access_token');
      // if (!accessToken) {
      //   const currentURL = window.location.href;
      //   const url = new URL("https://app.autoppia.com/auth/sign-in")
      //   url.searchParams.append("redirectURL", currentURL);
      //   window.location.href = url.href;
      // }
      // const decodedToken = jwtDecode(accessToken!)
      dispatch(setEmail("johndoe@example.com"))
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operator" element={<Operator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
