import React, { useState, useEffect } from "react";
import { predictSentiment } from "../apis/predictionAPI";
import logo from "../img/logohackfest.jpg";
import ReviewCard from "../components/card";
import ProductCard from "../components/productCard";
import { useNavigation } from "react-router-dom";
export default function Home() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigation();


  const signOutHandler = () => {
    localStorage.removeItem("reviews");
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.trim() !== "") {
      try {
        const sentiment = await predictSentiment(review);
        const updatedReviews = [...reviews, { text: review, sentiment }];
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        setReview("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
      setReviews(storedReviews);
    }
  }, []);

  return (
    
      
    <div className="flex flex-col min-h-screen">
    <nav
      className="text-white p-4 flex justify-between items-center"
      style={{ backgroundColor: "#27005D" }}
    >
      <div className="text-xl font-bold flex items-center">
        {" "}
        
        <a href="#home" className="">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "55px", height: "55px", borderRadius: "50%" }}
          />
        </a>
        <a
          href="#home"
          className="ml-2 "
          style={{ fontSize: "30px", fontFamily: "Calibri" }}
        >
          Unified Customer Insights{" "}
        </a>{" "}
        
      </div>

      <div className=" flex space-x-4">
        <a
          href="#home"
          className="hover:underline"
          style={{ fontSize: "20px", fontFamily: "Calibri", padding: "10px" }}
        >
          Home
        </a>
        <a
          href="#about"
          className="hover:underline"
          style={{ fontSize: "20px", fontFamily: "Calibri", padding: "10px" }}
        >
          About
        </a>
        <a
          href="#signup"
          className="hover:text-blue"
          onClick={signOutHandler}
          style={{ fontSize: "20px", fontFamily: "Calibri", padding: "10px" }}
        >
          Sign Out
        </a>
      </div>
    </nav>
    <div className="flex flex-wrap justify-center bg-[#F1EFE6]">
    <ProductCard
      name="Sample Product"
      price={19.99}
      image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" // Sample image URL
    />
   
  </div>


    <div className=" flex flex-grow justify-center items-center bg-[#F1EFE6] " style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ width: '60%', display:"flex" ,justifycontent:"center", alignitems:"center" }} >
        
        <input
            type="text"
            placeholder="Enter your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className=" border border-black rounded md:ml-32 ml-30 my-4  text-center"
            style={{
              fontSize: "25px",
              padding: "10px",
              color: "black",
              width: "70%",
              borderRadius:'15px',
            }}
          />
          
             <button
            type="submit"
            className="bg-blue-900  text-white px-4 py-3  rounded hover:bg-blue-600 m-auto ml-7 transition duration-300 ease-in-out transform hover:scale-105 relative"
          >
            <h1>Submit</h1>
          </button>
        
      </form>
    </div>

    <div className="flex flex-col items-center bg-[#F1EFE6]" style={{ width: '100%' }}>
      <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: 'red' }}>
        Recent Reviews
      </h2>
      <div className="max-w-lg" style={{ width: '100%' }}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>

    <footer
      className="text-white p-4 text-center"
      style={{ backgroundColor: '#27005D' }}
    >
      © 2024 Unified Customer Insight.
    </footer>
  </div>
);
}