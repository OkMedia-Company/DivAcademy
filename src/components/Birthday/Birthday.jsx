import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Birthday.css";
import SearchForm from "../tools/SearchForm";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
function Birthday() {
  const birthdaydata = [
    {
      id: uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id: uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id: uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id: uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id: uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
  ];
  return (
    <div key="birthday">
      <div className="section-title">
        <h2>Ad günləri </h2>
      </div>
      <SearchForm />

      <div className="birthday-cards">
        {birthdaydata.map((item) => {
          return (
            <div key={item.id}>
              <Stack spacing={1} className="pt-5">
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Birthday;
