// src/components/PlayerList.js
import React from 'react';

const PlayerList = ({ players }) => {
  const onDragStart = (e, playerId) => {
    e.dataTransfer.setData('playerId', playerId);
  };

  return (
    <div className="player-list">
      <h2>Available Players</h2>
      <div className="player-list-content">
        {players.map(player => (
          <div
            key={player.id}
            className={`player player-${player.status}`}
            draggable
            onDragStart={(e) => onDragStart(e, player.id)}
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;