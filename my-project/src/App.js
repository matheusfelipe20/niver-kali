import { useState, useEffect } from 'react';
import './App.css';
import cake from './cake.png';
import akali from './akali.png';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [fireworks, setFireworks] = useState([]);

  const toggleCard = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      const particles = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setFireworks(particles);
    } else {
      setFireworks([]);
    }
  }, [isOpen]);

  return (
    <div className="App">
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework"
          style={{
            left: `${firework.left}%`,
            top: `${firework.top}%`,
            animationDelay: `${firework.delay}s`
          }}
        ></div>
      ))}

      <div className={`card ${isOpen ? 'open' : ''}`} onClick={toggleCard}>
        <div className={`card-left ${isOpen ? 'open-left' : ''}`}>
        {!isOpen ? (
          <>
            <img src={cake} alt="icon cake" />
            <h2>Para a Melhor</h2>
            <h2 className="card-leftname">Akali</h2>
          </>
        ) : (
          <img src={akali} alt="icon Akali" className="left-decor"/>
        )}
      </div>
        {isOpen && (
          <div className="card-right">
            <div className="message">
              <h2>Feliz Aniversário, Kali!</h2>
              <p>
                Que seu dia seja maravilhoso, repleto de alegria e momentos inesquecíveis.<br />
                Você merece sempre o melhor!! Você é incrivel.
              </p>
              <h6>Java Neles! - Matth</h6>
            </div>
          </div>
        )}
      </div>

      {!isOpen && <p className="click-text">Clique no cartão para abrir</p>}
    </div>
  );
}

export default App;