import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import "./Components/Navegation";
import "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ingresos from "./Pages/Ingresos";
import Gastos from "./Pages/Gastos";
import CorregirMovimientos from "./Utils/CorregirMovimientos";
import Presupuesto from "./Pages/Presupuesto";
import Reportes from "./Pages/Reportes";
import Inversiones from "./Pages/Inversiones";
import Configuracion from "./Pages/Configuracion";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ingresos" element={<Ingresos />} />
      <Route path="/corregir" element={<CorregirMovimientos />} />
      <Route path="/gastos" element={<Gastos />} />
      <Route path="/presupuesto" element={<Presupuesto />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/inversiones" element={<Inversiones />} />
      <Route path="/configuracion" element={<Configuracion />} />
    </Routes>
  </BrowserRouter>
);
