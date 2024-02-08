import React from "react";

export default function PlayerStats({ player }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "300px",
      }}
    >
      <h3>{player.name}</h3>
      <p>Hero: {player.hero_id}</p>
      <p>Level: {player.level}</p>
      <p>
        K/D/A: {player.kills}/{player.deaths}/{player.assists}
      </p>
      <p>Total Gold: {player.total_gold}</p>
      <p>Gold Per Minute: {player.gold_per_min}</p>
      <p>Player Damage: {player.hero_damage}</p>

      {/* Displaying item photos */}
      <div style={{ display: "flex" }}>
        <img
          key={`${player.personaname}_item_0`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
        <img
          key={`${player.personaname}_item_1`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
        <img
          key={`${player.personaname}item_2`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
        <img
          key={`${player.personaname}_item_3`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
        <img
          key={`${player.personaname}_item_4`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
        <img
          key={`${player.personaname}_item_5`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
        <img
          key={`${player.personaname}_item_neutral`}
          src={
            `https://example.com/items/${player.item_0}` /* Replace with actual item URL */
          }
          alt={`Item`}
          style={{ marginRight: "5px", width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
}
