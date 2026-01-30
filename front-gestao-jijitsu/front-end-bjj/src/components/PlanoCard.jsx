import { CheckCircle, Dumbbell, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlanoCard({ plano }) {
  const navigate = useNavigate();

  if (!plano) return null;

  // Formatação de preço profissional
  const precoFormatado = plano.preco 
    ? Number(plano.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) 
    : "0,00";

  return (
    <div className="group relative bg-gray-900 border border-gray-800 p-8 rounded-3xl transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_30px_rgba(211,47,47,0.2)] flex flex-col h-full">
      
      {/* Badge de Destaque (opcional se for o plano mais vendido) */}
      {plano.nome?.toLowerCase().includes('trimestral') && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
          Mais Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">
        {plano.nome || "PLANO BJJ"}
      </h3>
      
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-2xl font-bold text-white">R$</span>
        <span className="text-5xl font-black text-white">{precoFormatado}</span>
        <span className="text-gray-500">/mês</span>
      </div>

      <ul className="space-y-6 mb-10 flex-grow">
        <li className="flex items-center gap-4 text-gray-300">
          <div className="bg-red-600/10 p-2 rounded-lg">
            <Dumbbell size={24} className="text-red-600" />
          </div>
          <span className="font-medium">{plano.treinosSemana || 0} treinos por semana</span>
        </li>
        
        <li className="flex items-center gap-4 text-gray-300">
          <div className="bg-red-600/10 p-2 rounded-lg">
            <Calendar size={24} className="text-red-600" />
          </div>
          <span className="font-medium">Contrato de {plano.duracaoMeses || 0} mês(es)</span>
        </li>
        
        <li className="flex items-center gap-4 text-gray-300">
          <div className="bg-red-600/10 p-2 rounded-lg">
            <CheckCircle size={24} className="text-red-600" />
          </div>
          <span className="font-medium">Acesso total às aulas</span>
        </li>
      </ul>

      <button 
        onClick={() => navigate('/matricula')}
        className="w-full bg-transparent border-2 border-red-600 text-red-600 font-black py-4 rounded-xl transition-all duration-300 group-hover:bg-red-600 group-hover:text-white uppercase tracking-widest active:scale-95"
      >
        Matricular Agora
      </button>
    </div>
  );
}