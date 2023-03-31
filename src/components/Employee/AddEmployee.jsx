import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import useDocumentTitle from "../tools/useDocumentTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import DatePicker from "../tools/DatePickerComponent";
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFileDelete = (event) => {
    setOpen(false);

    event.preventDefault();
    console.log(imageBase64);
    setImageFile("");
    setImageBase64("");
    // imageRef.current.value = "";
  };

  const handleSelectChange = (event) => {
    setFormData({ ...formData, position: event.value });
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
  useDocumentTitle("Əməkdaş əlavə et");
  return (
    <>
      <h2>Əmakdaş əlavə et</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className=" row col-8">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="name">Ad Soyad:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="last_name">Soyad:</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" row ">
                <div className="col-6">
                  <label htmlFor="father_name">Ata adı:</label>
                  <input
                    type="text"
                    name="father_name"
                    id="father_name"
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6 ">
                  <label htmlFor="birthday">Doğum tarixi:</label>
                  <DatePicker />

                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label htmlFor="phone">Telefon:</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6 ">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className=" row ">
                <div className="col-6">
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
              </div>
              <div className=" row ">
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
                  <DatePicker />
                </div>
                <div className="form-group col">
                  <label htmlFor="status">Status:</label>
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: "none",
                        outline: "none",
                        boxShadow: "none",
                        color: "black",
                        width: "100%",
                        "&:hover": {
                          borderColor: "none",
                          outline: "none",
                          boxShadow: "none",
                        },
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      width: "100%",
                      color: "black",
                      colors: {
                        ...theme.colors,
                        primary25: "rgb(242, 242, 242)",
                        primary: "rgb(242, 242, 242)",
                      },
                    })}
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={handleSelectChange}
                    isSearchable={true}
                    name="color"
                    placeholder="Status seçin"
                    options={[
                      { value: "Aktiv", label: "Aktiv" },
                      { value: "Passiv", label: "Passiv" }

                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="image-upload col-4 ">
              <img src={imageBase64} className="image-preview" />
              <div className="row ms-4">
                <div className="col-6">
                  <Button variant="outlined" component="label">
                    Şəkil yüklə
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
                </div>
                <div className="col-5 delete-image-button">
                  <Button
                    variant="outlined"
                    component="label"
                    color="error"
                    onClick={handleClickOpen}
                  >
                    Şəkli sil
                  </Button>
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Şəkil silinsin?"}
                  </DialogTitle>
                  <DialogContent></DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Ləğv et</Button>
                    <Button onClick={handleFileDelete} autoFocus>
                      Razı
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <br />
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
