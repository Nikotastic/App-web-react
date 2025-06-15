import Dashboard from "./Components/Dashboard";
import Navegation from "./Components/Navegation";


/*   import ListaMovimientos from "./Components/ListaMovimientos"; */


export function App() {
  return (
    <div className="layout flex h-[100vh]">
      <aside className="sidebar sticky top-0 h-screen w-[220px] bg-black text-white p-8 rounded-r-[20px] shadow-lg z-20 transition-all duration-300">
        <Navegation />
      </aside>

      <main id="dashboard" className="main-content flex flex-1 flex-col items-center pt-8 text-white text-shadow-default overflow-x-hidden">
        <header className="header mt-4 mb-6 text-4xl font-bold text-center">
          <h1>Gestión de Finanzas</h1>
        </header>

        <section className="w-full max-w-[1200px] animate-fade-in">
          <Dashboard />
          <div className="flex justify-center items-center mt-10">
          </div>
        </section>
      </main>
    </div>
  );
}
