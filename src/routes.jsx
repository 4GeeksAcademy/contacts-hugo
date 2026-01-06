import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Layout } from "./pages/Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/demo/:id" element={<Demo />} />
    </Route>
  )
);