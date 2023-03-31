import React, { useContext, useEffect, useState } from "react";
import "./AddStudentForm.css";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
import SelectComponent from "../tools/Select";
import validationSchema from "../tools/Validation";
import Select from "react-select";
import InputMask from "react-input-mask";
import dayjs from "dayjs";
import defaultAvatar from "../../imgs/defaultAvatar.png"
import { options } from "./options"

import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";
import DatePickerComponent from "../tools/DatePickerComponent";
import DialogBarComponent from "../tools/DialogBarComponent";
const Form = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        setImageBase64(reader.result);
        formData.image = imageBase64;
      }
      reader.readAsDataURL(file)
    })
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleVerication = async (event) => {
    const { name, value } = event.target;
    try {
      await validationSchema.validateAt(name, formData);
      setErrors({ ...errors, [name]: "" });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  };
  const handleDateChange = (fieldName) => (date, dateString) => {
    setFormData({
      ...formData,
      [fieldName]: `${dayjs(date).format("DD-MM-YYYY")}`
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
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
  const handleFileDelete = (event) => {
    event.preventDefault();
    setOpen(!open);
    setImageFile("");
    setImageBase64("");
    imageRef.current.value = "";
  };
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    last_name: "",
    father_name: "",
    birthday: "",
    phone: "",
    email: "",
    password: 0,
    status: "Aktiv",
    id_number: "",
    university: "",
    university_add_score: "",
    registration_day: "",
    reference: "",
    course: "",
    group: "",
    lesson_table: "",
    student_status: "1",
    workplace: "",
    is_diploma: "",
    diploma_sn: "",
    graduation_day: "",
    next_payment_date: "",
  });

  const token = localStorage.getItem("token");
  const handleChange = async (event) => {
    if (event.target.name === "fin") {
      event.target.value = event.target.value.toUpperCase();
    }
    if (event.target.name === "reference_addition") {
      formData.reference = `${selectedOption} | ${event.target.value}`;
    }

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (selectedOption === null) {
      formData.reference = `${event.target.value}`;
    }
    const phoneAsNumber = parseInt(formData.phone, 10);
    formData.phone = phoneAsNumber;
    if (imageFile != null) {
      console.log(imageFile);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = () => {
        setImageBase64(fileReader.result);
      };
    }
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
  const handleCourseChange = (selectedOption) => {
    formData.course = selectedOption.value;
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    const filteredGroup = groups.filter((group) => group.group_code === selectedOption.value);
    formData.lesson_table = filteredGroup.map((group) => group.lessons.map((lesson) => lesson.week_day)).join(", ") + " " + filteredGroup.map((group) => group.lessons[0].time).join(", ");
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

                </div>
              </div>
              <div className=" row align-items-center justify-content-center">
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
                  <label htmlFor="id_number">Şəxsiyyət vəsiqəsi nömrəsi:</label>
                  <div className="id-number-main">
                    <div className="id-number-type">
                      <Select
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "none",
                            outline: "none",
                            boxShadow: "none",
                            backgroundColor: "#f5f5f5 !important",
                            color: "black",
                            minHeight: "54px",
                            width: "100px",
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
                          width: "2px !important",
                          color: "black",
                          colors: {
                            ...theme.colors,
                            primary25: "rgb(242, 242, 242)",
                            primary: "rgb(242, 242, 242)",
                          },
                        })}
                        classNamePrefix="select"
                        isClearable={false}
                        placeholder="AA"
                        onChange={handleSelectChange}
                        isSearchable={true}
                        name="color"
                        defaultValue={
                          { value: "AA", label: "AA" }
                        }
                        options={
                          [
                            { value: "AA", label: "AA" },
                            { value: "AZE", label: "AZE" },
                          ]
                        }
                      />
                    </div>
                    <div className="id-number col-9">
                      <input
                        type="text"
                        name="id_number"
                        id="id_number"
                        onKeyUp={handleVerication}
                        value={formData.id_number}
                        style={{ borderRadius: "0px 14px 14px 0" }}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                  {errors.id_number && (
                    <div className="error-input">{errors.id_number}</div>
                  )}
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
                  <label htmlFor="birthday"> Doğum tarixi </label>
                  <div className="datepicker">
                    <DatePickerComponent
                      onChange={handleDateChange('birthday')}
                    />
                  </div>

                </div>

              </div>
              <div className=" row">
                <div className="col-6">
                  <label htmlFor="password">Hesabın şifrəsi: </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={formData?.birthday.split("-").join("")}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-6">
                  <label htmlFor="phone">Mobil nömrə:</label>
                  <InputMask
                    name="phone"
                    id="phone"
                    alwaysShowMask={true}
                    prefix="+994"
                    mask="+\9\9\4999999999"
                    onChange={handleChange}
                    value={formData.phone}
                  />

                </div>
              </div>
              <div className=" row">
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
                <div className="col-6">
                  <label htmlFor="email_password">Edu email şifrəsi: </label>
                  <input
                    type="text"
                    name="email_password"
                    id="email_password"
                    value={formData.email_password}
                    onChange={handleChange}
                  />
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

                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="registration_day">Qeydiyyat günü:</label>
                  <div className="datepicker">
                    <DatePickerComponent
                      onChange={handleDateChange('registration_day')}
                    />

                  </div>
                  <div>
                  </div>
                </div>
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
                    </div>
                  )}

                </div>

              </div>
              <div className=" row">
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

                </div>
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

                </div>


              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="lesson_table">Dərs qrafiki:</label>
                  <input
                    type="text"
                    name="lesson_table"
                    id="lesson_table"
                    style={{ background: "#bbbbbb" }}
                    disabled
                    value={formData.lesson_table}
                    onChange={handleChange}
                  />

                </div>
                <div className=" col-6">
                  <label htmlFor="graduation_day">Məzun günü:</label>
                  <div className="datepicker">
                    <DatePickerComponent
                      onChange={handleDateChange("graduation_day")}
                    />

                  </div>
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
                </div>
              </div>
              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="next_payment_date">Növbəti ödəniş günü</label>
                  <div className="datepicker">
                    <DatePickerComponent
                      onChange={handleDateChange("next_payment_date")}
                    />

                  </div>

                </div>
                <div className=" col-6">
                  <label htmlFor="karyera_merkezi">
                    Karyera mərkəzinin işə düzəltmə tarixi
                  </label>
                  <div className="datepicker">
                    <DatePickerComponent
                      onChange={handleDateChange("karyera_merkezi")}
                    />

                  </div>
                </div>
              </div>
              <div className=" row">

                <div className=" col-12">
                  <label htmlFor="status">Status:</label>
                  <SelectComponent
                    options={[
                      { value: "1", label: "Aktiv" },
                      { value: "0", label: "Passiv" },
                    ]}
                    onChange={handleChange}
                    value={
                      { value: "1", label: "Aktiv" }
                    }
                  />
                </div>
              </div>
            </div>

            <div className="image-upload col-4 ">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <div
                      className="image-preview d-flex align-items-center justify-content-center"
                      style={{ background: "#bbbbbb", border: "2px dashed #000" }}
                    >Buraya şəkil sürüşdür</div> :
                    <img src={imageBase64 === "" ? defaultAvatar : imageBase64} className="image-preview" />
                }
              </div>
              <div className="row ms-4">
                <div className="col-6">
                  <Button variant="outlined" component="label" className="image-upload-btn">
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
                <DialogBarComponent
                  open={open}
                  setOpen={setOpen}
                  handleFileDelete={handleFileDelete}
                  fileName={"fileName"}
                />
              </div>
            </div>
            {error &&
              <Alert severity="error" className="mt-2">
                {error}
              </Alert>
            }
            <button type="submit">Əlavə et</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
