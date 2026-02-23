import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash } from 'lucide-react';
import './DashboardAdmin.css';

const Configuracoes = () => {
  const [planos, setPlanos] = useState([]);
  const [novoPlano, setNovoPlano] = useState({ nome: '', preco: '', treinosSemana: '' });

  useEffect(() => { carregarPlanos(); }, []);

  const carregarPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/planos');
      setPlanos(Array.isArray(response.data) ? response.data : []);
    } catch (error) { 
      console.error("Erro ao carregar planos:", error);
      setPlanos([]); 
    }
  };

  const handleAdicionarPlano = async (e) => {
    e.preventDefault();
    if (!novoPlano.nome || !novoPlano.preco || !novoPlano.treinosSemana) {
      return alert("Preencha todos os campos!");
    }

    try {
      // Ajustado para os nomes do seu Plano.java: preco e treinosSemana
      await axios.post('http://localhost:8080/api/planos', {
        nome: novoPlano.nome,
        preco: parseFloat(novoPlano.preco),
        treinosSemana: parseInt(novoPlano.treinosSemana),
        status: "ATIVO", // Adicionado para garantir que o plano nasça ativo
        duracaoMeses: 1   // Valor padrão
      });
      
      alert('Plano adicionado com sucesso!');
      setNovoPlano({ nome: '', preco: '', treinosSemana: '' });
      carregarPlanos();
    } catch (error) {
      alert('Erro ao salvar no banco de dados.');
    }
  };

  const removerPlano = async (id) => {
    if (!window.confirm('Deseja realmente excluir este plano?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/planos/${id}`);
      alert('Plano excluído!');
      carregarPlanos();
    } catch (error) {
      alert('Não foi possível excluir. Talvez existam alunos vinculados a este plano.');
    }
  };

  return (
    <div className="aba-container">
      <h2>Configurações de Planos</h2>
      
      <form onSubmit={handleAdicionarPlano} style={{display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap'}}>
        <input 
          placeholder="Nome do Plano" 
          value={novoPlano.nome} 
          onChange={e => setNovoPlano({...novoPlano, nome: e.target.value})} 
          style={{flex: 2}}
        />
        <input 
          type="number" 
          placeholder="Preço R$" 
          value={novoPlano.preco} 
          onChange={e => setNovoPlano({...novoPlano, preco: e.target.value})} 
          style={{flex: 1}}
        />
        <input 
          type="number" 
          placeholder="Treinos/Semana" 
          value={novoPlano.treinosSemana} 
          onChange={e => setNovoPlano({...novoPlano, treinosSemana: e.target.value})} 
          style={{flex: 1}}
        />
        <button type="submit" className="btn-primary" title="Adicionar ao Banco"><Plus size={18} /></button>
      </form>

      <div className="table-container">
        <table className="bjj-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Frequência</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {planos.map(p => (
              <tr key={p.id}>
                <td className="fw-bold">{p.nome}</td>
                {/* Usamos p.preco aqui para bater com o Java */}
                <td>R$ {Number(p.preco || 0).toFixed(2)}</td>
                <td>{p.treinosSemana}x na semana</td>
                <td>
                  <button onClick={() => removerPlano(p.id)} className="btn-icon delete">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Configuracoes;