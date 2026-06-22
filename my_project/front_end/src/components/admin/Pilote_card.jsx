import React, { useRef, useState } from 'react'
import "../../style/pilote.css"
import { useDispatch, useSelector } from 'react-redux'
import { delete_pilote, get_pilote, up_pilote } from '../../redux/reducer/admin/admin_reducer'

const Pilote_card = ({ pilote }) => {

  const dispatch = useDispatch()
  const updateRef = useRef(null)

  const { is_loading } = useSelector(state => state.admin)

  const [msg, setMsg] = useState("")

  const [form, setForm] = useState({
    img: pilote.img || "",
    name: pilote.name || "",
    email: pilote.email || "",
    CIN: pilote.CIN || "",
    NP: pilote.NP || "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this pilote?")
    if (!confirm) return

    await dispatch(delete_pilote(pilote._id))
    dispatch(get_pilote())
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await dispatch(up_pilote({id: pilote._id,data: form }))

      dispatch(get_pilote())

      setMsg("Pilote updated successfully ✈️")

    } catch (err) {
      setMsg("Error updating pilote ❌")
    }
  }

  return (
    <div className='pilote_card'>

      <img
        src={pilote.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        alt={pilote.name}
      />

      <h4>Email: {pilote.email}</h4>
      <h4>CIN: {pilote.CIN}</h4>
      <h4>Passport: {pilote.NP}</h4>



      <dialog ref={updateRef}>

        <div className="form-container">

          <h2>Update Pilote 👨‍✈️</h2>

          <form onSubmit={handleSubmit} className="vol-form">

            <input
              name="img"
              value={form.img}
              onChange={handleChange}
            />

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="CIN"
              value={form.CIN}
              onChange={handleChange}
            />

            <input
              name="NP"
              value={form.NP}
              onChange={handleChange}
            />
           <div className='btn_d'>
            <button type="submit" disabled={is_loading}>
              {is_loading ? "Updating..." : "Update Pilote"}
            </button>

            <button type="button" onClick={()=>updateRef?.current?.close()}>
              Close
            </button>
</div>
            {msg && <p>{msg}</p>}

          </form>

        </div>

      </dialog>


        <button className="update_btn" onClick={()=>updateRef.current.showModal()}>
          Update
        </button>

        <button className="delete_btn" onClick={handleDelete}>
          Delete
        </button>

    </div>
  )
}

export default Pilote_card