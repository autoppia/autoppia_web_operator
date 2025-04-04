import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import "./App.css";

// Pages
import Landing from "./pages/landing";
import Operator from "./pages/operator";

// try {
//   const accessToken = Cookies.get('access_token');
//   if (!accessToken) {
//     const currentURL = window.location.href;
//     const url = new URL("https://app.autoppia.com/auth/sign-in")
//     url.searchParams.append("redirectURL", currentURL);
//     window.location.href = url.href;
//   }
//   const decodedToken = jwtDecode(accessToken!)
// } catch (error) {
//   console.error(error)
// }

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
