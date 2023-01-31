import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Groups.css";
function AddGroup() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

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
  return (
    <div className="main-add-form">
      <form onSubmit={handleSubmit}>
        <div className="main-add-form-inner row">
          <label>Course ID:</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <label>Teacher ID:</label>
          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
          >
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} {teacher.last_name}
              </option>
            ))}
          </select>
          <div>
            <label>Group Code:</label>
            <input
              type="text"
              name="group_code"
              value={groupData.group_code}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Lesson Minute:</label>
            <input
              type="text"
              name="lesson_minute"
              value={groupData.lesson_minute}
              onChange={handleChange}
            />
          </div>
          {groupData.lessons.map((lesson, index) => (
            <div key={index} className="p-3">
              <h2>{index + 1}'d</h2>
              <label>Week Day:</label>
              <input
                type="text"
                name="week_day"
                value={lesson.week_day}
                onChange={(event) => handleLessonChange(event, index)}
              />
              <label>Time:</label>
              <input
                type="text"
                name="time"
                value={lesson.time}
                onChange={(event) => handleLessonChange(event, index)}
              />
              <button
                type="button"
                className="delete-button"
                onClick={() => handleLessonRemove(index)}
              >
                Remove Lesson
              </button>
            </div>
          ))}
          <button type="button" onClick={handleLessonAdd}>
            Add Lesson
          </button>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="start_date"
              value={groupData.start_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="end_date"
              value={groupData.end_date}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save Group</button>
          {status && <p>{status}</p>}
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default AddGroup;
