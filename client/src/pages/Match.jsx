import React, { useEffect, useState } from "react";
import { getSingleGame } from "../utils/API";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PlayerStats from "../components/playerStats";
import Error from "../pages/Error";

const Match = () => {
  const [match, setMatches] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { matchid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleGame(matchid);
        if(data) {
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


  if (error) {
    return <Error message={Error} />;
  } 

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  

  console.log(match);

  const radiantPlayers = match.players.filter((player) => player.isRadiant);
  const direPlayers = match.players.filter((player) => !player.isRadiant);

  return (
    <div>
      <div></div>
      <div className="player-stats-container">
        <h2>Radiant Stats</h2>
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
        <h2>Dire Stats</h2>
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
