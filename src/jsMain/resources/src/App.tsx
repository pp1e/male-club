import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./components/Test";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Route path="*" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
