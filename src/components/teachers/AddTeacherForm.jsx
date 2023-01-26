import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { NavLink } from "react-router-dom";
function AddTeacherForm() {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    last_name: "",
    father_name: "",
    birthday: "",
    phone: "",
    email: "",
    user_type: 2,
    status: "1",
    password: "",
    registration_day: "",
    current_groups: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!imageFile) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = () => {
      setImageBase64(fileReader.result);
    };
  }, [imageFile]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = () => {
      setImageBase64(fileReader.result);
      formData.image = imageBase64;

      axios
        .post("https://div.globalsoft.az/api/teachers", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          setError(error.response.data.message);
        });
    };
  };
  return (
    <>
      <h2>Müəllim əlavə etmək</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row">
              <div className="main-add-form-input-names col me-5">
                <label htmlFor="name">Ad:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="last_name">Soyad:</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="father_name">Ata adı:</label>
                <input
                  type="text"
                  name="father_name"
                  id="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="birthday">Doğum tarixi:</label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="phone">Telefon:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="user_type">User type:</label>
                <input
                  type="number"
                  name="user_type"
                  id="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="registration_day">Registration day:</label>
                <input
                  type="date"
                  name="registration_day"
                  id="registration_day"
                  value={formData.registration_day}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="current_groups">Current groups:</label>
                <input
                  type="text"
                  name="current_groups"
                  id="current_groups"
                  value={formData.current_groups}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div className="file-upload image-upload row col">
                <img src={imageFile} alt="" className="image-preview" />
                <Button variant="outlined" component="label">
                  Upload photo
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                    size="medium"
                    className="image-upload-input"
                    sx={{ borderRadius: "1px solid #000" }}
                  />
                </Button>
              </div>
              <br />
              <div className="form-error">{error}</div>
              <Button type="submit" variant="contained" color="primary">
                Əlavə et
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTeacherForm;
