export const initialStore = () => {
  return {
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...store, contacts: action.payload }

    case 'CREATE_CONTACT':
      return { ...store, contacts: [action.payload, ...store.contacts] }

    case 'EDIT_CONTACT': {
      const updatedContacts = store.contacts.map(contact =>
        contact.id === action.payload.id ? { ...contact, ...action.payload } : contact
      );
      return { ...store, contacts: updatedContacts }
    }

    default:
      throw Error('Unknown action.');
  }
}
