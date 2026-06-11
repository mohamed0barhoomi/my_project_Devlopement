import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../style/vol_card.css"
const Vol_card = ({vol=[]}) => {
    const flech = "------>"
    const navigate= useNavigate()
    const date_dep = vol.date_dep.slice(0, 10);
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
        <Link className='Link_to_det' to={`/detail/${vol._id}`} >details</Link>
      
    </div>
  )
}

export default Vol_card
