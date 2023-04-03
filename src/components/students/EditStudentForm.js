// import { useState, useEffect, useCallback } from "react";
// import { useRef } from "react";
// import "./AddStudentForm.css";
// import axios from "axios";
// import React from "react"
// import { Alert, Button, Skeleton } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";
// import * as yup from "yup";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import InputMask from "react-input-mask";

// import dayjs from 'dayjs';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import defaultAvatar from "../../imgs/defaultAvatar.png"

// import useDocumentTitle from "../tools/useDocumentTitle";
// import { useDropzone } from "react-dropzone";
// import SelectComponent from "../tools/Select";
// import DatePickerComponent from "../tools/DatePickerComponent";
// function EditForm() {
//   const { userId } = useParams();
//   const [formData, setFormData] = useState("");
//   const [imageFile, setImageFile] = useState("");
//   const [imageBase64, setImageBase64] = useState("");
//   const [error, setError] = useState("");
//   const [errorStatus, setErrorStatus] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [student, setStudent] = useState([]);
//   const imageRef = useRef(null);

//   const [open, setOpen] = useState(false);
//   const [errors, setErrors] = useState({});
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleDateChange = (fieldName) => (date, dateString) => {
//     setFormData({
//       ...formData,
//       [fieldName]: `${dayjs(date).format("YYYY.MM.DD")}`,
//     });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const options = [
//     { value: "Instagram", label: "Instagram" },
//     { value: "Facebook", label: "Facebook" },
//     { value: "Vebsayt", label: "Vebsayt" },
//     { value: "Tədbir-sərgi", label: "Tədbir-sərgi" },
//     { value: "Demo dərs - seminar", label: "Demo dərs - seminar" },
//     { value: "Tanış tövsiyəsi", label: "Tanış tövsiyəsi" },
//     { value: "DMA", label: "DMA" },
//     { value: "Technest", label: "Technest" },
//     { value: "Korporativ satış", label: "Korporativ satış" },
//     { value: "Digər", label: "Digər" },
//   ];
//   const handleCourseChange = (selectedOption) => {
//     formData.course = selectedOption.map((course) => course.value);
//   };
//   const onDrop = useCallback(acceptedFiles => {
//     acceptedFiles.forEach(file => {
//       const reader = new FileReader()
//       reader.onload = () => {
//         setImageBase64(reader.result);
//         formData.image = imageBase64;
//       }
//       reader.readAsDataURL(file)
//     })
//   }, [])

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
//   const [selectedOption, setSelectedOption] = useState("");
//   const handleSelectChange = (selectedOption) => {
//     setSelectedOption(selectedOption.value);
//     groups?.map((group) => {
//       if (selectedOption.value === group.group_code) {
//         formData.graduation_day = group.end_date;
//       }
//     });
//   };
//   const handleDiplomaChange = (selectedOption) => {
//     formData.is_diploma = selectedOption.value;
//   };
//   const validationSchema = yup.object().shape({
//     id_number: yup
//       .string()
//       .matches(
//         /^[a-zA-Z0-9]{7}$/,
//         "Şəxsiyyət vəsiqəsi nömrəsi 7 rəqəmli yalnız hərflərdən və rəqəmlərdən ibarət olmalıdır"
//       )
//       .required("ID Number is required"),
//     email: yup.string().email("Düzgün email daxil edin"),
//     edu_email: yup.string().email("Düzgün email daxil edin"),
//     phone_number: yup
//       .string()
//       .matches(
//         /^\+994\d{9}$/,
//         "Phone number must start with +994 and have 9 digits after it"
//       )
//       .required("Phone number is required"),
//     fin: yup
//       .string("FIN yalniz herfden")
//       .min(7, "FIN yalnız 7 rəqəmdən ibarət olmalıdır")
//       .max(7, "FIN yalnız 7 rəqəmdən ibarət olmalıdır"),
//   });

//   const handleVerication = async (event) => {
//     const { name, value } = event.target;
//     try {
//       await validationSchema.validateAt(name, formData);
//       setErrors({ ...errors, [name]: "" });
//     } catch (error) {
//       setErrors({ ...errors, [name]: error.message });
//     }
//   };
//   const [status, setStatus] = useState("");
//   let navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     axios
//       .get(`https://div.globalsoft.az/api/students/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",

//         },
//       })
//       .then((response) => {
//         setFormData(response.data.students[0]);
//       }
//       )
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [userId, token]);
//   const handleChange = (event) => {

