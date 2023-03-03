import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import useDocumentTitle from "../tools/useDocumentTitle";

function AddCourse() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    monthly_price: "",
    course_duration: "",
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const token = localStorage.getItem("token");
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://div.globalsoft.az/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        navigate("/courses");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };
  useDocumentTitle("Kurs əlavə et")
  return (
    <>
      <h2>Kurs əlavə et</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row ">
              <label htmlFor="name">Kursun adı:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row ">
              <label htmlFor="monthly_price">Kursun aylıq qiyməti:</label>
              <input
                type="number"
                name="monthly_price"
                id="monthly_price"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row ">
              <label htmlFor="course_duration">Kursun müddəti (ayla):</label>
              <input
                type="number"
                name="course_duration"
                id="course_duration"
                onChange={handleChange}
              />
            </div>

            <div className="form-group  row col-12">
              {error && <p className="error">{error}</p>}
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
