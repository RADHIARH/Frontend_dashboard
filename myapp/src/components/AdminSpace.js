import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListeEmployes from "./ListeEmployes";
import ListeUtilisateurs from "./ListeUtilisateurs";
import { useParams } from "react-router-dom";
import AddUser from "./AddUser";
import Addemploye from "./Addemploye";
import Navbar from "./Navbar";
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
  const [show, setshow] = useState();
  // get all employes
  const showemployes = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 2 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
    );
    per !== undefined && setemploye(true);
    setuser(false);
    permission && setemploye(true);
    per === undefined && setshow(false);
    setadduser(false);
    setaddemploye(false);
  };

  // get user permissions
  const getuserpermissions = async () => {
    await fetch(`http://localhost:3001/permissions/${id}`, {
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
  const logout = async () => {
    fetch("/logout", {
      method: "GET",
    }).then((response) => {
      navigate("/");
    });
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
  };
  // useEffect
  useEffect(() => {
    getdata();
    getuserpermissions();
  }, []);
  // check if user has permission to display the list of all users
  const showusers = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 1 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
    );
    per !== undefined && setuser(true);
    per === undefined && setshow(false);
    setemploye(false);
    setadduser(false);
    setaddemploye(false);
  };
  // check if user has permission to add a new user
  const addUser = () => {
    setshow(true);
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 7 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
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
        element.user_permission_value === 1
    );
    per !== undefined && setaddemploye(true);
    per === undefined && setshow(false);
    setuser(false);
    setemploye(false);
    setadduser(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Navbar id={iduser} />
      {/* <h3 className="text-center mt-3">
        Bienvenue {data.user_firstname}
        <span style={{ marginLeft: "10px" }}>{data.user_lastname} </span>
      </h3> */}
      <div style={{ position: "absolute", right: 10, top: 5 }}>
        {" "}
        <button className="btn btn-primary" onClick={logout}>
          LogOut
        </button>
      </div>
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div style={{ marginLeft: "30px" }}>
          <button className="btn btn-primary" onClick={showusers}>
            Liste des Utilisateurs
          </button>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <button className="btn btn-primary" onClick={showemployes}>
            Liste des Employes
          </button>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <button className="btn btn-primary" onClick={addUser}>
            Ajouter un utilisateur
          </button>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <button className="btn btn-primary" onClick={addEmploye}>
            Ajouter un Employe
          </button>
        </div>
      </div>
      <div>
        {user && (
          <ListeUtilisateurs id={iduser} permissions={userpermissions} />
        )}
        {show === false && (
          <div style={{marginTop:"60px"}}>
            {" "}
            <h4>Vous n'avez pas le droit d'accéder à cette page</h4>
          </div>
        )}
        {employe && <ListeEmployes id={iduser} permissions={userpermissions} />}

        {adduser && <AddUser />}
        {addemploye && <Addemploye />}
      </div>
    </div>
  );
}
