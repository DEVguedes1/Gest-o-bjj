import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';
import './Matricula.css';

const Matricula = () => {
  const [planos, setPlanos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    planoId: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Carrega os planos configurados no seu PlanoController
    axios.get('http://localhost:8080/api/planos')
      .then(res => setPlanos(res.data))
      .catch(err => console.error("Erro ao carregar planos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia os dados para o seu MatriculaController
      await axios.post('http://localhost:8080/api/matriculas', formData);
      setStatus({ type: 'success', message: 'Inscrição realizada com sucesso! Bem-vindo à equipa.' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro ao processar matrícula. Tente novamente.' });
    }
  };

  return (
    <div className="matricula-page">
      <div className="container grid-matricula">
        
        {/* Lado Esquerdo: Benefícios e Confiança */}
        <div className="matricula-info">
          <span className="badge">Matrícula Online</span>
          <h1 className="title">Junte-se à <br /><span className="highlight">escola de Luta Bruno Caetano</span></h1>
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

        {/* Lado Direito: Formulário Limpo */}
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
            {/* Novo campo de CPF e Data de Nascimento (para validar Kids) */}
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