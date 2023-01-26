import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {
  const { userId } = useParams();
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const course = response.data.course.filter((item) => {
          return item.id == userId;
        });
        setFormData(course[0]);
      });
  }, [userId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://div.globalsoft.az/api/courses/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };
  const handleDelete = () => {
    axios
      .delete(`https://div.globalsoft.az/api/courses/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
    navigate("/courses");
  };
  console.log(formData);
  if (!formData) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h2>Edit Teacher</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row col-8">
              <label htmlFor="name">Kursun adı:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="course_id">Kurs İd</label>
              <input
                type="text"
                name="course_id"
                id="course_id"
                value={formData.course_id}
                onChange={handleChange}
              />
              <label htmlFor="teacher_id">Teacher Id</label>
              <input
                type="text"
                name="teacher_id"
                id="teacher_id"
                value={formData.teacher_id}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="group_code">Group Code</label>
              <input
                type="text"
                name="group_code"
                id="group_code"
                value={formData.group_code}
                onChange={handleChange}
              />

              <label htmlFor="monthly_price">Kursun aylıq qiyməti:</label>
              <input
                type="text"
                name="monthly_price"
                id="monthly_price"
                value={formData.monthly_price}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="last_name">Kursun müddəti (ayla):</label>
              <input
                type="text"
                name="course_duration"
                id="course_duration"
                value={formData.course_duration}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="start_date">Start Date:</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="end_date">End date :</label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
              <br />
            </div>
            <div className="main-add-form_input row col-8">
              <Button variant="contained" color="primary" type="submit">
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </form>
        {error && <div>{error}</div>}
      </div>
    </>
  );
}

export default EditCourse;
