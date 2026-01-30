import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  ChevronRight, Users, Calendar, Award, 
  MapPin, Phone, Instagram, CheckCircle, Quote 
} from 'lucide-react';
import PlanoCard from '../../components/PlanoCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/planos')
      .then(response => setPlanos(response.data))
      .catch(err => console.error("Erro ao carregar planos:", err));
  }, []);

  return (
    <div className="bg-white text-black font-sans">
      
      {/* 1. HERO - CHAMADA FORTE */}
      <section className="relative h-screen flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 grayscale opacity-50">
          <img src="src/image/IMAGEM_HERO.jpeg" className="w-full h-full object-cover" alt="Hero BJJ" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-7xl md:text-9xl font-black text-white uppercase leading-none tracking-tighter mb-6">
            DOMINE A <br /> <span className="text-bjj-red">ARTE</span>
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl mb-10 max-w-xl font-light">
            Tradição, disciplina e técnica. Junte-se à Bruno Caetano BJJ e transforme sua vida através do Jiu-Jitsu.
          </p>
          <Link to="/matricula" className="bg-bjj-red text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            Começar Agora
          </Link>
        </div>
      </section>

      {/* 2. SOBRE / FILOSOFIA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="h-[500px] bg-gray-100 overflow-hidden">
            <img src="src/image/WhatsApp Image 2026-01-21 at 02.17.23.jpeg" className="w-full h-full object-cover" alt="Academia" />
          </div>
          <div>
            <h2 className="text-5xl font-black uppercase mb-8 leading-tight">Nossa <span className="text-bjj-red">Filosofia</span></h2>
            <p className="text-gray-600 text-lg mb-6">Na Bruno Caetano BJJ, acreditamos que o Jiu-Jitsu é para todos. Nosso foco vai além das medalhas: buscamos o desenvolvimento do caráter, da resiliência e da saúde mental dos nossos alunos.</p>
            <p className="text-gray-600 text-lg">Ambiente familiar, respeitoso e focado na evolução técnica constante.</p>
          </div>
        </div>
      </section>

      {/* 3. PROGRAMAS / AULAS */}
      <section className="py-24 bg-bjj-dark text-white">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-5xl font-black uppercase">Nossos Programas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4">
          {['Adultos', 'Kids', 'Feminino', 'No-Gi', 'Gi'].map((aula) => (
            <div key={aula} className="relative h-96 group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-bjj-red/60 transition-all z-10"></div>
              <img src={`URL_IMAGEM_${aula.toUpperCase()}`} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" alt={aula} />
              <div className="absolute bottom-6 left-6 z-20">
                <h4 className="text-2xl font-black uppercase">{aula}</h4>
                <p className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">Saiba mais</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GRADE DE HORÁRIOS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black uppercase mb-12 text-center">
            Grade de <span className="text-bjj-red">Horários</span>
          </h2>
          
          <div className="overflow-x-auto shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white uppercase text-sm tracking-widest">
                  <th className="p-5 text-left border-r border-gray-800">Horário</th>
                  <th className="p-5 text-left">Segunda</th>
                  <th className="p-5 text-left">Quarta</th>
                  <th className="p-5 text-left">Sexta</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {/* Turno da Manhã */}
                <tr className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                  <td className="p-5 font-black border-r border-gray-100 bg-gray-50">06:00</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                  <td className="p-5 text-gray-300">—</td>
                </tr>
                
                <tr className="border-b border-gray-100 hover:bg-red-50 transition-colors bg-gray-50/30">
                  <td className="p-5 font-black border-r border-gray-100 bg-gray-50">09:00</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                </tr>

                {/* Turno do Almoço */}
                <tr className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                  <td className="p-5 font-black border-r border-gray-100 bg-gray-50">12:00</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                  <td className="p-5">Jiu-Jitsu Adulto</td>
                  <td className="p-5 text-gray-300">—</td>
                </tr>

                {/* Turno da Noite */}
                <tr className="border-b border-gray-100 hover:bg-red-50 transition-colors bg-gray-900 text-white">
                  <td className="p-5 font-black border-r border-gray-800 bg-black">19:00</td>
                  <td className="p-5 font-bold">Jiu-Jitsu (Todos)</td>
                  <td className="p-5 font-bold">Jiu-Jitsu (Todos)</td>
                  <td className="p-5 font-bold">Jiu-Jitsu (Todos)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-6 text-center text-gray-500 text-sm italic">
            * Terças e Quintas: Horários sob consulta para treinos específicos e competidores.
          </p>
        </div>
      </section>

      {/* 5. EQUIPE / INSTRUTORES */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-black uppercase mb-16">Nossos <span className="text-bjj-red">Mestres</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-bjj-red">
                <img src="src/image/filosofia.jpeg" className="w-full h-full object-cover" alt="Bruno Caetano" />
              </div>
              <h4 className="text-xl font-black uppercase">Bruno Caetano</h4>
              <p className="text-red-600 font-bold text-sm uppercase">Faixa Preta 3º Grau</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALERIA / LIFESTYLE */}
      <section className="py-12 grid grid-cols-2 md:grid-cols-4 gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-64 bg-gray-200 overflow-hidden">
            <img src={`URL_GALERIA_${i}`} className="w-full h-full object-cover hover:scale-105 transition duration-500" alt="Galeria" />
          </div>
        ))}
      </section>

      {/* 7. TESTEMUNHOS */}
      <section className="py-24 bg-white italic">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="mx-auto text-bjj-red mb-8" size={48} />
            <p className="text-3xl font-light mb-8">"O Jiu-Jitsu na Bruno Caetano mudou minha forma de encarar desafios no trabalho e na vida pessoal. O ambiente é acolhedor e a técnica é impecável."</p>
            <h5 className="font-black uppercase text-sm tracking-widest">— Nicolas Guedes, Aluno Faixa Azul</h5>
          </div>
        </div>
      </section>

      {/* 8. CONTATO / AGENDE AULA */}
      <section className="py-24 bg-bjj-red text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black uppercase mb-8 italic">Pronto para o Rolê?</h2>
          <p className="text-xl mb-12">Agende sua aula experimental gratuita e conheça nossa estrutura.</p>
          <div className="flex justify-center gap-6">
            <a href="https://wa.me/83999998888" className="bg-white text-black px-12 py-5 font-black uppercase flex items-center gap-3">
              <Phone size={20} /> Agendar via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;