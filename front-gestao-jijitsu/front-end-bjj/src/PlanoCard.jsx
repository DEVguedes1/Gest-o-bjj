// src/PlanoCard.jsx
import './PlanoCard.css';
import { CheckCircle, Dumbbell, Calendar } from 'lucide-react';

export default function PlanoCard({ plano }) {
  if (!plano) return null;

  const formatarPreco = (valor) => {
    return valor ? Number(valor).toFixed(2).replace('.', ',') : "0,00";
  };

  // Usamos o código Hex do vermelho definido no CSS (#D32F2F)
  const iconColor = "#D32F2F";

  return (
    <div className="card">
      <h3>{plano.nome || "PLANO BJJ"}</h3>
      
      <div className="preco">
        R$ {plano && plano.preco ? Number(plano.preco).toFixed(2).replace('.', ',') : "0,00"}
        <span>/mês</span>
      </div>

      <ul className="detalhes">
        <li>
          {/* Ícone vermelho */}
          <Dumbbell size={24} color={iconColor} strokeWidth={2.5} />
          {plano.treinosSemana || 0} treinos por semana
        </li>
        <li>
          {/* Ícone vermelho */}
          <Calendar size={24} color={iconColor} strokeWidth={2.5} />
          Duração: {plano.duracaoMeses || 0} mês(es)
        </li>
        <li>
           <CheckCircle size={24} color={iconColor} strokeWidth={2.5} />
           Acesso total às aulas
        </li>
      </ul>
      <button className="btn-selecionar">MATRICULAR AGORA</button>
    </div>
  );
}