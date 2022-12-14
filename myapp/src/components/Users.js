import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
export default function Users() {
  const [data, setdata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [user, setuser] = useState({
    nom: "",
    prenom: "",
    civilite: "",
    adresse: "",
    email: "",
    specialite: "",
    naissance: format(startDate, "dd/MM/yyyy"),
    telephone: "",
    cin: "",
    adresse_travail: "",
    anciennete: "",
    resume: "",
    commentaire: "",
  });
  const handlechange = (e) => {
    const { value, name } = e.target;
    setuser((element) => ({
      ...element,
      [name]: value,
    }));
  };
  //   get all users
  const getdata = async () => {
    await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setdata(response))
      .then((error) => console.log(error));
  };
  //   add user
  const adduser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        nom: user.nom,
        prenom: user.prenom,
        civilite: user.civilite,
        email: user.email,
        adresse: user.adresse,
        specialite: user.specialite,
        naissance: user.naissance,
        telephone: user.telephone,
        cin: user.cin,
        adresse_travail: user.adresse_travail,
        anciennete: user.anciennete,
        resume: user.resume,
        commentaire: user.commentaire,
      },
    }).then((response) => {
      getdata();
    });
    console.log("user" + user);
  };
  //   delete user
  const removeuser = async (e, id) => {
    e.preventDefault();
    await fetch(`/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    getdata();
    console.log(format(startDate, "dd/MM/yyyy"));
  }, []);

  return (
    <div>
      {/* ajouter un utilisateur */}
      <div style={{ marginTop: "30px" }}>
        <h4>Ajouter un utilisateur</h4>
        <form>
          {/* nom */}
          <div class="form-group">
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Entrer votre nom"
              name="nom"
              onChange={handlechange}
            />
          </div>
          {/* prenom */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre prenom"
              name="prenom"
              onChange={handlechange}
            />
            {/* civilite */}
            <div class="form-group mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre civilité"
                name="civilite"
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
              name="adresse"
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
              name="telephone"
              onChange={handlechange}
            />
          </div>
          {/* date de naissance  */}
          <div class="form-group mt-3 d-flex">
            <label>Date de naissance:</label>{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              name="naissance"
            />
          </div>
          {/* cin */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre numero de cin"
              name="cin"
              onChange={handlechange}
            />
          </div>
          {/* adresse de travail */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre adresse  de travail"
              name="adresse_travail"
              onChange={handlechange}
            />
          </div>
          {/* specialite */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre specialite"
              name="specialite"
              onChange={handlechange}
            />
          </div>
          {/* ancienneté */}
          <div class="form-group mt-3">
            <input
              type="number"
              class="form-control"
              placeholder="Entrer vos années d'ancienneté"
              name="anciennete"
              onChange={handlechange}
            />
          </div>

          {/* resume experience */}
          <div class="mt-3">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="décrire votre resumée"
              name="resume"
              onChange={handlechange}
            ></textarea>
          </div>
          {/* commentaires  */}
          <div class="mt-3">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="ecrire votre commentaire ou question"
              name="commentaire"
              onChange={handlechange}
            ></textarea>
          </div>
          {/* send button */}
          <div className="mt-3">
            <button className="btn btn-primary" onClick={(e) => adduser(e)}>
              Ajouter
            </button>
          </div>
        </form>
      </div>
      {/* liste des employes  */}
      <div className="col-md-4 offset-md-4" style={{ marginTop: "50px" }}>
        <h3>Espace Employe </h3>

        <div>
          <h6>Liste des Utilisateurs </h6>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Adresse</th>
              <th scope="col">Email</th>
              <th scope="col">Telephone</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              return (
                <tr>
                  <td>{element.nom}</td>
                  <td>{element.prenom}</td>
                  <td>{element.adresse}</td>
                  <td>{element.email}</td>
                  <td>{element.telephone}</td>
                  <td>
                    <button className="btn btn-primary">Inviter</button>
                  </td>
                  <td>
                    <button className="btn btn-primary">Modifier</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => removeuser(e, element.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
