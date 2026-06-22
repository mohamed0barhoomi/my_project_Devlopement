import React, { useEffect } from 'react'
import Vol_card from './Vol_card'
import "../../style/vol_card.css"
import { useDispatch, useSelector } from 'react-redux'
import { get_vol } from '../../redux/reducer/user/vol_reducer'





const List_vol = ({vol}) => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(get_vol())
  },[dispatch])
    const {is_loading , list_vol}=useSelector((state)=>state.vol)
    const list = vol.length > 0 ? vol : list_vol
  return (
    <div className='list_vol'>
        {is_loading && <p>loading ...</p>}
     { list?.map((v)=> <Vol_card vol={v}/>) }
    </div>
  )
}

export default List_vol
