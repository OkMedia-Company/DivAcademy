import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

function AddEmployee() {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    last_name: "",
    father_name: "",
    birthday: "",
    phone: "",
    password: "",
    email: "",
    user_type: 3,
    status: 1,
    registration_day: "",
    position: "",
    salary: "",
  });
  const [imageFile, setImageFile] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImageBase64(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.image = imageBase64;
    if (!formData.image) {
      formData.image = formData.image;
    }
    axios
      .post("https://div.globalsoft.az/api/employees", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        navigate("/employees");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };
  return (
    <>
      <h2>Add Employee</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row col-8">
              <label htmlFor="name">Ad Soyad:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="last_name">Soyad:</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="father_name">Ata adı:</label>
              <input
                type="text"
                name="father_name"
                id="father_name"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="birthday">Doğum tarixi:</label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="phone">Telefon:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="password">Şifrə:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="position">Vəzifə:</label>
              <input
                type="text"
                name="position"
                id="position"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="salary">Maaş:</label>
              <input
                type="text"
                name="salary"
                id="salary"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="registration_day">Qeydiyyat tarixi:</label>
              <input
                type="date"
                name="registration_day"
                id="registration_day"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                id="status"
                onChange={handleChange}
                defaultValue={formData.status}
              >
                <option value="1">Aktiv</option>
                <option value="0">Passiv</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="image">Şəkil:</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group col-12">
              {error && <p className="error">{error}</p>}
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
