import React, { useEffect, useState } from "react";



function Mentors() {
    const [mentors, setMentors] = useState([]);
const [error, setError] = useState("");
const [status, setStatus] = useState("");
const token = localStorage.getItem("token");

useEffect(() => {
  async function fetchMentors() {
    try {
      const response = await axios.get("", [
        {
          headers: {
            Authization: `Bearer ${token}`,
            accept: "application/json",
          },
        },
      ]);
    } catch (error) {
      setError(error);
    }
  }
  fetchMentors();
}, []);

  return <div>

    Mentorlar
  </div>;
}

export default Mentors;
