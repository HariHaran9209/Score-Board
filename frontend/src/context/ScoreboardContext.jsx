import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Predefined players
const predefinedPlayers = {
  batsmen: [
    { name: 'Virat Kohli', role: 'batsman' },
    { name: 'Rohit Sharma', role: 'batsman' },
    { name: 'KL Rahul', role: 'batsman' },
    { name: 'Shreyas Iyer', role: 'batsman' },
    { name: 'Hardik Pandya', role: 'batsman' },
    { name: 'Rishabh Pant', role: 'batsman' },
    { name: 'Suryakumar Yadav', role: 'batsman' },
    { name: 'Ishan Kishan', role: 'batsman' },
    { name: 'Deepak Hooda', role: 'batsman' },
    { name: 'Shubman Gill', role: 'batsman' }
  ],
  bowlers: [
    { name: 'Jasprit Bumrah', role: 'bowler' },
    { name: 'Mohammed Shami', role: 'bowler' },
    { name: 'Mohammed Siraj', role: 'bowler' },
    { name: 'Umran Malik', role: 'bowler' },
    { name: 'Bhuvneshwar Kumar', role: 'bowler' },
    { name: 'Ravindra Jadeja', role: 'bowler' },
    { name: 'Ravichandran Ashwin', role: 'bowler' },
    { name: 'Axar Patel', role: 'bowler' },
    { name: 'Yuzvendra Chahal', role: 'bowler' },
    { name: 'Arshdeep Singh', role: 'bowler' }
  ]
};

const ScoreboardContext = createContext();

