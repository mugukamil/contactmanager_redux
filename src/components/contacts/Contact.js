import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../actions/contactActions";
import { useState } from "react";

export default function Contact(props) {
  const dispatch = useDispatch();
  const [showContactInfo, setContactInfo] = useState(false);
  const { name, email, id, phone } = props.contact;

  return (
    <div className="card card-body mb-3">
      <h4>
        {name}{" "}
        <i
          onClick={() => setContactInfo(!showContactInfo)}
          className="fas fa-sort-down"
          style={{ cursor: "pointer" }}
        />
        <i
          className="fas fa-times"
          style={{ cursor: "pointer", float: "right", color: "red" }}
          onClick={() => dispatch(deleteContact(id))}
        />
        <Link to={`contact/edit/${id}`}>
          <i
            className="fas fa-pencil-alt"
            style={{
              cursor: "pointer",
              float: "right",
              color: "black",
              marginRight: "1rem",
            }}
          />
        </Link>
      </h4>
      {showContactInfo ? (
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      ) : null}
    </div>
  );
}
