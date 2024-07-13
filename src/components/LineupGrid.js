// src/components/LineupGrid.js
import React from 'react';

const LineupGrid = ({ lineup, onDrop, onRemove }) => {
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, lineType, lineIndex, position) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData('playerId');
    onDrop(lineType, lineIndex, position, playerId);
  };

  const renderPosition = (lineType, lineIndex, position, label) => {
    let player;
    if (lineType === 'goalie') {
      player = lineup.goalie;
    } else {
      player = lineup[lineType][lineIndex][position];
    }

    return (
      <div
        className={`position ${player ? `player-${player.status}` : ''}`}
        onDragOver={onDragOver}
        onDrop={(e) => handleDrop(e, lineType, lineIndex, position)}
        onClick={() => player && onRemove(lineType, lineIndex, position)}
      >
        <span className="position-label">{label}</span>
        {player ? player.name : 'Empty'}
      </div>
    );
  };

  const renderForwardLine = (line, index) => (
    <div className="line forward-line" key={`forward-${index}`}>
      <div className="forwards">
        {renderPosition('forwards', index, 'left', 'LW')}
        {renderPosition('forwards', index, 'center', 'C')}
        {renderPosition('forwards', index, 'right', 'RW')}
      </div>
    </div>
  );

  const renderDefenseLine = (line, index) => (
    <div className="line defense-line" key={`defense-${index}`}>
      <div className="defense">
        {renderPosition('defense', index, 'left', 'LD')}
        {renderPosition('defense', index, 'right', 'RD')}
      </div>
    </div>
  );

  return (
    <div className="lineup-grid">
      <h2>Lineup</h2>
      <div className="forward-lines">
        <h3>Forwards</h3>
        {lineup.forwards.map(renderForwardLine)}
      </div>
      <div className="defense-lines">
        <h3>Defense</h3>
        {lineup.defense.map(renderDefenseLine)}
      </div>
      <div className="goalie-line">
        <h3>Goalie</h3>
        <div className="goalies">
          {renderPosition('goalie', 0, 'goalie', 'G')}
        </div>
      </div>
    </div>
  );
};

export default LineupGrid;