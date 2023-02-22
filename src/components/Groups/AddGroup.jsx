import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Groups.css";
import Select from "react-select";
import useDocumentTitle from "../tools/useDocumentTitle";
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
    const lessons = [...groupData.lessons];
    lessons[index][event.target.name] = event.target.value;
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
  useDocumentTitle("Qrup Əlavə Et");
  return (
    <div className="main-add-form">
      <form onSubmit={handleSubmit}>
        <div className="main-add-form-inner row">
          <div className="row">
            <div className="col-md-6">
              <label>Kurs:</label>
              <Select
                className="basic-single w-100"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "none",
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    color: "black",

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
                  color: "black",
                  colors: {
                    ...theme.colors,
                    primary25: "rgb(242, 242, 242)",
                    primary: "rgb(242, 242, 242)",
                  },
                })}
                classNamePrefix="select"
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
                onChange={(e) => setSelectedGroupId(e)}
              />
            </div>
            <div className="col-md-6">
              <label>Müəllim:</label>
              <Select
                className="basic-single w-100"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "none",
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    color: "black",

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
                  color: "black",
                  colors: {
                    ...theme.colors,
                    primary25: "rgb(242, 242, 242)",
                    primary: "rgb(242, 242, 242)",
                  },
                })}
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
                placeholder="Müəllimi seçin"
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
              <label>Dərs saatı:</label>
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
                  <h2>{index + 1}'</h2>
                  <div className="col-6">
                    <label>Həftənin hünü:</label>
                    <input
                      type="text"
                      name="week_day"
                      value={lesson.week_day}
                      onChange={(event) => handleLessonChange(event, index)}
                    />
                  </div>
                  <div className="col-6">
                    <label>Vaxt:</label>
                    <input
                      type="text"
                      name="time"
                      value={lesson.time}
                      onChange={(event) => handleLessonChange(event, index)}
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
              Dərs əlavə et
            </button>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <label>Başlama tarixi:</label>
              <input
                type="date"
                name="start_date"
                value={groupData.start_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label>Bitmə tarixi:</label>
              <input
                type="date"
                name="end_date"
                value={groupData.end_date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12">
              <label>Dərs otağı:</label>
              <Select
                className="basic-single w-100"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "none",
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    color: "black",

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
                  color: "black",
                  colors: {
                    ...theme.colors,
                    primary25: "rgb(242, 242, 242)",
                    primary: "rgb(242, 242, 242)",
                  },
                })}
                classNamePrefix="select"
                defaultValue={[
                  {
                    value: "905 yaşıl otaq",
                    label: "905 yaşıl otaq",
                  },
                ]}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={[
                  {
                    value: "905 yaşıl otaq",
                    label: "905 yaşıl otaq",
                  },
                  {
                    value: "905 mavi otaq",
                    label: "905 mavi otaq",
                  },
                  {
                    value: "908 kofeşop otağı",
                    label: "908 kofeşop otağı",
                  },
                ]}
                placeholder="Müəllimi seçin"
                onChange={(e) => setSelectedGroupId(e)}
              />
            </div>
          </div>
          <button type="submit">Qrup əlavə et</button>
          {status && <p>{status}</p>}
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default AddGroup;
