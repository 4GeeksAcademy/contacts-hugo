import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import contactService from "../services/ContactService";

export const Contact = () => {
  const { theId } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContact() {
      try {
        if (store.contacts && store.contacts.length > 0) {
          const found = store.contacts.find((c) => c.id === theId);
          if (found) {
            setContact(found);
            setLoading(false);
            return;
          }
        }

        const data = await contactService.getAllContacts();
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });

        const found = data.contacts.find((c) => c.id === theId);
        if (!found) {
          setError("Contacto no encontrado");
        } else {
          setContact(found);
        }
      } catch (err) {
        console.error(err);
        setError("Error cargando el contacto");
      } finally {
        setLoading(false);
      }
    }
    loadContact();
  }, [store.contacts, theId, dispatch]);

    async function deleteContact() {
    if (!confirm("¿Estás seguro que quieres eliminar este contacto?")) return;

    try {
      await contactService.deleteContact(theId);

      const data = await contactService.getAllContacts();
      dispatch({type: "SET_CONTACTS", payload: data.contacts.slice().reverse(),});

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el contacto");
    }
  };

  if (loading) return <p className="container mt-5">Cargando...</p>;
  if (error) return <p className="container mt-5 text-danger">{error}</p>;
  if (!contact) return <p className="container mt-5">Contacto no encontrado.</p>;

  return (
    <div className="container mt-5">
      <h2>{contact.name}</h2>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Address:</strong> {contact.address}</p>

      <div className="d-flex gap-2 mt-3">
        <Link to={`/demo/${contact.id}`} className="btn btn-secondary">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={deleteContact}>
          Delete
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back home
        </button>
      </div>
    </div>
  );
};

