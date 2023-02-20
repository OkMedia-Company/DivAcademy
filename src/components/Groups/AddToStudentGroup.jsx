import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Select from "react-select";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
function AddStudentsToGroup() {
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([
  ]);
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

  function setStudentsId(studentIds) {
    const formattedStudentIds = studentIds.map((id) => ({ student_id: id.value }));
    setSelectedStudentIds(formattedStudentIds);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      group_id: selectedGroupId,
      students: selectedStudentIds,
    };
    console.log(data);
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
  useDocumentTitle("Qrupa tələbə əlavə et");
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
          defaultValue={groups.map((group) => {
            return {
              value: group.id,
              label: group.name,
            };
          })}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={groups.map((group) => {
            return {
              value: group.id,
              label: group.group_code,
            };
          })}
          placeholder="Qrupu seçin"
          onChange={(e) => setSelectedGroupId(e.value)}
        />
        <br />
        <label>Select Students:</label>
        <Select
          className="basic-single w-100"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: "none",
              outline: "none",
              width: "100%",
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
          isClearable={true}
          isSearchable={true}
          isMulti={true}
          placeholder="Tələbələri seçin"
          onChange={setStudentsId}
          name="color"
          options={students.map((student) => {
            return {
              value: student.id,
              label: student.name + " " + student.last_name,
            };
          })}
        />
        <br />
        <button type="submit">Seçilənləri qrupa əlavə et</button>
        {status && <p>{status}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default AddStudentsToGroup;
