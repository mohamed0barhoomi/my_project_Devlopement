import React from 'react'
import "../../style/admin_home.css"
import {Link} from "react-router-dom"
import { get_history, get_pilote } from '../../redux/reducer/admin/admin_reducer'
import { useDispatch } from 'react-redux'




const Admin_home = () => {
  const dispatch = useDispatch()
  
  return (
    <div className='admin_home'>
      <Link to="/pilote" onclick={() => dispatch(get_pilote())}>Getion Pilote</Link> 
      <Link to="/avion">Getion avion</Link> 
      <Link to="/gestion_vol">Getion vol</Link> 
      <Link to="/user_reservetion" >user reservation</Link> 
    </div>
  )
}

export default Admin_home
