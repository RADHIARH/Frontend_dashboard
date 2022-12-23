import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
export default function Popup() {
  const [isShow, invokeModal] = useState(false);
  const [email, setemail] = useState(false);
  const [whatsapp, setwhatsapp] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  const sendemail = async(e) => {
    // e.preventDefault();
    // await fetch("http://localhost:3001/send/email/", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     code: code,
    //     url: `http://localhost:3000/verify/code/${id}`,
    //     id: id,
    //   }),
    // }).then((response) => {
    //   alert("email envoyé");
    // });
  };
  const sendwhatasapp = () => {
    setwhatsapp(true);
  };
  return (
    <>
      <Button variant="success" onClick={initModal}>
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Envoyer une invitation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous voulez envoyer une invitation par</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={e=>sendemail(e)}>
            Email
          </Button>
          <Button variant="dark" onClick={sendwhatasapp}>
            Whatsapp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
