import React, { useState } from 'react';
import { Save, Plus, Trash, Edit3 } from 'lucide-react';
import './DashboardAdmin.css';

const Configuracoes = () => {
  // Estado para Dados da Academia
  const [academia, setAcademia] = useState({
    nome: 'Academia Gracie Barra',
    endereco: 'Rua Principal, 123 - Centro',
    telefone: '(81) 99999-8888'
  });

  // Estado para Planos
  const [planos, setPlanos] = useState([
    { id: 1, nome: 'Mensal Jiu-Jitsu', valor: 150.00 },
    { id: 2, nome: 'Trimestral', valor: 400.00 },
    { id: 3, nome: 'Anual (Promocional)', valor: 1200.00 }
  ]);

  const handleSaveAcademia = (e) => {
    e.preventDefault();
    alert('Dados da academia salvos com sucesso!');
    // axios.put('/api/config/academia', academia)
  };

  const removerPlano = (id) => {
    if(window.confirm('Tem certeza que deseja excluir este plano?')) {
      setPlanos(planos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="config-wrapper" style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
      
      {/* CARD 1: DADOS DA ACADEMIA */}
      <div className="aba-container">
        <h2>Dados da Academia</h2>
        <form onSubmit={handleSaveAcademia} style={{display: 'grid', gap: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#ccc'}}>Nome do Estabelecimento</label>
            <input 
              type="text" 
              value={academia.nome} 
              onChange={e => setAcademia({...academia, nome: e.target.value})}
            />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#ccc'}}>Endereço</label>
              <input 
                type="text" 
                value={academia.endereco} 
                onChange={e => setAcademia({...academia, endereco: e.target.value})}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', color: '#ccc'}}>Telefone/WhatsApp</label>
              <input 
                type="text" 
                value={academia.telefone} 
                onChange={e => setAcademia({...academia, telefone: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{width: 'fit-content', display: 'flex', gap: '10px'}}>
            <Save size={18} /> Salvar Alterações
          </button>
        </form>
      </div>

      {/* CARD 2: GERENCIAR PLANOS */}
      <div className="aba-container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Planos e Valores</h2>
          <button className="btn-primary" style={{padding: '8px 16px', fontSize: '14px'}}>
            <Plus size={16} /> Novo Plano
          </button>
        </div>

        <div className="table-container">
          <table className="bjj-table">
            <thead>
              <tr>
                <th>Nome do Plano</th>
                <th>Valor (R$)</th>
                <th style={{textAlign: 'right'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {planos.map(plano => (
                <tr key={plano.id}>
                  <td className="fw-bold">{plano.nome}</td>
                  <td>R$ {plano.valor.toFixed(2)}</td>
                  <td style={{textAlign: 'right'}}>
                    <button className="btn-icon edit" style={{color: '#4dabf7', marginRight: '10px'}}>
                      <Edit3 size={18} />
                    </button>
                    <button className="btn-icon delete" style={{color: '#ff6b6b'}} onClick={() => removerPlano(plano.id)}>
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Configuracoes;