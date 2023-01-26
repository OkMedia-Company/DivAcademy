import React, { useEffect, useState } from "react";
import "./AddStudentForm.css";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  let navigate = useNavigate();

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
  const [formData, setFormData] = useState({
    image: "",
    name: "Ilqar",
    last_name: "Mammadov",
    father_name: "xelil",
    birthday: "1996-12-06",
    phone: "12223367",
    email: "xelil1@gmail.com",
    password: 12262222,
    user_type: 1,
    status: "1",
    university: "BDU",
    university_add_score: "444",
    registration_day: "2020-12-06",
    reference: "con",
    course: "3cu",
    group: "k45",
    lesson_table: "derscedveli",
    student_status: "1",
    workplace: "baki",
    is_diploma: "1",
    diploma_sn: "123456",
    graduation_day: "2020-12-06",
    next_payment_date: "2020-12-06",
  });
  const token = localStorage.getItem("token");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (imageFile === null) {
      setError("Xahiş edirik şəkil seçin");
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = () => {
      setImageBase64(fileReader.result);
      formData.image = imageBase64;

      axios
        .post("https://div.globalsoft.az/api/students", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          setError("");
          navigate("/students");
        })
        .catch((error) => {
          console.error(error);
          setError(error.response.data.message);
        });
    };
  };

  return (
    <>
      <h2>Tələbə əlavə etmək </h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row col-8">
              <div className="main-add-form-input-names col-6">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div className="main-add-form-input-names col-6">
                <label htmlFor="father_name">Father Name:</label>
                <input
                  type="text"
                  name="father_name"
                  id="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                />
                <br />

                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="user_type">User Type:</label>
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
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="birthday"> Birthday </label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="university">University:</label>
                <input
                  type="text"
                  name="university"
                  id="university"
                  value={formData.university}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="university_add_score">
                  University Add Score:
                </label>
                <input
                  type="text"
                  name="university_add_score"
                  id="university_add_score"
                  value={formData.university_add_score}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="registration_day">Registration Day:</label>
                <input
                  type="date"
                  name="registration_day"
                  id="registration_day"
                  value={formData.registration_day}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="reference">Reference:</label>
                <input
                  type="text"
                  name="reference"
                  id="reference"
                  value={formData.reference}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="course">Course:</label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={formData.course}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="group">Group:</label>
                <input
                  type="text"
                  name="group"
                  id="group"
                  value={formData.group}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="lesson_table">Lesson Table:</label>
                <input
                  type="text"
                  name="lesson_table"
                  id="lesson_table"
                  value={formData.lesson_table}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="student_status">Student Status:</label>
                <input
                  type="text"
                  name="student_status"
                  id="student_status"
                  value={formData.student_status}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="workplace">Workplace:</label>
                <input
                  type="text"
                  name="workplace"
                  id="workplace"
                  value={formData.workplace}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names col-6">
                <label htmlFor="is_diploma">Is Diploma:</label>
                <input
                  type="text"
                  name="is_diploma"
                  id="is_diploma"
                  value={formData.is_diploma}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="diploma_sn">Diploma Sn:</label>

                <input
                  type="text"
                  name="diploma_sn"
                  id="diploma_sn"
                  value={formData.diploma_sn}
                  onChange={handleChange}
                />
                <br />
              </div>

              <div className="main-add-form-input-names row">
                <div className="main-add-form-input-names col-6">
                  <label htmlFor="diploma_number">Graduation day:</label>
                  <input
                    type="date"
                    name="graduation_day"
                    id="graduation_day"
                    value={formData.graduation_day}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="main-add-form-input-names col-6">
                  <label htmlFor="next_payment_date"> Next payment date</label>
                  <input
                    type="date"
                    name="next_payment_date"
                    id="next_payment_date"
                    value={formData.next_payment_date}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
            </div>
            <div className="image-upload col-4 ">
              <img src={imageBase64} className="image-preview" />
              <Button variant="outlined" component="label">
                Upload photo
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  name="image"
                  size="medium"
                  id="image"
                  className="image-upload-input"
                  sx={{ borderRadius: "1px solid #000" }}
                  onChange={handleFileChange}
                />
              </Button>
              <br />
            </div>
            <span>{error}</span>
            <button type="submit">Əlavə et</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
