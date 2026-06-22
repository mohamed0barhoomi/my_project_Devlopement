import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../style/vol_card.css"
import { useDispatch, useSelector } from 'react-redux'
import { delete_vol, get_vol, up_vol } from '../../redux/reducer/admin/admin_reducer'
const Vol_card = ({vol=[]}) => {
    const flech = "------>"
    const navigate= useNavigate()
    const date_dep = vol.date_dep.slice(0, 10);
    const dispatch=useDispatch()
    const updateRef = useRef(null);

   const {error ,is_loading}=useSelector(state => state.admin)
    //update 

    const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    img: "",
    map: "",
    vil_dep: "",
    vil_arr: "",
    date_dep: "",
    time_dep: "",
    prix: "",
    pilote_id: "",
    avion_id: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await dispatch(up_vol({id:vol._id,data:form}));
      await dispatch(get_vol())

      setMsg("Flight "+vol._id.slice(-6).toUpperCase()+" update with successfully ✈️");

      setForm({
        img: "",
        map: "",
        vil_dep: "",
        vil_arr: "",
        date_dep: "",
        time_dep: "",
        prix: "",
        pilote_id: "",
        avion_id: "",
      });

    } catch (err) {

      setMsg("Error update flight ❌");

    }

  };
  return (
    <div className='vol_card'>
        <img id='face_card' src={vol.img} alt="country" />
        <div className='flag'>
         <img src="tunis.png" alt={vol.vil_dep} />
            <span>{flech}</span>
        <img src={vol.map} alt={vol.vil_arr} />
            
        </div>
        <span>Date :{date_dep}</span>
        <span>prix :{vol.prix}</span>
        <div className='buttons'>
        <button onClick={()=>{navigate(`/detail/${vol._id}`)}}>details</button>

        
       <dialog ref={updateRef} id="update">

        <div className="form_update">

          <h2>update the  Flight {vol._id.slice(-6).toUpperCase()} ✈️</h2>

          <form
            onSubmit={handleSubmit}
            className="vol-form"
          >

            <input
              type="text"
              name="img"
              placeholder="Flight image URL"
              value={form.img}
              onChange={handleChange}
            />

            <input
              type="text"
              name="map"
              placeholder="Map image URL"
              value={form.map}
              onChange={handleChange}
            />

            <input
              type="text"
              name="vil_dep"
              placeholder="Departure city"
              value={form.vil_dep}
              onChange={handleChange}
            />

            <input
              type="text"
              name="vil_arr"
              placeholder="Arrival city"
              value={form.vil_arr}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date_dep"
              value={form.date_dep}
              onChange={handleChange}
            />

            <input
              type="time"
              name="time_dep"
              value={form.time_dep}
              onChange={handleChange}
            />

            <input
              type="number"
              name="prix"
              placeholder="Price"
              value={form.prix}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pilote_id"
              placeholder="Pilot ID"
              value={form.pilote_id}
              onChange={handleChange}
            />

            <input
              type="text"
              name="avion_id"
              placeholder="Airplane ID"
              value={form.avion_id}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={is_loading}
            >
              {is_loading
                ? "updating..."
                : "update Flight"
                }
            </button>

            {msg && <p>{msg}</p>}

          </form>
        </div>

        <button onClick={() => updateRef.current.close()}>
          Close
        </button>

      </dialog>

      <button style={{ backgroundColor: "blue", color: "white" }} onClick={() => updateRef.current.showModal()}>Update</button>
      <button  style={{ backgroundColor: 'red', color: 'white' }} onClick={()=>{dispatch(delete_vol(vol._id))}}>Delete</button>
        </div>
      
    </div>
  )
}

export default Vol_card
