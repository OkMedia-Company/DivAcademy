import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material"; 
import axios from "axios";
import validationSchema from "../tools/Validation";
import useDocumentTitle from "../tools/useDocumentTitle";
import InputMask from "react-input-mask";
import Select from "react-select";
import { AuthContext } from "../context/Contexts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
function AddMentorForm() {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const groups = useContext(AuthContext);
  const [open, setOpen] = useState(false);
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
  const handleVerication = async (event) => {
    const { name, value } = event.target;
    try {
      await validationSchema.validateAt(name, formData);
      setErrors({ ...errors, [name]: "" });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  };
  const handleFileDelete = (event) => {
    event.preventDefault();
    setOpen(false);
    console.log(imageBase64);
    setImageFile("");
    setImageBase64("");
    // imageRef.current.value = "";
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    groups.groups.groups?.map((group) => {
      if (selectedOption.value === group.group_code) {
        formData.graduation_day = group.end_date;
      }
    });
  };
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
  useDocumentTitle("Mentor əlavə etmək");
  return (
    <>
      <h2>Mentor əlavə etmək</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row">
              <div className="main-add-form-input-names col me-5">
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
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="last_name">Soyad:</label>
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
                    <label htmlFor="father_name">Ata adı:</label>
                    <input
                      type="text"
                      name="father_name"
                      id="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="id_number">
                      Şəxsiyyət vəsiqəsi nömrəsi:
                    </label>
                    <input
                      type="text"
                      name="id_number"
                      id="id_number"
                      onKeyUp={handleVerication}
                      value={formData.id_number}
                      onChange={handleChange}
                    />
                    {errors.id_number && (
                      <div className="error-input">{errors.id_number}</div>
                    )}
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className=" col-6">
                    <label htmlFor="fin">FİN:</label>
                    <input
                      type="text"
                      name="fin"
                      id="fin"
                      onKeyUp={handleVerication}
                      value={formData.fin}
                      onChange={handleChange}
                    />
                    {
                      <div className="error-input">
                        {errors.fin && errors.fin}
                      </div>
                    }
                  </div>
                  <div className="col-6">
                    <label htmlFor="birthday">Doğum tarixi:</label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className=" col-6">
                    <label htmlFor="edu_email"> Edu email :</label>
                    <input
                      type="edu_email"
                      name="edu_email"
                      id="edu_email"
                      onKeyUp={handleVerication}
                      value={formData.edu_email}
                      onChange={handleChange}
                    />
                    {
                      <div className="error-input">
                        {errors.edu_email && errors.edu_email}
                      </div>
                    }
                  </div>
                  <div className="col-6">
                    <label htmlFor="phone">Telefon:</label>
                    <InputMask
                      name="phone"
                      id="phone"
                      alwaysShowMask={true}
                      prefix="+994"
                      mask="+\9\9\4999999999"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className=" col-6">
                    <label htmlFor="email"> Şəxsi email:</label>
                    <input
                      type="email"
                      name="email"
                      onKeyUp={handleVerication}
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {
                      <div className="error-input">
                        {errors.email && errors.email}
                      </div>
                    }
                  </div>
                  <div className="col-6">
                    <label htmlFor="password">Şifrə:</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className=" col-6">
                    <label htmlFor="university">Universiteti:</label>
                    <input
                      type="text"
                      name="university"
                      id="university"
                      value={formData.university}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="ixtisas">İxtisası:</label>
                    <input
                      type="text"
                      name="ixtisas"
                      id="ixtisas"
                      value={formData.ixtisas}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="university_add_score">Qəbul balı:</label>
                    <input
                      type="text"
                      name="university_add_score"
                      id="university_add_score"
                      value={formData.university_add_score}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="working_place">İş yeri:</label>
                    <input
                      type="text"
                      name="working_place"
                      id="working_place"
                      value={formData.working_place}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className=" col-6">
                    <label htmlFor="vezife">Vəzifə:</label>
                    <input
                      type="text"
                      name="vezife"
                      id="vezife"
                      value={formData.vezife}
                      onChange={handleChange}
                    />
                    <br />
                  </div>

                  <div className="col-6">
                    <label htmlFor="current_groups">Cari qrupları:</label>
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
                      isMulti={true}
                      placeholder="Qrup seçin"
                      options={groups.groups.groups?.map((group) => {
                        return {
                          value: group.group_code,
                          label: group.group_code,
                        };
                      })}
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="user_type">İstifadəçi tipi:</label>
                    <input
                      type="number"
                      name="user_type"
                      id="user_type"
                      value={formData.user_type}
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
                    <label htmlFor="salary_group">
                      Qrup başına əmək haqqı:
                    </label>
                    <input
                      type="text"
                      name="salary_group"
                      id="salary_group"
                      value={formData.salary_group}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="registration_day">
                      İşə başlama tarixi :
                    </label>
                    <input
                      type="date"
                      name="registration_day"
                      id="registration_day"
                      value={formData.registration_day}
                      onChange={handleChange}
                    />
                    <br />
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

export default AddMentorForm;
