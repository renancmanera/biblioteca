import RoutesApp from "./routes";
import { HashRouter } from "react-router-dom";

import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <HashRouter>
    <AuthProvider>
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </AuthProvider>
  </HashRouter>

  );
}


export default App;
