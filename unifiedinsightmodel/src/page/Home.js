import React, { useState, useEffect } from "react";
import { predictSentiment } from "../apis/predictionAPI";
import logo from "../img/logohackfest.jpg";
import productlogo from "../img/shopping-bag.png";
import ReviewCard from "../components/card";
import ProductCard from "../components/productCard";
import { useNavigation } from "react-router-dom";
export default function Home() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  // const navigate = useNavigation();

  const signOutHandler = () => {
    localStorage.removeItem("reviews");
    // navigate("/");
    window.location.href = "http://localhost:3000";
  };

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

        <div  >
          <a
            href="#home"
            className="hover:underline px-5 text-xl font-calibri active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:underline  text-xl font-calibri active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
          >
            About
          </a>
          <a
            href="#signup"
            className="hover:text-blue px-5 text-xl font-calibri active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            onClick={signOutHandler}
          >
            Sign Out
          </a>
        </div>
      </nav>

      <div className="bg-[#F1EFE6] flex flex-col flex-grow">
        <div className="bg-white flex flex-row items-center p-4">
          <h2 className="text-lg font-semibold">Purchased Items</h2>
          <img
            src={productlogo}
            className="w-7 h-7 ml-2"
            alt="Shopping Bag"
          />
        </div>

        <div className="flex flex-col lg:flex-row w-full mt-4 space-y-4 justify-between">
          <div className="lg:w-1/2 flex flex-col items-center">
            <ProductCard
              name="Sample Product"
              price={19.99}
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" // Sample image URL
            />
            <ProductCard
              name="Sample Product"
              price={19.99}
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" // Sample image URL
            />
            <ProductCard
              name="Sample Product"
              price={19.99}
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" // Sample image URL
            />
            <ProductCard
              name="Sample Product"
              price={19.99}
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" // Sample image URL
            />
          </div>
          <div className="lg:w-1/2 bg-white rounded-3xl mr-8 p-8 flex flex-col items-center h-screen">
  <h2 className="text-xl font-bold mb-2 text-violet-500">
    Recent Reviews
  </h2>
  <div className="max-w-lg w-full h-96 overflow-y-auto overflow-x-hidden flex flex-col-reverse">
    {reviews.map((review, index) => (
      <ReviewCard key={index} review={review} />
    ))}
  </div>

  <div className=" w-full mr-28">
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center justify-center"
    >
      <input
        type="text"
        placeholder="Enter your review here"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="flex-grow border-2 border-gray-200 p-4 rounded-l-2xl md:ml-32 ml-30 my-4 text-center focus:outline-none focus:border-violet-500"
      />

      <button
        type="submit"
        className="bg-violet-500 font-bold text-white p-4 rounded-r-2xl hover:bg-blue-600 ml-3 transition duration-300 ease-in-out transform hover:scale-105 relative"
      >
        <h1>Submit</h1>
      </button>
    </form>
  </div>
</div>



        </div>
      </div>

      <footer className="text-white p-4 text-center bg-violet-500">
        © 2024 Unified Customer Insights.
      </footer>
    </div>
  );
}
