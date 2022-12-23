import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const FileUpload = (props) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [languagecontent, setlanguagecontent] = useState([]);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        `http://localhost:3001/upload/${props.id}`,
        formData
      );

      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
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
  // use effect
  useEffect(() => {
    getlanguage();
  }, []);
  return (
    <div>
      <div className="card col-md-4 offset-md-4" style={{ marginTop: "100px" }}>
        <div className="card-header">
          <h4>{languagecontent.text11}</h4>
        </div>
        <div className="card-body">
          <input type="file" onChange={saveFile} />
          <button className="btn btn-primary" onClick={uploadFile}>
            {languagecontent.button9}
          </button>
        </div>
      </div>
      {/* <img alt="" src="/imgs/image.jpg"></img> */}
    </div>
  );
};

export default FileUpload;
