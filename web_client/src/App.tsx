import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import AuthStore from "./store";
import PrivateRoute from './privateRoute';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import NotEnoughtRights from './components/NotEnoughtRights/NotEnoughtRights';
import LoginPage from "./components/LoginPage/LoginPage";
import EventsPage from "./components/EventsPage/EventsPage";
import StartPage from "./components/StartPage/StartPage";
import PersonalAccount from "./components/PersonalAccount/PersonalAccount";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Consoles from "./components/Consoles/Consoles";
/**
 * Дока по бутстрапу
 * По компонентам бутстраповским: https://react-bootstrap.github.io/docs/
 * По стилям: https://bootstrap5.ru/docs/getting-started/introduction
 */

const App = observer(() => {

  useEffect(() => {
    AuthStore.checkAuth();
 }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="login" element={<LoginPage />} /> 
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="notEnoughtRights" element={<NotEnoughtRights />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="consoles" element={<Consoles />} />

        <Route path="admin" element={<PrivateRoute />} >
            <Route path="" element={<AdminPanel />} />
        </Route>
        <Route path="upcoming-events" element={<PrivateRoute />} >
            <Route path="" element={<EventsPage />} />
        </Route>
        <Route path="account" element={<PrivateRoute />} >
            <Route path="" element={<PersonalAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;
