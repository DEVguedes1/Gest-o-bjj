import { useEffect, useState } from 'react';
import axios from 'axios';

const Financeiro = () => {
  const [mensalidades, setMensalidades] = useState([]);

  useEffect(() => {
    carregarMensalidades();
  }, []);

  const carregarMensalidades = async () => {
    const response = await axios.get('http://localhost:8080/api/mensalidades');
    setMensalidades(response.data);
  };

  const confirmarPagamento = async (id) => {
    await axios.put(`http://localhost:8080/api/mensalidades/${id}/pagar`);
    carregarMensalidades(); // Recarrega a lista após pagar
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestão Financeira - Bruno Caetano BJJ</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Aluno</th>
            <th className="border p-2">Vencimento</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {mensalidades.map(m => (
            <tr key={m.id} className="text-center">
              <td className="border p-2">{m.aluno.nome}</td>
              <td className="border p-2">{m.dataVencimento}</td>
              <td className={`border p-2 font-bold ${m.status === 'PAGO' ? 'text-green-600' : 'text-red-600'}`}>
                {m.status}
              </td>
              <td className="border p-2">
                {m.status === 'PENDENTE' && (
                  <button 
                    onClick={() => confirmarPagamento(m.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Marcar como Pago
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Financeiro;