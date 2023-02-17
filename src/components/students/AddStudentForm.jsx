import React, { useEffect, useState } from "react";
import "./AddStudentForm.css";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
import Select from "react-select";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const Form = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  useEffect(() => {
    axios
      .get("https://div.globalsoft.az/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCourses(response.data.course);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("https://div.globalsoft.az/api/groups", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setGroups(response.data.groups);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [formData, setFormData] = useState({
    image: "",
    name: "Ilqar",
    last_name: "Mammadov",
    father_name: "xelil",
    birthday: "2022-01-01",
    phone: "",
    email: "xelil1@gmail.com",
    password: 12262222,
    user_type: 1,
    status: "1",
    id_number: "1234567",
    university: "BDU",
    university_add_score: "444",
    registration_day: "2022-01-01",
    reference: "con",
    course: "",
    group: "k45",
    lesson_table: "derscedveli",
    student_status: "1",
    workplace: "baki",
    is_diploma: "1",
    diploma_sn: "123456",
    graduation_day: "2022-01-01",
    next_payment_date: "2022-01-01",
  });

  const validationSchema = yup.object().shape({
    id_number: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]{7}$/,
        "Şəxsiyyət vəsiqəsi nömrəsi 7 rəqəmli yalnız hərflərdən və rəqəmlərdən ibarət olmalıdır"
      )
      .required("ID Number is required"),
    email: yup.string().email("Düzgün email daxil edin"),
    edu_email: yup.string().email("Düzgün email daxil edin"),
    phone_number: yup
      .string()
      .matches(
        /^\+994\d{9}$/,
        "Phone number must start with +994 and have 9 digits after it"
      )
      .required("Phone number is required"),
    fin: yup
      .string("FIN yalniz herfden")
      .min(7, "FIN yalnız 7 rəqəmdən ibarət olmalıdır")
      .max(7, "FIN yalnız 7 rəqəmdən ibarət olmalıdır"),
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
  const token = localStorage.getItem("token");
  const handleChange = async (event) => {
    if (event.target.name === "fin") {
      event.target.value = event.target.value.toUpperCase();
    }

    if (event.target.name === "reference_addition") {
      formData.reference = `${selectedOption} | ${event.target.value}`;
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });

    console.log(formData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === null) {
      formData.reference = `${event.target.value}`;
    }
    if (imageFile === null) {
      setError("Xahiş edirik şəkil seçin");
    }
    if (imageFile !== null) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = () => {
        setImageBase64(fileReader.result);
        formData.image = imageBase64;
      };
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
    }
  };
  const handleFileDelete = (event) => {
    setOpen(false);

    event.preventDefault();
    console.log(imageBase64);
    setImageFile("");
    setImageBase64("");
    // imageRef.current.value = "";
  };

  const options = [
    { value: "Instagram", label: "Instagram" },
    { value: "Facebook", label: "Facebook" },
    { value: "Vebsayt", label: "Vebsayt" },
    { value: "Tədbir-sərgi", label: "Tədbir-sərgi" },
    { value: "Demo dərs - seminar", label: "Demo dərs - seminar" },
    { value: "Tanış tövsiyəsi", label: "Tanış tövsiyəsi" },
    { value: "DMA", label: "DMA" },
    { value: "Technest", label: "Technest" },
    { value: "Korporativ satış", label: "Korporativ satış" },
    { value: "Digər", label: "Digər" },
  ];
  const handleCourseChange = (selectedOption) => {
    formData.course = selectedOption.value;
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    groups?.map((group) => {
      if (selectedOption.value === group.group_code) {
        formData.graduation_day = group.end_date;
      }
    });
  };
  const handleDiplomaChange = (selectedOption) => {
    formData.is_diploma = selectedOption.value;
  };
  useDocumentTitle("Tələbə əlavə etmək");
  return (
    <>
      <h2>Tələbə əlavə etmək </h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row col-8">
              <div className="row">
                <div className=" col-6">
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
              <div className=" row">
                <div className=" col-6">
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
                  <label htmlFor="id_number">Şəxsiyyət vəsiqəsi nömrəsi:</label>
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
              </div>
              <div className=" row">
                <div className="col-6">
                  <label htmlFor="password">Email şifrəsi: </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
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
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="phone">Mobil nömrə:</label>
                  <InputMask
                    name="phone"
                    id="phone"
                    alwaysShowMask={true}
                    prefix="+994"
                    mask="+\9\9\4\ (99) 999-99-99"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="registration_day">Qeydiyyat günü:</label>
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
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="reference">Referans:</label>
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
                    defaultValue={options[0]}
                    isClearable={false}
                    onChange={handleSelectChange}
                    isSearchable={true}
                    name="color"
                    placeholder="Referans seçin"
                    options={options}
                  />
                  {selectedOption === "Tədbir-sərgi" && (
                    <div className="col">
                      <label htmlFor="reference_name">
                        Tədbirin adı və tarixi:
                      </label>
                      <input
                        type="text"
                        name="reference_addition"
                        id="reference_addition"
                        value={formData.reference_addition}
                        onChange={handleChange}
                      />
                      <br />
                    </div>
                  )}
                  {selectedOption === "Tanış tövsiyəsi" && (
                    <div className="col">
                      <label htmlFor="reference_name">Tövsiyə edən:</label>
                      <input
                        type="text"
                        name="reference_addition"
                        id="reference_addition"
                        value={formData.reference_addition}
                        onChange={handleChange}
                      />
                      <br />
                    </div>
                  )}
                  {selectedOption === "Korporativ satış" && (
                    <div className="col">
                      <label htmlFor="reference_name">Satış edən:</label>
                      <input
                        type="text"
                        name="reference_addition"
                        id="reference_addition"
                        value={formData.reference_addition}
                        onChange={handleChange}
                      />
                      <br />
                    </div>
                  )}
                  {/* <label htmlFor="reference">Referans:</label>
                  <input
                    type="text"
                    name="reference"
                    id="reference"
                    value={formData.reference}
                    onChange={handleChange}
                  />
                  <br /> */}
                </div>

                <div className=" col-6">
                  <label htmlFor="student_status">Tələbə statusu:</label>
                  <input
                    type="text"
                    name="student_status"
                    id="student_status"
                    value={formData.student_status}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
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
                <div className=" col-6">
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
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="birthday"> Doğum tarixi </label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="course">Kurs:</label>
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
                    isClearable={true}
                    isMulti={true}
                    placeholder="Kurs seçin..."
                    onChange={handleCourseChange}
                    isSearchable={true}
                    name="color"
                    options={courses?.map((course) => {
                      return { value: course.name, label: course.name };
                    })}
                  />
                  <br />
                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="group">Qrup:</label>
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
                    placeholder="Qrup seçin"
                    options={groups?.map((group) => {
                      return {
                        value: group.group_code,
                        label: group.group_code,
                      };
                    })}
                  />
                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="lesson_table">Dərs cədvəli:</label>
                  <input
                    type="text"
                    name="lesson_table"
                    id="lesson_table"
                    value={formData.lesson_table}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="graduation_day">Məzun günü:</label>
                  <input
                    type="date"
                    name="graduation_day"
                    id="graduation_day"
                    value={formData.graduation_day}
                    onChange={handleChange}
                  />
                  <br />
                </div>
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
              </div>
              <div className=" row">
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
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="workplace">İş yeri:</label>
                  <input
                    type="text"
                    name="workplace"
                    id="workplace"
                    value={formData.workplace}
                    onChange={handleChange}
                  />
                  <br />
                </div>

                <div className=" col-6">
                  <label htmlFor="next_payment_date">Vəzifə</label>
                  <input
                    type="text"
                    name="vezife"
                    id="vezife"
                    value={formData.vezife}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="is_diploma">Sertifikat Vəziyyəti:</label>
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
                    onChange={handleDiplomaChange}
                    isSearchable={true}
                    name="color"
                    placeholder="Sertifikat Vəziyyəti"
                    options={[
                      { value: "1", label: "Sertifakat aldı" },
                      { value: "0", label: "Sertifakat verilməyib" },
                    ]}
                  />

                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="diploma_sn">Sertifikat seriyası:</label>
                  <input
                    type="text"
                    name="diploma_sn"
                    id="diploma_sn"
                    value={formData.diploma_sn}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>

              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="next_payment_date">Növbəti ödəniş günü</label>
                  <input
                    type="date"
                    disabled={true}
                    name="next_payment_date"
                    id="next_payment_date"
                    value={formData.next_payment_date}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="karyera_merkezi">
                    Karyera mərkəzinin işə düzəltmə tarixi
                  </label>
                  <input
                    type="date"
                    name="karyera_merkezi"
                    id="karyera_merkezi"
                    value={formData.karyera_merkezi}
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
            <Alert severity="error" className="mt-2">
              {error}
            </Alert>
            <button type="submit">Əlavə et</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
