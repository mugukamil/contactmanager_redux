import React, { useEffect } from "react";
import Contact from "./Contact";
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../../actions/contactActions";

export default function Contacts(props) {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1 className="display-4 mb-2">
        <span className="text-danger">Contact</span> List
      </h1>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </React.Fragment>
  );
}
