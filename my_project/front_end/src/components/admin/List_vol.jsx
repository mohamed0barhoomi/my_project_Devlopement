import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {create_vol,get_vol} from "../../redux/reducer/admin/admin_reducer";

import Vol_card from "./Vol_card";
import "../../style/vol_card.css";

const List_vol = () => {

  const dispatch = useDispatch();

  const { error, is_loading, vol } = useSelector(
    (state) => state.admin
  );
  const [add, setAdd] = useState(false);

  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    img: "",
    map: "",
    vil_dep: "",
    vil_arr: "",
    date_dep: "",
    time_dep: "",
    prix: "",
    pilote_id: "",
    avion_id: "",
  });

  useEffect(() => {
    dispatch(get_vol());
  }, [dispatch]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await dispatch(create_vol(form));
      await dispatch(get_vol())

      setMsg("Flight created successfully ✈️");

      setForm({
        img: "",
        map: "",
        vil_dep: "",
        vil_arr: "",
        date_dep: "",
        time_dep: "",
        prix: "",
        pilote_id: "",
        avion_id: "",
      });

    } catch (err) {

      setMsg("Error creating flight ❌");

    }

  };

  return (
    <>
      <div className="list_vol">

        {is_loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {vol?.map((v) => (
          <Vol_card key={v._id} vol={v} />
        ))}

      </div>

      <button
        className="add_avion"
        onClick={() => setAdd(!add)}
      >
        {add ? "Close Form" : "Add Flight"}
      </button>

      {add && (
        <div className="form-container">

          <h2>Create New Flight ✈️</h2>

          <form
            onSubmit={handleSubmit}
            className="vol-form"
          >

            <input
              type="text"
              name="img"
              placeholder="Flight image URL"
              value={form.img}
              onChange={handleChange}
            />

            <input
              type="text"
              name="map"
              placeholder="Map image URL"
              value={form.map}
              onChange={handleChange}
            />

            <input
              type="text"
              name="vil_dep"
              placeholder="Departure city"
              value={form.vil_dep}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="vil_arr"
              placeholder="Arrival city"
              value={form.vil_arr}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date_dep"
              value={form.date_dep}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time_dep"
              value={form.time_dep}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="prix"
              placeholder="Price"
              value={form.prix}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pilote_id"
              placeholder="Pilot ID"
              value={form.pilote_id}
              onChange={handleChange}
            />

            <input
              type="text"
              name="avion_id"
              placeholder="Airplane ID"
              value={form.avion_id}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={is_loading}
            >
              {is_loading
                ? "Creating..."
                : "Create Flight"}
            </button>

            {msg && <p>{msg}</p>}

          </form>
        </div>
      )}
    </>
  );
};

export default List_vol;