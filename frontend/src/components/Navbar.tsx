import { Avatar } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncLogin, asyncLogout } from "../store/authSlice";
import { RootState } from "../store/store";
import { FaGithub } from 'react-icons/fa'
import { useLocation } from "react-router-dom";
export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch()
  const location = useLocation();
  const handleLogin = async () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  const handleLogout = () => {
    dispatch(asyncLogout() as any)
  }
  console.log("user is: ", user);
  return (
    <div className="w-screen relative z-50">
      <div className="flex items-center font-mono h-full px-12 justify-between z-50">
        <h1 className="flex items-center  text-slate-200 z-50">
          <Link to={"/"} className="text-inherit">
            <p className="flex flex-col text-white">
              <span className="text-base font-bold">NPA TECH IDE</span>
              <span className="text-xs">code anywhere, anytime.</span>
            </p>
          </Link>
        </h1>
        <div className="flex z-50 space-x-2">
          <Link 
            to={"/playground"}
            className={`p-1 px-3 border ${location.pathname === "/playground" ? "border-green-500" : "border-slate-300"} rounded-sm text-white hover:bg-white hover:text-black`}
          >
            PLAYGROUND
          </Link>
          <Link
            to={"/calculator"}
            className={`p-1 px-3 border ${location.pathname === "/calculator" ? "border-green-500" : "border-slate-300"} rounded-sm text-white hover:bg-white hover:text-black`}
          >
            TIME COMPLEXITY
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-5 z-50">
          <div>
            <a href="https://github.com/wience/bytecode-vm" target="_blank" rel="noopener noreferrer">
              <button className="p-1 px-3 border border-slate-300 rounded-sm text-white hover:bg-white hover:text-black flex items-center">
                <FaGithub className="mr-2" /> {/* GitHub icon */}
                NPA Source Code
              </button>
            </a>
          </div>
          <Link
            to={"/create"}
            className={`p-1 px-3 border ${location.pathname === "/create" ? "border-green-500" : "border-slate-300"} rounded-sm text-white hover:bg-white hover:text-black`}
          >
            Add Problem
          </Link>
          {user && (
            <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleLogout}>
              <img src={user.image} alt="" className="w-8 h-8 rounded-full object-cover object-center" />
            </div>
          )}
          {!user && (
            <button className="p-1 px-3 bg-white rounded" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
      <div className="absolute w-full h-full bg-primary top-0 -z-1"></div>
    </div>
  );
}
