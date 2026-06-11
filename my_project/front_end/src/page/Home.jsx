import React from "react";
import "../style/home.css";

const Home = () => {
  return (
    <div className="home">
      {/* <h1 className="title">Travel Todo</h1> */}

      {/* SKY SECTION */}
      <div className="sky">
        <div className="cloud cloud1">☁️</div>
        <div className="cloud cloud2">☁️</div>
        <div className="cloud cloud3">☁️</div>

        <div className="airport airport-left"><img src="tunis.png" alt="" width={"40px"}/></div>

        <div className="plane">
          <img src="airplane.png" alt="airplane" width="100px" />
        </div>

        <div className="airport airport-right"><img src="world.png" alt="" width={"200px"} /></div>
      </div>

      {/* WELCOME SECTION */}
      <div className="welcome">
        <h2>Welcome Aboard</h2>
        <p>
          Book flights, manage reservations, and travel around the world.
        </p>
      </div>

      {/* 🔥 BOTTOM SECTION */}
      <div className="bottom-section">

        {/* FEATURES */}
        <div className="features">
          <h2>Why Travel Todo?</h2>

          <div className="feature-cards">
            <div className="card">
              ✈️
              <h3>Book Flights</h3>
              <p>Find and book flights easily at the best prices.</p>
            </div>

            <div className="card">
              🧳
              <h3>Manage Trips</h3>
              <p>Track all your travel plans in one place.</p>
            </div>

            <div className="card">
              🌍
              <h3>Explore World</h3>
              <p>Discover amazing destinations around the globe.</p>
            </div>
          </div>
        </div>

        {/* DESTINATIONS */}
        <div className="destinations">
          <h2>Popular Destinations</h2>

          <ul>
            <li>🇫🇷 Paris</li>
            <li>🇯🇵 Tokyo</li>
            <li>🇹🇳 Tunis</li>
            <li>🇦🇪 Dubai</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Home;