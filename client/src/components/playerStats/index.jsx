// PlayerStats.jsx

import React from "react";
import "./PlayerStats.css";

export default function PlayerStats({ player }) {
  return (
    <div className="player-stats-container">
      <h3>{player.name}</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hero</td>
            <td>{player.hero_id}</td>
          </tr>
          <tr>
            <td>Level</td>
            <td>{player.level}</td>
          </tr>
          <tr>
            <td>K/D/A</td>
            <td>
              {player.kills}/{player.deaths}/{player.assists}
            </td>
          </tr>
          <tr>
            <td>Total Gold</td>
            <td>{player.total_gold}</td>
          </tr>
          <tr>
            <td>Gold Per Minute</td>
            <td>{player.gold_per_min}</td>
          </tr>
          <tr>
            <td>Player Damage</td>
            <td>{player.hero_damage}</td>
          </tr>
        </tbody>
      </table>

      {/* Displaying item photos */}
      <div className="item-photos">
        {Array.from({ length: 6 }, (_, index) => (
          <img
            key={`${player.personaname}_item_${index}`}
            src={`https://example.com/items/${player[`item_${index}`]}`}
            alt={`Item ${index + 1}`}
            className="item-photo"
          />
        ))}
        <img
          key={`${player.personaname}_item_neutral`}
          src={`https://example.com/items/${player.item_neutral}`}
          alt="Neutral Item"
          className="item-photo"
        />
      </div>
    </div>
  );
}
