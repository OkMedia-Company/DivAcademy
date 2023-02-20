import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
import Select from "react-select";
import { AuthContext } from "../context/Contexts";
function TransactionAdd() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    transaction_category_id: "",
    user_id: "",
    type: "",
    amount: "",
    description: "",
    month: "",
  });
  const handleSelectChange = (selectedOption) => {
    // setFormData({ ...formData, transaction_category_id: selectedOption.value });
  };
  const transactionCategories = useContext(AuthContext).transactionCategories.transaction_categories;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://div.globalsoft.az/api/transactions", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/incomeoutcometips");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };

  useDocumentTitle("Gəlir və Xərc əlavə etmək");
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
                    <label htmlFor="name">Maliyyə kateqoriyası adı :</label>
                    <Select
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: "none",
                          outline: "none",
                          boxShadow: "none",
                          color: "black",
                          width: "100%",
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
                        width: "100%",
                        color: "black",
                        colors: {
                          ...theme.colors,
                          primary25: "rgb(242, 242, 242)",
                          primary: "rgb(242, 242, 242)",
                        },
                      })}
                      classNamePrefix="select"
                      isClearable={false}
                      onChange={handleSelectChange}
                      isSearchable={true}
                      name="color"
                      placeholder="Qrup seçin"
                      options={transactionCategories.map((item) => {
                        return { value: item.id, label: item.name };
                      })}
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="user_id">İstifadəçi adı:</label>
                    <input
                      type="text"
                      name="user_id"
                      id="user_id"
                      value={formData.user_id}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="type">İstifadəçi tipi:</label>
                    <input
                      type="text"
                      name="type"
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="amount">Məbləğ:</label>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="description">Açıqlama :</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="month">Müddət:</label>
                    <input
                      type="text"
                      name="month"
                      id="month"
                      value={formData.month}
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

export default TransactionAdd;
