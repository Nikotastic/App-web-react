import Dashboard from './Components/Dashboard';
import Navegation from './Components/Navegation';


export function App() {
  return (
    <div className="layout flex h-[100vh]">
      <aside className="sidebar w-[220px] bg-black text-white p-8 rounded-r-[20px]">
        <Navegation/>
      </aside>

      <main className="main-content flex flex-1 flex-col items-center pt-8 text-white text-shadow-default " >
        <header className="header m-[0] text-4xl">
          <h1>Gestión de Finanzas</h1>
        </header>

        <main>
           <Dashboard></Dashboard>
        </main>
        
      </main>
    </div>
  );
}
