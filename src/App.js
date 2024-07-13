// src/App.js
import React, { useState } from 'react';
import PlayerList from './components/PlayerList';
import LineupGrid from './components/LineupGrid';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Liam Martin\nForward 72', status: 'roster' },
    { id: 2, name: 'Marino McGalla\nDefense 7', status: 'roster' },
    { id: 3, name: 'Andy McKenna\nForward 17', status: 'roster' },
    { id: 4, name: 'Avery Austin\nForward 6', status: 'roster' },
    { id: 5, name: 'Mike Frank\nForward 26', status: 'substitute' },
    { id: 6, name: 'Bobby Dick\nDefense 91', status: 'roster' },
    { id: 7, name: 'Sean Wilson\nDefense 61', status: 'roster' },
    { id: 8, name: 'Ethan Yang\nForward 14', status: 'out' },
    { id: 9, name: 'Steve Schubert\nGoalie 18', status: 'roster' },
    { id: 10, name: 'Dennis Evanko\nForward 77', status: 'roster' },
    { id: 11, name: 'Alex Weidner\nDefense 2', status: 'roster' },
    { id: 12, name: 'Joe Cole\nForward 9', status: 'roster' },
    { id: 13, name: 'Nick Sotos\nForward 11', status: 'roster'},
  ]);

  const [lineup, setLineup] = useState({
    forwards: [
      { left: null, center: null, right: null },
      { left: null, center: null, right: null },
      { left: null, center: null, right: null },
    ],
    defense: [
      { left: null, right: null },
      { left: null, right: null },
    ],
    goalie: null,
  });

  const handleDrop = (lineType, lineIndex, position, playerId) => {
    const player = players.find(p => p.id === parseInt(playerId));
    setLineup(prevLineup => {
      if (lineType === 'goalie') {
        return { ...prevLineup, goalie: player };
      }
      const newLines = [...prevLineup[lineType]];
      newLines[lineIndex] = { ...newLines[lineIndex], [position]: player };
      return { ...prevLineup, [lineType]: newLines };
    });
    setPlayers(players.filter(p => p.id !== parseInt(playerId)));
  };

  const handleRemove = (lineType, lineIndex, position) => {
    let removedPlayer;
    setLineup(prevLineup => {
      if (lineType === 'goalie') {
        removedPlayer = prevLineup.goalie;
        return { ...prevLineup, goalie: null };
      }
      const newLines = [...prevLineup[lineType]];
      removedPlayer = newLines[lineIndex][position];
      newLines[lineIndex] = { ...newLines[lineIndex], [position]: null };
      return { ...prevLineup, [lineType]: newLines };
    });
    if (removedPlayer) {
      setPlayers(prevPlayers => [...prevPlayers, removedPlayer]);
    }
  };

  return (
    <div className="App">
      <h1>Hockey Bot Lineup Builder</h1>
      <div className="container">
        <PlayerList players={players} />
        <LineupGrid lineup={lineup} onDrop={handleDrop} onRemove={handleRemove} />
      </div>
    </div>
  );
};

export default App;