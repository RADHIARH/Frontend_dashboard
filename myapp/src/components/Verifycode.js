import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Verifycode = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [code, setcode] = useState({
    chiffre1: "",
    chiffre2: "",
    chiffre3: "",
    chiffre4: "",
  });
  const handleChange = (e) => {
    setcode({ ...code, [e.target.name]: e.target.value });
  };
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
  // useEffect
  useEffect(() => {
    getuser();
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
      navigate(`/user/profile/${user.user_id}`);
    } else {
      document.getElementById("alertmessage").style.visibility = "visible";
    }
  };

  return (
    <div>
      <div style={{ marginTop: "20px", position: "relative" }}>
        <h4>
          Welcome {user.user_firstname} {user.user_lastname}
        </h4>
        <div style={{ marginTop: "130px" }}>
          <h5>Veuillez saisir le code qui vous avez reçu</h5>
          <div>
            <input
              style={{ marginLeft: "10px" }}
              name="chiffre1"
              onChange={handleChange}
            />
            <input
              style={{ marginLeft: "10px" }}
              name="chiffre2"
              onChange={handleChange}
            />

            <input
              style={{ marginLeft: "10px" }}
              name="chiffre3"
              onChange={handleChange}
            />

            <input
              style={{ marginLeft: "10px" }}
              name="chiffre4"
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <button className="btn btn-primary" onClick={Verifycode}>
              Envoyer
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
