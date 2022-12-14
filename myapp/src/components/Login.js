import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // states
  const [telephone, settelephone] = useState();
  // useNavigate Hook
  const navigate = useNavigate();
  // singnIn function
  const singIn = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        telephone: telephone,
      }),
    });
  
    const data = await response.json();
    if (data) navigate(`/espace/${data.user_id}`);
  };
  return (
    <div className="col-md-4 offset-md-4" style={{ marginTop: "100px" }}>
      <h4>LOGIN PAGE</h4>
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control mt-3"
            placeholder="Entrer votre numero de telephone"
            name="telephone"
            onChange={(e) => settelephone(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={(e) => singIn(e)}>
          LOGIN
        </button>
      </form>
    </div>
  );
}
