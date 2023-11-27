import React from "react";
import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa";

export default function ClientInfo({ client }) {
  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" />
          <span className="ms-2">{client.name}</span>
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" />
          <span className="ms-2">{client.email}</span>
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" />
          <span className="ms-2">{client.phone}</span>
        </li>
      </ul>
    </>
  );
}
