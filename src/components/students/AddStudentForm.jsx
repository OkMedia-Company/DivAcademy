import React, { useEffect, useState } from "react";
import "./AddStudentForm.css";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
import Select from "react-select";
import * as yup from "yup";
const Form = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

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
    birthday: "01-01-2002",
    phone: "12223367",
    email: "xelil1@gmail.com",
    password: 12262222,
    user_type: 1,
    status: "1",
    id_number: "1234567",
    university: "BDU",
    university_add_score: "444",
    registration_day: "01-01-2002",
    reference: "con",
    course: "3cu",
    group: "k45",
    lesson_table: "derscedveli",
    student_status: "1",
    workplace: "baki",
    is_diploma: "1",
    diploma_sn: "123456",
    graduation_day: "01-01-2002",
    next_payment_date: "01-01-2002",
  });
  const validationSchema = yup.object().shape({
    id_number: yup
      .string()
      .matches(
        /^[0-9A-Z]{7}$/,
        "Şəxsiyyət vəsiqəsi nömrəsi 7 rəqəmli yalnız hərflərdən və rəqəmlərdən ibarət olmalıdır"
      )
      .required("ID Number is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: yup
      .string()
      .matches(
        /^\+994\d{9}$/,
        "Phone number must start with +994 and have 9 digits after it"
      )
      .required("Phone number is required"),
  });
  const token = localStorage.getItem("token");
  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });
    try {
      await validationSchema.validateAt(name, formData);
      setErrors({ ...errors, [name]: "" });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  };
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
  const options = [
    { value: "Instagram", label: "Instagram" },
    { value: "Facebook", label: "Facebook" },
    { value: "Vebsayt", label: "Vebsayt" },
    { value: "Tədbir-sərgi", label: "Tədbir-sərgi" },
    { value: "Demo dərs - seminar", label: "Demo dərs - seminar" },
    { value: "Demo dərs - seminar", label: "Demo dərs - seminar" },
    { value: "Tanış tövsiyəsi", label: "Tanış tövsiyəsi" },
    { value: "DMA", label: "DMA" },
    { value: "Technest", label: "Technest" },
    { value: "Korporativ satış", label: "Korporativ satış" },
    { value: "Digər", label: "Digər" },
  ];
  const options2 = [
    { value: "1", label: "Aktiv" },
    { value: "0", label: "Passiv" },
  ];
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
                    value={formData.id_number}
                    onChange={handleChange}
                  />
                  {errors.id_number && (
                    <div className="error">{errors.id_number}</div>
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
                    value={formData.fin}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="email"> Şəxsi email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <br />
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
                  <label htmlFor="edu_maili"> Edu email :</label>
                  <input
                    type="edu_maili"
                    name="edu_maili"
                    id="edu_maili"
                    value={formData.edu_maili}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>

              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="phone">Mobil nömrə:</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={options}
                  />
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
                  <label htmlFor="university_add_score">
                    Universitet giriş balı:
                  </label>
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
                  <input
                    type="text"
                    name="course"
                    id="course"
                    value={formData.course}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="group">Qrup:</label>
                  <input
                    type="text"
                    name="group"
                    id="group"
                    value={formData.group}
                    onChange={handleChange}
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
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="is_diploma">Is Diploma:</label>
                  <input
                    type="text"
                    name="is_diploma"
                    id="is_diploma"
                    value={formData.is_diploma}
                    onChange={handleChange}
                  />
                  <br />
                </div>
                <div className=" col-6">
                  <label htmlFor="diploma_sn">Diplom seriya nömrəsi:</label>

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
                  <label htmlFor="diploma_number">Məzun günü:</label>
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
                  <label htmlFor="next_payment_date">
                    Növbəti ödəniş tarixi
                  </label>
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
              <div className=" col-12">
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
            </div>
            <div className="image-upload col-4 ">
              <img src={imageBase64} className="image-preview" />
              <Button variant="outlined" component="label">
                Şəkil yüklə
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
