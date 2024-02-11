import React, { useState, useEffect } from "react";
import { getGames, getTeams } from "../utils/API";
import { useNavigate } from "react-router-dom";
import dotaImg from "../assets/images/dota2logo.jpeg";
import Error from "../pages/Error";
import './../App.css';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getGames()
      .then((data) => setMatches(data))
      .catch((error) => {
        console.error("Error fetching Matches API:", error);
        setError("Failed to load upcoming matches.");
      });
  }, []);

  useEffect(() => {
    getTeams()
      .then((data) => setTeams(data))
      .catch((error) => {
        console.error("Error fetching Teams API:", error);
        setError("Failed to load teams information.");
      });
  }, []);

  const teamLogoMap = teams.reduce((map, team) => {
    map[team.team_id] = team.logo_url;
    return map;
  }, {});

  const handleMatchClick = (match) => {
    navigate(`/match/${match.match_id}`);
  };

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="matches-page">
      {/* You may want to implement upcoming matches similarly */}
      <div className="upcoming-matches-container">
        <h2>Upcoming Matches</h2>
      </div>
      <div className="past-matches-container">
        <h2>Past Matches</h2>
        {matches.map((match) => (
          <div key={match.match_id}>
            <div
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
            </div>
            <CommentForm matchId={match.match_id} />
            <CommentList matchId={match.match_id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
