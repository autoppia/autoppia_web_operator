import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./App.css";

// Pages
import Home from "./pages/home";
import Operator from "./pages/operator";
import { setUser } from "./redux/userSlice";

try {
  const accessToken = Cookies.get("access_token");
  if (!accessToken) {
    const currentURL = window.location.href;
    const url = new URL("https://app.autoppia.com/auth/sign-in");
    url.searchParams.append("redirectURL", currentURL);
    window.location.href = url.href;
  }
  const decodedToken = jwtDecode(accessToken!) as any;
  localStorage.setItem("EMAIL", decodedToken.email);
} catch (error) {
  console.error(error);
}

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(11111);
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("EMAIL");
        const response = await fetch(`${apiUrl}/user?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          dispatch(
            setUser({
              email: data.user.email,
              instructions: data.user.instructions,
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);

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
