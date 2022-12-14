import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListeEmployes from "./ListeEmployes";
import ListeUtilisateurs from "./ListeUtilisateurs";
import { useParams } from "react-router-dom";
import AddUser from "./AddUser";
import Addemploye from "./Addemploye";
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
  // get all employes
  const showemployes = () => {
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 2 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
    );
    per !== undefined && setemploye(true);
    setuser(false);
    permission && setemploye(true);
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
  // get all users
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
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 1 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
    );
    per !== undefined && setuser(true);

    setemploye(false);
    setadduser(false);
    setaddemploye(false);
  };
  // check if user has permission to add a new user
  const addUser = () => {
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 7 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
    );
    per !== undefined && setadduser(true);
    setuser(false);
    setemploye(false);
    setaddemploye(false);
  };
  // check if user has permission to add a new employe
  const addEmploye = () => {
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 8 &&
        element.id_user === iduser &&
        element.user_permission_value === 1
    );
    per !== undefined && setaddemploye(true);
    setuser(false);
    setemploye(false);
    setadduser(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <h3 className="text-center mt-3">
        Bienvenue {data.user_firstname}
        <span style={{ marginLeft: "10px" }}>{data.user_lastname} </span>
      </h3>
      <div style={{ position: "absolute", right: 10, top: 5 }}>
        {" "}
        <button className="btn btn-primary" onClick={logout}>
          LogOut
        </button>
      </div>
      <div style={{ display: "flex" }}>
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
        {employe && <ListeEmployes id={iduser} permissions={userpermissions} />}

        {adduser && <AddUser />}
        {addemploye && <Addemploye />}
      </div>
    </div>
  );
}
