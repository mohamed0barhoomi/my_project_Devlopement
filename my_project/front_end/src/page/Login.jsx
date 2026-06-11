import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import { login_user } from '../redux/reducer/user_reducer'
import { get_vol } from '../redux/reducer/vol_reducer'

const Login = () => {
    const{error,is_loading,isauth,admin}=useSelector(state => state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    console.log("is auth : ",isauth)
    console.log("admin : ",admin)
    useEffect(()=>{
      if(isauth ) {
        if (admin) navigate("/admin_home")
        else navigate("/vol")
      }
    },[isauth,navigate])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {dispatch(login_user(data)) ;console.log("data :",data)};
    console.log(errors);
  return (
    <div>
       <form className='card_register' onSubmit={handleSubmit(onSubmit)}>
        <img src="GPT.png" alt="logo" width={"80px"}/>
        <h4 className='welcome'>Vous n'avez pas de compte ? <Link to ="/register">create acount</Link></h4>
      <input type="email" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      {errors.email && <p className='err'>{errors.email.type}</p>}
      <input type="password" placeholder="pass" {...register("pass", {})} />
      {errors.pass && <p className='err'>{errors.pass.type}</p>}

      <input className='submit' type="submit" onClick={()=>{dispatch(get_vol())}} />
      </form>
    </div>
  )
}

export default Login
