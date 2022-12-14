import { useEffect, useState } from "react";
import Axios from "axios";
export default function AdressForm() {
  let [countries, setCountries] = useState([]);
  let [singleCountry, setSingleCountry] = useState("");
  let [Cities, setCities] = useState([]);
  let [singleCity, setSingleCity] = useState("");

  const fetchCountries = async () => {
    let country = await Axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    console.log(country);

    setCountries(country.data.data);
  };
  const fetchCities = (country) => {
    const Cities = countries.find((c) => c.country === country);
    setCities(Cities.cities);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Country and It's Cities</h1>
      </div>
      <div>
        {countries && (
          <select onChange={(e) => fetchCities(e.target.value)}>
            <option selected hidden disabled>
              Select your country
            </option>
            {countries.map((country) => (
              <option key={`${country.country}`} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        )}

        {Cities && (
          <select>
            <option selected hidden disabled>
              Select your city
            </option>
            {Cities.map((city) => (
              <option key={`${city}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
}
