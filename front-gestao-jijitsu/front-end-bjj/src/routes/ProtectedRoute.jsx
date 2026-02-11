const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('user_role');
  const isAuth = localStorage.getItem('is_auth') === 'true';

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Se tentar acessar algo não permitido, volta para a home ou login
    return <Navigate to="/login" replace />;
  }

  return children;
};