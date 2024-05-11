import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [uniqueID, setUniqueID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUniqueIdChange = (event) => {
    setUniqueID(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleAdminLogin = async () => {
    if (!email || !password || !uniqueID) {
      alert("Please enter email, password or uniqueID");
      return;
    }
    try {
      let result = await fetch ("http://localhost:8081/adminLogin", {
        method: "POST",
        body: JSON.stringify({ email, password, uniqueID }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if (!result.ok) {
      //   throw new Error("Network response was not ok.");
      // }

      const data = await result.json();
      console.log(data?.data);

      if (!data.success) {
        alert(data.message);
        return;
      }
      localStorage.setItem("userId", JSON.stringify(data.data._id));
      alert("successful login");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold tracking-wide text-gray-800">
            Login as an Admin!
          </h1>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-800">Email</label>
              <input
                value={email}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-50 focus:outline-none focus:border-violet-500"
                placeholder="Enter your email"
                type="email"
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="flex flex-col mt-4 relative">
              <label className="text-lg font-medium text-gray-800">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  className="w-full border-2 border-gray-200 rounded-xl p-4  mt-1 bg-gray-50 focus:outline-none focus:border-violet-500"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      className="text-gray-500 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <AiFillEye
                      className="text-gray-500 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium text-gray-800">
                UniqueID
              </label>
              <input
                value={uniqueID}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-50 focus:outline-none focus:border-violet-500"
                placeholder="Enter your email"
                type="email"
                onChange={handleUniqueIdChange}
                required
              />
            </div>
            <div className=" flex justify-end">
              <button className="font-medium text-base text-violet-500">
                Forgot password?
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleAdminLogin}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Login
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center tracking-wider">
              <p className="font-medium text-base text-gray-600">
                Don't have an Admin account?
              </p>
              <button
                className="ml-2 font-medium text-base text-violet-500"
                onClick={() => {
                  navigate("/adminRegister");
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default AdminLogin;
