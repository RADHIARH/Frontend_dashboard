import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
const Validate = () => {
    const [user, setuser] = useState([]);
    // get one user
      const getdata = async () => {
        const response = await fetch(`http://localhost:3001/users/${id_user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        
      };
    return (
        <div>
            
        </div>
    );
}

export default Validate;
