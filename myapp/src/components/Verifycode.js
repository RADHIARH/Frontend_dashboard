import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Verifycode = (props) => {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [code, setcode] = useState({
    chiffre1: "",
    chiffre2: "",
    chiffre3: "",
    chiffre4: "",
  });
  const [languagecontent, setlanguagecontent] = useState([]);
  const handleChange = (e) => {
    setcode({ ...code, [e.target.name]: e.target.value });
  };
  // localstorage
  const language = localStorage.getItem("language");

  // get user
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
  const { id } = useParams();
  // get language content
  const getlanguage = async () => {
    const response = await fetch(`http://localhost:3001/language/${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setlanguagecontent(result[0]);
    console.log("languagecont" + result);
    // console.log("languagecont" + result);
  };
  // useEffect
  useEffect(() => {
    getuser();
    getlanguage();
  }, []);
  const Verifycode = () => {
    const string_code = "";
    const newcode = string_code.concat(
      code.chiffre1,
      code.chiffre2,
      code.chiffre3,
      code.chiffre4
    );
    console.log(newcode);
    console.log(newcode.length);
    const user_password = user.user_password;
    console.log(user.user_password);
    if (newcode === user_password) {
      navigate(`/espace/${user.user_id}`);
    } else {
      document.getElementById("alertmessage").style.visibility = "visible";
    }
  };

  return (
    <div>
      <div
        className="card col-md-4 offset-md-3"
        style={{ marginTop: "150px", position: "relative", width: "50%" }}
      >
        <div className="card-header">
          <h4>
            {languagecontent.text23} {user.user_firstname} {user.user_lastname}
          </h4>
        </div>

        <div className="card-body" style={{ marginTop: "130px" }}>
          <h5>{languagecontent.text24}</h5>
          <div>
            <input
              style={{ marginLeft: "10px", width: "30px", fontSize: "25px" }}
              name="chiffre1"
              onChange={handleChange}
            />
            <input
              style={{ marginLeft: "10px", width: "30px", fontSize: "25px" }}
              name="chiffre2"
              onChange={handleChange}
            />

            <input
              style={{ marginLeft: "10px", width: "30px", fontSize: "25px" }}
              name="chiffre3"
              onChange={handleChange}
            />

            <input
              style={{ marginLeft: "10px", width: "30px", fontSize: "25px" }}
              name="chiffre4"
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <button className="btn btn-primary" onClick={Verifycode}>
              {languagecontent.text14}
            </button>
          </div>

          <div
            class="alert alert-danger text-danger  "
            id="alertmessage"
            style={{
              visibility: "hidden",
              width: "30%",

              margin: "0 auto",
            }}
            role="alert"
          >
            Code incorrect <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifycode;
