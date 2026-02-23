import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import './ListaAlunos.css'; // Vamos criar esse CSS no próximo passo

const ListaAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState('');

  // Puxa os dados do Spring Boot (Ajuste a URL se seu controller for diferente)
  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/alunos');
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  // Filtra os alunos pelo nome na barra de pesquisa
  const alunosFiltrados = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h2>Gestão de Alunos</h2>
        
        {/* Barra de Pesquisa */}
        <div className="search-box">
          <Search size={18} color="#a0a0a0" />
          <input 
            type="text" 
            placeholder="Buscar aluno por nome..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="bjj-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Faixa</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.length > 0 ? (
              alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td className="fw-bold">{aluno.nome}</td>
                  <td>{aluno.faixa || 'Branca'}</td>
                  <td>{aluno.telefone}</td>
                  <td>
                    {/* Renderiza Status Ativo/Inativo visualmente */}
                    {aluno.ativo !== false ? (
                      <span className="badge ativo"><UserCheck size={14}/> Ativo</span>
                    ) : (
                      <span className="badge inativo"><UserX size={14}/> Inativo</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <button className="btn-icon edit" title="Editar"><Edit size={16} /></button>
                    <button className="btn-icon delete" title="Excluir"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-message">Nenhum aluno encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaAlunos;