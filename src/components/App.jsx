import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import initialcContacts from "../initialContacts.json";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
  selectContacts,
} from "../redux/contactsSlice";

function App() {
  const [filter, setFilter] = useState("");
  // const [contacts, setContacts] = useState(() => {
  //   const stringifiedContacts = localStorage.getItem("contacts");
  //   if (!stringifiedContacts) {
  //     return initialcContacts;
  //   } else {
  //     return JSON.parse(stringifiedContacts);
  //   }
  // });
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  });
  function onAddContact(formContact) {
    const finalFormContact = {
      id: nanoid(),
      ...formContact,
    };

    dispatch(addContact(finalFormContact));
  }
  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };


  function onFilter(evt) {
    // terContac - функція екшн креатор
    // const action =  filterContact(evt.target.value);
    dispatch();
  }

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <SearchBox filter={filter} onFilter={onFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}

export default App;
