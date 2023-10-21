import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./components/Test";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ниже пример как пользоваться.*/}
        {/* <Route path="*" element={<PageOne />} /> */}
        <Route path="*" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
