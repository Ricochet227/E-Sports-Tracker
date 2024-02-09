import React, { useEffect, useState, useRef } from "react";
import { getSingleGame, getTeams } from "../utils/API";
import { useParams } from "react-router-dom";
import PlayerStats from "../components/playerStats";
import dotaImg from "../assets/images/dota2logo.jpeg";
import "../components/playerStats/playerStats.css";
import Error from "../pages/Error";

const Match = () => {
  const [match, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { matchid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleGame(matchid);
        if (data) {
          setMatches(data);
          setDataLoaded(true);
        } else {
          throw new Error("No data returned");
        }
      } catch (error) {
        console.error("Error fetching Matches API:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, [matchid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!teams) {
    return <div>Loading...</div>;
  }

  const teamLogoMap = teams.reduce((map, team) => {
    map[team.team_id] = team.logo_url;
    return map;
  }, {});

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  console.log(match);

  const radiantPlayers = match.players.filter((player) => player.isRadiant);
  const direPlayers = match.players.filter((player) => !player.isRadiant);

  return (
    <div className="match-container">
      <div className="player-stats-container">
        <div className="team-container">
          <img
            src={teamLogoMap[match.radiant_team_id] || dotaImg}
            alt={`Radiant Team Logo for Match ${match.match_id}`}
          />
          <h2>{match.radiant_name}</h2>
        </div>
        {match.radiant_win ? (
          <h2 className="winner">Radiant Victory</h2>
        ) : (
          <h2 className="loss">Radiant Loss</h2>
        )}
        <table className="stats-table">
          <thead>
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>Level</th>
              <th>Items</th>
              <th>K/D/A</th>
              <th>Gold</th>
              <th>GPM</th>
              <th>Player DMG</th>
            </tr>
          </thead>
          <tbody>
            {radiantPlayers.map((player) => (
              <PlayerStats key={player.account_id} player={player} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="player-stats-container">
        <div className="team-container">
          <img
            src={teamLogoMap[match.dire_team_id] || dotaImg}
            alt={`Dire Team Logo for Match ${match.match_id}`}
          />
          <h2>{match.dire_name}</h2>
        </div>
        {match.radiant_win ? (
          <h2 className="loss">Dire Loss</h2>
        ) : (
          <h2 className="winner">Dire Vicory</h2>
        )}
        <table className="stats-table">
          <thead>
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>Level</th>
              <th>Items</th>
              <th>K/D/A</th>
              <th>Gold</th>
              <th>GPM</th>
              <th>Player DMG</th>
            </tr>
          </thead>
          <tbody>
            {direPlayers.map((player) => (
              <PlayerStats key={player.account_id} player={player} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Match;
