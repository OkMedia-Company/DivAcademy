import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Signup.css";
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
const Signup = () => {
  const [id, setArticleId] = useState();
  const [submit, onSubmited] = useState(false);
  return (
    <>
      <div className="signup-main">
        <div className="signup-inner">
          <h1>Qeydiyyatdan keçin!</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              acceptedTerms: false,
              jobType: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              acceptedTerms: Yup.boolean()
                .required("Required")
                .oneOf([true], "You must accept the terms and conditions."),
              jobType: Yup.string()
                .oneOf(
                  ["designer", "development", "product", "other"],
                  "Invalid Job Type"
                )
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const article = JSON.stringify(values, null, 2);
                axios
                  .post("http://localhost:5000/students", article)
                  .then((response) => setArticleId(response.data.id));
                setSubmitting(false);
                onSubmited(true);
              }, 400);
            }}
          >
            <Form className="">
              <MyTextInput
                label="Ad  "
                name="firstName"
                type="text"
                placeholder="ad"
              />

              <MyTextInput
                label="Soyad  "
                name="lastName"
                type="text"
                placeholder="soyad"
              />
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="example@div.edu.az"
              />

              <MySelect label="Status  " name="jobType">
                <option value="">Statusu seçin</option>
                <option value="designer">Tələbə</option>
                <option value="development">Müəllim</option>
              </MySelect>



              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
