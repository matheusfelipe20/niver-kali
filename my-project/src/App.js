import { useState, useEffect, useRef } from 'react';
import './App.css';
import cake from './cake.png';
import akali from './akali.png';
import music from './music.mp3';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [confettis, setConfettis] = useState([]);
  const audioRef = useRef(null);

  const toggleCard = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      }
  
      // Criar fogos fixos
      const particles = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setFireworks(particles);
  
      // Confetes fofos
      const confettiArray = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        color: ['#ffb6c1', '#ffc0cb', '#dda0dd', '#e0bbff', '#fffacd'][Math.floor(Math.random() * 5)]
      }));
      setConfettis(confettiArray);
  
    } else {
      setFireworks([]);
      setConfettis([]);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  return (
    <div className="App">
      <audio ref={audioRef} src={music} loop />

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

      {isOpen && confettis.map(c => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: c.left,
            backgroundColor: c.color,
            animationDelay: c.delay
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
            <img src={akali} alt="icon Akali" className="left-decor" />
          )}
        </div>
        {isOpen && (
          <div className="card-right">
            <div className="message">
              <h2>Feliz Aniversário, Kali!</h2>
              <p>
                Que seu dia seja maravilhoso, repleto de alegria e momentos inesquecíveis.<br />
                Você merece sempre o melhor!! Você é incrível.
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
