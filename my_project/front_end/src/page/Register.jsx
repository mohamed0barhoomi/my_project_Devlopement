import "../style/register.css"

import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register_user } from '../redux/reducer/user/user_reducer';


const Register = () => {
    const {error,isauth,is_loading}=useSelector(state => state.user)
    console.log("is auth : ",isauth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
      if(isauth) navigate("/vol")

    },[isauth,navigate]) 
    const onSubmit = data => dispatch(register_user(data));
    console.log("errors :",errors);
  return (
    <div>
       <form className="card_register" onSubmit={handleSubmit(onSubmit)}>
        <img src="GPT.png" alt="logo" width={"80px"}/>
        <h4 className="welcome">Connectez-vous à votre compte</h4>
       <input type="text" placeholder="name" {...register("name", {required: true, maxLength: 80})} />
       {errors.name && <p className='err'>name required</p>}
      <input type="text" placeholder="last name" {...register("last_name", {required: true, maxLength: 80})} />
      {errors.last_name && <p className='err'>last name required</p>}
      <input type="email" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="number" placeholder="num passport" {...register("NP", {required: true, maxLength: 8,minLength:8})} />
      {errors.NP && <p className='err'>{errors.NP.type}</p>}
      <input type="password" placeholder="pass" {...register("pass", {required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i})} />
      {errors.pass && <p className='err'>password weak or please submit a strong password</p>}

      <input className='submit' type="submit" />
      </form>
      
    </div>
  )
}

export default Register
