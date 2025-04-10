import React, { useState } from 'react';
import { useScoreboard } from '../context/ScoreboardContext';

export default function PickPlayers({ onTeamConfirmed }) {
  const { 
    availableBatsmen,
    availableBowlers,
    selectBatsman,
    selectBowler,
    batsmen,
    bowler,
    setOnStrike,
    setNonStrike
  } = useScoreboard();

  const handleConfirmTeam = () => {
    if (batsmen.length < 2) {
      alert('Please select at least 2 batsmen.');
      return;
    }
    if (!bowler) {
      alert('Please select a bowler.');
      return;
    }

    // Set initial striker and non-striker positions
    if (batsmen.length >= 2) {
      setOnStrike(0);
      setNonStrike(1);
    }

    onTeamConfirmed();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Select Players</h3>

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

      <button
        onClick={handleConfirmTeam}
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
