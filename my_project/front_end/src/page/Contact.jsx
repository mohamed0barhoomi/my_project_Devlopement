import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import "../style/contact.css"
import { useDispatch, useSelector } from 'react-redux'
import { get_history } from '../redux/reducer/user_reducer'

const Contact = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(get_history())
  },[dispatch])  
  const [message, setMessage] = useState("")
  const {history,user} = useSelector(state => state.user)
  console.log("user from contact us :",user)
  console.log("history owner from contact us :",history?.owner)

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Write a message first")
      return
    }

    try {
      await emailjs.send(
        "service_as32spx",
        "template_rguwwqs",
        {
          from_name: user?.name,
          from_email: user?.email,
          message: message,
        },
        "VPnn5QtcqepmPlnS8"
      )

      alert("Message sent successfully")
      setMessage("")
    } catch (error) {
      console.log(error)
      alert("Failed to send message")
    }
  }

  return (
    <div className='contact'>
      <h2>
        Contact Us
        <img src="GPT.png" alt="" width="30px" />
      </h2>

      <textarea
        rows={4}
        cols={40}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your report here..."
      />
      {!message.trim() && <p className='warning'>Please write a message before sending.</p>}

      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default Contact