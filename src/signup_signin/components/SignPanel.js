import React from "react";
import { Link, useLocation } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

export default function SignPanel() {
  const location = useLocation();

  const setContent = () => {
    switch (location.pathname) {
      case "/sign-panel/SignUp":
        return <SignUp />;

      case "/sign-panel/Login":
        return <Login/>;

      default:
        return <SignUp />;
    }
  };

  return (
    <div className="h-screen w-full">
      <nav className="flex justify-evenly items-center w-full shadow-sm">
        <Link to="/sign-panel/SignUp">
          <div className="cursor-pointer py-4 mx-8">
            <h2>sign up</h2>
          </div>
        </Link>
        <Link to="/sign-panel/Login">
          <div className="cursor-pointer py-4 mx-8">
            <h2>login</h2>
          </div>
        </Link>
      </nav>
      <div className="h-full bg-slate-100">{setContent()}</div>
    </div>
  );
}
