import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";

function EditCourse() {
  const { userId } = useParams();
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [teacher, setTeacher] = useState([]);
  const [group, setGroup] = useState([]);
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
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
        setStatus(response.status);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
    navigate("/courses");
  };
  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const course = response.data.groups.filter((item) => {
          return item.course_id == userId;
        });
        setFormData(course[0]);
      });
    axios
      .get(`https://div.globalsoft.az/api/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTeacher(response.data.teachers);
      });
    axios
      .get(`https://div.globalsoft.az/api/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setGroup(response.data.groups);
      });
  }, [userId]);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  useDocumentTitle(`Kursu editlə -  ${formData.name}`)
  if (!formData) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h2>Edit Course</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="name">Kursun adı:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div className="col-md-6">
                <label htmlFor="course_id">Kurs İd</label>
                <input
                  type="text"
                  name="course_id"
                  id="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="teacher_id">Teacher Id</label>
                <select name="teacher_id" id="teacher_id">
                  {teacher.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                <br />
              </div>
              <div className="col-md-6">
                <label htmlFor="group_code">Group Code</label>
                <select name="group_code" id="group_code">
                  {group.map((item) => {
                    return <option value={item.id}>{item.group_code}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="monthly_price">Kursun aylıq qiyməti:</label>
                <input
                  type="text"
                  name="monthly_price"
                  id="monthly_price"
                  value={formData.monthly_price}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div className="col-md-6">
                <label htmlFor="last_name">Kursun müddəti (ayla):</label>
                <input
                  type="text"
                  name="course_duration"
                  id="course_duration"
                  value={formData.course_duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="last_name">Kursun günü :</label>
            <input
              type="text"
              name="lesson_day"
              id="lesson_day"
              value={formData.lesson_day}
              onChange={handleChange}
            />
            <label htmlFor="last_name">Kursun vaxtı :</label>
            <input
              type="text"
              name="lesson_time"
              id="lesson_time"
              value={formData.lesson_time}
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
            <Button variant="contained" color="primary" type="submit">
              Edit
            </Button>
            <Button
              variant="contained"
              className="delete-button"
              color="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <div className="main-add-form_input row col-8"></div>
          </div>
        </form>
        {error && <div>{error}</div>}
      </div>
    </>
  );
}

export default EditCourse;
