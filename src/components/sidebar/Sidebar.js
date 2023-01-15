import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import ProfilePhoto from "../../imgs/profile-photo.jpeg";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import burger from "../../imgs/burgerBtn.svg";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { CiWallet } from "react-icons/ci";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillQuestionCircle } from "react-icons/ai";
import axios from "axios";
const Sidebar = () => {
  const userStatus = localStorage.getItem("status");
  const userToken = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [close, setClose] = useState(false);
  const closeSide = () => {
    setClose(true);
  };
  const openSide = () => {
    setClose(false);
  };
  const logOut = () => {
    localStorage.removeItem("status");
    localStorage.removeItem("token");

    axios
      .get("https://div.globalsoft.az/api/logout", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("https://div.globalsoft.az/api/authUser", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logOut();
          navigate("/login");
        } else {
          console.log(err);
        }
      });
  }, []);
  function userType() {
    if (user.user_type === 1) {
      return "Student";
    } else if (user.user_type === 2) {
      return "Teacher";
    } else if (user.user_type === 3) {
      return "Employee";
    } else {
      return "Admin";
    }
  }

  return (
    <div className={close ? "sidebar closing" : "sidebar"}>
      <div className="sidebar-wrap">
        <div className="side-top">
          <div className="profile">
            <div className="profile-img">
              <img
                src={`https://div.globalsoft.az/${user.image}`}
                sx={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="profile-info">
              <span className="name">
                {user.name} {user.last_name} {user.father_name}
              </span>
              <span className="status">{userType()}</span>
            </div>
          </div>
          <div className="side-footer">
            <button onClick={logOut} className="logout-btn">
              <span className="logOut">
                <i className="logOut-icon"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="side-body">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="header-icon">
                  <CiWallet />
                </div>
                <h4 className="title">İstifadəçilər</h4>
              </Accordion.Header>
              <Accordion.Body>
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
                      to="employee"
                      className={({ isActive }) =>
                        isActive ? "active" : "nav-links"
                      }
                    >
                      İşçilər
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div className="header-icon">
                  <CiWallet />
                </div>
                <h4 className="title">Tədris</h4>
              </Accordion.Header>
              <Accordion.Body>
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
                      Qruplar
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
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <div className="header-icon">
                  <CiWallet />
                </div>
                <h4 className="title">Maliyyə</h4>
              </Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <div className="header-icon">
                  <CiWallet />
                </div>
                <h4 className="title">Funksiyalar</h4>
              </Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <div className="header-icon">
                  <CiWallet />
                </div>
                <h4 className="title">Leadlər</h4>
              </Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h4 className="title pt-3 ms-2">Kateqoriyalar</h4>
          <div className="table-categories">
            <div className="table-category">
              <NavLink>Category</NavLink>
            </div>
            <div className="table-category">
              <NavLink>Category</NavLink>
            </div>

            <div className="table-category">
              <NavLink>Category</NavLink>
            </div>
            <div className="table-category">
              <NavLink>Category</NavLink>
            </div>
          </div>
        </div>
        <div onClick={closeSide} className="close-btn">
          <BsFillArrowLeftSquareFill />
        </div>
      </div>

      <div className="closing-sidebar">
        <div className="profile">
          <img src={ProfilePhoto} alt="" />
        </div>
        <div className="message-icon">
          <BiCommentDetail />
        </div>

        <div onClick={openSide} className="burger-wrap">
          <img src={burger} alt="" className="burger-icon" />
        </div>
        <div className="message-icon-bottom">
          <AiFillQuestionCircle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
