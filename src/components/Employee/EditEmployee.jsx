import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
function EditEmployee() {
  const { userId } = useParams();
  const [formData, setFormData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://div.globalsoft.az/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const employee = response.data.employess.filter((item) => {
          return item.id == userId;
        });
        setFormData(employee[0]);
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
      .put(`https://div.globalsoft.az/api/employees/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        setError("");
        navigate("/employee");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };
  if (!formData?.id) {
    return <h2>Loading...</h2>;
  }
  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`https://div.globalsoft.az/api/employees/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        navigate("/employee");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };
  return (
    <>
      <h2>Əmakdaş düzəlişi</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className=" col-8">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="name">Ad:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6">
                  <label htmlFor="last_name">Soyad:</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className=" col-6">
                  <label htmlFor="father_name">Ata adı:</label>
                  <input
                    type="text"
                    name="father_name"
                    id="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6">
                  <label htmlFor="birthday">Doğum tarixi:</label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className=" col-6">
                  <label htmlFor="phone">Telefon:</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className=" col-6">
                  <label htmlFor="position">Vəzifə:</label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6">
                  <label htmlFor="salary">Maaş:</label>
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col image-upload">
              <img src={imageBase64} className="image-preview" />
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
            {error !== "" ? (
              <Alert severity="error" className="mt-2">
                {error}
              </Alert>
            ) : (
              ""
            )}

            <div className="row">
              <div className="col-6">
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
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
export default EditEmployee;
