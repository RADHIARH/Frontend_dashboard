import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const Userprofile = () => {
  const [user, setuser] = useState([]);
  const { id } = useParams();
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

  // useEffect
  useEffect(() => {
    getuser();
  }, []);
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          BIENVENUE {user.user_firstname} {user.user_lastname}
        </h4>

        <div
          className="d-flex"
          style={{
            width: "90%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            className="card"
            style={{
              width: "30%",
              marginLeft: "10px",
              marginTop: "150px",
              position: "absolute",
              left: 0,
            }}
          >
            <div className="card-header"> Changer mot de passe</div>
            <div className="card-body">
              <div class="form-group">
                <label>Entrer votre mot de passe</label>
                <input className="form-control" type="password"></input>
              </div>
            </div>
          </div>
          <div
            className="card"
            style={{
              width: "60%",
              marginLeft: "20px",
              marginTop: "150px",
              position: "absolute",
              right: 0,
            }}
          >
            <div className="card-header"> Valider vos coordonnées</div>
            <div className="card-body">
              <form style={{ marginLeft: "200px" }}>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Nom</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={user.user_firstname}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Prenom</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={user.user_lastname}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={user.user_email}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Telephone</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={user.user_phone}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Specialité</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    value={user.user_speciality}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Adresse</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    Defaultvalue={user.user_adress}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Ancienneté</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    Defaultvalue={user.user_adress}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
