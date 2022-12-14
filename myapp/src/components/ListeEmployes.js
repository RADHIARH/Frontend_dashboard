import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function ListeEmployes(props) {
  const [data, setdata] = useState([]);
  const [deleteemploye, setdeleteemploye] = useState(false);
  const [userpermissions, setuserpermissions] = useState([]);
  const [updateemploye, setupdateemploye] = useState(false);
  const [addpermission, setaddpermission] = useState(false);
  // get user permissions
  const getuserpermissions = async () => {
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

  const deleteEmploye = async (e, id) => {
    const per = userpermissions.find(
      (element) =>
        element.id_permission === 4 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    console.log("per" + per);
    per !== undefined && setdeleteemploye(true);
    if (deleteemploye === true) {
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
  const getdata = async () => {
    await fetch("http://localhost:3001/employes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setdata(response))
      .then((error) => console.log(error));
  };
  const updateEmploye = () => {
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 6 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    console.log("per" + per);
    per !== undefined && setupdateemploye(true);
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
    getuserpermissions();
    updateEmploye();
    addPermission();
  }, []);
  return (
    <div>
      <div style={{ marginTop: 100, marginLeft: 250, width: "60%" }}>
        <h6 style={{ fontSize: 20 }}>Liste des Employes </h6>

        <table class="table" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Telephone</th>
              <th scope="col"> Verifié</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => {
              return (
                <>
                  <tr>
                    <td>{element.user_lastname}</td>
                    <td>{element.user_firstname}</td>
                    <td>{element.user_phone}</td>
                    <td>{element.verified === true ? "oui" : "non"}</td>
                    <td>
                      <NavLink
                        to={
                          addpermission
                            ? `/permissions/${element.user_id}/${props.id}`
                            : `/espace/${props.id}`
                        }
                      >
                        Ajouter permissions
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => deleteEmploye(e, element.user_id)}
                      >
                        Supprimer
                      </button>
                    </td>
                    <td>
                      <NavLink
                        to={
                          updateemploye === true
                            ? `/update/user/${element.user_id}/${props.id}`
                            : `/espace/${props.id}`
                        }
                        class="btn btn-secondary"
                      >
                        Modifier
                      </NavLink>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
