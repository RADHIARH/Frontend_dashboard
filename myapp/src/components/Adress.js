import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Country, State, City } from "country-state-city";
const cnt = Country.getAllCountries();
console.log(cnt);
const st = State.getAllStates();
const ct = City.getAllCities();
const Adress = () => {
  const [countries, setcountries] = useState([cnt]);
  const [cities, setcities] = useState(ct);
  const [states, setstates] = useState(st);
  const [newstates, setnewstates] = useState([]);
  console.log("count" + countries);
  useEffect(() => {
    setcountries(cnt);
    setcities(ct);
    setstates(st);
  }, []);
  // const fetchstates = (country) => {
  //   const state = states.filter(
  //     (s) => s.countryCode === "ET"
  //     // countries.findIndex((element) => element.name === country)
  //   );
  //   console.log("s" + states);
  //   setnewstates([...newstates, state]);
  //   console.log("state" + newstates);
  // };
  return (
    <div>
      {countries && (
        <select>
          <option selected hidden disabled>
            Select your country
          </option>
          {countries.map((country) => (
            <option value={country.name}>{country.name}</option>
          ))}
        </select>
      )}
      {states && (
        <select>
          <option selected hidden disabled>
            Select your state
          </option>
          {states.map((state) => (
            <option value={state.name}>{state.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Adress;
