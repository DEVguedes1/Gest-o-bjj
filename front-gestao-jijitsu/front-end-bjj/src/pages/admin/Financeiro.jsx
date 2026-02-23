import React, { useState } from 'react';
import { DollarSign, CheckCircle, XCircle, Filter } from 'lucide-react';
import './DashboardAdmin.css'; // Usa os mesmos estilos modernos

const Financeiro = () => {
  // Dados simulados (depois conectamos na API)
  const [mensalidades, setMensalidades] = useState([
    { id: 1, aluno: 'Carlos Silva', plano: 'Mensal - Jiu Jitsu', valor: 150.00, vencimento: '2026-02-25', status: 'Pendente' },
    { id: 2, aluno: 'Ana Souza', plano: 'Trimestral - Muay Thai', valor: 400.00, vencimento: '2026-02-20', status: 'Atrasado' },
    { id: 3, aluno: 'Pedro Santos', plano: 'Anual', valor: 1200.00, vencimento: '2026-02-10', status: 'Pago' },
  ]);

  // Função para dar baixa no pagamento
  const marcarComoPago = (id) => {
    setMensalidades(mensalidades.map(m => 
      m.id === id ? { ...m, status: 'Pago' } : m
    ));
    // Aqui entraria a chamada: axios.post(`/api/financeiro/${id}/pagar`)
  };

  // Cálculo rápido para o Dashboard Financeiro
  const faturamentoTotal = mensalidades
    .filter(m => m.status === 'Pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const pendenteTotal = mensalidades
    .filter(m => m.status === 'Pendente' || m.status === 'Atrasado')
    .reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="aba-container">
      <div className="financeiro-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h2>Controle Financeiro</h2>
        <button className="btn-primary"><Filter size={18} /> Filtrar Mês</button>
      </div>

      {/* Mini Dashboard de Faturamento */}
      <div className="header-stats" style={{marginBottom: '40px'}}>
        <div className="stat-card" style={{borderColor: '#04d361'}}>
          <div className="icon-box" style={{background: 'rgba(4, 211, 97, 0.1)', color: '#04d361'}}>
            <CheckCircle size={28} />
          </div>
          <div className="stat-info">
            <h3>Recebido (Mês)</h3>
            <p>R$ {faturamentoTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card" style={{borderColor: '#fba94c'}}>
          <div className="icon-box" style={{background: 'rgba(251, 169, 76, 0.1)', color: '#fba94c'}}>
            <DollarSign size={28} />
          </div>
          <div className="stat-info">
            <h3>A Receber</h3>
            <p>R$ {pendenteTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Tabela de Pagamentos */}
      <h3 style={{marginBottom: '20px', color: '#a8a8b3'}}>Mensalidades Recentes</h3>
      <div className="table-container">
        <table className="bjj-table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Plano</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {mensalidades.map((m) => (
              <tr key={m.id}>
                <td className="fw-bold">{m.aluno}</td>
                <td>{m.plano}</td>
                <td>{new Date(m.vencimento).toLocaleDateString('pt-BR')}</td>
                <td>R$ {m.valor.toFixed(2)}</td>
                <td>
                  <span className={`badge ${m.status.toLowerCase()}`}>
                    {m.status}
                  </span>
                </td>
                <td>
                  {m.status !== 'Pago' && (
                    <button 
                      className="btn-icon check" 
                      onClick={() => marcarComoPago(m.id)}
                      title="Confirmar Pagamento"
                      style={{color: '#04d361', cursor: 'pointer'}}
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financeiro;