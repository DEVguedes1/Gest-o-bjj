const Matricula = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-10 text-white">
          <h2 className="text-3xl font-black uppercase tracking-widest">Novo Cadastro de Aluno</h2>
          <p className="opacity-70 text-sm">Preencha os campos para gerar a primeira mensalidade no sistema.</p>
        </div>

        <form className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500">Nome Completo</label>
            <input type="text" className="w-full border-b-2 border-gray-200 p-3 focus:border-red-600 outline-none transition" placeholder="Ex: Nicolas Guedes" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500">WhatsApp</label>
            <input type="text" className="w-full border-b-2 border-gray-200 p-3 focus:border-red-600 outline-none transition" placeholder="83 99999-8888" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500">Faixa Atual</label>
            <select className="w-full border-b-2 border-gray-200 p-3 focus:border-red-600 outline-none bg-white">
              <option>Branca</option>
              <option>Azul</option>
              <option>Preta</option>
            </select>
          </div>
          <button className="md:col-span-2 bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-red-600 transition">
            Finalizar Matrícula
          </button>
        </form>
      </div>
    </div>
  );
};

export default Matricula;