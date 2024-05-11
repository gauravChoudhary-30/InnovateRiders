import React from 'react'
const About = ({ setAuthState, setUser }) => {


    const signOutHandler = () => {
        localStorage.removeItem("reviews");
        signOut(auth)
          .then(() => {
            setUser(null);
            setAuthState("login");
          })
          .catch((err) => console.log(err));
      };
    
  return (
    <div>
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
            href={"Home"}
            className="ml-2 "
            style={{ fontSize: "30px", fontFamily: "Calibri" }}
          >
            Unified Customer Insights{" "}
          </a>{" "}
          
        </div>

        <div className=" flex space-x-4">
          <a
            href={"Home"}
            className="hover:underline"
            style={{ fontSize: "20px", fontFamily: "Calibri", padding: "10px" }}
          >
            Home 
          </a>
          
          <a
            href="/"
            className="hover:text-blue"
            onClick={signOutHandler}
            style={{ fontSize: "20px", fontFamily: "Calibri", padding: "10px" }}
          >
            Sign Out
          </a>
        </div>
      </nav>

      <main className="flex-grow p-8 bg-gray-100"> 
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-700 mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Welcome to our platform! We specialize in sentiment analysis, using advanced machine learning algorithms to understand customer feedback And also predictSentiment. 
          </p>
          <p className="text-xl text-gray-700 mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Our mission is to provide insights that help businesses improve customer satisfaction and build better products.
          </p>
        </div>
      </main>
    


    

      

      <footer
        className="text-white p-4 text-center"
        style={{ backgroundColor: '#27005D' }}
      >
        © 2024 Unified Customer Insight - All rights reserved.
      </footer>
    </div>
  


    </div>
  )
}

export default About
