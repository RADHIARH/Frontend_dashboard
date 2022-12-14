import React, { useState } from "react";
import { AddressForm, verify } from "@lob/react-address-autocomplete";
import PhoneInput from "react-phone-number-input";

const API_KEY = "YOUR API KEY HERE";

const AddressFormDemo = () => {
  const [address, setAddress] = useState({});
  const [value, setValue] = useState();

  const handleFieldChange = (payload) => {
    console.log(`${payload.event.target.id} Field Change`, payload);
    setAddress(payload.address);
  };

  const handleSelect = (selection) => {
    console.log("Address Selection", selection);
    console.log("Selection", selection.value);
    setAddress(selection.value);
    // const t = JSON.stringify(address);
    console.log("adress" + address);
  };

  const handleSubmit = () => {
    verify(API_KEY, address).then((verificationResult) => {
      console.log("Verification Results", verificationResult);
    });
  };

  return (
    <div className="demoContainer">
      <h2>Address Form</h2>
      <AddressForm
        apiKey={"test_pub_dbe729a93040e5181f0d45c470dd22c"}
        onSelection={handleSelect}
        // onFieldChange={handleFieldChange}
      />
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default AddressFormDemo;
