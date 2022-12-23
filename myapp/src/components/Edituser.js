import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import Navbar from "./Navbar";
const Edituser = (props) => {
  console.log("props edit" + props.id);
  const [userpermissions, setuserpermissions] = useState([]);
  const navigate = useNavigate();
  // const { id_user } = useParams();
  // const id = parseInt(id_user);
  // const { iduser2 } = useParams();
  // const id2 = parseInt(iduser2);
  // console.log("iduser" + id_user);
  const [data, setdata] = useState([]);
  const [user, setuser] = useState({
    user_firstname: "",
    user_lastname: "",
    user_phone: "",
    user_email: "",
    user_civility: "",
    user_speciality: "",
    user_address: "",
    user_birthday: "",
    user_seniority: "",
    user_experience: "",
    user_comment: "",
    cin: "",
    poste: "",
  });
  // get all users
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/users/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setdata(result[0]);
    console.log(data);
    const newuser = [...user];
    user[0] = result[0];
    setuser(newuser);
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((element) => ({
      ...element,
      [name]: value,
    }));
  };
  // update user
  const edituser = async (e) => {
    // check if user have permission to update user
    e.preventDefault();
    await fetch(`/update/user/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: data.user_firstname,
        lastname: data.user_lastname,
        phone: data.user_phone,
        email: data.user_email,
        civility: data.user_civility,
        speciality: data.user_speciality,
        adress: data.user_address,
        birthday: data.user_birthday,
        seniority: data.user_seniority,
        experience: data.user_experience,
        comment: data.user_comment,
        cin: data.cin,
        poste: data.poste,
      }),
    }).then((response) => {
      document.getElementById("alertmessage").style.visibility = "visible";
      document.getElementById("ok").style.visibility = "visible";
      e.target.reset();
      //   navigate("/espace/admin");
    });
  };
  const goback = () => {
    // navigate(`/espace/${id2}`);
  };
  // get user permissions
  const getuserpermissions = async () => {
    console.log("iduser" + props.id);
    await fetch(`http://localhost:3001/permissions/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setuserpermissions(response))
      .then((error) => console.log(error));
  };
  useEffect(() => {
    getdata();
    getuserpermissions();
  }, []);
  return (
    <div>
      {/* <Navbar id={iduser2} /> */}
      
       
        <div
        
          style={{ marginTop: "80px" }}
        >
          <h4>Modifier un utilisateur</h4>

          <form onSubmit={(e) => edituser(e)}>
            {/* nom */}
            <div class="form-group">
              <label for="inputEmail4">Nom </label>
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Entrer votre nom"
                name="user_firstname"
                onChange={handlechange}
                defaultValue={data.user_firstname}
              />
            </div>
            {/* prenom */}
            <div class="form-group mt-3">
              <label for="inputEmail4">Prenom </label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre prenom"
                name="user_lastname"
                onChange={handlechange}
                defaultValue={data.user_lastname}
              />
              <div class="form-group mt-3">
                <label for="inputEmail4">Date de naissance </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrer votre prenom"
                  name="user_lastname"
                  onChange={handlechange}
                  defaultValue={data.user_birthday}
                />
                {/* civilite */}
                <div class="form-group mt-3">
                  <label for="inputEmail4">Civilité </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Entrer votre civilité"
                    name="user_civility"
                    onChange={handlechange}
                    defaultValue={data.civility}
                  />
                </div>
              </div>
              {/* email */}
              <div class="form-group mt-3">
                <label for="inputEmail4">Email </label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Entrer votre email"
                  name="user_email"
                  onChange={handlechange}
                  defaultValue={data.user_email}
                />
              </div>
              {/* telephone */}
              <div class="form-group mt-3">
                <label for="inputEmail4">Telephone </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrer votre telephone"
                  name="user_phone"
                  onChange={handlechange}
                  defaultValue={data.user_phone}
                />
              </div>
              {/* userspecialite */}
              <div class="form-group mt-3">
                <label for="inputEmail4">Specialité</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  value={data.user_speciality}
                  onChange={handlechange}
                  name="user_speciality"
                />
              </div>

              <div class="form-group cmt-3 ">
                <label for="inputEmail4">Adresse</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  Defaultvalue={data.user_adress}
                  onChange={handlechange}
                  name="user_adress"
                />
              </div>
              {/* user ancienneté */}
              <div class="form-group mt-3">
                <label for="inputEmail4">Ancienneté</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  Defaultvalue={data.user_seniority}
                  onChange={handlechange}
                />
              </div>
              {/* user cin */}
              <div class="form-group mt-3">
                <label for="inputEmail4">CIN</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  Defaultvalue={data.cin}
                  name="cin"
                  onChange={handlechange}
                />
              </div>
              {/* user poste */}
              <div class="form-group mt-3">
                <label for="inputEmail4">Poste</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  Defaultvalue={data.user_poste}
                  name="poste"
                  onChange={handlechange}
                />
              </div>
              <div>
                <div className="d-flex">
                  <div style={{ marginTop: "20px", marginLeft: "10px" }}></div>
                </div>
              </div>

              {/* send button */}
              <div className="mt-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Modifier"
                />
              </div>
            </div>
          </form>

          <div
            class="alert alert-secondary text-success  "
            id="alertmessage"
            style={{ visibility: "hidden" }}
            role="alert"
          >
            Utilisateur modifié avec success{" "}
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <button
            id="ok"
            className="btn btn-success"
            style={{ visibility: "hidden" }}
            onClick={goback}
          >
            OK
          </button>
          {/* <div style={{ position: "absolute", bottom: "10px" }}>
            <NavLink to={`/espace/${id2}`}> GO BACK</NavLink>
          </div> */}
        </div>
      </div>
  
  );
};

export default Edituser;
