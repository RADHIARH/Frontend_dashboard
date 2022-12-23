import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { HiUserAdd } from "react-icons/hi";
import { BsXOctagonFill } from "react-icons/bs";
import Edituser from "./Edituser";
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import UserDetails from "./UserDetails";
import AddUser from "./AddUser";
export default function ListeEmployes(props) {
  const [data, setdata] = useState([]);
  const [show, setshow] = useState();
  const [deleteuser, setdeleteuser] = useState(false);
  const [userpermissions, setuserpermissions] = useState([]);
  const [languagecontent, setlanguagecontent] = useState([]);
  const [updateuser, setupdateuser] = useState(false);
  const [addpermission, setaddpermission] = useState(false);
  const [invit, setinvit] = useState(false);
  const [userdetails, setuserdetails] = useState(false);
  const [userlist, setuserlist] = useState(true);
  const [show_edituser, setshow_edituser] = useState(false);
  const [show_add_user, setshow_add_user] = useState(false);
  const [userid, setuserid] = useState("");
  const min = Math.ceil(1000);
  const max = Math.floor(2000);
  const code = Math.floor(Math.random() * (max - min) + min);

  // check if user has permissions to add an new user
  const adduser = (e) => {
    e.preventDefault();
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 7 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    per !== undefined && setshow_add_user(true);
    per === undefined && setshow(false);
    setshow_edituser(false);
    setuserdetails(false);
  };
  //  check if user has permissions to edit user details
  const showedituser = (e, id) => {
    document.getElementById("successbox").style.visibility = "hidden";
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 5 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    per !== undefined && setshow_edituser(true);
    per === undefined && setshow(false);
    e.preventDefault();
    setuserid(id);
    setuserdetails(false);
    setshow_add_user(false);
  };
  // check if user has permissions to show user details
  const showuser_details = (e, id) => {
    document.getElementById("successbox").style.visibility = "hidden";
    e.preventDefault();
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 11 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );

    per !== undefined && setuserdetails(true);
    console.log(userdetails);
    setuserid(id);
    console.log("id" + userid);
    setshow_add_user(false);
    setshow_edituser(false);
    per === undefined && setshow(false);
  };
  // check if user have permission to delete user
  const deleteUser = async (e, id) => {
    const per = props.permissions.find(
      (element) =>
        element.id_permission === 3 &&
        element.id_user === props.id &&
        element.user_permission_value === 1
    );
    per === undefined && setshow(false);
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
        document.getElementById("successbox").style.visibility = "visible";
      });
    }
  };
  // get all users
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
  // send email
  const submit = async (e, id, email) => {
    e.preventDefault();
    await fetch("http://localhost:3001/send/email/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
        url: `http://localhost:3000/verify/code/${id}`,
        id: id,
      }),
    }).then((response) => {
      alert("email envoyé");
    });
  };
  // get language content
  const getlanguage = async () => {
    const response = await fetch(
      `http://localhost:3001/language/${props.language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("language" + result);
    setlanguagecontent(result[0]);
    console.log("languagecont" + result);
    // console.log("languagecont" + result);
  };
  useEffect(() => {
    getdata();
    getlanguage();
    // getuserpermissions();
    console.log(props.permissions);
    console.log("update" + updateuser);
    updateUser();
    addPermission();
  }, [props.language]);

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
    <div style={{ position: "relative" }}>
      <div
        class="alert alert-success"
        id="successbox"
        style={{ visibility: "hidden" }}
      >
        <strong>Success!</strong> l'utilisateur a été supprimé avec success
      </div>
      <div style={{ position: "absolute", right: 30 }}>
        {" "}
        <button
          className="btn"
          style={{ fontSize: "40px" }}
          onClick={(e) => adduser(e)}
        >
          {" "}
          <HiUserAdd />
        </button>{" "}
      </div>
      <div style={{ marginTop: 100, marginLeft: 50 }}>
        <>
          <div style={{ display: "flex" }}>
            {/* table */}
            <div style={{ width: "50%" }}>
              <h2 className="text-center">{languagecontent.text10} </h2>
              <table
                class="table"
                style={{ marginTop: "40px", marginLeft: "0px" }}
              >
                <thead className="thead-light">
                  <tr className=" table-secondary">
                    <th scope="col">{languagecontent.col1}</th>
                    <th scope="col">{languagecontent.col2}</th>
                    <th scope="col">{languagecontent.col3}</th>
                    <th scope="col">{languagecontent.col4}</th>
                    <th scope="col"> {languagecontent.col10}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    {/* <th></th>
              <th></th>
              <th></th> */}
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
                          <td>{element.user_email}</td>
                          <td>
                            {element.verified === 1 ? (
                              <BiCheck style={{ fontSize: "30px" }} />
                            ) : (
                              <BsXOctagonFill style={{ fontSize: "20px" }} />
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              style={{ width: "150px" }}
                              onClick={(e) =>
                                showuser_details(e, element.user_id)
                              }
                            >
                              Voir Détails{" "}
                            </button>
                          </td>
                          {/* delete user */}
                          <td>
                            <button
                              className="btn"
                              onClick={(e) => deleteUser(e, element.user_id)}
                              style={{
                                height: "30px",
                              }}
                            >
                              <AiFillDelete
                                style={{ color: "red", fontSize: "25px" }}
                              />
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn "
                              onClick={(e) => showedituser(e, element.user_id)}
                              style={{
                                height: "30px",
                              }}
                            >
                              <AiTwotoneEdit style={{ fontSize: "25px" }} />
                            </button>
                          </td>

                          {/* <NavLink
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
                        className="btn "
                        onClick={(e) => deleteUser(e, element.user_id)}
                        style={{
                          height: "30px",
                          background: "none!important",
                          border: "none",
                          padding: "0px",
                          color: "#069",
                          textDecoration: "underline",
                        }}
                      >
                        Supprimer
                      </button>
                    </td> */}
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
                            {/* <NavLink
                        to={
                          updateuser === true
                            ? `/update/user/${element.user_id}/${props.id}`
                            : `/espace/${props.id}`
                        }
                        class="btn btn-secondary"
                      >
                        Modifier
                      </NavLink> */}
                          </td>
                          <td>
                            {/* <button
                        className="btn btn-primary"
                        onClick={sendinvitation}
                      >
                        Envoyer Invitation
                      </button> */}
                            {/* <NavLink to={`/send/email/${element.user_id}/${props.id}`}>
                        Envoyer une invitation
                      </NavLink> */}
                            {/* <button
                        className="btn"
                        onClick={(e) =>
                          submit(e, element.user_id, element.user_email)
                        }
                      >
                        Envoyer une invitation
                      </button> */}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* user details */}
            <div style={{ width: "40%", marginLeft: "100px" }}>
              {userdetails && (
                <UserDetails
                  id={userid}
                  perm={props.permissions}
                  iduser2={props.id}
                />
              )}
              {show_edituser && <Edituser id={userid} />}
              {show_add_user && <AddUser />}
              {show === false && (
                <div style={{ marginTop: "60px" }}>
                  {" "}
                  <h4>Vous n'avez pas le droit d'accéder à cette page</h4>
                </div>
              )}
            </div>
          </div>
        </>
      </div>

      <div></div>
    </div>
  );
}
