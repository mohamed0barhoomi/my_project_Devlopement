import React from 'react'
import "../style/help.css"
import {Link} from "react-router-dom"

const Help = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help Center</h1>

      <div className="help-section">
        <h3>How to reserve a flight?</h3>
        <p>
          Login to your account, choose a flight and click on the reserve button.
        </p>
      </div>

      <div className="help-section">
        <h3>How to view my reservations?</h3>
        <p>
          Navigate to the History page to view all your booked flights.
        </p>
      </div>

      <div className="help-section">
        <h3>Need support?</h3>
        <p>
          Contact our support team at support@airport.com or go to  <Link to ="/contact">Contact Us</Link>
        </p>
      </div>
    </div>
  )
}

export default Help