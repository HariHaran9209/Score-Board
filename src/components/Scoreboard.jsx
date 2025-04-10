import React, { useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web';
import '../css/Scoreboard.css'
import { useScoreboard } from '../context/ScoreboardContext';

export const CricketScoreboard = () => {
  const { 
    runs, 
    wickets, 
    overs, 
    balls,
    batsmen, 
    bowler, 
    onStrike, 
    nonStrike, 
    battingStats,
    currentBatsman,
    addRun, 
    dotBall, 
    addWicket, 
    addWide, 
    addNoBall, 
    switchStrike, 
    resetMatch,
    showNextBatsmanModal,
    showNextBowlerModal,
    setShowNextBatsmanModal,
    setShowNextBowlerModal,
    setNextBatsman,
    setNextBowler,
    availableBatsmen,
    availableBowlers
  } = useScoreboard();

  const [matchTime, setMatchTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  useEffect(() => {
    console.log('Scoreboard state:', { batsmen, onStrike, nonStrike });
  }, [batsmen, onStrike, nonStrike]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleNextBatsman = (name) => {
    setNextBatsman(name);
    setShowNextBatsmanModal(false);
  };

  const handleNextBowler = (name) => {
    setNextBowler(name);
    setShowNextBowlerModal(false);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Outfit, sans-serif', maxWidth: '900px', margin: '0 auto', background: '#f8f9fa', borderRadius: '16px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', color: '#1e88e5', marginBottom: '20px' }}>🏏 Cricket Scoreboard</h1>
      <div style={{ marginBottom: '30px', fontSize: '24px', textAlign: 'center', color: '#333' }}>
        <strong>Score:</strong>
        {runs}
        /
        {wickets}
        (
        {overs} overs)
      </div>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#555", textAlign: 'center' }}>
        🕒 Match Time: {formatTime(matchTime)}
      </p>

      <h3 style={{ color: '#333', textAlign: 'center' }}>Batsmen</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {batsmen && batsmen.length >= 2 && (
          <>
            <div
              key={0}
              style={{
                border: '2px solid #dfe3e8',
                borderRadius: '12px',
                padding: '16px',
                width: '180px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                background: onStrike === 0 ? '#e0f7fa' : '#ffffff',
                position: 'relative'
              }}
            >
              {onStrike === 0 && (
                <div style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  *
                </div>
              )}
              <strong>{batsmen[0]?.name}</strong>
              <div>Runs: {batsmen[0]?.runs || 0}</div>
              <div>Balls: {batsmen[0]?.balls || 0}</div>
              <div>SR: {battingStats?.[batsmen[0]?.name]?.strikeRate || 0}</div>
            </div>

            <div
              key={1}
              style={{
                border: '2px solid #dfe3e8',
                borderRadius: '12px',
                padding: '16px',
                width: '180px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                background: onStrike === 1 ? '#e0f7fa' : '#ffffff',
                position: 'relative'
              }}
            >
              {onStrike === 1 && (
                <div style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  *
                </div>
              )}
              <strong>{batsmen[1]?.name}</strong>
              <div>Runs: {batsmen[1]?.runs || 0}</div>
              <div>Balls: {batsmen[1]?.balls || 0}</div>
              <div>SR: {battingStats?.[batsmen[1]?.name]?.strikeRate || 0}</div>
            </div>
          </>
        )}
      </div>

      <h3 style={{ marginTop: '30px', color: '#333', textAlign: 'center' }}>Bowler</h3>
      <div style={{ border: '2px solid #dfe3e8', borderRadius: '12px', padding: '16px', width: '240px', margin: '0 auto', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <strong>{bowler?.name || 'No bowler selected'}</strong>
        <div>Runs: {bowler?.runsGiven || 0}</div>
        <div>Wickets: {bowler?.wickets || 0}</div>
        <div>Economy: {overs > 0 ? (bowler?.runsGiven / parseFloat(overs) || 0).toFixed(2) : 0}</div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {[0, 1, 2, 3, 4, 6].map(run => (
          <button key={run} onClick={() => addRun(run)} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {run} Run{run !== 1 ? 's' : ''}
          </button>
        ))}
        <button onClick={dotBall} style={{ padding: '8px 16px', backgroundColor: '#9E9E9E', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Dot Ball
        </button>
        <button onClick={addWicket} style={{ padding: '8px 16px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Wicket
        </button>
        <button onClick={switchStrike} style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Switch Striker
        </button>
        <button onClick={resetMatch} style={{ padding: '8px 16px', backgroundColor: '#e53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Reset Match
        </button>
      </div>

      {/* Next Batsman Modal */}
      {showNextBatsmanModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Select Next Batsman</h3>
            <div style={{ marginBottom: '15px' }}>
              {availableBatsmen.map((player) => (
                <button
                  key={player.name}
                  onClick={() => handleNextBatsman(player.name)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'background-color 0.3s'
                  }}
                >
                  {player.name}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => {
                  if (batsmen.length < 11) {
                    alert('Please select a batsman from the list');
                  } else {
                    alert('All batsmen have been dismissed');
                  }
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Skip
              </button>
              <button
                onClick={() => {
                  setShowNextBatsmanModal(false);
                  // If no batsman was selected, set the previous striker as non-striker
                  if (onStrike !== null) {
                    setNonStrike(prev => prev === null ? onStrike : prev);
                  }
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Bowler Modal */}
      {showNextBowlerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Select Next Bowler</h3>
            <div style={{ marginBottom: '15px' }}>
              {availableBowlers.map((player) => (
                <button
                  key={player.name}
                  onClick={() => handleNextBowler(player.name)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '8px',
                    backgroundColor: '#9C27B0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'background-color 0.3s'
                  }}
                >
                  {player.name}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => {
                  setShowNextBowlerModal(false);
                  // If no bowler was selected, keep the current bowler
                  if (bowler) {
                    setBowler(prev => ({ ...prev, runsGiven: prev.runsGiven, wickets: prev.wickets }));
                  }
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Skip
              </button>
              <button
                onClick={() => setShowNextBowlerModal(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
  transition: '0.3s',
};