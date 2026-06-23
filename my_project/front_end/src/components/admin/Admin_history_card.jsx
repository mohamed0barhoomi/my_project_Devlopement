import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../style/hsitory_admin.css"


const Admin_history_card = ({history}) => {
    const Navigate=useNavigate()
  return (
    <div className=''>
      <div className='history_admin'>
        <div className='image'>
        <img  src={history.vol[0].img} alt="interface" width={"200px"} height={"180px"} />
          <h1>{history.vol[0].vil_arr} <img src={history.vol[0].map} alt="flag" width={"40"}/></h1>
          </div>
        <div className='data'>
          <h1>{history.vol[0]._id.slice(-6).toUpperCase()}</h1>
            <span>{history.owner?.name } {history.owner?.last_name} <br />num pass :{history.owner?.NP}</span>
            <span></span>
            <h3>{history.class} class</h3>
            <h3>Date :{history.vol[0].date_dep.slice(0,10)}</h3>
            <h3>Time:{history.vol[0].time_dep}</h3>
            <button className='see_ticket' onClick={()=>{Navigate(`/ticket/${history.vol[0]._id}`)}}>see ticket</button>
            
        </div>
      </div>
    </div>
  )
}

export default Admin_history_card