//     if (event.target.name === "fin") {
//       event.target.value = event.target.value.toUpperCase();
//     }
//     if (event.target.name === "reference_addition") {
//       formData.reference = `${selectedOption} | ${event.target.value}`;
//     }
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   function handleFileChange(event) {
//     const file = event.target.files[0];
//     const fileReader = new FileReader();
//     setImageFile(event.target.files[0]);

//     fileReader.onload = (e) => {
//       setImageBase64(e.target.result);
//     };
//     fileReader.readAsDataURL(file);
//   }
//   const handleFileDelete = (event) => {
//     event.preventDefault();
//     setOpen(false);
//     setImageFile("");
//     setImageBase64("");
//     imageRef.current.value = "";
//   };

//   useEffect(() => {
//     axios
//       .get("https://div.globalsoft.az/api/courses", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         setCourses(response.data.course);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     axios
//       .get("https://div.globalsoft.az/api/groups", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         setGroups(response.data.groups);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (imageFile === null) {
//       setError("Xahiş edirik şəkil seçin");
//     }
//     console.log(formData);
//     formData.image = imageBase64;
//     axios
//       .put(`https://div.globalsoft.az/api/students/${userId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },

//       })
//       .then((response) => {
//         setStatus(response.status);
//         navigate("/students");
//       })
//       .catch((error) => {
//         console.error(error);
//         setError(error.response.data.message);
//         setErrorStatus(error.response.status);
//       });
//   };


//   const handleDelete = (event) => {
//     event.preventDefault();
//     setOpen(false);

//     axios
//       .delete(`https://div.globalsoft.az/api/students/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         setStatus(response.status);
//         navigate("/students");
//       })
//       .catch((error) => {
//         console.error(error);
//         setError(error.response.data.message);
//         setErrorStatus(error.response.status);
//       });
//   };
//   useDocumentTitle(
//     `Tələbə düzəlişi - ${formData?.name} ${formData?.last_name}`
//   );
//   if (!student) {
//     return (
//       <div className="pt-5">
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//         <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
//       </div>
//     );
//   }
//   return (
//     <>
//       <h2>Tələbə düzəlişi</h2>

//       <div className="main-add-form">
//         <form onSubmit={handleSubmit}>
//           <div className="main-add-form-inner row">
//             <div className="main-add-form_input row col-8">
//               <div className="row">
//                 <div className=" col-6">
//                   <label htmlFor="name">Ad:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />

//                 </div>
//                 <div className="col-6">
//                   <label htmlFor="last_name">Soyad:</label>
//                   <input
//                     type="text"
//                     name="last_name"
//                     id="last_name"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                   />

//                 </div>
//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="father_name">Ata adı:</label>
//                   <input
//                     type="text"
//                     name="father_name"
//                     id="father_name"
//                     value={formData.father_name}
//                     onChange={handleChange}
//                   />

//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="id_number">Şəxsiyyət vəsiqəsi nömrəsi:</label>
//                   <div className="id-number-main">
//                     <div className="id-number-type">
//                       <Select
//                         styles={{
//                           control: (baseStyles, state) => ({
//                             ...baseStyles,
//                             borderColor: "none",
//                             outline: "none",
//                             boxShadow: "none",
//                             backgroundColor: "#f5f5f5 !important",
//                             color: "black",
//                             minHeight: "54px",
//                             width: "100px",
//                             "&:hover": {
//                               borderColor: "none",
//                               outline: "none",
//                               boxShadow: "none",
//                             },
//                           }),
//                         }}
//                         theme={(theme) => ({
//                           ...theme,
//                           borderRadius: 0,
//                           width: "2px !important",
//                           color: "black",
//                           colors: {
//                             ...theme.colors,
//                             primary25: "rgb(242, 242, 242)",
//                             primary: "rgb(242, 242, 242)",
//                           },
//                         })}
//                         classNamePrefix="select"
//                         isClearable={false}
//                         placeholder="AA"
//                         onChange={handleSelectChange}
//                         defaultValue={
//                           {
//                             value: "AA",
//                             label: "AA",
//                           }
//                         }
//                         isSearchable={true}
//                         name="color"
//                         options={
//                           [
//                             { value: "AA", label: "AA" },
//                             { value: "AZE", label: "AZE" },
//                           ]
//                         }
//                       />
//                     </div>
//                     <div className="id-number col-9">
//                       <input
//                         type="text"
//                         name="id_number"
//                         id="id_number"
//                         onKeyUp={handleVerication}
//                         value={formData.id_number}
//                         style={{ borderRadius: "0px 14px 14px 0" }}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     {errors.id_number && (
//                       <div className="error-input">{errors.id_number}</div>
//                     )}
//                   </div>
//                   {errors.id_number && (
//                     <div className="error-input">{errors.id_number}</div>
//                   )}

//                 </div>
//               </div>
//               <div className="row">
//                 <div className=" col-6">
//                   <label htmlFor="fin">FİN:</label>
//                   <input
//                     type="text"
//                     name="fin"
//                     id="fin"
//                     onKeyUp={handleVerication}
//                     value={formData.fin}
//                     onChange={handleChange}
//                   />
//                   {
//                     <div className="error-input">
//                       {errors.fin && errors.fin}
//                     </div>
//                   }
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="birthday"> Doğum tarixi </label>
//                   <div className="datepicker">
//                     <DatePickerComponent
//                       value={dayjs(formData.birthday)}
//                       onChange={handleDateChange("birthday")}
//                     />
//                   </div>

//                 </div>

//               </div>
//               <div className=" row">
//                 <div className="col-6">
//                   <label htmlFor="password">Hesabın şifrəsi: </label>
//                   <input
//                     type="text"
//                     name="password"
//                     id="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="phone">Mobil nömrə:</label>
//                   <InputMask
//                     name="phone"
//                     id="phone"
//                     alwaysShowMask={true}
//                     prefix="+994"
//                     mask="+\9\9\4999999999"
//                     onChange={handleChange}
//                     value={formData.phone}
//                   />

//                 </div>

//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="email"> Şəxsi email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     onKeyUp={handleVerication}
//                     id="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   {
//                     <div className="error-input">
//                       {errors.email && errors.email}
//                     </div>
//                   }
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="edu_email"> Edu email :</label>
//                   <input
//                     type="edu_email"
//                     name="edu_email"
//                     id="edu_email"
//                     onKeyUp={handleVerication}
//                     value={formData.edu_email}
//                     onChange={handleChange}
//                   />
//                   {
//                     <div className="error-input">
//                       {errors.edu_email && errors.edu_email}
//                     </div>
//                   }
//                 </div>

//               </div>
//               <div className=" row">
//                 <div className="col-6">
//                   <label htmlFor="email_password">Edu email şifrəsi: </label>
//                   <input
//                     type="text"
//                     name="email_password"
//                     id="email_password"
//                     value={formData.email_password}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="university">Universiteti:</label>
//                   <input
//                     type="text"
//                     name="university"
//                     id="university"
//                     value={formData.university}
//                     onChange={handleChange}
//                   />

//                 </div>
//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="ixtisas">İxtisası:</label>
//                   <input
//                     type="text"
//                     name="ixtisas"
//                     id="ixtisas"
//                     value={formData.ixtisas}
//                     onChange={handleChange}
//                   />

//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="university_add_score">Qəbul balı:</label>
//                   <input
//                     type="text"
//                     name="university_add_score"
//                     id="university_add_score"
//                     value={formData.university_add_score}
//                     onChange={handleChange}
//                   />

//                 </div>

//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="workplace">İş yeri:</label>
//                   <input
//                     type="text"
//                     name="workplace"
//                     id="workplace"
//                     value={formData.workplace}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 <div className=" col-6">
//                   <label htmlFor="next_payment_date">Vəzifə</label>
//                   <input
//                     type="text"
//                     name="vezife"
//                     id="vezife"
//                     value={formData.vezife}
//                     onChange={handleChange}
//                   />

//                 </div>
//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="registration_day">Qeydiyyat günü:</label>
//                   <div className="datepicker">
//                     <DatePickerComponent
//                       value={dayjs(formData.registration_day)}
//                       onChange={handleDateChange("registration_day")}
//                     />
//                   </div>
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="reference">Referans:</label>
//                   <SelectComponent
//                     placeholer="Referans seçin"
//                     options={options}
//                     onChange={handleSelectChange}
//                   />
//                   {selectedOption === "Tədbir-sərgi" && (
//                     <div className="col">
//                       <label htmlFor="reference_name">
//                         Tədbirin adı və tarixi:
//                       </label>
//                       <input
//                         type="text"
//                         name="reference_addition"
//                         id="reference_addition"
//                         value={formData.reference_addition}
//                         onChange={handleChange}
//                       />

//                     </div>
//                   )}
//                   {selectedOption === "Tanış tövsiyəsi" && (
//                     <div className="col">
//                       <label htmlFor="reference_name">Tövsiyə edən:</label>
//                       <input
//                         type="text"
//                         name="reference_addition"
//                         id="reference_addition"
//                         value={formData.reference_addition}
//                         onChange={handleChange}
//                       />

//                     </div>
//                   )}
//                   {selectedOption === "Korporativ satış" && (
//                     <div className="col">
//                       <label htmlFor="reference_name">Satış edən:</label>
//                       <input
//                         type="text"
//                         name="reference_addition"
//                         id="reference_addition"
//                         value={formData.reference_addition}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}

//                 </div>

//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="course">Kurs:</label>
//                   <Select
//                     styles={{
//                       control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         borderColor: "none",
//                         outline: "none",
//                         boxShadow: "none",
//                         color: "black",
//                         width: "100%",
//                         "&:hover": {
//                           borderColor: "none",
//                           outline: "none",
//                           boxShadow: "none",
//                         },
//                       }),
//                     }}
//                     theme={(theme) => ({
//                       ...theme,
//                       borderRadius: 0,
//                       width: "100%",
//                       color: "black",
//                       colors: {
//                         ...theme.colors,
//                         primary25: "rgb(242, 242, 242)",
//                         primary: "rgb(242, 242, 242)",
//                       },
//                     })}
//                     classNamePrefix="select"
//                     isClearable={true}
//                     isMulti={true}
//                     placeholder="Kurs seçin..."
//                     onChange={handleCourseChange}
//                     isSearchable={true}
//                     name="color"
//                     options={courses?.map((course) => {
//                       return { value: course.name, label: course.name };
//                     })}
//                   />
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="group">Qrup:</label>
//                   <Select
//                     styles={{
//                       control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         borderColor: "none",
//                         outline: "none",
//                         boxShadow: "none",
//                         color: "black",
//                         width: "100%",
//                         "&:hover": {
//                           borderColor: "none",
//                           outline: "none",
//                           boxShadow: "none",
//                         },
//                       }),
//                     }}
//                     theme={(theme) => ({
//                       ...theme,
//                       borderRadius: 0,
//                       width: "100%",
//                       color: "black",
//                       colors: {
//                         ...theme.colors,
//                         primary25: "rgb(242, 242, 242)",
//                         primary: "rgb(242, 242, 242)",
//                       },
//                     })}
//                     classNamePrefix="select"
//                     isClearable={false}
//                     onChange={handleSelectChange}
//                     isSearchable={true}
//                     name="color"
//                     placeholder="Qrup seçin"
//                     options={groups?.map((group) => {
//                       return {
//                         value: group.group_code,
//                         label: group.group_code,
//                       };
//                     })}
//                   />

//                 </div>


//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="lesson_table">Dərs qrafiki:</label>
//                   <input
//                     type="text"
//                     name="lesson_table"
//                     id="lesson_table"
//                     style={{ background: "#bbbbbb" }}
//                     disabled
//                     value={formData.lesson_table}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="graduation_day">Məzun günü:</label>
//                   <div className="datepicker">
//                     <DatePickerComponent
//                       value={dayjs(formData.graduation_day)}
//                       onChange={handleDateChange("graduation_day")}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="is_diploma">Sertifikat Vəziyyəti:</label>

//                   <SelectComponent
//                     name="is_diploma"
//                     value={formData.is_diploma}
//                     onChange={handleDiplomaChange}
//                     placeholder="Sertifikat Vəziyyəti"
//                     options={[
//                       { value: "1", label: "Sertifakat aldı" },
//                       { value: "0", label: "Sertifakat verilməyib" },
//                     ]}
//                   />
//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="diploma_sn">Sertifikat seriyası:</label>
//                   <input
//                     type="text"
//                     name="diploma_sn"
//                     id="diploma_sn"
//                     value={formData.diploma_sn}
//                     onChange={handleChange}
//                   />

//                 </div>
//               </div>
//               <div className=" row">
//                 <div className=" col-6">
//                   <label htmlFor="next_payment_date">Növbəti ödəniş günü</label>
//                   <div className="datepicker">
//                     <DatePickerComponent
//                       value={dayjs(formData.next_payment_date)}
//                       onChange={handleDateChange("next_payment_date")}
//                     />
//                   </div>

//                 </div>
//                 <div className=" col-6">
//                   <label htmlFor="karyera_merkezi">
//                     Karyera mərkəzinin işə düzəltmə tarixi
//                   </label>
//                   <div className="datepicker">
//                     <DatePickerComponent
//                       value={dayjs(formData.karyera_merkezi)}
//                       onChange={handleDateChange("karyera_merkezi")}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className=" row">

//                 <div className=" col-12">
//                   <label htmlFor="status">Status:</label>
//                   <Select
//                     styles={{
//                       control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         borderColor: "none",
//                         outline: "none",
//                         boxShadow: "none",
//                         color: "black",
//                         width: "100%",
//                         "&:hover": {
//                           borderColor: "none",
//                           outline: "none",
//                           boxShadow: "none",
//                         },
//                       }),
//                     }}
//                     theme={(theme) => ({
//                       ...theme,
//                       borderRadius: 0,
//                       width: "100%",
//                       color: "black",
//                       colors: {
//                         ...theme.colors,
//                         primary25: "rgb(242, 242, 242)",
//                         primary: "rgb(242, 242, 242)",
//                       },
//                     })}
//                     defaultValue={
//                       [
//                         { value: "Aktiv", label: "Aktiv" },
//                       ]
//                     }
//                     classNamePrefix="select"
//                     isClearable={false}
//                     onChange={handleSelectChange}
//                     isSearchable={true}
//                     name="color"
//                     placeholder="Status seçin"
//                     options={[
//                       { value: "Aktiv", label: "Aktiv" },
//                       { value: "Passiv", label: "Passiv" }

//                     ]}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="image-upload col-4 ">
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 {
//                   isDragActive ?
//                     <div
//                       className="image-preview d-flex align-items-center justify-content-center"
//                     >Buraya şəkil sürüşdür</div> :
//                     <img src={imageBase64 === "" ? defaultAvatar : imageBase64} className="image-preview" />

//                 }
//               </div>
//               <div className="row ms-4">
//                 <div className="col-6">

//                   <Button variant="outlined" component="label">
//                     Şəkil yüklə
//                     <input
//                       hidden
//                       type="file"
//                       name="image"
//                       size="medium"
//                       id="image"
//                       className="image-upload-input"
//                       sx={{ borderRadius: "1px solid #000" }}
//                       onChange={handleFileChange}
//                     />
//                   </Button>
//                 </div>
//                 <div className="col-5 delete-image-button">
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     color="error"
//                     onClick={handleClickOpen}
//                   >
//                     Şəkli sil
//                   </Button>
//                 </div>
//                 <Dialog
//                   open={open}
//                   onClose={handleClose}
//                   aria-labelledby="alert-dialog-title"
//                   aria-describedby="alert-dialog-description"
//                 >
//                   <DialogTitle id="alert-dialog-title">
//                     {"Şəkil silinsin?"}
//                   </DialogTitle>
//                   <DialogContent></DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleClose}>Ləğv et</Button>
//                     <Button onClick={handleFileDelete} autoFocus>
//                       Razı
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </div>

//             </div>
//             {error &&
//               <Alert severity="error" className="mt-2">
//                 {error}
//               </Alert>
//             }
//             <div className="row">
//               <div className="col-6">
//                 <Button variant="contained" color="primary" type="submit">
//                   Yadda saxla
//                 </Button>
//               </div>
//               <div className="col-6">
//                 <Button
//                   className="delete-button"
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleDelete}
//                 >
//                   Sil
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default EditForm;


import React, { useContext, useEffect, useState } from "react";
import "./AddStudentForm.css";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
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
const EditForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [idSerialNumber, setIdSerialNumber] = useState("");
  const [idSerial, setIdSerial] = useState("AA");
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (reader) => {
        console.log()
        setImageBase64(reader.currentTarget.result);
        formData.image = reader.currentTarget.result;
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

  const { userId } = useParams()
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState("");

  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/students/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",

        },
      })
      .then((response) => {
        setFormData(response.data.students[0]);
        console.log(response.data.students[0])
      }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [userId, token]);
  console.log(formData)


  const handleDateChange = (fieldName) => (date, dateString) => {

    setFormData({
      ...formData,
      [fieldName]: `${dayjs(date).format("MM-DD-YYYY")}`
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
  const handleChange = async (event) => {
    if (event.target.name === "fin") {
      event.target.value = event.target.value.toUpperCase();
    }
    if (event.target.name === "id_number") {
      setIdSerialNumber(event.target.value);
    }
    console.log(formData.id_number)
    if (event.target.name === "reference_addition") {
      formData.reference = `${selectedOption} | ${event.target.value}`;
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (select) => (selectedOption) => {
    if (select == "course") {
      const selectedCourses = selectedOption.map((option) => option.value).join(", ");
      formData.course = selectedCourses;
    }
    if (select == "group") {
      formData.group = selectedOption.value;
      const filteredGroup = groups.filter((group) => group.group_code === selectedOption.value);
      formData.lesson_table = filteredGroup.map((group) => group.lessons.map((lesson) => lesson.week_day)).join(", ") + " " + filteredGroup.map((group) => group.lessons[0].time).join(", ");
      groups?.map((group) => {
        if (selectedOption.value === group.group_code) {
          formData.graduation_day = dayjs(group.end_date).format("MM.DD.YYYY");
        }
      });
    }
    if (select == "reference") {
      setSelectedOption(selectedOption.value);
      formData.reference = selectedOption.value;
    }
    if (select == "is_diploma") {
      formData.is_diploma = selectedOption.value;
    } if (select == "id_number") {
      setIdSerial(selectedOption.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.id_number = `${idSerial}${idSerialNumber}`;
    if (selectedOption === null) {
      formData.reference = `${event.target.value}`;
    }
    console.log(formData);
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

  const handleDelete = (event) => {
    event.preventDefault();
    setOpen(false);

    axios
      .delete(`https://div.globalsoft.az/api/students/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStatus(response.status);
        navigate("/students");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
        setErrorStatus(error.response.status);
      });
  };
  useDocumentTitle(
    `Tələbə düzəlişi - ${formData?.name} ${formData?.last_name}`
  );
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
                        onChange={handleSelectChange("id_number")}
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
                    value={formData.password}
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
                    // value={formData.email_password}
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
                    onChange={handleSelectChange("reference")}
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
                  <SelectComponent
                    isClearable={true}
                    isMulti={true}
                    placeholder="Kurs seçin..."
                    onChange={handleSelectChange("course")}
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
                    onChange={handleSelectChange("group")}
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
                      value={formData.graduation_day ? dayjs(formData?.graduation_day) : null}
                    />
                  </div>
                </div>
              </div>

              <div className=" row">
                <div className=" col-6">
                  <label htmlFor="is_diploma">Sertifikat Vəziyyəti:</label>
                  <SelectComponent
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={handleSelectChange("is_diploma")}
                    isSearchable={true}
                    name="color"
                    placeholder="Sertifikat Vəziyyəti"
                    options={[
                      { value: "1", label: "Sertifikat aldı" },
                      { value: "0", label: "Sertifikat verilməyib" },
                    ]}
                  />

                </div>
                <div className=" col-6">
                  <label htmlFor="diploma_sn">Sertifikat  seriyası:</label>
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
                    onChange={handleSelectChange("status")}
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
            <div className="row">
              <div className="col-6">
                <Button variant="contained" color="primary" type="submit">
                  Yadda saxla
                </Button>
              </div>
              <div className="col-6">
                <Button
                  className="delete-button"
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Sil
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
