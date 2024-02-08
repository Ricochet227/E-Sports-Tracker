import React, { useEffect, useState } from "react";
import { getSingleGame } from "../utils/API";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PlayerStats from "../components/playerStats";

const Match = () => {
  const [match, setMatches] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { matchid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleGame(matchid);
        setMatches(data);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching Matches API:", error);
      }
    };

    fetchData();
  }, [matchid]);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  console.log(match);

  const radiantPlayers = match.players.filter((player) => player.isRadiant);

  return (
    <div>
      <h2>Match Details</h2>

      {/* Render stats for each player on the radiant team */}
      {radiantPlayers.map((player) => (
        <PlayerStats key={player.account_id} player={player} />
      ))}
    </div>
  );
};

export default Match;
