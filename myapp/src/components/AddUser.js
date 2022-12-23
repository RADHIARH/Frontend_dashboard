import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { compareAsc, format } from "date-fns";
import { useEffect } from "react";
import Moment from "react-moment";
import Adress from "./Adress";
import { Country, State, City } from "country-state-city";
export default function AddUser() {
  // states
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("");
  const [statename, setstatename] = useState("");
  const [cities, setcities] = useState([]);
  const [states, setstates] = useState([]);
  const [languagecontent, setlanguagecontent] = useState([]);
  const fulladress = country + "" + statename;
  console.log("full adress" + fulladress);

  const [phone, setphone] = useState("");
  console.log("count" + JSON.stringify(Country.getAllCountries()));
  console.log("state" + JSON.stringify(State.getAllStates()));
  // localstorage
  const id_language = localStorage.getItem("language");
  // get language content
  const getlanguage = async () => {
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
    setlanguagecontent(result[0]);
  };
  const getcountry = () => {
    const ct = Country.getAllCountries();
    setcountries(ct);
  };
  const getstates = () => {
    const st = State.getAllStates();
    setstates(st);
  };
  const getcities = () => {
    const ct = City.getAllCities();
    setcities(ct);
  };
  useEffect(() => {
    getcountry();
    getstates();
    getcities();
    getlanguage();
  }, [id_language]);
  // fetch states
  const fetchcountrie = (countrie) => {
    // const state = states.filter((element) => element.countryCode === "ET");
    // setstates(state);
    const ph = countries.find((element) => element.name === countrie);
    setphone(ph.phonecode);
    setcountry(ph.name);
    const st = states.filter((element) => element.countryCode === ph.isoCode);
    console.log("st" + st);
    setstates(st);
    console.log(ph.phonecode);
  };

  const [startDate, setStartDate] = useState(new Date());
  const newdate = format(startDate, "yyyy-MM-dd");
  console.log("date" + newdate);
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    civility: "",
    poste: "",
    birthday: "",
    phone: "",
    address: "",
    seniority: "",
    experience: "",
    comment: "",
    cin: "",
    role: 3,
  });
  // handle form changes
  const handlechange = (e) => {
    const { name, value } = e.target;
    setuser((element) => ({
      ...element,
      [name]: value,
    }));
  };
  // add a new user
  const adduser = async (e) => {
    getcountry();
    getstates();
    getcities();
    console.log("phone" + phone);
    e.preventDefault();
    await fetch("http://localhost:3001/add/user/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: phone,
        email: user.email,
        civility: user.civility,
        speciality: user.speciality,
        adress: fulladress,
        birthday: newdate,
        seniority: user.seniority,
        experience: user.experience,
        comment: user.comment,
        role: user.role,
        cin: user.cin,
        poste: user.poste,
      }),
    }).then((response) => {
      document.getElementById("alertmessage").style.visibility = "visible";
      e.target.reset();
    });
  };
  return (
    <div>
      <div className="" style={{ marginTop: "80px" }}>
        <h4>{languagecontent.text4}</h4>
        <form onSubmit={(e) => adduser(e)}>
          {/* nom */}
          <div class="form-group">
            <input
              type="text"
              class="form-control mt-3"
              placeholder={languagecontent.text15}
              name="firstname"
              onChange={handlechange}
              required="required"
            />
          </div>
          {/* prenom */}
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder={languagecontent.text16}
              name="lastname"
              onChange={handlechange}
              required="required"
            />
            {/* civilite */}
            <div class="form-group mt-3">
              <input
                type="text"
                class="form-control"
                placeholder={languagecontent.text17}
                name="civility"
                onChange={handlechange}
              />
            </div>
          </div>
          {/* adresee */}

          {/* email */}
          <div class="form-group mt-3">
            <input
              type="email"
              class="form-control"
              placeholder={languagecontent.text18}
              name="email"
              onChange={handlechange}
            />
          </div>
          {/* date de naissance */}
          <div class="form-group mt-3">
            <label>{languagecontent.col11}</label>
            <DatePicker
              placeholderText="ajouter une date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          {/* adresse */}
          <div className="mt-4">
            {countries && (
              <select onChange={(e) => fetchcountrie(e.target.value)}>
                <option selected hidden disabled>
                  {languagecontent.text5}
                </option>
                {countries.map((country) => (
                  <option value={country.name}>{country.name}</option>
                ))}
              </select>
            )}
            {states && (
              <select onChange={(e) => setstatename(e.target.value)}>
                <option selected hidden disabled>
                  {languagecontent.text6}
                </option>
                {states.map((state) => (
                  <option value={state.name}>{state.name}</option>
                ))}
              </select>
            )}
            <div></div>
            {/* phone */}
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name="phone"
              onChange={(e) => setphone(e.target.value)}
              defaultValue={phone}
              placeholder={languagecontent.text19}
            />
          </div>

          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name=" entrer votre address"
              onChange={handlechange}
              defaultValue={country + statename}
              placeholder={languagecontent.text20}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name="speciality"
              onChange={handlechange}
              placeholder={languagecontent.text21}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name="seniority"
              onChange={handlechange}
              placeholder={languagecontent.text22}
            />
          </div>

          {/* send button */}
          <div className="mt-3">
            <input
              type="submit"
              className="btn btn-primary"
              value={languagecontent.button9}
            />
          </div>
        </form>
        <div
          class="alert alert-secondary text-success  "
          id="alertmessage"
          style={{ visibility: "hidden" }}
          role="alert"
        >
          {languagecontent.text7} <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>
    </div>
  );
}
