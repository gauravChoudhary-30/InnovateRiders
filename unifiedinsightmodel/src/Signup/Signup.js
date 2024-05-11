import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [name, setName] = useState("");
  // const { register, handleSubmit } = useForm();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const collectData = async () => {
    try {
      console.log(name, email, password);
      const responce = await axios.post("http://localhost:8081/register", {
        username: name,
        email: email,
        password: password,
      });
      console.log(responce);

      if (!responce.ok) {
        throw new Error("failed to fetch");
      }
      const result = await responce.json();
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", result.auth);
      
      navigate("/");
    } catch (error) {
      console.error("Error fetching data :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold tracking-wide text-gray-800">
            Register!
          </h1>
          <p className="font-medium text-lg text-gray-500 mt-4 tracking-widest">
            Please enter your details.
          </p>
          <div className="mt-8">
            <form>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium text-gray-800">
                  Username
                </label>
                <input
                  className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-gray-50 focus:outline-none focus:border-violet-500"
                  placeholder="Enter your Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // {...register("username", {
                  //   required: true,
                  // })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-800">
                  Email
                </label>
                <input
                  className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-gray-50 focus:outline-none focus:border-violet-500"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  // {...register("email", {
                  //   required: true,
                  // })}
                />
              </div>
              <div className="flex flex-col mt-4 relative">
                <label className="text-lg font-medium text-gray-800">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-gray-50 focus:outline-none focus:border-violet-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    // {...register("password", {
                    //   required: true,
                    // })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        className="text-gray-500 cursor-pointer "
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

              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                  // disabled={loading}
                  onClick={collectData}
                >
                  {/* {loading ? "Signing up..." : "Sign Up"} */}
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="mt-8 flex justify-center items-center tracking-wider">
              <p className="font-medium text-base text-gray-600">Have an account?</p>
              <button className="ml-2 font-medium text-base text-violet-500" onClick={() => {navigate('/');}} >Login</button>
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

export default Signup;
