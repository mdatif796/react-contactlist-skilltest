import React, { useState } from "react";
import "../styles/contact.css";
import Contact from "./Contact";
import { useContacts } from "../hooks/contactProviderHooks";
import axios from "axios";

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const contacts = useContacts();

  const handleAddBtn = () => {
    setIsAdding(true);
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name,
        email,
        phone,
      })
      .then((res) => {
        res.data.id = contacts.data.length + 1;
        contacts.addContact([res.data, ...contacts.data]);
        setIsAdding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsAdding(false);
      });
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="app">
      <h1>Contact App</h1>
      <div className="form-container">
        <h2>Add Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddBtn}>
          {isAdding ? "Adding Contact..." : "Add Contact"}
        </button>
      </div>
      <div className="contacts-container">
        <h2>Contacts</h2>
        {contacts.data.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default Contacts;
