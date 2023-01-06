import React from "react";
import axios from "axios";
function Adding() {
  const [students, setStudents] = React.useState([]);
  const handleAddStudent = (event) => {
    // prevent the default form submission
    event.preventDefault();
    // get the values of the form inputs
    const name = event.target.elements.name.value;
    const surname = event.target.elements.surname.value;
    const fatherName = event.target.elements.fatherName.value;
    const dob = event.target.elements.dob.value;
    const gender = event.target.elements.gender.value;
    const phone = event.target.elements.phone.value;
    const email = event.target.elements.email.value;
    const address = event.target.elements.address.value;
    // create a new student object
    const newStudent = {
      name,
      surname,
      fatherName,
      dob,
      gender,
      phone,
      email,
      address,
    };
    // make a POST request to the local server to add the new student
    axios
      .post("https://62de8b889c47ff309e7632ba.mockapi.io/users", newStudent, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        // update the list of students by adding the new student
        setStudents([...students, newStudent]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleAddStudent}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <br />
        <label htmlFor="surname">Surname:</label>
        <input type="text" id="surname" name="surname" required />
        <br />
        <label htmlFor="fatherName">Father Name:</label>
        <input type="text" id="fatherName" name="fatherName" required />
        <br />
        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob"  />
        <br />
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default Adding;
