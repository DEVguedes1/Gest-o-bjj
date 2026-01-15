import { useState } from 'react';
import axios from 'axios';
import './AlunoForm.css';

export default function AlunoForm({ onAlunoCadastrado }) {
  const [aluno, setAluno] = useState({
    nome: '',
    cpf: '',
    email: '',
    faixa: 'Branca'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/alunos', aluno)
      .then(response => {
        alert("Aluno cadastrado com sucesso!");
        setAluno({ nome: '', cpf: '', email: '', faixa: 'Branca' });
        if (onAlunoCadastrado) onAlunoCadastrado();
      })
      .catch(err => console.error("Erro ao cadastrar aluno:", err));
  };

  return (
    <form className="aluno-form" onSubmit={handleSubmit}>
      <h3>Novo Cadastro de Aluno</h3>
      <div className="input-group">
        <input name="nome" value={aluno.nome} onChange={handleChange} placeholder="Nome Completo" required />
        <input name="cpf" value={aluno.cpf} onChange={handleChange} placeholder="CPF (apenas números)" required />
      </div>
      <div className="input-group">
        <input name="email" value={aluno.email} onChange={handleChange} placeholder="E-mail" required />
        <select name="faixa" value={aluno.faixa} onChange={handleChange}>
          <option value="Branca">Faixa Branca</option>
          <option value="Azul">Faixa Azul</option>
          <option value="Roxa">Faixa Roxa</option>
          <option value="Marrom">Faixa Marrom</option>
          <option value="Preta">Faixa Preta</option>
        </select>
      </div>
      <button type="submit" className="btn-cadastrar">Cadastrar Aluno</button>
    </form>
  );
}