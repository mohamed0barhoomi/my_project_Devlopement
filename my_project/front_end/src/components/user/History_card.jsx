import React from 'react'
import "../../style/history.css"
import { useDispatch } from 'react-redux'
import { delete_history, get_history } from '../../redux/reducer/user_reducer'
import {  useNavigate } from 'react-router-dom'
const History_card = ({history}) => {
    const Navigate = useNavigate()
    
    const dispatch=useDispatch()
    const delete_hist =(id)=>{
        dispatch(delete_history(id))
        alert("vol was delete")
    }
  return (
    <div>
      <div className='history'>
        <img  src={history.vol[0].img} alt="interface" width={"250px"} height={"200px"} />
        <div className='data'>
            <h1>{history.vol[0].vil_arr} <img src={history.vol[0].map} alt="flag" width={"40"}/></h1>
            <h3>{history.class} class</h3>
            <h3>Date :{history.vol[0].date_dep.slice(0,10)}</h3>
            <h3>Time:{history.vol[0].time_dep}</h3>
            <button className='see_ticket' onClick={()=>{Navigate(`/ticket/${history.vol[0]._id}`)}}>see ticket</button>
            <button className='delete' onClick={()=>{dispatch(delete_history({id:history._id}));dispatch(get_history());alert("vol was delete")}}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default History_card
