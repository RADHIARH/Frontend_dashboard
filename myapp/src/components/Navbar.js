import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminSpace from "./AdminSpace";
const Navbar = (props) => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [role, setrole] = useState("");
  // const [language, setlanguage] = useState("French");
  const [languagecontent, setlanguagecontent] = useState([]);
  // localstorage
  const id_language = localStorage.getItem("language");
  console.log("props" + props.language);
  // get user by id
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/users/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setdata(result[0]);
    setid(result[0].id_role);
  };
  const getrole = () => {
    if (id === 1) setrole("Administrateur");
    else if (id === 2) setrole("Employe");
    else setrole("Utilisateur");
  };
  // get selected language
  const getlanguagecontent = async (e) => {
    const response = await fetch(
      `http://localhost:3001/language/${props.language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("resultat" + result[0].button1);
    setlanguagecontent(result[0]);
  };
  // const getlanguagecontent = async (e) => {
  //   const response = await fetch(
  //     `http://localhost:3001/language/${id_language}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const result = await response.json();
  //   console.log("resultat" + result[0].button1);
  //   setlanguagedata(result[0]);
  // };
  useEffect(() => {
    getlanguagecontent();
    getdata();
  }, [props.language]);
  // logout

  const logout = () => {
    // fetch("/logout", {
    //   method: "GET",
    // }).then((response) => {
    //   navigate("/");
    // });
    navigate("/");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-black bg-black">
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
          style={{ marginRight: "30px" }}
        >
          <ul class="navbar-nav ">
            <li class="nav-item active">
              <a
                class="nav-link active"
                href="#"
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
              >
                {/* {data.user_firstname} {data.user_lastname} */}
                {data.user_firstname} {data.user_lastname}
              </a>
            </li>
            {/* <li style={{ color: "white", fontSize: "20px" }}>
              {" "}
              {data.id_role === 1 && <h4>Administarteur </h4>}
              {data.id_role === 2 && <h4>Employeur </h4>}
              {data.id_role === 3 && <h4>Utilisateur </h4>}
            </li> */}

            <li>
              {" "}
              <button className="btn btn-primary" onClick={logout}>
                {languagecontent.button1}
              </button>
            </li>
            {/* <li style={{ marginLeft: "10px" }}>
              {" "}
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setlanguage(e.target.value)}
              >
                <option value="French">Français</option>
                <option value="English">English </option>
                <option value="Arabic">Arabic</option>
              </select>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
