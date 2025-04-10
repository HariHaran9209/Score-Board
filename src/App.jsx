import './css/App.css';
import Navbar from './components/Navbar';
import { ScoreboardProvider } from "./context/ScoreboardContext";
import { CricketScoreboard } from './components/Scoreboard';
import PlayerSelection from './context/PlayerSelection';
import { useState } from 'react';

function App() {
  const [teamConfirmed, setTeamConfirmed] = useState(false);
  const [showPlayerSelection, setShowPlayerSelection] = useState(true);

  return (
    <ScoreboardProvider>
      <div className="app">
        {showPlayerSelection ? (
          <PlayerSelection 
            onTeamConfirmed={() => {
              setTeamConfirmed(true);
              setShowPlayerSelection(false);
            }} 
          />
        ) : teamConfirmed ? (
          <CricketScoreboard />
        ) : (
          <h3>Please select your players first</h3>
        )}
      </div>
    </ScoreboardProvider>
  );
}

export default App;