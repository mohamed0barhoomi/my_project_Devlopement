import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { logout } from '../../redux/reducer/user/user_reducer'

import "../../style/nav.css"

const Navbar = ({ Setsearch }) => {
  const { isauth,admin } = useSelector((state) => state.user)
  const { list_vol } = useSelector(state => state.vol)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='nav'>
      <Link to="/vol"><img src="GPT.png" alt="logo" width="60px" /></Link>
      {admin ? (
        <>
  <Link className='admin_h' to="/admin_home">Home</Link>
   <Link className='logout' to="/"
              onClick={() => {
                dispatch(logout());
                navigate("/");
                setShowMenu(false);
              }}
            >
              Logout
            </Link>
            </>
) : isauth ? (
  <>
  
    <input
      className='search'
      type="text"
      placeholder='Search your destination'
      onChange={(e) => {
        const value = e.target.value;

        Setsearch(
          list_vol.filter(v =>
            v.vil_arr?.toLowerCase().includes(value.toLowerCase())
          )
        );
      }}
    />

    <div className='funct'>
      <Link className='linkk' to="/help">Help</Link>
      <Link className='linkk' to="/contact">Contact Us</Link>

      <div className='profile-menu'>
        <img
          src="profile.png"
          alt="profile"
          width="40px"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div className='dropdown'>
            <Link to="/profile" onClick={() => setShowMenu(false)}>
              👤 Profile
            </Link>

            <Link to="/settings" onClick={() => setShowMenu(false)}>
              ⚙️ Settings
            </Link>

            <Link to="/history" onClick={() => setShowMenu(false)}>
              ✈️ Vol History
            </Link>

            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
                setShowMenu(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </>
) : (
  <div className='funct'>
    <Link className='linkk' to="/help">Help</Link>
    <Link className='linkk' to="/login">Login</Link>
  </div>
)}
    </div>
  )
}


export default Navbar