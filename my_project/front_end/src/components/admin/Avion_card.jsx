import React, { useRef, useState } from "react"
import "../../style/avion.css"
import { useDispatch, useSelector } from "react-redux"
import { delete_avion, get_avion, up_avion } from "../../redux/reducer/admin/admin_reducer"

const Avion_card = ({ avion }) => {

  const dispatch = useDispatch()
  const updateRef = useRef(null)

  const { is_loading } = useSelector(state => state.admin)

  const [msg, setMsg] = useState("")

  const [form, setForm] = useState({
    name: "",
    capaciter: "",
    localisation: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // OPEN MODAL (LIKE VOL CARD STYLE)
  const openUpdate = () => {
    setForm({
      name: avion.name || "",
      capaciter: avion.capaciter || "",
      localisation: avion.localisation || "",
    })

    updateRef.current.showModal()
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this avion?")
    if (!confirm) return

    await dispatch(delete_avion(avion._id))
    dispatch(get_avion())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(
        up_avion({id: avion._id,data: form})
      )

      dispatch(get_avion())

      setMsg("Avion updated successfully ✈️")

      updateRef.current.close()

    } catch (err) {
      setMsg("Error updating avion ❌")
    }
  }

  return (
    <div className="avion_card">

      {/* CARD INFO (VOL STYLE) */}
      <h3>{avion.name}</h3>
      <p>Capacity: {avion.capaciter}</p>
      <h4>Location: {avion.localisation}</h4>
      {/* <h4>Ref: {avion._id.slice(-6).toUpperCase()}</h4> */}
      <h4>ID: {avion._id}</h4>


      <div className="buttons">

        <button
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={openUpdate}
        >
          Update
        </button>

        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

      {/* DIALOG (VOL STYLE FORM) */}
      <dialog ref={updateRef} id="update">

        <div className="form_update">

          <h2>Update Avion {avion._id.slice(-6).toUpperCase()}✈️</h2>

          <form onSubmit={handleSubmit} className="vol-form">

            <input
              type="text"
              name="name"
              placeholder="Avion name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="capaciter"
              placeholder="Capacity"
              value={form.capaciter}
              onChange={handleChange}
            />

            <input
              type="text"
              name="localisation"
              placeholder="Location"
              value={form.localisation}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={is_loading}
              style={{ backgroundColor: "green", color: "white" }}
            >
              {is_loading ? "Updating..." : "Update Avion"}
            </button>

            {msg && <p>{msg}</p>}

          </form>
        </div>

        <button onClick={() => updateRef.current.close()}>
          Close
        </button>

      </dialog>

    </div>
  )
}

export default Avion_card