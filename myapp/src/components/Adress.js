import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Country, State, City } from "country-state-city";

const Adress = () => {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("");
  const [statename, setstatename] = useState("");
  const [cities, setcities] = useState([]);
  const [states, setstates] = useState([]);
  const [phone, setphone] = useState("");
  console.log("count" + JSON.stringify(Country.getAllCountries()));
  console.log("state" + JSON.stringify(State.getAllStates()));

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
  }, []);

  // const fetchstates = (country) => {
  //   const state = states.filter(
  //     (s) => s.countryCode === "ET"
  //     countries.findIndex((element) => element.name === country)
  //   );
  //   console.log("s" + states);
  //   setnewstates([...newstates, state]);
  //   console.log("state" + newstates);
  // };
  const fetch = (countrie) => {
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

  useEffect(() => {
    getcities();
    getcountry();
    getstates();
  }, []);

  return (
    <div>
      {countries && (
        <select onChange={(e) => fetch(e.target.value)}>
          <option selected hidden disabled>
            Select your country
          </option>
          {countries.map((country) => (
            <option value={country.name}>{country.name}</option>
          ))}
        </select>
      )}
      {states && (
        <select onChange={(e) => setstatename(e.target.value)}>
          <option selected hidden disabled>
            Select your state
          </option>
          {states.map((state) => (
            <option value={state.name}>{state.name}</option>
          ))}
        </select>
      )}
      <div>
        <label>Telephone:</label>
        <input defaultValue={phone} />
        <input />
      </div>

      {/* <input defaultValue={country + statename} /> */}
    </div>
  );
};

export default Adress;
