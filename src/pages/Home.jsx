import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import contactService from "../services/ContactService";
import ContactCard from "../components/ContactCard";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const deleteContact = async (id) => {
    if (!confirm("¿Eliminar contacto?")) return;

    await contactService.deleteContact(id);

    const data = await contactService.getAllContacts();
    dispatch({ type: "SET_CONTACTS", payload: data.contacts.slice().reverse() });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h1>Contact list</h1>
        <Link to="/demo" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      {store.contacts?.map((c) => (
        <ContactCard key={c.id} contact={c} onDelete={deleteContact} />
      ))}
    </div>
  );
};
