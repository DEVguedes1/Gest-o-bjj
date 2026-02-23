import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, DollarSign, Calendar, TrendingUp, 
  Settings, LogOut, LayoutDashboard, UserPlus, Menu, X
} from 'lucide-react';
import './DashboardAdmin.css';
import ListaAlunos from './ListaAlunos';
import Financeiro from './Financeiro';
import Configuracoes from './Configuracoes';

const DashboardAdmin = () => {
  const [adminNome, setAdminNome] = useState('');
  const [stats, setStats] = useState({ totalAlunos: 0, ativos: 0, faturamentoTotal: 0 });
  
  // NOVO: Estado para controlar qual tela do menu está aberta
  const [menuAtivo, setMenuAtivo] = useState('dashboard');

  const [sidebarAberta, setSidebarAberta] = useState(false);

  useEffect(() => {
    const nome = localStorage.getItem('user_nome');
    if (nome) setAdminNome(nome);
    
    // Busca os dados da tela principal
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

  const trocarAba = (aba) => {
    setMenuAtivo(aba);
    setSidebarAberta(false); // Esconde a sidebar ao clicar em uma opção
  };

  // NOVO: Função que decide qual tela renderizar na área principal
  const renderConteudoPrincipal = () => {
    switch (menuAtivo) {
      case 'dashboard':
        return (
          <>
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
          </>
        );
      case 'alunos':
        // AQUI ESTÁ A MÁGICA: Em vez de texto estático, renderizamos o arquivo completo!
        return <ListaAlunos />; 

      case 'financeiro':
        // Usa o arquivo Financeiro.jsx que você já criou
        return <Financeiro />; 
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return null;
    }
  };

return (
    <div className="admin-dashboard">
      
      {/* NOVO: Fundo escuro que aparece atrás do menu no celular */}
      {sidebarAberta && (
        <div className="sidebar-overlay" onClick={() => setSidebarAberta(false)}></div>
      )}

      {/* MODIFICADO: A sidebar recebe uma classe 'aberta' dinamicamente */}
      <aside className={`sidebar ${sidebarAberta ? 'aberta' : ''}`}>
        <div className="sidebar-header">
          <h2>BJJ ADMIN</h2>
          {/* Botão de fechar (X) dentro do menu no celular */}
          <button className="btn-fechar-menu" onClick={() => setSidebarAberta(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-menu">
          <div className={`menu-item ${menuAtivo === 'dashboard' ? 'ativo' : ''}`} onClick={() => trocarAba('dashboard')}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div className={`menu-item ${menuAtivo === 'alunos' ? 'ativo' : ''}`} onClick={() => trocarAba('alunos')}>
            <Users size={20} /> <span>Alunos</span>
          </div>
          <div className={`menu-item ${menuAtivo === 'financeiro' ? 'ativo' : ''}`} onClick={() => trocarAba('financeiro')}>
            <DollarSign size={20} /> <span>Financeiro</span>
          </div>
          <div className={`menu-item ${menuAtivo === 'configuracoes' ? 'ativo' : ''}`} onClick={() => trocarAba('configuracoes')}>
            <Settings size={20} /> <span>Configurações</span>
          </div>
          <div className="menu-item" onClick={handleLogout} style={{marginTop: 'auto', color: '#ff4d4d'}}>
            <LogOut size={20} /> <span>Sair</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        {/* NOVO: Botão de Menu Hambúrguer (Só aparece no celular) */}
        <header className="top-header-mobile">
          <button className="btn-menu-mobile" onClick={() => setSidebarAberta(true)}>
            <Menu size={28} />
          </button>
          {menuAtivo === 'dashboard' && <h1 style={{fontSize: '1.5rem', margin: 0}}>Olá, {adminNome}</h1>}
        </header>

        {renderConteudoPrincipal()}
      </main>
    </div>
  );
};

export default DashboardAdmin;