import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Receipt, LogOut } from 'lucide-react';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div className="mb-10 text-xl font-black tracking-tighter uppercase">
          BC <span className="text-red-600">Admin</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link to="/admin/financeiro" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition text-gray-400 hover:text-white">
            <Receipt size={20} /> Financeiro
          </Link>
          <Link to="/admin/alunos" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition text-gray-400 hover:text-white">
            <Users size={20} /> Alunos
          </Link>
          <Link to="/admin" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition text-gray-400 hover:text-white">
            <LayoutDashboard size={20} /> Resumo
          </Link>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition font-bold"
        >
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Área de Conteúdo Dinâmico */}
      <main className="flex-grow p-10">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardAdmin;