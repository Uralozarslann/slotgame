import React, { useState } from "react";
import "./App.css";

const SYMBOLS = ["🍒", "🍊", "🍇", "🍋", "🍉", "🍓"];

const App = () => {
  const [slots, setSlots] = useState(Array(3).fill(SYMBOLS[0]));
  const [turnsLeft, setTurnsLeft] = useState(5);
  const [isWin, setIsWin] = useState(false);

  const checkWin = (slots) => {
    return slots[0] === slots[1] && slots[1] === slots[2];
  };

  const spin = () => {
    if (turnsLeft === 0) {
      return;
    }

    const newSlots = slots.map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    setSlots(newSlots);

    if (checkWin(newSlots)) {
      setIsWin(true);
      setTurnsLeft(turnsLeft + 3); // Kazandığında 3 ekstra çevirme hakkı ver
    } else {
      setTurnsLeft(turnsLeft - 1);
    }
  };

  const resetGame = () => {
    setIsWin(false);
    setSlots(Array(3).fill(SYMBOLS[0]));
    setTurnsLeft(5);
  };

  return (
    <div className="App">
      {isWin && (
        <div className="fireworks-container">
          <div className="firework" style={{ top: "10%", left: "40%" }} />
          <div className="firework" style={{ top: "30%", left: "10%" }} />
          <div className="firework" style={{ top: "50%", left: "80%" }} />
          <div className="firework" style={{ top: "60%", left: "20%" }} />
          <div className="firework" style={{ top: "70%", left: "60%" }} />
          <div className="firework" style={{ top: "90%", left: "30%" }} />
        </div>
      )}
      {isWin ? (
        <div className="win-message">
          <h2>Kazandınız!</h2>
          <div className="confetti" />
          <button onClick={() => setIsWin(false)}>Oyna</button>
        </div>
      ) : (
        <>
          <h1>Slot Game</h1>
          <div className="slots">
            {slots.map((symbol, index) => (
              <div key={index} className="slot">
                {symbol}
              </div>
            ))}
          </div>
          <button onClick={spin}>Spin</button>
          <p>Turns Left: {turnsLeft}</p>
        </>
      )}
      {!isWin && turnsLeft === 0 && (
        <div className="lose-message">
          <h2>Kaybettiniz!</h2>
          <button onClick={resetGame}>Yeniden Başla</button>
        </div>
      )}
    </div>
  );
};

export default App;
