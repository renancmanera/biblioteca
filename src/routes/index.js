import { Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Emprestimos from "../pages/Emprestimos";
import Private from "./Private";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import New from "../pages/New";

function RoutesApp() {
  return (
    <Routes>
      <Route path="biblioteca/" element={<SignIn/>} />
      <Route path="/" element={<SignIn/>} />
      <Route path="/cadastrar" element={<SignUp/>} />
      
      <Route path="/emprestimos" element={<Private><Emprestimos/></Private>} />
      <Route path="/perfil" element={<Private><Profile/></Private>} />
      <Route path="/clientes" element={<Private><Customers/></Private>} />
      <Route path="/novo" element={<Private><New/></Private>} />
      <Route path="/novo/:id" element={<Private><New/></Private>} />

      
      <Route path="*" element={<h1>Página não encontrada. 404</h1>} />
    </Routes>
  );
}

export default RoutesApp;