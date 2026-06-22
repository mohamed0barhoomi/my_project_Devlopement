import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { reserver_vol } from '../../redux/reducer/user/vol_reducer';
import { useDispatch } from 'react-redux';
import "../../style/vol_details.css";
import { get_history } from '../../redux/reducer/user/user_reducer';

const Vol_details = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const { list_vol } = useSelector((state) => state.vol);
  const {vol}=useSelector((state)=>state.admin)
  const { history } = useSelector((state)=>state.user)
  const vol_d =list_vol?.length > 0 ? list_vol.find((v) => v._id === id): vol?.find((v) => v._id === id);

   const this_history=history?.find(hit => hit.vol[0]._id===id) 
  // const test = ()=>{
  //   if(this_history) return alert("you alredy reserve this vol")
  // }


  const [classType, setClassType] = useState("economy");
  const price = useMemo(() => {
   
    if (classType === "economy") return vol_d?.prix;
    if (classType === "business") return vol_d?.prix + 200;
    if (classType === "first") return vol_d?.prix + 400;
    return vol?.prix;
  }, [classType, vol_d]);

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(get_history())
  },[dispatch])
  const reserve = () => {
     if(this_history) return alert("you alredy reserve this vol")
     dispatch(reserver_vol({
     id: vol_d._id,
     class_type: classType
  }));
  dispatch(get_history())

  navigate(`/ticket/${vol_d._id}`);
  }
  if (!vol_d) return <h1>Flight not found...</h1>;
  
  return (
    <div className='vol_details'>
      <img className='city_img' src={vol_d.img} alt="country" />
      <h2 style={{ margin: "0px" }}><img src={vol_d.map} alt="country" width="40px" /> {vol_d.vil_arr} is loading ...</h2>
      <h3>Departure: {vol_d.vil_dep}</h3>
      <h3>Date: {vol_d.date_dep.slice(0, 10)} at {vol.time_dep}</h3>
      <h3>place possible : {vol_d.disp}/{vol_d.avion_id?.capaciter}</h3>
      
      <div className='class'>
        <select
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
        <h3>Price: {price} DT</h3>
      </div>
      <button className="reserve_btn" onClick={() => {
        reserve()
}}>reserver</button>
    </div>
  );
};

export default Vol_details;