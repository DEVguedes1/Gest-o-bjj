import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, DollarSign, Calendar, TrendingUp, 
  Settings, LogOut, LayoutDashboard, UserPlus 
} from 'lucide-react';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [adminNome, setAdminNome] = useState('');
  const [stats, setStats] = useState({ totalAlunos: 0, ativos: 0, faturamentoTotal: 0 });

  useEffect(() => {
    const nome = localStorage.getItem('user_nome');
    if (nome) setAdminNome(nome);
    
    // Chama a função para buscar dados reais
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados reais:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>BJJ ADMIN</h2>
        <nav className="sidebar-menu">
          <div className="menu-item"><LayoutDashboard size={20} /> <span>Dashboard</span></div>
          <div className="menu-item"><Users size={20} /> <span>Alunos</span></div>
          <div className="menu-item"><UserPlus size={20} /> <span>Novas Matrículas</span></div>
          <div className="menu-item"><DollarSign size={20} /> <span>Financeiro</span></div>
          <div className="menu-item"><Settings size={20} /> <span>Configurações</span></div>
          <div className="menu-item" onClick={handleLogout} style={{marginTop: 'auto', color: '#ff4d4d'}}>
            <LogOut size={20} /> <span>Sair</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header style={{marginBottom: '30px'}}>
          <h1 style={{fontSize: '1.8rem'}}>Olá, Mestre {adminNome}</h1>
          <p style={{color: '#666'}}>Resumo extraído diretamente do banco de dados.</p>
        </header>

        <div className="header-stats">
          <div className="stat-card">
            <div className="icon-box"><Users size={28} /></div>
            <div className="stat-info">
              <h3>Total Alunos</h3>
              <p>{stats.totalAlunos}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-box"><TrendingUp size={28} /></div>
            <div className="stat-info">
              <h3>Ativos</h3>
              <p>{stats.ativos}</p>
            </div>
          </div>

          <div className="stat-card" style={{borderBottomColor: '#28a745'}}>
            <div className="icon-box" style={{background: '#e6ffec', color: '#28a745'}}><DollarSign size={28} /></div>
            <div className="stat-info">
              <h3>Faturamento</h3>
              <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.faturamentoTotal)}</p>
            </div>
          </div>

          <div className="stat-card" style={{borderBottomColor: '#ffc107'}}>
            <div className="icon-box" style={{background: '#fff9e6', color: '#ffc107'}}><Calendar size={28} /></div>
            <div className="stat-info">
              <h3>Aulas Hoje</h3>
              <p>6</p>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h2 style={{marginBottom: '20px', fontSize: '1.2rem'}}>Matrículas Recentes</h2>
          <div style={{color: '#666', textAlign: 'center', padding: '40px'}}>
            <p>Os dados acima agora são atualizados em tempo real via MySQL.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;