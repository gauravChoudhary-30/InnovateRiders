import React,{useState, useEffect} from "react";
import logo from "../img/logohackfest.jpg";
import usericon from "../img/user.png";
import losslogo from "../img/loss.png";
import downarrow from "../img/arrow-down-sign-to-navigate.png";
import piechart from "../img/piechart.PNG";

export default function Dashboard() {
    const [profileVisible, setProfileVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    
  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "http://localhost:3000/adminLogin";
  };
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUser(userData);
      }, []);
    const toggleProfileVisibility = () => {
      setProfileVisible(!profileVisible);
    };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="text-white p-3 flex justify-between items-center bg-violet-500 tracking-wide">
        <div className="text-xl font-bold flex items-center active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
          <a href="#home">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          </a>
          <a
            href="#home"
            className="ml-2 text-3xl font-semibold font-calibri tracking-wide"
          >
            Unified Customer Insights
          </a>
        </div>
        <div className="flex space-x-4 relative">
          <a
            href="#home"
            className="hover:underline px-5 text-xl font-calibri active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out relative"
            onClick={handleToggleDropdown}
          >
            Admin Dashboard
          </a>
          {dropdownVisible && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 shadow-xl rounded-lg">
              <button
                onClick={handleLogout}
                className="block text-black w-full py-2 px-4 text-left hover:bg-gray-200"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="bg-[#F1EFE6] flex flex-col flex-grow">
        <div className="bg-white flex flex-row items-center p-4">
          <h2 className="text-lg font-semibold">Product Churn Analysis</h2>
          <img src={losslogo} className="w-7 h-7 ml-2" alt="Churn" />
        </div>
        <div className="flex flex-row">
          <button
            className="absolute mt-8 ml-5 shadow-xl bg-white border flex flex-row items-center justify-center p-2 border-gray-300 rounded-lg"
            onClick={toggleProfileVisibility}
          >
            <h3 className="font-bold">My Profile</h3>
            <img src={downarrow} alt="down" className="w-5 h-5 ml-2" />
          </button>
        </div>

        {profileVisible && (
  <div className="absolute top-52 left-4 w-48 bg-white border border-gray-300 shadow-xl rounded-lg">
    <p className="px-4 py-2 font-semibold border-b border-gray-200 hover:bg-gray-200">Name: {user.name}</p>
    <p className="px-4 py-2 font-semibold border-b border-gray-200 hover:bg-gray-200">Username: {user.username}</p>
    <p className="px-4 py-2 font-semibold border-b border-gray-200 hover:bg-gray-200">Email: {user.email}</p>
    <p className="px-4 py-2 font-semibold border-b border-gray-200 hover:bg-gray-200">Organization: {user.orgName}</p>
    <p className="px-4 py-2 font-semibold hover:bg-gray-200">Phone: {user.phNo}</p>
  </div>
)}



        <div className=" w-full flex justify-evenly p-8">
          <div className="w-48 h-68 mb-4 p-4 border border-gray-300 shadow-xl bg-white flex flex-col items-center">
            <div className="flex flex-row items-center mb-2">
              <img src={usericon} className="w-6 h-6 mr-2" alt="User Icon" />
              <p className="text-sm font-semibold text-xl">All Customers</p>
            </div>
            <hr className="w-full border-t-2 border-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">5631</h1>
          </div>

          <div className="mb-4 p-4 border border-gray-300 shadow-md bg-white flex flex-col items-center">
            <div className="flex flex-row items-center mb-2">
              <img src={usericon} className="w-6 h-6 mr-2" alt="User Icon" />
              <p className="text-sm font-semibold text-xl">New Customers</p>
            </div>
            <hr className="w-full border-t-2 border-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">15</h1>
          </div>

          <div className=" mb-4 p-4 border border-gray-300 shadow-md bg-white flex flex-col items-center">
            <div className="flex flex-row items-center mb-2">
              <img src={usericon} className="w-6 h-6 mr-2" alt="User Icon" />
              <p className="text-sm font-semibold text-xl">Loyal Customers</p>
            </div>
            <hr className="w-full border-t-2 border-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">4682</h1>
          </div>

          <div className=" mb-4 p-4 border border-gray-300 shadow-md bg-white flex flex-col items-center">
            <div className="flex flex-row items-center mb-2">
              <img src={usericon} className="w-6 h-6 mr-2" alt="User Icon" />
              <p className="text-sm font-semibold text-xl">Churn Customers</p>
            </div>
            <hr className="w-full border-t-2 border-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">948</h1>
          </div>
         
        </div>
        <div className="flex justify-center">
            <img src={piechart} alt="piechart" className="w-96 h-72"/>
          </div>
      </div>
      <footer className="text-white p-4 text-center bg-violet-500">
        © 2024 Unified Customer Insights.
      </footer>
    </div>
  );
}
