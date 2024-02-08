import React, { useState, useEffect } from "react";
import axios from "axios";
import { getGames, getTeams } from "../utils/API";
import { useNavigate } from "react-router-dom";
import dotaImg from "../assets/images/dota2logo.jpeg";

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGames()
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching Matches API:", error));
  }, []);

  useEffect(() => {
    getTeams()
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching Teams API:", error));
  }, []);
  if (matches) {
    console.log(matches, teams);
  }

  const teamLogoMap = teams.reduce((map, team) => {
    map[team.team_id] = team.logo_url;
    return map;
  }, {});

  const handleMatchClick = (match) => {
    // You can navigate to the next page or perform other actions here
    navigate(`/match/${match.match_id}`);
  };

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;

  return (
    <div className="matches-page">
      <div className="upcoming-matches-container">
        <h2>Upcoming Matches</h2>
        {/* Map over upcomingMatches to render match details */}
      </div>
      <div className="past-matches-container">
        <h2>Past Matches</h2>
        {matches.map((match) => (
          <div
            key={match.match_id}
            className="match-card"
            onClick={() => handleMatchClick(match)}
          >
            <h3></h3>
            <img
              src={teamLogoMap[match.radiant_team_id] || dotaImg}
              alt={`Radiant Team Logo for Match ${match.match_id}`}
            />
            <img
              src={teamLogoMap[match.dire_team_id] || dotaImg}
              alt={`Dire Team Logo for Match ${match.match_id}`}
            />
            {/* <p>{match.teams.map(team => team.name).join(' vs ')}</p>
      <p>Winner: {match.winner}</p> Display the winner here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
