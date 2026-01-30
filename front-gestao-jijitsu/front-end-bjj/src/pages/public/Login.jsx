import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Box Principal */}
      <div className="w-full max-w-[350px] bg-black border border-gray-800 p-8 flex flex-col items-center mb-4">
        <h1 className="text-4xl font-black italic mb-10 text-white tracking-tighter">
          BRUNO CAETANO <span className="text-red-600">BJJ</span>
        </h1>
        
        <form className="w-full space-y-2">
          <input 
            type="text" 
            placeholder="Telefone, nome de usuário ou email" 
            className="w-full bg-gray-900 border border-gray-800 rounded-sm p-3 text-xs text-white focus:outline-none focus:border-gray-600"
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full bg-gray-900 border border-gray-800 rounded-sm p-3 text-xs text-white focus:outline-none focus:border-gray-600"
          />
          <button className="w-full bg-red-600 text-white font-bold py-2 rounded-md mt-4 text-sm hover:bg-red-700 transition">
            Entrar
          </button>
        </form>

        <div className="flex items-center w-full my-6">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="px-4 text-gray-500 text-xs font-bold uppercase tracking-widest">OU</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <button className="text-white text-sm font-bold">Entrar com o Facebook</button>
        <p className="text-xs text-gray-400 mt-4 cursor-pointer">Esqueceu a senha?</p>
      </div>

      {/* Box Inferior (Cadastro) */}
      <div className="w-full max-w-[350px] bg-black border border-gray-800 p-6 text-center">
        <p className="text-sm text-white">
          Não tem uma conta? <Link to="/matricula" className="text-red-600 font-bold ml-1">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;