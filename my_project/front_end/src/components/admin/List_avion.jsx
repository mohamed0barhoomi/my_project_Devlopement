import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Avion_card from "./Avion_card"
import { get_avion, create_avion } from "../../redux/reducer/admin/admin_reducer"
import "../../style/avion.css"

const List_avion = () => {

  const dispatch = useDispatch()

  const { error, is_loading, avion } = useSelector(state => state.admin)

  const [add, setAdd] = useState(false)
  const [msg, setMsg] = useState("")

  const initialForm = {
    name: "",
    capaciter: "",
    localisation: "",
  }

  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    dispatch(get_avion())
  }, [dispatch])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(create_avion(form))
      dispatch(get_avion())

      setMsg("Avion created successfully ✈️")

      setForm(initialForm)

    } catch (err) {
      setMsg("Error creating avion ❌")
    }
  }

  const toggleForm = () => {
    setAdd(!add)
    setMsg("")
  }

  return (
    <>
      {/* LIST */}
      <div className="list_vol">

        {is_loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {avion?.map((a) => (
          <Avion_card key={a._id} avion={a} />
        ))}

      </div>

      {/* TOGGLE BUTTON (same as vol style) */}
      <button className="add_avion" onClick={toggleForm}>
        {add ? "Close Form" : "Add Avion"}
      </button>

      {/* FORM */}
      {add && (
        <div className="form-container">

          <h2>Create New Avion ✈️</h2>

          <form onSubmit={handleSubmit} className="vol-form">

            <input
              name="name"
              placeholder="Avion name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="capaciter"
              placeholder="Capacity"
              type="number"
              value={form.capaciter}
              onChange={handleChange}
              required
            />

            <input
              name="localisation"
              placeholder="Location"
              value={form.localisation}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={is_loading}>
              {is_loading ? "Creating..." : "Create Avion"}
            </button>

            {msg && <p>{msg}</p>}

          </form>
        </div>
      )}
    </>
  )
}

export default List_avion