import React from 'react';
import { useState } from 'react';
const Image = () => {
    const [image, setImage] = useState({ preview: "", data: "" });
    const [status, setStatus] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append("file", image.data);
      const response = await fetch("http://localhost:5000/image", {
        method: "POST",
        body: formData,
      });
      if (response) setStatus(response.statusText);
    };

    const handleFileChange = (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setImage(img);
    };
}

export default Image;
