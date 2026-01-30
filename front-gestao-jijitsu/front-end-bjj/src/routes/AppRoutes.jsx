import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx';
import Financeiro from '../pages/admin/Financeiro';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/matricula" element={<Matricula />} />

      {/* Privado - Moderador */}
      <Route path="/admin" element={<DashboardAdmin />}>
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="alunos" element={<ListaAlunos />} />
      </Route>
    </Routes>
  );
};