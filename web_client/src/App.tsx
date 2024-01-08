import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import AuthStore from "./store";
import PrivateRoute from './privateRoute';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import NotEnoughtRights from './components/NotEnoughtRights/NotEnoughtRights';
import NotEnoughtRightsAdmin from './components/NotEnoughtRights/NotEnoughtRightsAdmin';
import AlreadyAuth from './components/NotEnoughtRights/AlreadyAuth';
import LoginPage from "./components/LoginPage/LoginPage";
import EventsPage from "./components/EventsPage/EventsPage";
import StartPage from "./components/StartPage/StartPage";
import PersonalAccount from "./components/PersonalAccount/PersonalAccount";
import PrerecordingPage from "./components/PrerecordingPage/PrerecordingPage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Consoles from "./components/Consoles/Consoles";
import NavBar from './components/Navigation/NavBar';

/**
 * Дока по бутстрапу
 * По компонентам бутстраповским: https://react-bootstrap.github.io/docs/
 * По стилям: https://bootstrap5.ru/docs/getting-started/introduction
 */
const App = observer(() => {
    return (
      <>
          <BrowserRouter>
              <NavBar />
              <Routes>
                  <Route path="" element={<StartPage />} />
                  <Route path="notEnoughtRights" element={<NotEnoughtRights />} />
                  <Route path="notEnoughtRightsAdmin" element={<NotEnoughtRightsAdmin />} />
                  <Route path="alreadyAuth" element={<AlreadyAuth />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="consoles" element={<Consoles />} />

                  <Route path="prerecording" element={<PrivateRoute />} >
                        <Route path="" element={<PrerecordingPage />} />
                  </Route>
                  <Route path="login" element={<PrivateRoute isAuthorisationPage={true} />} >
                      <Route path="" element={<LoginPage />} /> 
                  </Route>
                  <Route path="registration" element={<PrivateRoute isAuthorisationPage={true} />} >
                      <Route path="" element={<RegistrationPage />} />
                  </Route>
                  <Route path="admin" element={<PrivateRoute isAdminPanel={true} />} >
                      <Route path="" element={<AdminPanel />} />
                  </Route>
                  <Route path="upcoming-events" element={<PrivateRoute />} >
                      <Route path="" element={<EventsPage />} />
                  </Route>
                  <Route path="account" element={<PrivateRoute isAccount={true} />} >
                      <Route path="" element={<PersonalAccount />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </> 
    );
});

export default App;
