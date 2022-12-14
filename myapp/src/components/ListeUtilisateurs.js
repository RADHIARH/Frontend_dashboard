/* eslint-disable no-lone-blocks */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Edituser from "./Edituser";
export default function ListeUtilisateurs(props) {
  const [data, setdata] = useState([]);
  const [deleteuser, setdeleteuser] = useState(false);
  const [userpermissions, setuserpermissions] = useState([]);
  const [updateuser, setupdateuser] = useState(false);
  const [addpermission, setaddpermission] = useState(false);
  const [invit, setinvit] = useState(false);
  // get user permissions
  // const getuserpermissions = async () => {
  //   console.log("iduser" + props.id);
  //   await fetch(`http://localhost:3001/permissions/${props.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => setuserpermissions(response))
  //     .then((error) => console.log(error));
  // };

  // get all users
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
  const deleteUser = async (e, id) => {
    // check if user have permission to delete user
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 3 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    per !== undefined && setdeleteuser(true);
    // delete user
    if (deleteuser === true) {
      e.preventDefault();
      await fetch(`/delete/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        getdata();
      });
    }
  };
  const updateUser = () => {
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 5 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    console.log("per" + per);
    per !== undefined && setupdateuser(true);
  };
  const addPermission = () => {
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 9 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    console.log("per" + per);
    per !== undefined && setaddpermission(true);
  };
  useEffect(() => {
    getdata();
    // getuserpermissions();
    console.log(props.permissions);
    console.log("update" + updateuser);
    updateUser();
    addPermission();
  }, []);
  const sendinvitation = () => {
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 10 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    per !== undefined && setinvit(true);
    if (invit === false) alert("don't have access");
  };

  return (
    <div>
      <div style={{ marginTop: 100, marginLeft: 250, width: "60%" }}>
        <h6 style={{ fontSize: 20 }}>Liste des Utilisateurs </h6>

        <table class="table" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Telephone</th>
              <th scope="col"> Verifié</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              return (
                <>
                  <tr>
                    <td>{element.user_firstname}</td>
                    <td>{element.user_lastname}</td>
                    <td>{element.user_phone}</td>
                    <td>{element.verified === true ? "oui" : "non"}</td>
                    <NavLink
                      to={
                        addpermission
                          ? `/permissions/${element.user_id}/${props.id}`
                          : `/espace/${props.id}`
                      }
                    >
                      Ajouter permissions
                    </NavLink>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => deleteUser(e, element.user_id)}
                      >
                        Supprimer
                      </button>
                    </td>
                    <td>
                      {/* <button
                        className="btn btn-secondary"
                        onClick={updateUser}
                      >
                        Modifier
                      </button>
                      {updateuser && (
                        <Edituser id={props.id} id1={element.user_id} />
                      )} */}
                      <NavLink
                        to={
                          updateuser === true
                            ? `/update/user/${element.user_id}/${props.id}`
                            : `/espace/${props.id}`
                        }
                        class="btn btn-secondary"
                      >
                        Modifier
                      </NavLink>
                    </td>
                    <td>
                      {/* <button
                        className="btn btn-primary"
                        onClick={sendinvitation}
                      >
                        Envoyer Invitation
                      </button> */}
                      <NavLink to={`/send/email/${element.user_id}`}>
                        Send Invit
                      </NavLink>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}
