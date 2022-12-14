import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function Addemploye() {
  // states 
  const [startDate, setStartDate] = useState("");
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    civility: "",
    poste: "",
    birthday: "",
    phone: "",
    address: "",
    seniority: "",
    experience: "",
    comment: "",
    cin: "",
    role: "",
  });
  // handle form changes
  const handlechange = (e) => {
    const { name, value } = e.target;
    setuser((element) => ({
      ...element,
      [name]: value,
    }));
  };
// add a new employe
  const adduser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/add/employe/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        civility: user.civility,
        speciality: user.speciality,
        adress: user.address,
        birthday: user.birthday,
        seniority: user.seniority,
        experience: user.experience,
        comment: user.comment,
        role: 2,
        cin: user.cin,
        poste: user.poste,
      }),
    }).then((response) => {
      document.getElementById("alertmessage").style.visibility = "visible";
      e.target.reset();
    });
  };
  return (
    <div>
      <div className="col-md-4 offset-md-4" style={{ marginTop: "30px" }}>
        <h4>Ajouter un employe</h4>
        <form onSubmit={(e) => adduser(e)}>
          {/* nom */}
          <div class="form-group">
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Entrer votre nom"
              name="firstname"
              onChange={handlechange}
              required="required"
            />
          </div>
          {/* prenom */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre prenom"
              name="lastname"
              onChange={handlechange}
              required="required"
            />
            {/* civilite */}
            <div class="form-group mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre civilité"
                name="civility"
                onChange={handlechange}
              />
            </div>
          </div>
          {/* adresee */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre Adresse"
              name="address"
              onChange={handlechange}
            />
          </div>
          {/* email */}
          <div class="form-group mt-3">
            <input
              type="email"
              class="form-control"
              placeholder="Entrer votre email"
              name="email"
              onChange={handlechange}
            />
          </div>
          {/* telephone */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre telephone"
              name="phone"
              onChange={handlechange}
              required="required"
            />
          </div>
          {/* date de naissance  */}
          {/* <div class="form-group mt-3 d-flex">
            <label>Date de naissance:</label>{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              name="birthday"
            />
          </div> */}
          {/* cin */}
          {/* <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre numero de cin"
              name="cin"
              onChange={handlechange}
            />
          </div> */}
          {/* specialite */}
          {/* <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre specialite"
              name="speciality"
              onChange={handlechange}
            />
          </div> */}
          {/* ancienneté */}
          {/* <div class="form-group mt-3">
            <input
              type="number"
              class="form-control"
              placeholder="Entrer vos années d'ancienneté"
              name="ancien"
              onChange={handlechange}
            />
          </div> */}

          {/* resume experience */}
          {/* <div class="mt-3">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="décrire votre resumée"
              name="resume"
              onChange={handlechange}
            ></textarea>
          </div> */}
          {/* commentaires  */}
          {/* <div class="mt-3">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="ecrire votre commentaire ou question"
              name="commentaire"
              onChange={handlechange}
            ></textarea>
          </div> */}
          {/* send button */}
          <div className="mt-3">
            <input type="submit" className="btn btn-primary" value="Ajouter" />
          </div>
        </form>
        <div
          class="alert alert-secondary text-success  "
          id="alertmessage"
          style={{ visibility: "hidden" }}
          role="alert"
        >
          Successfully Saved <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>
    </div>
  );
}
