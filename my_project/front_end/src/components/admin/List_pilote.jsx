import React, { useEffect, useState } from 'react'
import Pilote_card from './Pilote_card'
import { useDispatch, useSelector } from 'react-redux'
import { create_pilote, get_pilote } from '../../redux/reducer/admin/admin_reducer'
import "../../style/pilote.css"

const List_pilote = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_pilote())
  }, [dispatch])

  const { error, is_loading, pilote } = useSelector(state => state.admin)

  const [add, setAdd] = useState(false)
  const [msg, setMsg] = useState("")

  const [form, setForm] = useState({
    img: "",
    name: "",
    email: "",
    CIN: "",
    NP: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(create_pilote(form))
      await dispatch(get_pilote())

      setMsg("Pilote created successfully 👨‍✈️")

      setForm({
        img: "",
        name: "",
        email: "",
        CIN: "",
        NP: ""
      })

    } catch (err) {
      setMsg("Error creating pilote ❌")
    }
  }

  return (
    <>
      <div className='list_pilote'>

        {is_loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {pilote?.map((p) => (
          <Pilote_card key={p._id} pilote={p} />
        ))}

      </div>

      {/* FIXED BUTTON */}
      <button
        className='add_pilote'
        onClick={() => setAdd(!add)}
      >
        {add ? "Close Form" : "Add Pilote"}
      </button>

      {add && (
        <div className="form-container">

          <h2>Create New Pilote ✈️</h2>

          <form onSubmit={handleSubmit} className="vol-form">

            <input
              type="text"
              name="img"
              placeholder="Pilote image URL"
              value={form.img}
              onChange={handleChange}
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="CIN"
              placeholder="CIN"
              value={form.CIN}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="NP"
              placeholder="Passport number"
              value={form.NP}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={is_loading}>
              {is_loading ? "Creating..." : "Create Pilote"}
            </button>

            {msg && <p>{msg}</p>}

          </form>
        </div>
      )}
    </>
  )
}

export default List_pilote