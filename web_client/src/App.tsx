import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./components/Test";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Consoles from "./components/Consoles/Consoles";
/**
 * Дока по бутстрапу
 * По компонентам бутстраповским: https://react-bootstrap.github.io/docs/
 * По стилям: https://bootstrap5.ru/docs/getting-started/introduction
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ниже пример как пользоваться.*/}
        {/* <Route path="*" element={<PageOne />} /> */}
        <Route path="admin" element={<AdminPanel />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="consoles" element={<Consoles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
