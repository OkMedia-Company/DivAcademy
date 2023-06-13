import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
import SelectComponent from "../tools/Select";
function AddTransactionForm() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://div.globalsoft.az/api/transaction_categories", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/incomeoutcometips")
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };

  useDocumentTitle("Gəlir və Xərc tipi əlavə etmək");
  return (
    <>
      <h2>Gəlir və Xərc tipi əlavə etmək</h2>
      <div className="main-add-form">
        <form onSubmit={handleSubmit}>
          <div className="main-add-form-inner row">
            <div className="main-add-form_input row">
              <div className="main-add-form-input-names col me-5">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="name">Maliyyə kateqoriyası tipi :</label>
                    <SelectComponent
                      options={[
                        { value: "income", label: "Gəlir" },
                        { value: "outcome", label: "Xərc" },
                      ]}
                      name="type"
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="title">Maliyyə kateqoriyası başlığı:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
              </div>

              <br />
              <div className="form-error">{error}</div>
              <Button type="submit" variant="contained" color="primary">
                Əlavə et
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTransactionForm;
