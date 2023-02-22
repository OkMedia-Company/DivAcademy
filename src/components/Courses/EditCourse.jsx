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
  useDocumentTitle(`Kursu editlə -  ${formData.name}`);
  if (!formData) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h2>Kurs düzəlişi</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row col-8">
              <label htmlFor="name">Kursun adı:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="monthly_price">Kursun aylıq qiyməti:</label>
              <input
                type="number"
                name="monthly_price"
                id="monthly_price"
                onChange={handleChange}
              />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="course_duration">Kursun müddəti (ayla):</label>
              <input
                type="number"
                name="course_duration"
                id="course_duration"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="form-group col-6">
              <Button
                  className="delete-button"
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Sil
                </Button>
              </div>
              <div className="form-group col-6">
                <Button type="submit">Yadda saxla</Button>
              </div>
            </div>
          </div>
        </form>
        {error && <div>{error}</div>}
      </div>
    </>
  );
}

export default EditCourse;
