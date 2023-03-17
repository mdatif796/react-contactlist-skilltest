import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContactsContext } from "../providers/ContactsProvider";

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const useProvideContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const addContact = (c) => {
    setContacts(c);
  };

  const deleteContact = (c) => {
    setContacts(c);
  };

  const updateContact = (c) => {
    setContacts(c);
  };

  return {
    data: contacts,
    loading,
    addContact,
    deleteContact,
    updateContact,
  };
};
