import React from "react";
import "./Courses.css";
import reactImg from "../../imgs/php (2).png"
import phpImg from "../../imgs/php (1).png"
import marketingImg from "../../imgs/php (1).jpg"
function Courses() {
  return (
    <div>
      <div className="container courses">
        <div className="row">
          <div className="col-lg-6">
            <a
              href="https://div.edu.az/courses/5-front-end-proqramlasdirma.html"
              title="Frontend proqramlaşdırma kursu"
            >
              <div className="future-box d-flex align-items-center">
                <img src={reactImg} alt="proqramci kurslari" />
                <div className="future-text">
                  <h3>Frontend proqramlaşdırma kursu</h3>
                  <p>
                   Aylıq ödəniş 390 AZN Tam ödəniş 1950 AZN 
                  </p>
                  <p>
                  Müddəti 6 ay</p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-lg-6">
            <a
              href="https://div.edu.az/courses/6-back-end-proqramlasdirma.html"
              title="Backend proqramlaşdırma kursu"
            >
              <div className="future-box d-flex align-items-center">
                <img src={phpImg} alt="proqramci kurslari" />
                <div className="future-text">
                  <h3>Backend proqramlaşdırma kursu</h3>
                  <p>
                  Aylıq ödəniş 390 AZN Tam ödəniş 1950 AZN 
                 </p>
                 <p>
                 Müddəti 6 ay</p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-lg-6">
            <a
              href="https://div.edu.az/courses/7-digital-marketing-kursu.html"
              title="SMM kursu"
            >
              <div className="future-box d-flex align-items-center">
                <img src={marketingImg} alt="proqramci kurslari" />
                <div className="future-text">
                  <h3>SMM kursu</h3>
                  <p>
                  Aylıq ödəniş 390 AZN Tam ödəniş 1950 AZN 
                 </p>
                 <p>
                 Müddəti 6 ay</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
