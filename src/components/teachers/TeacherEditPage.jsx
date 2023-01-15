import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function TeacherEditPage() {
  const { userId } = useParams();
  const [formData, setFormData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/teachers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const teacher = response.data.teachers.filter((item) => {
          return item.id == userId;
        });
        setFormData(teacher[0]);
      });
  }, [userId]);
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

  function handleFileChange(event) {
    setImageFile(event.target.files[0]);
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImageBase64(e.target.result);
    };
    fileReader.readAsDataURL(file);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.image = imageBase64;
    if (!formData.image) {
      formData.image = formData.image;
    }
    axios
      .put(`https://div.globalsoft.az/api/teachers/${userId}`, formData, {
        headers: {
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
      .delete(`https://div.globalsoft.az/api/teachers/${userId}`, {
        headers: {
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
    navigate("/teachers");
  };
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
              <label htmlFor="father_name">Father Name:</label>
              <input
                type="text"
                name="father_name"
                id="father_name"
                value={formData.father_name}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                value={formData.birthday}
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
              <label htmlFor="email">Email:</label>
              <input
                type="text"
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
              <label htmlFor="registration_day">Registration Day:</label>
              <input
                type="date"
                name="registration_day"
                id="registration_day"
                value={formData.registration_day}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="current_groups">Current Groups:</label>
              <input
                type="text"
                name="current_groups"
                id="current_groups"
                value={formData.current_groups}
                onChange={handleChange}
              />
              <br />
            </div>
            <div className="main-add-form_input row col-8">
              <label htmlFor="image">Choose Image:</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
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

export default TeacherEditPage;
