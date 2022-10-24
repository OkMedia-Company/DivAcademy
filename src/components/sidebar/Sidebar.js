import React, { useState } from "react";
import "./Sidebar.css";
import ProfilePhoto from "../../imgs/profile-photo.jpeg";
import closeIcon from "../../imgs/close.svg";
import burger from "../../imgs/burgerBtn.svg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [close, setClose] = useState(false);
  const closeSide = () => {
    setClose(true);
  };
  const openSide = () => {
    setClose(false);
  };
  return (
    <div className={close ? "sidebar closing" : "sidebar"}>
      <div className="sidebar-wrap">
        <div className="side-top">
          <div className="profile">
            <img src={ProfilePhoto} alt="" />
            <div className="profile-info">
              <span className="name">User </span>
              <span className="status">Admin</span>
            </div>
          </div>
          <div onClick={closeSide} className="close-btn">
            <img src={closeIcon} alt="" />
          </div>
        </div>
        <div className="side-body">
          <h4 className="title">İstifadəçilər</h4>
          <ul className="side-menu">
            
            <li className="side-item">
              <NavLink
                to="students"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Tələbələr
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="teachers"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Müəllimlər
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="graduates"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Məzunlar
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="birthday"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Ad günləri
              </NavLink>
            </li>
          </ul>
          <h4 className="title">Tədris</h4>
          <ul className="side-menu">
            <li className="side-item">
              <NavLink
                to="courses"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Kurslar
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="groups"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Gruplar
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="absence"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Dəvamiyyət
              </NavLink>
            </li>
          </ul>
          <h4 className="title">Maliyyə</h4>
          <ul className="side-menu">
            <li className="side-item">
              <NavLink
                to="incomeoutcometips"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Gəlir və xərc tipləri
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="incomeoutcome"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Gəlirlər və xərclər
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="salary"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Maaş hesablamaları
              </NavLink>
            </li>
          </ul>
          <h4 className="title">Funksiyalar</h4>
          <ul className="side-menu">
            <li className="side-item">
              <NavLink
                to="emailsend"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Email göndər
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="smssend"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Sms göndər
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="emailsmslogs"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Email/Sms loqları
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink
                to="repots"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
                Hesabatlar
              </NavLink>
            </li>
          </ul>
          <h4 className="title">Leadlər</h4>
          <ul className="side-menu">
              <li className="side-item">
              <NavLink
                to="siterequest"
                className={({ isActive }) =>
                  isActive ? "active" : "nav-links"
                }
              >
              Saytdan müraciətlər
              </NavLink>
              </li>
          </ul>
        </div>
        <div className="side-footer">
          <a href="#" className="logOut">
            <i className="logOut-icon"></i>
            <span>Çıxış</span>
          </a>
        </div>
      </div>

      <div className="closing-sidebar">
        <div className="profile">
          <img src={ProfilePhoto} alt="" />
        </div>
        <div onClick={openSide} className="burger-wrap">
          <img src={burger} alt="" className="burger-icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
