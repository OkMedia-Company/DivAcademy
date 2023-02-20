import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useDocumentTitle from "../tools/useDocumentTitle";
import { AuthContext } from "../context/Contexts";

function EditGroup() {
  let { groupId } = useParams();
  let navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    lessons: [{ week_day: "", time: "" }],
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");
  const groupsData = useContext(AuthContext);
  const groups = groupsData?.groups.groups.filter((group) => group.id == groupId);
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
    <form onSubmit={handleSubmit} className="main-add-form">
      <div className="main-add-form-inner row">
        <div>
          <label>Group Code:</label>
          <input
            type="text"
            defaultValue={groupData.group_code}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course_name"
            value={groupData.course_name}
            disabled
          />
        </div>
        <div>
          <label>Teacher:</label>
          <input
            type="text"
            name="teacher_name"
            value={groupData.teacher_name}
            disabled
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={groupData.start_date}
            onChange={(e) =>
              setGroupData({ ...groupData, start_date: e.target.value })
            }
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={groupData.end_date}
            onChange={(e) =>
              setGroupData({ ...groupData, end_date: e.target.value })
            }
          />
        </div>
        <div>
          <label>Lessons:</label>
          <div>
            <label>Week Day:</label>
            <input type="text" name="week_day" />
            <label>Time:</label>
            <input type="text" name="time" />
          </div>
          <button onClick={handleAddLesson} type="button">
            Add Lesson
          </button>
        </div>
        <button type="submit">Update</button>
        <button type="submit" onClick={handleDelete}>
          Delete
        </button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}

export default EditGroup;
