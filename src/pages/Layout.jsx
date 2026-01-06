import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import contactService from "../services/ContactService";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Layout = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    async function getContacts() {
      try {
        const data = await contactService.getAllContacts();
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
      } catch (err) {
        console.error(err);
      }
    }

    getContacts();
  }, [dispatch]);

  return (
    <ScrollToTop>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </ScrollToTop>
  );
};
