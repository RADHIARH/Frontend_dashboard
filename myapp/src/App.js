import "./App.css";
import Login from "./components/Login";
import EditEmploye from "./components/EditEmploye";
import { Route, Routes } from "react-router-dom";
import AdminSpace from "./components/AdminSpace";
import ListeEmployes from "./components/ListeEmployes";
import ListeUtilisateurs from "./components/ListeUtilisateurs";
import Message from "./components/Message";
// import Adress from "./components/AddressFormDemo";
import Phone from "./components/Phone";
import Adress from "./components/Adress";
import Edituser from "./components/Edituser";
import Addpermission from "./components/Addpermission";
import Email from "./components/Email";
import EmailSend from "./components/EmailSend";
import Userprofile from "./components/Userprofile";
import Verifycode from "./components/Verifycode";


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/edit/employe/:id" element={<EditEmploye />}></Route>
        <Route path="/espace/:id" element={<AdminSpace />}></Route>
        <Route path="/liste/employes" element={<ListeEmployes />}></Route>
        <Route path="/liste/users" element={<ListeUtilisateurs />}></Route>
        <Route path="/address" element={<Adress />}></Route>
        <Route path="/phone" element={<Phone />}></Route>
        <Route path="/send/email" element={<Message />}></Route>
        <Route path="/email" element={<EmailSend />}></Route>
        <Route path="/send/email/:id" element={<Email />}></Route>
        <Route path="/verify/code/:id" element={<Verifycode />}></Route>
        <Route path="/user/profile/:id" element={<Userprofile />}></Route>
        <Route
          path="/update/user/:id_user/:iduser2"
          element={<Edituser />}
        ></Route>
        <Route
          path="/permissions/:id_user/:iduser2"
          element={<Addpermission />}
        ></Route>
        <Route
          path="/update/employe/:id_employe/:iduser2"
          element={<EditEmploye />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
