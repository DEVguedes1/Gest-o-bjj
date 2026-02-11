import { useState } from 'react';
import axios from 'axios';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ login: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
    const user = response.data;

    // É fundamental salvar exatamente o que o ProtectedRoute espera
    localStorage.setItem('user_role', user.role);
    localStorage.setItem('user_nome', user.nome);
    localStorage.setItem('is_auth', 'true'); // Flag extra para segurança

    // Redirecionamento imediato após salvar
    if (user.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/aluno/perfil');
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao realizar login. Verifique suas credenciais.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-placeholder">BC</div>
          <h1>Acesso Restrito</h1>
          <p>Gestão de Treinos Bruno Caetano BJJ</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label><User size={18} /> Usuário</label>
            <input 
              type="text" 
              placeholder="Digite seu login"
              required
              onChange={(e) => setCredentials({...credentials, login: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label><Lock size={18} /> Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              onChange={(e) => setCredentials({...credentials, senha: e.target.value})}
            />
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Autenticando...' : <><LogIn size={20} /> Entrar</>}
          </button>
        </form>

        <div className="login-footer">
          <p>Esqueceu a senha? Entre em contato com o suporte.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;