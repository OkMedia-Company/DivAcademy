import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
function AddStudentsToGroup() {
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");
  const groupId = useParams();
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          "https://div.globalsoft.az/api/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );
        setStudents(response.data.students);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
    async function fetchGroups() {
      try {
        const response = await axios.get(
          "https://div.globalsoft.az/api/groups",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );
      
        const groups = response?.data.groups.filter(
          (group) => group.id == groupId.groupId
        );
        setGroups(groups);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGroups();
  }, []);
 
  const handleStudentChange = (event) => {
    setSelectedStudentIds(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      group_id: selectedGroupId,
      student_id: selectedStudentIds,
    };
    axios
      .post("https://div.globalsoft.az/api/group_students", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setStatus(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };
  if (status == "200") {
    setError("");
  }
 

  if (students == "" || groups == "") {
    return (
      <div className="pt-5">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
      </div>
    );
  }
  return (
    <div className="main-add-form ">
      <form onSubmit={handleSubmit} className="main-add-form-inner flex-column">
        <label>Select Group:</label>
        <select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          {groups?.map((group) => (
            <option key={group.id} value={group.id} disabled={true}>
              {group.group_code}
            </option>
          ))}
        </select>
        <br />
        <label>Select Students:</label>
        <select onChange={handleStudentChange}>
          {students?.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} {student.last_name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Add Students to Group</button>
        {status && <p>{status}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default AddStudentsToGroup;