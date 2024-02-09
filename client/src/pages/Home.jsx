import React, { useState, useEffect } from "react";
import { getGames, getTeams } from "../utils/API";
import { useNavigate } from "react-router-dom";
import dotaImg from "../assets/images/dota2logo.jpeg";
import './../App.css';

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

  const teamLogoMap = teams.reduce((map, team) => {
    map[team.team_id] = team.logo_url;
    return map;
  }, {});

  const handleMatchClick = (match) => {
    navigate(`/match/${match.match_id}`);
  };

  return (
    <div className="matches-page">
      <div className="upcoming-matches-container">
        <h2>Upcoming Matches</h2>
        {/* Implement the actual rendering of upcoming matches here */}
      </div>
      <div className="past-matches-container">
        <h2>Past Matches</h2>
        {matches.map((match) => (
          <div
            key={match.match_id}
            className="match-card"
            onClick={() => handleMatchClick(match)}
          >
            <img
              src={teamLogoMap[match.radiant_team_id] || dotaImg}
              alt={`Radiant Team Logo for Match ${match.match_id}`}
            />
            <div className="vs">VS</div>
            <img
              src={teamLogoMap[match.dire_team_id] || dotaImg}
              alt={`Dire Team Logo for Match ${match.match_id}`}
            />
            {/* Include additional match details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
