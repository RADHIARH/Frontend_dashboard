import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListeEmployes from "./ListeEmployes";
import ListeUtilisateurs from "./ListeUtilisateurs";
import { useParams } from "react-router-dom";
import Userprofile from "./Userprofile";
import FileLoad from "./FileLoad";
import Navbar from "./Navbar";
import FileUpload from "./FileUpload";
import Images from "./Images";
export default function AdminSpace() {
  const { id } = useParams();
  const iduser = parseInt(id);
  const navigate = useNavigate();
  const [employe, setemploye] = useState(false);
  const [user, setuser] = useState(false);
  const [adduser, setadduser] = useState(false);
  const [addemploye, setaddemploye] = useState(false);
  const [data, setdata] = useState([]);
  const [userpermissions, setuserpermissions] = useState([]);
  const [permission, setpermission] = useState();
  const [show, setshow] = useState(true);
  const [show_addimage, setshow_addimage] = useState(false);
  const [show_images, setshow_images] = useState(false);
  const [languagecontent, setlanguagecontent] = useState([]);
  const [language_id, setlanguage_id] = useState("");
  const [language, setlanguage] = useState(3);
  // local storage
  const id_language = localStorage.getItem("language");
  console.log("id_language admin space" + id_language); // get user permissions
  // get selected langauge
  const getlanguage = async (e) => {
    const response = await fetch(`http://localhost:3001/lang/${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    localStorage.setItem("language", result.id_lang);
  };

  // get language content
  const getlanguagecontent = async (e) => {
    const response = await fetch(
      `http://localhost:3001/language/${id_language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("resultat" + result[0].button1);
    setlanguagecontent(result[0]);
  };
  // get permissions

  const getuserpermissions = async () => {
    await fetch(`https://dashboard-last-version.vercel.app/permissions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setuserpermissions(response))
      .then((error) => console.log(error));
  };
  console.log(userpermissions);
  // logout
  const logout = () => {
    // fetch("/logout", {
    //   method: "GET",
    // }).then((response) => {
    //   navigate("/");
    // });
    navigate("/");
  };
  // get user by id
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setdata(result[0]);
    console.log("id role" + data.id_role);
  };
  // useEffect
  useEffect(() => {
    getdata();
    getuserpermissions();
    getlanguage();
    getlanguagecontent();
  }, [language, id_language]);
  // check if user has permission to display the list of all users
  const showusers = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 1 &&
        element.id_user === iduser &&
        element.user_permission_value === true
    );
    per !== undefined && setuser(true);
    per === undefined && setshow(false);
    setemploye(false);
    setshow_images(false);
    show_images(false);
    // setadduser(false);
    // setaddemploye(false);
  };
  // check if user has permissions to show all employes
  const showemployes = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 2 &&
        element.id_user === iduser &&
        element.user_permission_value === true
    );
    per !== undefined && setemploye(true);
    setuser(false);
    permission && setemploye(true);
    per === undefined && setshow(false);
    // setadduser(false);
    // setaddemploye(false);
    setshow_images(false);
    setshow_addimage(false);
  };
  // check if user has permission to add a new user
  const addUser = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 7 &&
        element.id_user === iduser &&
        element.user_permission_value === true
    );
    per !== undefined && setadduser(true);
    per === undefined && setshow(false);
    setuser(false);
    setemploye(false);
    setaddemploye(false);
  };
  // check if user has permission to add a new employe
  const addEmploye = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 8 &&
        element.id_user === iduser &&
        element.user_permission_value === true
    );
    per !== undefined && setaddemploye(true);
    per === undefined && setshow(false);
    setuser(false);
    setemploye(false);
    setadduser(false);
  };
  const addimage = () => {
    setshow_addimage(true);
    setemploye(false);
    setuser(false);
    setshow_images(false);
  };
  const showimage = () => {
    setshow_images(true);
    setemploye(false);
    setuser(false);
    setshow_addimage(false);
  };
  return (
    <div style={{ position: "relative" }}>
      <Navbar id={iduser} language={language} />
      {/* <h3 className="text-center mt-3">
        Bienvenue {data.user_firstname}
        <span style={{ marginLeft: "10px" }}>{data.user_lastname} </span>
      </h3> */}
      <div className="col-md-1" style={{ position: "absolute", right: 10 }}>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setlanguage(e.target.value)}
        >
          <option value="3">Français</option>
          <option value="1">English </option>
          <option value="2">Arabic</option>
        </select>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="shadow"
          style={{
            width: "250px",
            marginTop: "50px",
            marginLeft: "30px",
            marginRight: "100px",
            backgroundColor: "#23A5D9",
            height: "900px",
          }}
        >
          {/* user list */}
          <div className="" style={{ marginLeft: "10px", marginTop: "50px" }}>
            <button className="btn btn-light" onClick={showusers}>
              {languagecontent.button2}
            </button>
          </div>
          {/* // employes list */}
          <div style={{ marginLeft: "10px", marginTop: "50px" }}>
            <button className="btn btn-light" onClick={showemployes}>
              {languagecontent.button3}
            </button>
          </div>
          <div style={{ marginLeft: "10px", marginTop: "50px" }}>
            <button className="btn btn-light" onClick={addimage}>
              {languagecontent.button4}
            </button>
          </div>
          <div style={{ marginLeft: "10px", marginTop: "50px" }}>
            <button className="btn btn-light" onClick={showimage}>
              {languagecontent.button5}
            </button>
          </div>
          {/* ADD user */}
          {/* <div
            
            style={{ marginLeft: "10px", marginTop: "50px" }}
          >
            <button className="btn btn-light" onClick={addUser}>
              Ajouter un utilisateur
            </button>
          </div> */}
          {/* add employe */}
          {/* <div
          
            style={{ marginLeft: "10px", marginTop: "50px" }}
          >
            <button className="btn btn-dark" onClick={addEmploye}>
              Ajouter un Employe
            </button>
          </div> */}
        </div>
        <div
          className="shadow"
          style={{
            width: "80%",

            marginRight: "200px",
            marginTop: "20px",
          }}
        >
          {data.id_role === 3 && data.verified === 0 && (
            <Userprofile id={iduser} />
          )}
          {user && (
            <ListeUtilisateurs
              id={iduser}
              permissions={userpermissions}
              language={language}
            />
          )}
          {show === false && (
            <div style={{ marginTop: "60px" }}>
              {" "}
              <h4>{languagecontent.text1}</h4>
            </div>
          )}
          {employe && (
            <ListeEmployes
              id={iduser}
              permissions={userpermissions}
              language={language}
            />
          )}
          {show_addimage && data.id_role === 1 && (
            <FileUpload id={iduser} language={language} />
          )}
          {show_images && <Images id={iduser} language={language} />}

          {/* {adduser && <AddUser />}
          {addemploye && <Addemploye />} */}
        </div>
      </div>
    </div>
  );
}
