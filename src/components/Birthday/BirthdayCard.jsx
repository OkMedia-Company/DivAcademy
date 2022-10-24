import React from "react";
import ProfilePhoto from "../../imgs/profile-photo.jpeg"
function BirthdayCard() {
  return (
    <div >
        <div className="card">
            <img src="https://cdn.pixabay.com/photo/2020/10/06/21/54/cake-5633461__480.png" alt="birthday" className="birthday"/>
            <div className="text">
            <img src={ProfilePhoto}  className="birthday-card-img" alt="" />
                <h1>Lorem Ipsumzade</h1>
                <p>2001/11/08</p>    
            </div>
            <div className="space"></div>
        </div>
    </div>
  );
}

export default BirthdayCard;
