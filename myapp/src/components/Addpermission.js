import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Addpermission = () => {
  // states
  const [permissions, setpermissions] = useState([]);
  const [role, setrole] = useState("");
  const [data, setdata] = useState([]);
  const [userpermissions, setuserpermissions] = useState([]);
  const [newpermissions, setnewpermissions] = useState(userpermissions);
  const { id_user } = useParams();
  const id = parseInt(id_user);
  const { iduser2 } = useParams();
  // get list of all permissions
  const getpermissions = async () => {
    await fetch("/permissions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setpermissions(response))
      .then((error) => console.log(error));
  };
  // get the list of all users
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/users/${id_user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setdata(result);
    console.log(data);
    setrole(data.id_role);
  };
  // get  all the permissions of a user
  const getuserpermissions = async () => {
    const response = await fetch(
      `http://localhost:3001/permissions/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setuserpermissions(result);
  };
  // useEffect
  useEffect(() => {
    getpermissions();
    getdata();
    getuserpermissions();
  }, [newpermissions]);
  const addpermission = async (id_permission) => {
    const response = await fetch("/add/permissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        id_permission,
      }),
    });
    const data = await response.json();
    const id_perm = data.id_user_permission;
    const newtab = [...newpermissions];
    newtab[id_perm] = data;
    setnewpermissions(newtab);
  };
  // delete permission
  const deletepermission = async (e, id_permission) => {
    e.preventDefault();
    console.log("idper" + id_permission);
    const response = await fetch(`/permissions/${id_permission}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const id_perm = data.id_user_permission;
    const newtab = [...newpermissions];
    newtab[id_perm] = data;
    setnewpermissions(newtab);
  };
  return (
    <div>
      <div style={{ position: "relative" }}>
        {data.map((element) => {
          return (
            <>
              <div style={{ marginTop: "50px" }}>
                <h5>
                  Ajouter Permissions pour
                  {element.id_role === 2 ? " l'employe" : " l'utilisateur"}{" "}
                </h5>
                <h3>
                  {element.user_firstname} {element.user_lastname}
                </h3>
              </div>
            </>
          );
        })}

        <div
          className="col-md-4 offset-md-4"
          style={{ display: "flex", marginTop: "100px" }}
        >
          <table class="table" style={{ width: "70%" }}>
            <thead>
              <tr>
                <th scope="col">Permission</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((element) => {
                return (
                  <>
                    <tr>
                      <td>{element.title_permission}</td>
                      {userpermissions.find(
                        (permission) =>
                          permission.id_user === id &&
                          permission.id_permission === element.id_permission &&
                          permission.user_permission_value === 1
                      ) ? (
                        <>
                          <td>
                            <h4>
                              <BiCheck />
                            </h4>
                          </td>
                          <td>
                            {userpermissions
                              .filter(
                                (permission) =>
                                  permission.id_user === id &&
                                  permission.id_permission ===
                                    element.id_permission &&
                                  permission.user_permission_value === 1
                              )
                              .map((el) => {
                                return (
                                  <button
                                    className="btn btn-danger"
                                    onClick={(e) =>
                                      deletepermission(e, el.id_user_permission)
                                    }
                                  >
                                    Supprimer permission
                                  </button>
                                );
                              })}
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) =>
                                addpermission(element.id_permission)
                              }
                            >
                              Ajouter
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ position: "absolute", bottom: "10px", left: "70px" }}>
          <NavLink to={`/espace/${iduser2}`}> GO BACK</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Addpermission;
