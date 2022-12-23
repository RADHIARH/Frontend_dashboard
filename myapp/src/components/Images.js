import { getDate } from "date-fns";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../index.css";
const Images = (props) => {
  const [data, setdata] = useState([]);
  const [languagecontent, setlanguagecontent] = useState([]);
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/images/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setdata(result);
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
    setlanguagecontent(result[0]);
    console.log("languagecont" + result);
    // console.log("languagecont" + result);
  };
  useEffect(() => {
    getdata();
    getlanguage();
  }, [props.language]);
  return (
    <div className="row">
      <div style={{ marginTop: "20px", marginBottom: "40px" }}>
        <h4>{languagecontent.text12}</h4>
      </div>
      {data.map((element) => {
        return (
          <div className="col-md-2 image mt-3">
            <img
              alt=""
              src={`/imgs/${element.img_name}`}
              style={{ width: "200px", height: "250px" }}
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default Images;
