import React, { useEffect, useState } from 'react';
import { Award, CheckCircle, Clock, User, LogOut } from 'lucide-react';
import './PerfilAluno.css';

const PerfilAluno = () => {
  const [nomeAluno, setNomeAluno] = useState('');

  useEffect(() => {
    // Busca o nome salvo no login de forma segura
    const nome = localStorage.getItem('user_nome');
    if (nome) {
      setNomeAluno(nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Enquanto o nome não é carregado, exibe um estado simples para evitar tela branca
  if (!nomeAluno) {
    return <div style={{ padding: '20px', color: 'black' }}>Carregando perfil...</div>;
  }

  return (
    <div className="perfil-aluno-container">
      <div className="perfil-hero">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
        <Award size={50} color="#d4af37" style={{ margin: '0 auto' }} />
        <h1>{nomeAluno}</h1>
        <p>Faixa Azul | Equipe Bruno Caetano BJJ</p>
      </div>

      <div className="info-cards-aluno">
        <div className="card-atleta">
          <h4>Status</h4>
          <p style={{ color: '#28a745', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <CheckCircle size={16} /> Ativo
          </p>
        </div>
        <div className="card-atleta">
          <h4>Frequência</h4>
          <p>88%</p>
        </div>
        <div className="card-atleta">
          <h4>Próximo Treino</h4>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <Clock size={16} /> 19:00
          </p>
        </div>
      </div>

      <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
          <User size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> 
          Dados da Matrícula
        </h3>
        <p><strong>Plano:</strong> Mensal Ilimitado</p>
        <p><strong>Vencimento:</strong> Dia 10</p>
        <p><strong>Unidade:</strong> Matriz</p>
      </div>
    </div>
  );
};

export default PerfilAluno;