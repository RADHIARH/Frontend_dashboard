import React from "react";
import { useState } from "react";
import { setDefaultLocale } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  // states
  const [telephone, settelephone] = useState();
  // useNavigate Hook
  const navigate = useNavigate();
  // singnIn function
  const singIn = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        telephone: telephone,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      navigate(`/espace/${data[0].user_id}`);
    } else {
      document.getElementById("alertmessage").style.visibility = "visible";
    }
    // .then((response) => response.json())
    // .then((response) => navigate(`/espace/${response.user_id}`))
    // .then((error) => {
    //   document.getElementById("alertmessage").style.visibility = "visible";
    //   console.log(error);
    // });

    console.log(response);
  };
  // const login = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001/login", {
  //       telephone: telephone,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       if (!response.data.message) {
  //         navigate(`/espace/${response.data[0].user_id}`);
  //       } else {
  //         document.getElementById("alertmessage").style.visibility = "visible";
  //       }
  //     });
  // };
  return (
    <div>
      <div
        className="col-md-3  shadow offset-md-6 fs-1 bg-white border"
        style={{ marginTop: "100px", height: "350px" }}
      >
        <div style={{ marginTop: "20px" }}>
          {" "}
          <h2>CONNEXION</h2>
        </div>
        <div style={{ marginTop: "50px" }}>
          <form>
            <div class="form-group m-2">
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Entrer votre numero de telephone"
                name="telephone"
                onChange={(e) => settelephone(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: "50px" }}
              onClick={(e) => singIn(e)}
            >
              SE CONNECTER
            </button>
          </form>
        </div>
        <div
          class="alert alert-danger text-danger m-2  "
          id="alertmessage"
          style={{ visibility: "hidden", height: "50px", fontSize: "15px" }}
          role="alert"
        >
          numéro de telephone incorrect <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>
    </div>
  );
}
