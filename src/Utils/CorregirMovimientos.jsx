import React from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export default function CorregirMovimientos() {
  const corregir = async () => {
    const movimientosRef = collection(db, "movimientos");
    const snapshot = await getDocs(movimientosRef);

    let corregidos = 0;

    for (const documento of snapshot.docs) {
      const data = documento.data();

      // Si el campo "tipo" no existe o está vacío
      if (!data.tipo) {
        await updateDoc(doc(db, "movimientos", documento.id), {
          tipo: "Ingreso",
        });
        corregidos++;
        console.log(`✔ Tipo corregido para: ${documento.id}`);
      }
    }

    alert(`Se corrigieron ${corregidos} documentos sin tipo.`);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-white mb-4">Corregir movimientos sin tipo</h2>
      <button
        onClick={corregir}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Corregir ahora
      </button>
    </div>
  );
}
