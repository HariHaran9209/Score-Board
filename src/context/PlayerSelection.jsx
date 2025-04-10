// Create PlayerSelection.jsx
import React, { useState } from 'react';
import { useScoreboard } from '../context/ScoreboardContext';

export default function PlayerSelection({ onTeamConfirmed }) {
  const { 
    addPlayer, 
    selectBatsman, 
    selectBowler,
    availableBatsmen,
    availableBowlers,
    batsmen,
    bowler,
    setOnStrike,
    setNonStrike,
    savedTeams,
    currentTeam,
    handleSaveTeam,
    handleLoadTeam
  } = useScoreboard();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState('batsman');
  const [newTeamName, setNewTeamName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim(), playerRole);
      setNewPlayerName('');
    }
  };

  const handleSelectBatsman = (name) => {
    selectBatsman(name);
  };

  const handleSelectBowler = (name) => {
    selectBowler(name);
  };

  const handleTeamConfirm = () => {
    if (batsmen.length < 2) {
      alert('Please select at least 2 batsmen.');
      return;
    }
    if (!bowler) {
      alert('Please select a bowler.');
      return;
    }
    
    // Reset the striker and non-striker positions
    if (batsmen.length >= 2) {
      setOnStrike(0);
      setNonStrike(1);
    }
    
    onTeamConfirmed();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Add Players</h3>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          style={{ padding: '8px', flex: 1 }}
        />
        <select
          value={playerRole}
          onChange={(e) => setPlayerRole(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="batsman">Batsman</option>
          <option value="bowler">Bowler</option>
        </select>
        <button
          onClick={() => addPlayer(newPlayerName.trim(), playerRole)}
          style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Add Player
        </button>
      </div>

      <h4>Available Batsmen</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {availableBatsmen.map((player) => (
          <button
            key={player.name}
            onClick={() => selectBatsman(player.name)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {player.name}
          </button>
        ))}
      </div>

      <h4>Available Bowlers</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {availableBowlers.map((player) => (
          <button
            key={player.name}
            onClick={() => selectBowler(player.name)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {player.name}
          </button>
        ))}
      </div>

      <h4>Selected Batsmen</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {batsmen.map((player, index) => (
          <div
            key={player.name}
            style={{
              padding: '8px 16px',
              backgroundColor: index === 0 ? '#4CAF50' : '#2196F3',
              color: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {player.name}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>Current Bowler:</strong> {bowler?.name || 'None selected'}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Team Management</h4>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="Enter team name"
            style={{ padding: '8px' }}
          />
          <button
            onClick={() => {
              if (newTeamName.trim()) {
                handleSaveTeam(newTeamName.trim());
                setNewTeamName('');
              }
            }}
            style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Save Team
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {savedTeams.map((team) => (
            <button
              key={team.name}
              onClick={() => handleLoadTeam(team)}
              style={{
                padding: '8px 16px',
                backgroundColor: team.name === currentTeam ? '#4CAF50' : '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleTeamConfirm}
        style={{
          padding: '12px 24px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Confirm Team
      </button>
    </div>
  );
}