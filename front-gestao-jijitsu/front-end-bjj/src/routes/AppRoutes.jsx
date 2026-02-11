import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/public/Home';
import Matricula from '../pages/public/Matricula';
import Login from '../pages/public/Login';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import PerfilAluno from '../pages/student/PerfilAluno';

// Componente de Proteção de Rota
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('user_role');
  const isAuth = localStorage.getItem('is_auth') === 'true';

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas - O segredo está aqui */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/aluno/perfil" 
          element={
            <ProtectedRoute allowedRole="ALUNO">
              <PerfilAluno />
            </ProtectedRoute>
          } 
        />

        {/* Rota de "Escape": Se digitar qualquer coisa errada, volta pro login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;