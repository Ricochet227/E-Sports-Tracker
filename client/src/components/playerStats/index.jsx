// import "./PlayerStats.css";
import { getAllHeroes, getAllItems } from "../../utils/API";
import React, { useEffect, useState } from "react";
import noItemImg from "../../assets/images/noItem.png";

export default function PlayerStats({ player }) {
  const [heroes, setHeroes] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHeroes();
        setHeroes(data);
      } catch (error) {
        console.error("Error fetching Matches API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching Matches API:", error);
      }
    };

    fetchData();
  }, []);

  const foundHero = heroes.find((hero) => hero.id === player.hero_id);
  const itemSlots = [
    "item_0",
    "item_1",
    "item_2",
    "item_3",
    "item_4",
    "item_5",
    "item_neutral",
  ];

  let foundItems = {};

  if (typeof items === "object" && Object.keys(items).length > 0) {
    itemSlots.forEach((slot) => {
      const itemId = player[slot];

      const foundItem = Object.values(items).find((item) => item.id === itemId);

      if (foundItem) {
        foundItems[slot] = foundItem;
      }
    });
  }

  if (
    !foundHero ||
    !foundItems ||
    Object.values(foundItems).some((item) => !item)
  ) {
    return (
      <tr>
        <td>"Loading..."</td>
      </tr>
    );
  }
  const heroName = foundHero.name.split("npc_dota_hero_").pop();
  return (
    <tr key={player.account_id}>
      <td>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
          alt={heroName}
        />
      </td>
      <td>{player.name ? player.name : player.personaname}</td>
      <td>{player.level}</td>
      <td>
        <div className="item-photos">
          {itemSlots.map((slot) => (
            <img
              key={`${player.personaname}_${slot}`}
              src={
                foundItems[slot]
                  ? `https://cdn.cloudflare.steamstatic.com/${foundItems[slot]?.img}`
                  : noItemImg
              }
              alt=""
              className="item-photo"
            />
          ))}
        </div>
      </td>
      <td>{`${player.kills}/${player.deaths}/${player.assists}`}</td>
      <td>{player.total_gold}</td>
      <td>{player.gold_per_min}</td>
      <td>{player.hero_damage}</td>
    </tr>
  );
}
