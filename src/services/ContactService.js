const USERNAME = "hugo";
const BASE_URL = "https://playground.4geeks.com/contact/agendas";

async function getAllContacts() {
  const response = await fetch(`${BASE_URL}/${USERNAME}`);

  if (!response.ok) {
    const data = await createUser();
    return data;
  }

  const data = await response.json();
  return data;
}

async function createUser() {
  const response = await fetch(`${BASE_URL}/${USERNAME}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug: USERNAME }),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la agenda");
  }

  console.log("Agenda creada para", USERNAME);

  const data = await getAllContacts();
  return data;
}

async function createContact(contact) {
  const body = {...contact, agenda_slug: USERNAME, };

  const response = await fetch(`${BASE_URL}/${USERNAME}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el contacto");
  }

  const data = await response.json();
  return data;
}

async function updateContact(id, contact) {
  const body = { ...contact, agenda_slug: USERNAME, };

  const response = await fetch(`${BASE_URL}/${USERNAME}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el contacto");
  }

  const data = await response.json();
  return data;
}

async function deleteContact(id) {
  const response = await fetch(`${BASE_URL}/${USERNAME}/contacts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el contacto");
  }

  return true;
}

async function getContact(id) {
  const response = await fetch(`${BASE_URL}/${USERNAME}/contacts/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el contacto");
  }

  const data = await response.json();
  return data;
}

const contactService = {
  getAllContacts,
  createUser,
  createContact,
  updateContact,
  deleteContact,
  getContact,
};

export default contactService;
