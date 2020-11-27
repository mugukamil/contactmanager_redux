import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../actions/contactActions";
import TextInputGroup from "../layout/TextInputGroup";
import useInput from "../hooks/useInput";

export default function AddContact(props) {
  const dispatch = useDispatch();
  const {
    value: name,
    setValue: setName,
    reset: resetName,
    bind: bindName,
  } = useInput("");
  const {
    value: phone,
    setValue: setPhone,
    reset: resetPhone,
    bind: bindPhone,
  } = useInput("");
  const {
    value: email,
    setValue: setEmail,
    reset: resetEmail,
    bind: bindEmail,
  } = useInput("");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    // Check For Errors
    if (name === "") {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }

    if (email === "") {
      setErrors({ ...errors, email: "Email is required" });
      return;
    }

    if (phone === "") {
      setErrors({ ...errors, phone: "Phone is required" });
      return;
    }

    const newContact = {
      name,
      email,
      phone,
    };

    //// SUBMIT CONTACT ////
    dispatch(addContact(newContact));

    // Clear State
    resetName();
    resetPhone();
    resetEmail();
    setErrors({});

    props.history.push("/");
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Add Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            {...bindName}
            error={errors.name}
          />
          <TextInputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            {...bindEmail}
            error={errors.email}
          />
          <TextInputGroup
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            {...bindPhone}
            error={errors.phone}
          />
          <input
            type="submit"
            value="Add Contact"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
}
