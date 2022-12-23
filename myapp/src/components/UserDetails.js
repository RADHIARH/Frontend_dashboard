import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import Addpermission from "./Addpermission";
import { Modal, Button } from "react-bootstrap";
import { compareAsc, format } from "date-fns";
import Popup from "./Popup";
const UserDetails = (props) => {
  const [data, setdata] = useState([]);
  const [isShow, invokeModal] = useState(false);
  const [today, settoday] = useState(new Date());
  const newdate = format(today, "yyyy-MM-dd");
  console.log("date" + newdate);
  console.log("props id" + props.id);
  // local storage
  const id_language = localStorage.getItem("language");
//define states 
  const [show_userdetails, setshow_userdetails] = useState(true);
  const [show_userpermissions, setshow_userpermissions] = useState(false);
  const [languagecontent, setlanguagecontent] = useState([]);
  const [userid, setuserid] = useState("");
  const [show, setshow] = useState();
  const [pop, setpop] = useState(false);
  const [invits, setinvits] = useState([]);
 
  // generate code
  const min = Math.ceil(1000);
  const max = Math.floor(2000);
  const code = Math.floor(Math.random() * (max - min) + min);
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
  };
  // get selected language content
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
    setlanguagecontent(result[0]);
    console.log("languagecont" + result);
  };
  useEffect(() => {
    getdata();
    getlanguage();
    invitations();
    console.log("userrr" + data.user_id);
  }, [props.language]);
  // show user permisions component
  const userpermissions = (e, id) => {
    e.preventDefault();
    const per = props.perm.find(
      (element) =>
        element.id_permission === 9 &&
        element.id_user === props.iduser2 &&
        element.user_permission_value === 1
    );
    per !== undefined && setshow_userpermissions(true);
    per === undefined && setshow(false);
    setshow_userdetails(false);
    setuserid(id);
  };
  // pop up

  const initModal = () => {
    return invokeModal(!false);
  };
  // send email
  const sendemail = async (e) => {
    e.preventDefault();
    console.log(props.id);
    console.log(data.user_email);
    console.log(code);
    await fetch("http://localhost:3001/send/email/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.user_email,
        code: code,
        url: `http://localhost:3000/verify/code/${props.id}`,
        id: props.id,
        datesend: newdate,
      }),
    }).then((response) => {
      invokeModal(false);
      alert("email envoyé");
    });
    await fetch("http://localhost:3001/edit/password/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        id: props.id,
      }),
    });
  };
  // send whats app
  const sendwhatsapp = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/send/whatssapp/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        url: `http://localhost:3000/verify/code/${props.id}`,
        tel: data.user_phone,
        id: props.id,
      }),
    }).then((response) => {
      invokeModal(false);
      alert("message envoyé");
    });
  };
  // get invitations
  const invitations = async () => {
    await fetch("http://localhost:3001/invitations/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setinvits(response);
      });
  };

  return (
    <div style={{ marginTop: "80px" }}>
      {show_userdetails && (
        <>
          {/* nom */}
          <div class="form-group">
            <label for="inputEmail4">{languagecontent.col1} </label>
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Entrer votre nom"
              name="user_firstname"
              defaultValue={data.user_firstname}
            />
          </div>
          {/* prenom */}
          <div class="form-group mt-3">
            <label for="inputEmail4">{languagecontent.col2} </label>
            <input
              type="text"
              class="form-control"
              placeholder="Entrer votre prenom"
              name="user_lastname"
              defaultValue={data.user_lastname}
            />
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col11} </label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre prenom"
                name="user_lastname"
                defaultValue={data.user_birthday}
              />
              {/* civilite */}
              <div class="form-group mt-3">
                <label for="inputEmail4">{languagecontent.col12} </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrer votre civilité"
                  name="user_civility"
                  defaultValue={data.civility}
                />
              </div>
            </div>
            {/* email */}
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col4} </label>
              <input
                type="email"
                class="form-control"
                placeholder="Entrer votre email"
                name="user_email"
                defaultValue={data.user_email}
              />
            </div>
            {/* telephone */}
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col3} </label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre telephone"
                name="user_phone"
                defaultValue={data.user_phone}
              />
            </div>
            {/* userspecialite */}
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col4}</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                value={data.user_speciality}
                name="user_speciality"
              />
            </div>

            <div class="form-group cmt-3 ">
              <label for="inputEmail4">{languagecontent.col5}</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                Defaultvalue={data.user_adress}
                name="user_adress"
              />
            </div>
            {/* user ancienneté */}
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col7}</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                Defaultvalue={data.user_seniority}
              />
            </div>
            {/* user cin */}
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col8}</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                Defaultvalue={data.cin}
                name="cin"
              />
            </div>
            {/* user poste */}
            <div class="form-group mt-3">
              <label for="inputEmail4">{languagecontent.col9}</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                Defaultvalue={data.user_poste}
                name="poste"
              />
            </div>
            <div>
              <div className="d-flex">
                <div style={{ marginTop: "20px", marginLeft: "10px" }}></div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "200px",
              marginBottom: "20px",
            }}
          >
            <button
              className="btn  btn-primary m-3"
              style={{ height: "30%" }}
              onClick={(e) => userpermissions(e, data.user_id)}
            >
              {languagecontent.button7}
            </button>
            {}
            {invits.find((element) => element.id_user === data.user_id) ? (
              <div style={{ marginTop: "20px", width: "200px" }}>
                <h5>
                  {languagecontent.text8}{" "}
                  {invits
                    .filter((element) => element.id_user === data.user_id)
                    .map((el) => {
                      return el.datesend;
                    })}
                </h5>
              </div>
            ) : (
              <>
                <Button
                  variant="btn btn-primary m-3"
                  onClick={initModal}
                  style={{ height: "50%" }}
                >
                  {languagecontent.button8}
                </Button>
                <Modal show={isShow}>
                  <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>{languagecontent.text2}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{languagecontent.text3}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={(e) => sendemail(e)}>
                      Email
                    </Button>
                    <Button variant="dark" onClick={(e) => sendwhatsapp(e)}>
                      Whatsapp
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </div>
        </>
      )}
      {show_userpermissions && (
        <Addpermission id={userid} language={props.language} />
      )}
      {show === false && (
        <div style={{ marginTop: "60px" }}>
          {" "}
          <h4>{languagecontent.text1}</h4>
        </div>
      )}
      <div class="modal" tabindex="-1" role="dialog"></div>
      {pop && <Popup />}
    </div>
  );
};

export default UserDetails;
