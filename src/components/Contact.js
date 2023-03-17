import axios from "axios";
import { useState } from "react";
import { useContacts } from "../hooks/contactProviderHooks";

const Contact = ({ contact }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [updating, setUpdating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const contacts = useContacts();

  const handleDeleteBtn = () => {
    setDeleting(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/1`)
      .then((res) => {
        contacts.deleteContact(
          contacts.data.filter((c) => c.id !== contact.id)
        );
        setDeleting(false);
      })
      .catch((err) => {
        console.log(err);
        setDeleting(false);
      });
  };

  const handleClick = () => {
    setUpdating(true);
  };

  const handleUpdateBtn = () => {
    setIsUpdating(true);
    axios
      .put(`https://jsonplaceholder.typicode.com/users/1`, {
        name,
        email,
        phone,
      })
      .then((res) => {
        res.data.id = contact.id;
        contacts.updateContact(
          contacts.data.map((c) => (c.id === contact.id ? res.data : c))
        );
        setIsUpdating(false);
        setUpdating(false);
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(false);
        setUpdating(false);
      });
  };

  return (
    <div className="contact">
      {updating ? (
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <p>
          <strong>Name:</strong> {contact.name}
        </p>
      )}
      {updating ? (
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <p>
          <strong>Email:</strong> {contact.email}
        </p>
      )}
      {updating ? (
        <input
          type="text"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
      )}

      <div className="actions">
        <button onClick={handleDeleteBtn}>
          {deleting ? "Deleting..." : "Delete"}
        </button>
        <button onClick={updating ? handleUpdateBtn : handleClick}>
          {isUpdating ? "Updating" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default Contact;
