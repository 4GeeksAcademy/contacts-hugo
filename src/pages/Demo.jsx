import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import contactService from "../services/ContactService";
import ContactForm from "../components/ContactForm";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) return;

    if (!store.contacts || store.contacts.length === 0) return;

    const existing = store.contacts.find(
      (c) => String(c.id) === String(id)
    );

    if (!existing) return;

    setName(existing.name || "");
    setPhone(existing.phone || "");
    setEmail(existing.email || "");
    setAddress(existing.address || "");
  }, [id, isEditMode, store.contacts]);

  const handleSubmit = async () => {
    const payload = {name, phone, email, address, };

    try {
      if (isEditMode) {
        await contactService.updateContact(id, payload);
      } else {
        await contactService.createContact(payload);
      }

      const data = await contactService.getAllContacts();
      dispatch({
        type: "SET_CONTACTS",
        payload: data.contacts.slice().reverse(),
      });

      navigate("/");
    } catch (err) {
      console.error("Error en create/update o getAllContacts:", err);
      alert("Error guardando el contacto");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        {isEditMode ? "Edit Contact" : "Add New Contact"}
      </h1>

      <ContactForm
        name={name}
        email={email}
        phone={phone}
        address={address}
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
        setAddress={setAddress}
        onSubmit={handleSubmit}
        buttonText={isEditMode ? "Save changes" : "Add contact"}
      />

      <br />

      <Link to="/" className="btn btn-secondary">
        Back home
      </Link>
    </div>
  );
};
