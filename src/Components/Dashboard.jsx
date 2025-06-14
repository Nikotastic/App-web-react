import React from "react";
import { CircleDollarSign, HandCoins, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const movimientos = [
  { fecha: "2025-06-10", descripcion: "Sueldo", tipo: "Ingreso", monto: 1200 },
  { fecha: "2025-06-11", descripcion: "Supermercado", tipo: "Gasto", monto: -250 },
  { fecha: "2025-06-12", descripcion: "Transporte", tipo: "Gasto", monto: -50 },
  { fecha: "2025-06-12", descripcion: "Venta online", tipo: "Ingreso", monto: 200 },
  { fecha: "2025-06-13", descripcion: "Cine", tipo: "Gasto", monto: -100 },
  { fecha: "2025-06-13", descripcion: "Freelance", tipo: "Ingreso", monto: 400 },
];

const resumenPorDia = movimientos.reduce((acc, mov) => {
  const dia = mov.fecha;
  if (!acc[dia]) acc[dia] = { fecha: dia, Ingresos: 0, Gastos: 0 };
  if (mov.monto > 0) acc[dia].Ingresos += mov.monto;
  else acc[dia].Gastos += Math.abs(mov.monto);
  return acc;
}, {});
const dataGrafico = Object.values(resumenPorDia);

const totalIngresos = movimientos.filter(m => m.monto > 0).reduce((a, b) => a + b.monto, 0);
const totalGastos = movimientos.filter(m => m.monto < 0).reduce((a, b) => a + Math.abs(b.monto), 0);
const saldo = totalIngresos - totalGastos;

const pieData = [
  { name: "Ingresos", value: totalIngresos },
  { name: "Gastos", value: totalGastos },
];
const COLORS = ["#34d399", "#f87171"];

export default function Dashboard() {
  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-6 text-white">Dashboard de Finanzas Personales</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#222f3e] rounded-xl p-6 flex items-center gap-4 shadow">
          <TrendingUp className="w-10 h-10 text-green-400" />
          <div>
            <p className="text-gray-300">Saldo actual</p>
            <p className="text-2xl font-semibold text-white">${saldo}</p>
          </div>
        </div>
        <div className="bg-[#222f3e] rounded-xl p-6 flex items-center gap-4 shadow">
          <CircleDollarSign className="w-10 h-10 text-blue-400" />
          <div>
            <p className="text-gray-300">Ingresos</p>
            <p className="text-2xl font-semibold text-white">${totalIngresos}</p>
          </div>
        </div>
        <div className="bg-[#222f3e] rounded-xl p-6 flex items-center gap-4 shadow">
          <HandCoins className="w-10 h-10 text-red-400" />
          <div>
            <p className="text-gray-300">Gastos</p>
            <p className="text-2xl font-semibold text-white">${totalGastos}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#222f3e] rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-white mb-4">Ingresos vs Gastos (Pie)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#222f3e] rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-white mb-4">Movimientos por día (Barra)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ingresos" fill="#34d399" />
              <Bar dataKey="Gastos" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#222f3e] rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-white mb-4">Movimientos recientes</h2>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr>
              <th className="pb-2">Fecha</th>
              <th className="pb-2">Descripción</th>
              <th className="pb-2">Tipo</th>
              <th className="pb-2">Monto</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov, idx) => (
              <tr key={idx} className="border-b border-gray-700 last:border-b-0">
                <td className="py-2">{mov.fecha}</td>
                <td className="py-2">{mov.descripcion}</td>
                <td className="py-2">{mov.tipo}</td>
                <td className={`py-2 ${mov.monto < 0 ? "text-red-400" : "text-green-400"}`}>
                  ${Math.abs(mov.monto)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}