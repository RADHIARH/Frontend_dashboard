import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Email = () => {
  const { id } = useParams();
  const { id_user } = useParams();
  console.log(id);
  const [data, setdata] = useState({
    code: "",
  });
  const [user, setuser] = useState([]);
  const getuser = async () => {
    await fetch(`/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setuser(response[0]));
  };
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/send/email/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.user_email,
        code: data.code,
        url: `http://localhost:3000/verify/code/${user.user_id}`,
        id: user.user_id,
      }),
    }).then((response) => {
      document.getElementById("alertmessage").style.visibility = "visible";
    });
  };
  // useEffect
  useEffect(() => {
    getuser();
  }, []);
  return (
    <div className="container" style={{ marginTop: "100px",position:"relative" }}>
      <h2>
        <span style={{ fontSize: "20px" }}>Envoyer une invitation à :</span>
        {user.user_email}
      </h2>
      <div class="row" style={{ marginTop: "50px" }}>
        <div className="col-sm-4 mx-auto shadow p-5">
          <p
            class="mb-3 mt-2"
            style={{ color: "green", marginLeft: "57px" }}
          ></p>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="code"
              name="code"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={(e) => submit(e)}
            className="btn btn-primary btn-block "
            style={{ marginLeft: "30px" }}
          >
            Envoyer une invitation
          </button>
        </div>
        <div
          class="alert alert-secondary text-success  "
          id="alertmessage"
          style={{ visibility: "hidden", marginTop: "40px" }}
          role="alert"
        >
          Votre invitation a eté envoyée{" "}
          <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px" }}>
        <NavLink to={`/espace/${id_user}`}> GO BACK</NavLink>
      </div>
    </div>
  );
};

export default Email;
