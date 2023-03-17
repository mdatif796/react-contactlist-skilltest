import { createContext } from "react";
import { useProvideContacts } from "../hooks/contactProviderHooks";

const initialState = {
  contacts: [],
  loading: true,
  addContact: () => {},
  deleteContact: () => {},
  updateContact: () => {},
};

export const ContactsContext = createContext(initialState);

export const ContactsProvider = ({ children }) => {
  const contacts = useProvideContacts();

  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  );
};
