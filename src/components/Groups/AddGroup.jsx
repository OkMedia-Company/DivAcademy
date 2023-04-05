import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Groups.css";
import Select from "react-select";
import useDocumentTitle from "../tools/useDocumentTitle";

import DatePickerComponent from "../tools/DatePickerComponent";
import SelectComponent from "../tools/Select";
function AddGroup() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");

  let navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    course_id: "",
    teacher_id: "",
    group_code: "",
    lesson_minute: "",
    lessons: [],
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setGroupData({
      ...groupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLessonChange = (event, index) => {
    if (event.target.name === "week_day") {
      const lessons = [...groupData.lessons];
      lessons[index][event.target.name] = event.target.value;
      lessons[index][event.target.name] = parseInt(event.target.value);
    }
    setGroupData({
      ...groupData,
      lessons,
    });
  };
  const handleLessonAdd = () => {
    setGroupData({
      ...groupData,
      lessons: [...groupData.lessons, { week_day: "", time: "" }],
    });
  };

  const handleLessonRemove = (index) => {
    const lessons = [...groupData.lessons];
    lessons.splice(index, 1);
    setGroupData({
      ...groupData,
      lessons,
    });
  };
  const handleSelectChange = (name) => (value) => {
    console.log(name)
  };


  console.log(groupData);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(
          "https://div.globalsoft.az/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCourses(response.data.course);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCourses();
    async function fetchTeachers() {
      try {
        const response = await axios.get(
          "https://div.globalsoft.az/api/teachers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeachers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setGroupData({
      ...groupData,
      course_id: selectedCourseId,
      teacher_id: selectedTeacherId,
    });
    axios
      .post("https://div.globalsoft.az/api/groups", groupData, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.data.message);
        navigate("/groups");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };

  const days = [
    { value: "1", label: "Bazar ertəsi" },
    { value: "2", label: "Çərşənbə axşamı" },
    { value: "3", label: "Çərşənbə" },
    { value: "4", label: "Cümə axşamı" },
    { value: "5", label: "Cümə" },
    { value: "6", label: "Şənbə" },
    { value: "7", label: "Bazar" },
  ];
  const time = [
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
    { value: "19:00", label: "19:00" },
    { value: "20:00", label: "20:00" },
    { value: "21:00", label: "21:00" },
  ];
  const classrooms = [
    { value: "1", label: "Kofeşop" },
    { value: "1", label: "904" },
    { value: "1", label: "1-ci otaq" },
    { value: "1", label: "2-ci otaq" },
  ];
  useDocumentTitle("Qrup Əlavə Et");
  return (
    <div className="main-add-form">
      <form onSubmit={handleSubmit}>
        <div className="main-add-form-inner row">
          <div className="row">
            <div className="col-md-6">
              <label>Kurs:</label>
              <SelectComponent
                defaultValue={courses.map((group) => {
                  return {
                    value: group.id,
                    label: group.name,
                  };
                })}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={courses.map((group) => {
                  return {
                    value: group.id,
                    label: group.name,
                  };
                })}
                placeholder="Kurs seçin"
                onChange={handleSelectChange("selectedCourseId")}
              />
            </div>
            <div className="col-md-3">
              <label>Müəllim:</label>
              <SelectComponent
                defaultValue={teachers.map((group) => {
                  return {
                    value: group.id,
                    label: group.name,
                  };
                })}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={teachers.map((group) => {
                  return {
                    value: group.id,
                    label: group.name,
                  };
                })}
                placeholder="Müəllimi seçin"
                onChange={(e) => setSelectedGroupId(e)}
              />
            </div>
            <div className="col-md-3">
              <label>Mentor:</label>
              <SelectComponent
                classNamePrefix="select"
                defaultValue={teachers.map((group) => {
                  return {
                    value: group.id,
                    label: group.name,
                  };
                })}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={teachers.map((group) => {
                  return {
                    value: group.id,
                    label: group.name,
                  };
                })}
                placeholder="Mentoru seçin"
                onChange={(e) => setSelectedGroupId(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Qrup kodu:</label>
              <input
                type="text"
                name="group_code"
                value={groupData.group_code}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label>Dərs müddəti:</label>
              <input
                type="text"
                name="lesson_minute"
                value={groupData.lesson_minute}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            {groupData.lessons.map((lesson, index) => (
              <div key={index} className="p-3">
                <div className="row">
                  <h2>{index + 1}. dərs</h2>
                  <div className="col-4">
                    <label>Həftənin hünü:</label>
                    <SelectComponent
                      options={days}
                      value={lesson.day}
                      onChange={(event) => handleSelectChange("day", event, index)}
                    />
                  </div>
                  <div className="col-4">
                    <label>Dərs saatı:</label>
                    <SelectComponent
                      options={time}
                      value={lesson.time}
                      onChange={(event) => handleSelectChange("time", event, index)}
                    />
                  </div>
                  <div className="col-4">
                    <label>Dərs otaqı:</label>
                    <SelectComponent
                      options={classrooms}
                      value={lesson.classroom}
                      onChange={(event) =>
                        handleSelectChange("classroom", event, index)
                      }

                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleLessonRemove(index)}
                >
                  Dərsi sil
                </button>
              </div>
            ))}
          </div>
          <div className="row">
            <button type="button" onClick={handleLessonAdd}>
              Dərs günü əlavə et
            </button>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <label>Qrupun Başlama tarixi:</label>
              <div className="datepicker">
                <DatePickerComponent />
              </div>
            </div>
            <div className="col-6">
              <label>Qrupun Bitmə tarixi:</label>
              <div className="datepicker">
                <DatePickerComponent />
              </div>
            </div>
          </div>

          <button type="submit">Qrup əlavə et</button>
          {status && <p>{status}</p>}
          {error && <p>{error}</p>}
        </div>
      </form >
    </div >
  );
}

export default AddGroup;