export const ScoreboardProvider = ({ children }) => {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState('0.0');
  const [balls, setBalls] = useState(0);
  const [batsmen, setBatsmen] = useState([]);
  const [bowler, setBowler] = useState(null);
  const [onStrike, setOnStrike] = useState(null);
  const [nonStrike, setNonStrike] = useState(null);
  const [availableBatsmen, setAvailableBatsmen] = useState(predefinedPlayers.batsmen);
  const [availableBowlers, setAvailableBowlers] = useState(predefinedPlayers.bowlers);
  const [matchTime, setMatchTime] = useState(0);
  const [showNextBatsmanModal, setShowNextBatsmanModal] = useState(false);
  const [showNextBowlerModal, setShowNextBowlerModal] = useState(false);
  const [savedTeams, setSavedTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);

  // Initialize players when component mounts
  useEffect(() => {
    // Load saved teams from localStorage
    const saved = localStorage.getItem('cricketScoreboardTeams');
    if (saved) {
      setSavedTeams(JSON.parse(saved));
    }
  }, []);

  const resetMatch = () => {
    // Reset all game stats
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setOvers('0.0');
    setMatchTime(0);
    
    // Reset players and positions
    setBatsmen([]);
    setBowler(null);
    setOnStrike(null);
    setNonStrike(null);

    // Reset modals
    setShowNextBatsmanModal(false);
    setShowNextBowlerModal(false);

    // Reset available players to predefined lists with default stats
    setAvailableBatsmen(predefinedPlayers.batsmen.map(batsman => ({
      ...batsman,
      runs: 0,
      balls: 0
    })));
    setAvailableBowlers(predefinedPlayers.bowlers.map(bowler => ({
      ...bowler,
      runsGiven: 0,
      wickets: 0
    })));

    // Initialize with fresh stats
    if (availableBowlers.length > 0) {
      const firstBowler = availableBowlers[0];
      setBowler({ ...firstBowler, runsGiven: 0, wickets: 0 });
    }
  };

  const selectBatsman = (name) => {
    const batsman = availableBatsmen.find(b => b.name === name);
    if (batsman) {
      // Add the batsman to the team with default stats
      setBatsmen(prev => [...prev, { ...batsman, runs: 0, balls: 0 }]);
      
      // Remove from available batsmen
      setAvailableBatsmen(prev => prev.filter(b => b.name !== name));
      
      // Set striker position if first batsman
      if (batsmen.length === 1) {
        setOnStrike(0);
      }
      
      // Set non-striker position if second batsman
      if (batsmen.length === 2) {
        setNonStrike(1);
      }
    }
  };

  const selectBowler = (name) => {
    const bowler = availableBowlers.find(b => b.name === name);
    if (bowler) {
      // Set the bowler with fresh stats
      setBowler({ ...bowler, runsGiven: 0, wickets: 0 });
      setShowNextBowlerModal(false);
    }
  };

  const setNextBatsman = (name) => {
    const batsman = availableBatsmen.find(b => b.name === name);
    if (batsman) {
      // Add the new batsman to the team with default stats
      setBatsmen(prev => [...prev, { ...batsman, runs: 0, balls: 0 }]);
      
      // Remove from available batsmen
      setAvailableBatsmen(prev => prev.filter(b => b.name !== name));
      
      // Set the new batsman as striker
      setOnStrike(prev => {
        if (prev === null) {
          return batsmen.length - 1; // Last batsman is striker
        }
        return prev;
      });
      
      // If this is the first wicket, set the non-striker
      if (nonStrike === null && batsmen.length === 2) {
        setNonStrike(0);
      }
      
      // Close the modal
      setShowNextBatsmanModal(false);
    }
  };

  const setNextBowler = (name) => {
    const bowler = availableBowlers.find(b => b.name === name);
    if (bowler) {
      // Set the bowler with fresh stats
      setBowler({ ...bowler, runsGiven: 0, wickets: 0 });
      setShowNextBowlerModal(false);
    }
  };

  const addWicket = () => {
    if (wickets >= 10) return; // Can't have more than 10 wickets
    
    // Update game stats
    setWickets(prev => prev + 1);
    
    // Remove the current striker from batsmen and add to available batsmen
    if (onStrike !== null && batsmen[onStrike]) {
      const striker = batsmen[onStrike];
      setAvailableBatsmen(prev => [...prev, { ...striker, runs: 0, balls: 0 }]);
      setBatsmen(prev => prev.filter((_, i) => i !== onStrike));
    }
    
    // Clear the striker position
    setOnStrike(null);
    
    // Show next batsman selection modal
    setShowNextBatsmanModal(true);
  };

  const addRun = (run) => {
    if (!currentBatsman) return;

    setRuns(prev => prev + run);
    setBalls(prev => {
      const newBalls = prev + 1;
      setOvers(`${Math.floor(newBalls / 6)}.${newBalls % 6}`);
      return newBalls;
    });

    // Update batsman's stats
    setBatsmen(prev => {
      const newBatsmen = [...prev];
      const striker = newBatsmen[onStrike];
      if (striker) {
        newBatsmen[onStrike] = { ...striker, runs: striker.runs + run, balls: striker.balls + 1 };
      }
      return newBatsmen;
    });

    // Update bowler's stats
    if (bowler) {
      setBowler(prev => ({
        ...prev,
        runsGiven: prev.runsGiven + run
      }));
    }

    // Switch strike on odd runs
    if (run % 2 !== 0) {
      switchStrike();
    }

    // Check if this is the end of an over
    if (balls % 6 === 0 && balls > 0) {
      // Show next bowler selection modal
      setShowNextBowlerModal(true);
    }
  };

  const switchStrike = () => {
    if (batsmen.length < 2) return;
    
    // Get current positions
    const currentStriker = batsmen[onStrike];
    const currentNonStriker = batsmen[nonStrike];

    // Switch positions
    setOnStrike(prev => {
      if (prev === 0) return 1;
      if (prev === 1) return 0;
      return prev;
    });
    setNonStrike(prev => {
      if (prev === 0) return 1;
      if (prev === 1) return 0;
      return prev;
    });
  };

  const addPlayer = (name, role) => {
    if (role === 'batsman') {
      setAvailableBatsmen(prev => [...prev, { name, role, runs: 0, balls: 0 }]);
    } else if (role === 'bowler') {
      setAvailableBowlers(prev => [...prev, { name, role, runsGiven: 0, wickets: 0 }]);
    }
  };

  const saveTeam = (teamName) => {
    const team = {
      name: teamName,
      batsmen: [...batsmen],
      bowlers: [...availableBowlers]
    };
    setSavedTeams(prev => [...prev, team]);
  };

  const loadTeam = (team) => {
    setBatsmen(team.batsmen);
    setAvailableBatsmen(team.batsmen);
    setAvailableBowlers(team.bowlers);
    setCurrentTeam(team.name);
  };

  const dotBall = () => {
    if (onStrike === null || !batsmen[onStrike]) return;
    
    setBalls(prev => prev + 1);
    setOvers(`${Math.floor((prev + 1) / 6)}.${(prev + 1) % 6}`);
    setBatsmen(prev => {
      const updated = [...prev];
      updated[onStrike] = {
        ...updated[onStrike],
        balls: updated[onStrike].balls + 1
      };
      return updated;
    });
  };

  const addWide = () => {
    setRuns(prev => prev + 1);
    setBowler(prev => ({ ...prev, runsGiven: prev?.runsGiven + 1 }));
  };

  const addNoBall = () => {
    setRuns(prev => prev + 1);
    setBowler(prev => ({ ...prev, runsGiven: prev?.runsGiven + 1 }));
  };

  const battingStats = useMemo(() => {
    return batsmen.reduce((stats, player, index) => {
      stats[player.name] = {
        runs: player.runs || 0,
        balls: player.balls || 0,
        strikeRate: player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : 0,
        isOnStrike: index === onStrike,
        isNonStrike: index === nonStrike
      };
      return stats;
    }, {});
  }, [batsmen, onStrike, nonStrike]);

  const currentBatsman = useMemo(() => {
    return batsmen[onStrike]?.name;
  }, [batsmen, onStrike]);

  const value = {
    runs,
    wickets,
    overs,
    balls,
    batsmen,
    bowler,
    onStrike,
    nonStrike,
    setOnStrike,
    setNonStrike,
    battingStats,
    currentBatsman,
    availableBatsmen,
    availableBowlers,
    showNextBatsmanModal,
    showNextBowlerModal,
    setShowNextBatsmanModal,
    setShowNextBowlerModal,
    addRun,
    dotBall,
    addWicket,
    addWide,
    addNoBall,
    switchStrike,
    resetMatch,
    addPlayer,
    selectBatsman,
    selectBowler,
    setNextBatsman,
    setNextBowler,
    savedTeams,
    currentTeam,
    saveTeam,
    loadTeam
  };

  return (
    <ScoreboardContext.Provider value={value}>
      {children}
    </ScoreboardContext.Provider>
  );
};

export const useScoreboard = () => {
  const context = useContext(ScoreboardContext);
  if (context === undefined) {
    throw new Error('useScoreboard must be used within a ScoreboardProvider');
  }
  return context;
};