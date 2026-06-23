import React, { useEffect, useRef } from "react";
import "../../style/tiket.css";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_history } from "../../redux/reducer/user/user_reducer";


const Ticket = ({ ticket = {} }) => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(get_history())
  }, [dispatch])
  const vol_id= useParams().id

  const {admin_history} =useSelector(state => state.admin)
  const admin_hist=admin_history?.find(hit => hit.vol[0]._id===vol_id)
 

  const {list_vol} = useSelector(state => state.vol)
  const {user,history,is_loading} = useSelector(state => state.user)
  console.log("user : ",user)
  console.log("history from tiket :",history)
  const find_hist = history?.find(hit => hit.vol[0]._id===vol_id) 
  const this_history=find_hist? find_hist:admin_hist
  console.log("this history :",this_history)
  
  
  

  



  const ticketRef = useRef(null);
  const downloadTicket = async () => {
    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "landscape",
      "px",
      [canvas.width, canvas.height]
    );

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height
    );

    pdf.save(`ticket-${ticket.flight || "flight"}.pdf`);
  };

  return is_loading ? (
    <div className="page">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="page">

      <div className="ticket" ref={ticketRef}>

        {/* LEFT WHITE SIDE */}
        <div className="ticket-left">

          <div className="ticket-header">
            <div>
              <span>Seat</span>
              <h4>{this_history?.vol[0]?.disp}</h4>
            </div>

            <div>
              <span>Flight Number</span>
              <h4>
                {this_history?.vol[0]._id
                  ? this_history?.vol[0]._id.slice(-6).toUpperCase()
                  : "------"}
              </h4>
            </div>

            <div>
              <span>Class</span>
              <h4>{this_history?.class}</h4>
            </div>

            <div>
              <span>Date</span>
              <h4>{this_history?.vol[0]?.date_dep.slice(0, 10)}</h4>
            </div>
          </div>

          <div className="separator"></div>

          <div className="route">

            <div className="city">
              <small>Departure</small>
              <h2>{this_history?.vol[0].vil_dep}  <span>AT {this_history?.vol[0]?.time_dep}</span></h2>
              
            </div>

            <div className="flight-line">
              ✈
            </div>

            <div className="city">
              <small>Arrival</small>
              
              <h2>{this_history?.vol[0].vil_arr}<span>{ticket.arrivalTime}</span></h2>
              
            </div>

          </div>

          <div className="passenger-section">
            <div>
              <span>Passenger</span>
              <h4>{this_history?.owner?.last_name} {this_history?.owner?.name}</h4>
              {/* <span style={{fontStyle: "italic"}}>Num pass:{this_history?.owner?.NP}</span> */}
            </div>

            <div>
              <span>Booking Ref</span>
              <h4>
                {this_history?._id
                  ? this_history?._id.slice(-6).toUpperCase()
                  : "------"}
              </h4>
            </div>
          </div>

        </div>

        {/* RIGHT BLUE SIDE */}
        <div className="ticket-right">

          <h3 className="airline-title">
            travel Todo
          </h3>

          <div className="qr-container">
          <QRCodeCanvas
  value={JSON.stringify({
    passenger: {
      name: this_history?.owner?.name,
      last_name: this_history?.owner?.last_name,
      passport: this_history?.owner?.NP,
    },
    flight: {
      from: this_history?.vol?.[0]?.vil_dep,
      to: this_history?.vol?.[0]?.vil_arr,
      place: this_history?.vol?.[0]?.disp,
    },
    ticket: {
      class: this_history?.class,
    }
  })}
  size={130}
/>
          </div>

          <p className="scan-text">
            Scan To Verify Ticket
          </p>

          <span className="flight-number">
            <span>
                {this_history?.vol[0]._id
                  ? this_history?.vol[0]._id.slice(-6).toUpperCase()
                  : "------"}
              </span>
          </span>

        </div>

      </div>

      <button
        className="download-btn"
        onClick={downloadTicket}
      >
        Download Ticket
      </button>

    </div>
  );
};

export default Ticket;