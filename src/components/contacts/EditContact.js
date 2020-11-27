import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";
import useInput from "../hooks/useInput";
import TextInputGroup from "../layout/TextInputGroup";

export default function EditContact(props) {
  const contact = useSelector((state) => state.contact.contact);
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

  // UNSAFE_componentWillReceiveProps(nextProps, nextState) {
  //   const { name, email, phone } = nextProps.contact;
  //   this.setState({
  //     name,
  //     email,
  //     phone,
  //   });
  // }

  useEffect(() => {
    dispatch(getContact(props.match.params.id));
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
  }, [
    dispatch,
    props.match.params.id,
    setEmail,
    setName,
    setPhone,
    contact.name,
    contact.phone,
    contact.email,
  ]);

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

    const { id } = props.match.params;

    const updContact = {
      id,
      name,
      email,
      phone,
    };

    //// UPDATE CONTACT ////
    dispatch(updateContact(updContact));

    // Clear State
    resetName();
    resetPhone();
    resetEmail();
    setErrors({});
    props.history.push("/");
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Edit Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            error={errors.name}
            {...bindName}
          />
          <TextInputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            error={errors.email}
            {...bindEmail}
          />
          <TextInputGroup
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            error={errors.phone}
            {...bindPhone}
          />
          <input
            type="submit"
            value="Update Contact"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
}
