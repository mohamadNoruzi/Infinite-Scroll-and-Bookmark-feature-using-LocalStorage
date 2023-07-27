import { UserContextProvider } from "./context/userContext";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CryptoList from "./CryptoList";
import axios from "axios";
import SignPanel from "./signup_signin/components/SignPanel";
import SignUp from "./signup_signin/components/SignUp";
import Login from "./signup_signin/components/Login";
import Profile from "./signup_signin/components/Profile";

axios.defaults.baseURL = "https://express-auth-api.onrender.com";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <div className="w-full h-full bg-gray-50">
        <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
        <div>
          <nav className="flex justify-end pr-2">
            <Profile />
          </nav>
        </div>
        <Routes>
          <Route path="/sign-panel" element={<SignPanel />}>
            <Route path="/sign-panel/SignUp" element={<SignUp />} />
            <Route path="/sign-panel/Login" element={<Login />} />
          </Route>
          <Route path="/" element={<CryptoList />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}
