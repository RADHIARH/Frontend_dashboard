import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AdressForm from "./AdressForm";
import DatePicker from "react-datepicker";
import { compareAsc, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
const Userprofile = (props) => {
  const { id } = useParams();
  const [editaddress, seteditaddress] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const newdate = format(startDate, "yyyy-MM-dd");
  const [editpass, seteditpass] = useState(false);
  const [password, setpassword] = useState("");
  const [data, setdata] = useState([]);
  const [birthdate, setbirthdate] = useState("");
  // get user
  const getuser = async () => {
    const response = await fetch(`/users/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setdata(result[0]);
  };
  // handle default
  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((element) => ({
      ...element,
      [name]: value,
    }));
  };
  // useEffect
  useEffect(() => {
    getuser();
  }, []);
  const changepassword = async (e) => {
    e.preventDefault();
    console.log(password);
    await fetch(`/edit/newpassword/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    }).then(
      (response) =>
        (document.getElementById("alertmessage").style.visibility = "visible")
    );
  };
  const edituser = async (e) => {
    // check if user have permission to update user
    e.preventDefault();
    await fetch(`/validate/user/${props.id}`, {
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
      document.getElementById("alertmessage2").style.visibility = "visible";
      e.target.reset();
      //   navigate("/espace/admin");
    });
  };

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <h4>Veuillez validez vos coordonnées</h4>

        <div
          className="d-flex"
          style={{
            width: "100%",
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
            <div className="card-header" style={{ fontWeight: "bold" }}>
              {" "}
              Changer votre mot de passe
            </div>
            <div className="card-body">
              <div class="form-group">
                <label>Entrer votre mot de passe</label>
                <input
                  className="form-control"
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                ></input>
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={(e) => changepassword(e)}
              >
                Modifier
              </button>
            </div>
            <div
              class="alert alert-secondary text-success  "
              id="alertmessage"
              style={{ visibility: "hidden" }}
              role="alert"
            >
              Votre mot de passe est mis à jour{" "}
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div
            className="card"
            style={{
              width: "60%",
              marginLeft: "10px",
              marginTop: "15px",
              position: "absolute",
              right: 0,
              height: "820px",
            }}
          >
            <div className="card-header" style={{ fontWeight: "bold" }}>
              {" "}
              Valider vos coordonnées
            </div>
            <div className="card-body">
              <form style={{ marginLeft: "200px" }}>
                {/* username */}
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Nom</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={data.user_firstname}
                    onChange={handlechange}
                    name="user_firstname"
                  />
                </div>
                {/* userlastname */}
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Prenom</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={data.user_lastname}
                    onChange={handlechange}
                    name="user_lastname"
                  />
                </div>
                {/* useremail */}
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={data.user_email}
                    onChange={handlechange}
                    name="user_email"
                  />
                </div>
                {/* usertelephone */}
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Telephone</label>
                  <input
                    type="TEXT"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={data.user_phone}
                    onChange={handlechange}
                    name="user_phone"
                  />
                </div>
                {/* userspecialite */}
                <div class="form-group col-md-6">
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
                <div className="d-flex">
                  <div class="form-group col-md-6 ">
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
                  <div></div>
                  <div style={{ marginTop: "30px" }}>
                    {editaddress && <AdressForm />}
                  </div>
                </div>
                {/* user ancienneté */}
                <div class="form-group col-md-6">
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
                <div class="form-group col-md-6">
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
                <div class="form-group col-md-6">
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
                {/* user experience */}
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Experience </label>
                  <textarea
                    class="form-control"
                    Defaultvalue={data.user_experience}
                    name="user_experience"
                    onChange={handlechange}
                  />
                </div>
                {/* user Date naissance */}
                <div>
                  <div className="d-flex">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Date de naissance</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                        Defaultvalue={data.user_birthday}
                        name="user_birthday"
                        onChange={handlechange}
                      />
                    </div>
                    <div></div>
                    <div
                      style={{ marginTop: "20px", marginLeft: "10px" }}
                    ></div>
                  </div>
                </div>
                <div
                  className=""
                  style={{ marginTop: "10px", marginRight: "400px" }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={(e) => edituser(e)}
                  >
                    Valider{" "}
                  </button>
                </div>
              </form>
              <div
                class="alert alert-secondary text-success  "
                id="alertmessage2"
                style={{ visibility: "hidden" }}
                role="alert"
              >
                Utilisateur bien validé <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
