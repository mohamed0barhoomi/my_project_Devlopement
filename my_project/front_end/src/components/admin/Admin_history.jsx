import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Admin_history_card from './Admin_history_card'
import { get_history } from '../../redux/reducer/admin/admin_reducer'

const Admin_history = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
   dispatch(get_history())
  },[dispatch])
  const {admin_history,is_loading,error}=useSelector(state => state.admin)
  console.log("history : ",admin_history)
  return (
    <div className='list_history_admin'>
      {is_loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {admin_history?.map((elem) => (<Admin_history_card key={elem._id} history={elem}/>))}
    </div>
  )
}

export default Admin_history
