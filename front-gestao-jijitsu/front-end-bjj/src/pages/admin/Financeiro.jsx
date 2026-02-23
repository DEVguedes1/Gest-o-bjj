import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, CheckCircle } from 'lucide-react';
import './DashboardAdmin.css';

const Financeiro = () => {
  const [mensalidades, setMensalidades] = useState([]);

  useEffect(() => { 
    carregarMensalidades(); 
  }, []);

  // BUSCA SEGURA (Evita tela branca se a API falhar)
  const carregarMensalidades = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mensalidades');
      console.log("Dados recebidos do Java:", response.data); 
      setMensalidades(Array.isArray(response.data) ? response.data : []);
    } catch (error) { 
      console.error("Erro ao buscar mensalidades do banco:", error);
      setMensalidades([]); 
    }
  };

  // FUNÇÃO DE PAGAMENTO COM API
  const marcarComoPago = async (id) => {
    if(window.confirm("Confirmar o recebimento desta mensalidade?")) {
      try {
        await axios.put(`http://localhost:8080/api/mensalidades/${id}/pagar`);
        
        // Atualiza a tela mantendo a consistência visual rapidamente
        setMensalidades(mensalidades.map(m => 
          m.id === id ? { ...m, status: 'PAGO' } : m
        ));
      } catch (error) {
        console.error("Erro ao dar baixa no pagamento:", error);
        alert('Erro ao registrar o pagamento no banco.');
      }
    }
  };

  // CÁLCULOS BLINDADOS (Ignoram valores nulos)
  const faturamentoTotal = mensalidades
    .filter(m => m.status === 'PAGO' || m.status === 'Pago')
    .reduce((acc, m) => acc + (Number(m.valor) || 0), 0);

  const pendenteTotal = mensalidades
    .filter(m => m.status !== 'PAGO' && m.status !== 'Pago')
    .reduce((acc, m) => acc + (Number(m.valor) || 0), 0);

  return (
    <div className="aba-container">
      {/* Cabeçalho */}
      <div className="financeiro-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h2>Controle Financeiro</h2>
        <button className="btn-primary" onClick={carregarMensalidades}>Atualizar Dados</button>
      </div>

      {/* Cards de Dashboard */}
      <div className="header-stats" style={{marginBottom: '40px'}}>
        <div className="stat-card" style={{borderColor: '#04d361'}}>
          <div className="icon-box" style={{background: 'rgba(4, 211, 97, 0.1)', color: '#04d361'}}>
            <CheckCircle size={28} />
          </div>
          <div className="stat-info">
            <h3>Recebido Geral</h3>
            <p>R$ {faturamentoTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card" style={{borderColor: '#fba94c'}}>
          <div className="icon-box" style={{background: 'rgba(251, 169, 76, 0.1)', color: '#fba94c'}}>
            <DollarSign size={28} />
          </div>
          <div className="stat-info">
            <h3>A Receber (Pendentes)</h3>
            <p>R$ {pendenteTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Tabela de Mensalidades Segura */}
      <h3 style={{marginBottom: '20px', color: '#a8a8b3'}}>Mensalidades Geradas</h3>
      <div className="table-container">
        <table className="bjj-table">
          <thead>
            <tr>
              <th>ID Matr.</th>
              <th>Aluno</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {mensalidades.length > 0 ? (
              mensalidades.map(m => (
                <tr key={m.id}>
                  {/* Uso do ?. garante que não vai crashar se vier faltando algo do banco */}
                  <td>#{m.matricula?.id || 'N/A'}</td>
                  <td className="fw-bold">{m.aluno?.nome || m.matricula?.aluno?.nome || "Sem nome"}</td>
                  <td>{m.dataVencimento ? new Date(m.dataVencimento).toLocaleDateString('pt-BR') : "---"}</td>
                  <td>R$ {Number(m.valor || 0).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${String(m.status || 'pendente').toLowerCase()}`}>
                      {m.status || 'Pendente'}
                    </span>
                  </td>
                  <td>
                    {/* Só mostra o botão se não estiver pago */}
                    {m.status !== 'Pago' && m.status !== 'PAGO' && (
                      <button 
                        className="btn-icon check" 
                        onClick={() => marcarComoPago(m.id)}
                        title="Confirmar Pagamento no Banco"
                        style={{color: '#04d361', cursor: 'pointer', background: 'rgba(4, 211, 97, 0.1)', padding: '8px', borderRadius: '8px'}}
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Nenhuma mensalidade encontrada no banco.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financeiro;