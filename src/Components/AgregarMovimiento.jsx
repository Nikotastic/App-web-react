import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Timestamp } from "firebase/firestore";

const CATEGORIAS = ["Comida", "Transporte", "Hogar", "Educación", "Ocio"];

const AgregarMovimiento = () => {
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("Ingreso");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("Comida");

  const guardarMovimiento = async () => {
    try {
      await addDoc(collection(db, "movimientos"), {
        descripcion,
        tipo,
        monto: parseFloat(monto),
        fecha: Timestamp.fromDate(new Date()),
        categoria: tipo === "Gasto" ? categoria : null, // Solo aplica para gastos
      });
      console.log("Movimiento guardado");
      setDescripcion("");
      setMonto("");
    } catch (e) {
      console.error("Error al guardar: ", e);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Agregar Movimiento</h2>
      <input
        className="w-full p-2 mb-2 rounded bg-gray-700"
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <select
        className="w-full p-2 mb-2 rounded bg-gray-700"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="Ingreso">Ingreso</option>
        <option value="Gasto">Gasto</option>
      </select>

      {tipo === "Gasto" && (
        <select
          className="w-full p-2 mb-2 rounded bg-gray-700"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {CATEGORIAS.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      )}

      <input
        className="w-full p-2 mb-2 rounded bg-gray-700"
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <button
        onClick={guardarMovimiento}
        className="w-full p-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Guardar
      </button>
    </div>
  );
};

export default AgregarMovimiento;
