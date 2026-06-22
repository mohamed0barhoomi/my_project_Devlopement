import React, { useState } from "react";
import axios from "axios";

const AddVolForm = () => {
  const [form, setForm] = useState({
    vil_dep: "",
    vil_arr: "",
    date_dep: "",
    time_dep: "",
    prix: "",
    description: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post("/vol/create", form);
      setMsg("Flight created successfully ✈️");
      setForm({
        vil_dep: "",
        vil_arr: "",
        date_dep: "",
        time_dep: "",
        prix: "",
        description: "",
        airline: "",
        seats: "",
        class_type: "economy",
      });
    } catch (err) {
      setMsg(err.response?.data?.mssg || "Error creating flight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Flight ✈️</h2>

      <form onSubmit={handleSubmit} className="vol-form">

        <input
          name="vil_dep"
          placeholder="Departure city"
          value={form.vil_dep}
          onChange={handleChange}
        />

        <input
          name="vil_arr"
          placeholder="Arrival city"
          value={form.vil_arr}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date_dep"
          value={form.date_dep}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time_dep"
          value={form.time_dep}
          onChange={handleChange}
        />

        <input
          name="prix"
          type="number"
          placeholder="Price ($)"
          value={form.prix}
          onChange={handleChange}
        />

        <input
          name="airline"
          placeholder="Airline (e.g. TunisAir)"
          value={form.airline}
          onChange={handleChange}
        />

        <input
          name="seats"
          type="number"
          placeholder="Available seats"
          value={form.seats}
          onChange={handleChange}
        />

        <select
          name="class_type"
          value={form.class_type}
          onChange={handleChange}
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>

        <textarea
          name="description"
          placeholder="Flight description..."
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Flight"}
        </button>

        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
};

export default AddVolForm;