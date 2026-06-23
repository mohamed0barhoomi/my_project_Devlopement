import './App.css';
import Navbar from './components/user/Navbar';
import {Routes , Route, useSearchParams, useLocation} from "react-router-dom"
import Help from './page/Help';
import Contact from './page/Contact';
import Login from './page/Login';
import Home from './page/Home';
import Register from './page/Register';
import Vol_card from './components/user/Vol_card';
import List_vol from './components/user/List_vol';
import Vol_details from './components/user/Vol_details';
import Ticket from './components/user/Ticket';
import { useEffect, useState } from 'react';
import History from './components/user/History';
import { useDispatch, useSelector } from 'react-redux';
import { get_vol } from './redux/reducer/user/vol_reducer';
import { conserve, get_history, logout } from './redux/reducer/user/user_reducer';
import Admin_home from './components/admin/Admin_home';
import List_pilote from './components/admin/List_pilote';
import List_avion from './components/admin/List_avion';
import List_vol_admin from './components/admin/List_vol';
import Admin_history from './components/admin/Admin_history';

function App() {
   const dispatch = useDispatch()
  const location = useLocation()
  const [search, Setsearch] = useState([])

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(logout())
      
    }
  }, [location, dispatch])
  return (
    <div className="App">
       <Navbar Setsearch={Setsearch}/>
       <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='help' element={<Help/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/detail/:id'element={<Vol_details />}/>
        <Route path='/vol' element={<List_vol vol={search} />} />
        <Route path='/ticket/:id' element={<Ticket />} />
        <Route path='/history' element={<History />} />
        <Route path='/admin_home' element={<Admin_home />} />
        <Route path='/pilote' element={<List_pilote />} />
        <Route path='/avion' element={<List_avion />} />
        <Route path='/gestion_vol' element={<List_vol_admin />} />
        <Route path='/user_reservetion' element={<Admin_history />} />

       </Routes>
       
       
    </div>
  );
}

export default App;
