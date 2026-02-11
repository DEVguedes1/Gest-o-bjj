// front-gestao-jijitsu/front-end-bjj/src/routes/AppRoutes.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Matricula from '../pages/public/Matricula';
import Login from '../pages/public/Login';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import PerfilAluno from '../pages/aluno/PerfilAluno'; // Você precisará criar este componente

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" />;
  }
  return children;
};


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        
        {/* Nova Rota para o Painel do Aluno */}
        <Route path="/aluno/perfil" element={<PerfilAluno />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <DashboardAdmin />
            </ProtectedAdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;