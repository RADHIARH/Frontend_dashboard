import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = (props) => {
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [role, setrole] = useState("");
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
  useEffect(() => {
    getdata();
    getrole()
  }, []);
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a
                class="nav-link active"
                href="#"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {data.user_firstname} {data.user_lastname}
                {data.id_role === 1 && <h4>Administarteur </h4>}
                {data.id_role === 2 && <h4>Employeur </h4>}
                {data.id_role === 3 && <h4>Utilisateur </h4>}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
