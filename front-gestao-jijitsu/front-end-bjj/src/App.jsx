import { useEffect, useState } from 'react';
import axios from 'axios';
import PlanoCard from './PlanoCard';
import AlunoForm from './AlunoForm'; // 1. Importação essencial
import './index.css';

function App() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    // Certifique-se que o Back-end Java está rodando na porta 8080!
    axios.get('http://localhost:8080/api/planos')
      .then(response => setPlanos(response.data))
      .catch(err => console.error("Erro ao carregar dados do Java:", err));
  }, []);

  return (
    <div className="container">
      {/* Cabeçalho Único e Profissional */}
      <header className="header">
        <h1>Bruno Caetano - Escola de Jiu-Jitsu</h1>
        <p>Soluções por Digital Solutions</p>
      </header>

      {/* Seção de Cadastro */}
      <AlunoForm />

      {/* Seção de Planos */}
      <div className="header" style={{ marginTop: '40px', marginBottom: '20px' }}>
        <h2>Planos de Matrícula</h2>
        <p>Selecione um plano para matricular o aluno</p>
      </div>

      <div className="grid">
        {planos.length > 0 ? (
          planos.map(p => <PlanoCard key={p.id} plano={p} />)
        ) : (
          <p>Carregando planos do servidor Java...</p>
        )}
      </div>
    </div>
  );
}

export default App;