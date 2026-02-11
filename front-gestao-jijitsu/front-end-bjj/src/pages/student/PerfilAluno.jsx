import { User, CreditCard, Calendar, Award } from 'lucide-react';
import './PerfilAluno.css';

const PerfilAluno = () => {
  // No futuro, buscaremos estes dados do backend via useEffect
  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <h1>Olá, <span className="highlight">Campeão</span></h1>
        <p>Acompanhe aqui o status do seu treinamento.</p>
      </header>

      <div className="perfil-grid">
        {/* Status Financeiro */}
        <div className="perfil-card">
          <CreditCard className="icon-red" />
          <h3>Mensalidade</h3>
          <p className="status-pago">Status: <strong>REGULAR</strong></p>
          <span className="vencimento">Vencimento: Dia 10</span>
        </div>

        {/* Informações Técnicas */}
        <div className="perfil-card">
          <Award className="icon-red" />
          <h3>Sua Graduação</h3>
          <p>Faixa: <strong>Branca</strong></p>
          <p>Frequência: 85%</p>
        </div>
      </div>
    </div>
  );
};

export default PerfilAluno;