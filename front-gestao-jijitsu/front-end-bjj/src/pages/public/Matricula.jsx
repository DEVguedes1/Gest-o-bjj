import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { User, Mail, Phone, Award, CheckCircle2, Lock, CalendarDays } from 'lucide-react'; 
import './Matricula.css';

const Matricula = () => {
  const [planos, setPlanos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    senha: '', 
    diaVencimento: 5, // Valor padrão definido aqui
    planoId: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/planos')
      .then(res => setPlanos(res.data))
      .catch(err => console.error("Erro ao carregar planos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      cpf: formData.cpf,
      dataNascimento: formData.dataNascimento,
      senha: formData.senha,
      planoId: Number(formData.planoId),
      // GARANTA QUE ESTA LINHA ESTEJA ASSIM:
      diaVencimento: Number(formData.diaVencimento) 
    };

    try {
      await axios.post('http://localhost:8080/api/matriculas', payload);
      setStatus({ type: 'success', message: 'Inscrição realizada!' });
    } catch (err) {
      console.error("Erro do Backend:", err.response?.data);
    }
  };
  
  return (
    <div className="matricula-page">
      <div className="container grid-matricula">
        
        <div className="matricula-info">
          <span className="badge">Matrícula Online</span>
          <h1 className="title">Junte-se à <br /><span className="highlight">Escola de Jiu-Jitsu Bruno Caetano</span></h1>
          <p className="subtitle">Preencha os dados abaixo para iniciar a sua jornada no Jiu-Jitsu oficial.</p>
          
          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle2 className="icon-red" />
              <div>
                <strong>Acesso Imediato</strong>
                <p>Inicie os seus treinos logo após a confirmação.</p>
              </div>
            </div>
            <div className="benefit-item">
              <CheckCircle2 className="icon-red" />
              <div>
                <strong>Instrutores Certificados</strong>
                <p>Aprenda com faixas pretas de alto nível.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="matricula-card">
          <form onSubmit={handleSubmit} className="form-matricula">
            <div className="input-group">
              <label><User size={18} /> Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: Nicolas Guedes"
                required 
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>

            <div className="grid-inputs">
              <div className="input-group">
                <label><Mail size={18} /> E-mail</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  required 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label><Phone size={18} /> Telemóvel</label>
                <input 
                  type="tel" 
                  placeholder="(83) 99999-9999"
                  required 
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid-inputs">
              <div className="input-group">
                <label>CPF</label>
                <input 
                  type="text" 
                  placeholder="000.000.000-00"
                  required 
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Data de Nascimento</label>
                <input 
                  type="date" 
                  required 
                  onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <label><Lock size={18} /> Crie uma Senha para Acesso</label>
              <input 
                type="password" 
                placeholder="Mínimo 6 caracteres"
                required 
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
              />
            </div>

            {/* CORREÇÃO VISUAL: Seletor de dia de vencimento integrado ao formData */}
            <div className="input-group">
              <label><CalendarDays size={18} /> Melhor dia para vencimento</label>
              <select 
                className="select-vencimento"
                value={formData.diaVencimento} 
                onChange={(e) => setFormData({...formData, diaVencimento: e.target.value})}
              >
                <option value="5">Dia 05</option>
                <option value="10">Dia 10</option>
                <option value="15">Dia 15</option>
                <option value="20">Dia 20</option>
                <option value="25">Dia 25</option>
              </select>
            </div>

            <div className="input-group">
              <label><Award size={18} /> Selecione o seu Plano</label>
              <select 
                required 
                onChange={(e) => setFormData({...formData, planoId: e.target.value})}
              >
                <option value="">Escolha uma opção...</option>
                {planos.map(plano => (
                  <option key={plano.id} value={plano.id}>{plano.nome} - R$ {plano.preco}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-submit">Finalizar Inscrição</button>
            
            <div className="login-prompt">
              <span>Já possui uma conta?</span>
              <Link to="/login" className="btn-submit btn-outline">Fazer Login</Link>
            </div>         

            {status.message && (
              <div className={`alert ${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Matricula;