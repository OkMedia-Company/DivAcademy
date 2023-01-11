import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditForm() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/students`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        const student = response.data.students.filter((item) => {
          return item.id == userId;
        });
        setFormData(student[0]);
      });
  }, [userId]); 

  console.log(formData);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    formData.image = imageBase64;
    if(!formData.image){
      formData.image = formData.image
    }
    axios
      .put(`https://div.globalsoft.az/api/students/${userId}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error,"putda error");
      });
  };

  if (!formData?.id) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
        
          onChange={handleFileChange}
        />
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="father_name">Father Name:</label>
        <input
          type="text"
          name="father_name"
          id="father_name"
          value={formData.father_name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password </label>
        <input
          type="text"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="text"
          name="birthday"
          id="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="group">Group:</label>
        <input
          type="text"
          name="group"
          id="group"
          value={formData.group}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="course">Course:</label>
        <input
          type="text"
          name="course"
          id="course"
          value={formData.course}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="text"
          name="start_date"
          id="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="end_date">End Date:</label>
        <input
          type="text"
          name="end_date"
          id="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="payment">Payment:</label>
        <input
          type="text"
          name="payment"
          id="payment"
          value={formData.payment}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="payment_date">Payment Date:</label>
        <input
          type="text"
          name="payment_date"
          id="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditForm;
