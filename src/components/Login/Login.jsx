import React, { useEffect } from "react";
import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/Contexts";
import Logo from "../../imgs/div-logo.png";
import axios from "axios";
import useDocumentTitle from "../tools/useDocumentTitle";
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email daxil edilməlidir")
    .email("düzgün email formatı deyil."),
  password: Yup.string()
    .required("Parol daxil etməniz mütləqdir.")
    .min(8, "Parol minumum 8 karakterdən ibarət ola bilər"),
});

function Login() {
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  const navigate = useNavigate();
  const [error,setError] = React.useState("")
  const login = async (data) => {
    const config = {
      method: "post",
      url: "https://div.globalsoft.az/api/login",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_AUTH_TOKEN,
      },
      data: { 
        email: data.email,
        password: data.password,
      },
    };
    try {
      const res = await axios(config);
      localStorage.setItem("status", res.data.status);
      localStorage.setItem("token", res.data.token);
      navigate("/students");
    } catch (error) {
      setError(error.response.data.message)
      console.log(error);
    }
  };
 
  useDocumentTitle("Login")
  return (
    <div className="login-main">
      <div className="logo-top">
        <img src={Logo} />
      </div>
      <div className="login-inner">
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            login(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
                  <h1 className="login-title">Login</h1>
                  <div className="input">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="E-mailiniz"
                      className="form-control inp_text"
                      id="email"
                    />

                    <p className="error">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>

                  <div className="input">
                    <label>Parol</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      suggested="current-password"
                      placeholder="Parolunuz"
                      className="form-control"
                    />
                    <p className="error">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <p className="error">{error}</p>
                  <div className="login-button">
                    <button type="submit">Giriş</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Formik>
        
      </div>
    </div>
  );
}

export default Login;
