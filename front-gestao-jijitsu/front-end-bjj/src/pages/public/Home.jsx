import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Phone, Clock, CheckCircle, Quote 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/planos')
      .then(response => setPlanos(response.data))
      .catch(err => console.error("Erro ao carregar planos:", err));
  }, []);

  return (
    <div className="home-wrapper">
      
      {/* 1. HERO - FOCO TOTAL EM CONVERSÃO */}
        <section className="hero">
          <div className="hero-overlay">
            <img src="src/image/IMAGEM_HERO.jpeg" className="hero-img" alt="Bruno Caetano BJJ" />
          </div>
          <div className="container hero-content">
            <span className="subtitle">Bruno Caetano BJJ</span>
            <h1 className="main-title">
              FAÇA SUA <br /> <span className="highlight">MATRÍCULA</span>
            </h1>
            <p className="description">
              Escolha seu plano, preencha seus dados e comece a treinar na equipe que é referência em Jiu-Jitsu.
            </p>
            <div className="cta-group">
              {/* Agora o botão leva para o fluxo de inscrição oficial */}
              <Link to="/matricula" className="btn-primary">Matricular-se Agora</Link>
            </div>
          </div>
        </section>

      {/* 2. SOBRE / FILOSOFIA */}
      <section className="section-padding bg-white">
        <div className="container grid-2">
          <div className="image-frame">
            <img src="src/image/WhatsApp Image 2026-01-21 at 02.17.23.jpeg" alt="Academia" />
          </div>
          <div className="text-content">
            <h2 className="section-title">Nossa <span className="highlight">Filosofia</span></h2>
            <p>Na Bruno Caetano BJJ, o tatame é para todos. Nosso foco vai além das medalhas: buscamos o desenvolvimento do caráter e da saúde mental.</p>
            <ul className="feature-list">
              <li><CheckCircle size={20} className="icon-red" /> Metodologia de ensino estruturada</li>
              <li><CheckCircle size={20} className="icon-red" /> Ambiente familiar e respeitoso</li>
              <li><CheckCircle size={20} className="icon-red" /> Foco em evolução técnica constante</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. GRADE DE HORÁRIOS CORRIGIDA */}
      <section id="horarios" className="section-padding bg-gray-light">
        <div className="container">
          <h2 className="section-title text-center">Grade de <span className="highlight">Treinos</span></h2>
          <div className="schedule-container">
            
            {/* Seg / Qua / Sex */}
            <div className="schedule-column">
              <h3><Clock size={24} /> Seg / Qua / Sex</h3>
              <div className="schedule-item">
                <span className="time">06:00</span>
                <span className="class">Adulto</span>
              </div>
              <div className="schedule-item">
                <span className="time">09:00</span>
                <span className="class">Adulto</span>
              </div>
              <div className="schedule-item">
                <span className="time">12:00</span>
                <span className="class">Adulto</span>
              </div>
              <div className="schedule-item">
                <span className="time">19:00</span>
                <span className="class">Adulto</span>
              </div>
            </div>

            {/* Terça e Quinta */}
            <div className="schedule-column">
              <h3><Clock size={24} /> Terça / Quinta</h3>
              <div className="schedule-item">
                <span className="time">15:00</span>
                <span className="class">Kids (05 a 10 anos)</span>
              </div>
              <div className="schedule-item">
                <span className="time">19:00</span>
                <span className="class">Adulto</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. EQUIPE / LIDERANÇA */}
      <section className="section-padding bg-dark text-white text-center">
        <div className="container">
          <h2 className="section-title">Nossa <span className="highlight">Liderança</span></h2>
          <div className="instructor-card">
            <div className="instructor-img-wrapper">
              <img src="src/image/filosofia.jpeg" alt="Bruno Caetano" />
              <div className="rank-badge">Head Instructor</div>
            </div>
            <h4>Bruno Caetano</h4>
            <p className="rank-text">Faixa Preta 3º Grau</p>
          </div>
        </div>
      </section>

      {/* 8. CONTATO FINAL */}
      <section className="section-padding bg-red text-white text-center">
        <div className="container">
          <h2 className="big-cta-title">TORNE-SE UM ALUNO</h2>
          <p>Não perca tempo e garanta sua vaga em nossa equipe hoje mesmo.</p>
          <Link to="/matricula" className="btn-white">
            Iniciar Inscrição Online
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;