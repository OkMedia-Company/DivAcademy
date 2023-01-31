import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
function EditForm() {
  const { userId } = useParams();
  const [formData, setFormData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const imageRef = useRef(null);
  const [status, setStatus] = useState("");
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const student = response.data.students.filter((item) => {
          return item.id == userId;
        });
        setFormData(student[0]);
      });
  }, [userId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    setImageFile(event.target.files[0]);

    fileReader.onload = (e) => {
      setImageBase64(e.target.result);
    };

    fileReader.readAsDataURL(file);
  }

  axios
    .get("https://div.globalsoft.az/uploads/user_images/63cbd18893e38.jpeg", {
      responseType: "blob",
      Accept: "image/jpeg",
      "Content-Type": "image/jpeg",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    })
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(base64data);
        // do something with base64data
      };
      reader.readAsDataURL(blob);
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.image = imageBase64;
    axios
      .put(`https://div.globalsoft.az/api/students/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        navigate("/students");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };

  if (!formData?.id) {
    return (
      <div className="pt-5">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
      </div>
    );
  }
  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`https://div.globalsoft.az/api/students/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        navigate("/students");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };

  return (
    <>
      <h2>Edit Student</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className=" main-add-form_input col-8">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="col-6">
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
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="father_name">Father Name:</label>
                  <input
                    type="text"
                    name="father_name"
                    id="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="col-6">
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
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <br />
                </div>
                <div className="col-6">
                  <label htmlFor="password">Password </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="birthday">Birthday:</label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="col-6">
                  <label htmlFor="group">Group:</label>
                  <input
                    type="text"
                    name="group"
                    id="group"
                    value={formData.group}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
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
                <div className="col-6">
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
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="start_date">Registiration Day:</label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={formData.registration_day}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="col-6">
                  <label htmlFor="end_date">Reference:</label>
                  <input
                    type="text"
                    name="end_date"
                    id="end_date"
                    value={formData.reference}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="end_date">Diplom series number:</label>
                  <input
                    type="text"
                    name="end_date"
                    id="end_date"
                    value={formData.diploma_sn}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="col-6">
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
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="Workplace">Workplace:</label>
                  <input
                    type="text"
                    name="Workplace"
                    id="Workplace"
                    value={formData.workplace}
                    onChange={handleChange}
                  />
                  <br />
                </div>

                <div className="col-6">
                  <label htmlFor="payment">University add score:</label>
                  <input
                    type="number"
                    name="payment"
                    id="payment"
                    value={formData.university_add_score}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="payment_date">Next Payment date:</label>
                    <input
                      type="date"
                      name="payment_date"
                      id="payment_date"
                      value={formData.next_payment_date}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="payment_date">Lesson table:</label>
                    <input
                      type="text"
                      name="payment_date"
                      id="payment_date"
                      value={formData.lesson_table}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
              </div>
              <label htmlFor="payment_date">Is diploma:</label>
              <input
                type="text"
                name="payment_date"
                id="payment_date"
                value={formData.is_diploma}
                onChange={handleChange}
              />
              <br />
            </div>
            <div className="image-upload row col">
              <img ref={imageRef} src={imageBase64} className="image-preview" />
              <Button variant="outlined" component="label">
                Upload photo
                <input
                  hidden
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
            <p>{error}</p>
            <div className="row">
              <div className="col-6">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
              <div className="col-6">
                <Button
                  className="delete-button"
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditForm;
