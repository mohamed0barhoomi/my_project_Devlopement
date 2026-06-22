import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import History_card from './History_card'
import { get_history } from '../../redux/reducer/user/user_reducer'

const History = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(get_history())
  },[dispatch])
  const {history} = useSelector(state => state.user)
  console.log("history :",history)
  return (
    <div>
      {history?.map((his,index) => (<History_card key={index} history={his} />))}
    </div>
  )
}

export default History
