import React from "react";
import { useState } from "react";
const FileLoad = () => {
  const [data, setdata] = useState("");
  console.log(data.name);
  return (
    <div>
      <input type="file" onChange={(e) => setdata(e.target.files[0])}></input>
    </div>
  );
};

export default FileLoad;
