import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useDocumentTitle from "../tools/useDocumentTitle";
import { AuthContext } from "../context/Contexts";
import Select from "react-select";
function EditGroup() {
  let { groupId } = useParams();
  let navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    lessons: [{ week_day: "", time: "" }],
  });
  const courses = useContext(AuthContext)?.courses.course;
  const teachers = useContext(AuthContext)?.teachers.teachers;

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");
  const groupsData = useContext(AuthContext);
  const groups = groupsData?.groups.groups.filter(
    (group) => group.id == groupId
  );
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://div.globalsoft.az/api/groups/${groupId}`,
        {
          course_id: groupData.course_id,
          teacher_id: groupData.teacher_id,
          group_code: groupData.group_code,
          lessons: groupData.lessons,
          start_date: groupData.start_date,
          end_date: groupData.end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(response.status);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (status === 200) {
      navigate("/groups");
    }
  }, [status]);
  const handleChange = (event) => {
    setGroupData({ ...groupData, [event.target.name]: event.target.value });
  };
  const handleAddLesson = () => {
    setGroupData({
      ...groupData,
      lessons: [...groupData.lessons, { week_day: "", time: "" }],
    });
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://div.globalsoft.az/api/groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(response.status);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  useDocumentTitle("Qrupda düzəliş et");
  if (!groups) {
    return <h2>Loading...</h2>;
  }

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

export default EditGroup;
