import React from "react";
import BirthdayCard from "./BirthdayCard";
import { v4 as uuidv4 } from 'uuid';
import "./Birthday.css";
function Birthday() {
  const birthdaydata = [
    {
      id:uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id:uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id:uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id:uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
    {
      id:uuidv4(),
      name: "Lorem Ipsumzade",
      birthdate: "2001/11/08",
      foto: "",
    },
  ];
  return (
    <div key="birthday">
      <h2>Ad günləri </h2>
      <div className="birthday-cards"> 
      {birthdaydata.map((item) => {
        return (
                <BirthdayCard
                    ad={item.name}
                    birthdate={item.birthdate}
                    foto={item.foto}
                    key={item.id}
                />
        );
      })}
      </div>
    </div>
  );
}

export default Birthday;
