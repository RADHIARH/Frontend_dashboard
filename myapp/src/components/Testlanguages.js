import React from "react";
import { useTranslation } from "react-i18next";

import { useState } from "react";
const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "ar", text: "Arabic" },
  { value: "bn", text: "Bengali" },
];
export default function Testlanguages() {
  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation();
  const [lang, setLang] = useState("en");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:3000/";
    window.location.replace(loc + "?lng=" + e.target.value);
  };
  return (
    <div>
      <h1>{t("welcome")}</h1>
      <label>{t("choose")}</label>
      <select value={lang} onChange={handleChange}>
        {languages.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}
