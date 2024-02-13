import React, { useState, useEffect } from "react";
import { getGames, getTeams } from "../utils/API";
import { useNavigate } from "react-router-dom";
import dotaImg from "../assets/images/dota2logo.jpeg";
import Error from "../pages/Error";
import "./../App.css";
import { dateFormat } from "../utils/dateFormat";

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //fetches match data from api
  useEffect(() => {
    getGames()
      .then((data) => {
        const sortedMatches = data.sort((a, b) => b.start_time - a.start_time);
        setMatches(sortedMatches);
      })
      .catch((error) => {
        console.error("Error fetching Matches API:", error);
        setError("Failed to load upcoming matches.");
      });
  }, []);
  //fetches team data from api
  useEffect(() => {
    getTeams()
      .then((data) => setTeams(data))
      .catch((error) => {
        console.error("Error fetching Teams API:", error);
        setError("Failed to load teams information.");
      });
  }, []);
  //maps team logos to team_id provided by matches
  const teamLogoMap = teams.reduce((map, team) => {
    map[team.team_id] = team.logo_url;
    return map;
  }, {});
  //maps team names to team_id's provided by the matches
  const teamNameMap = teams.reduce((map, team) => {
    map[team.team_id] = team.name;
    return map;
  }, {});
  //on clicked navigates to the match using the match_id
  const handleMatchClick = (match) => {
    navigate(`/match/${match.match_id}`);
  };

  if (error) {
    return <Error message={error} />;
  }

  console.log(teams, matches);

  return (
    <div className="matches-page">
      <div className="past-matches-container">
        <h2>Past Matches</h2>
        {matches.map((match) => (
          <div key={match.match_id}>
            <div className="match-card" onClick={() => handleMatchClick(match)}>
              <div className="match-card-img">
                <img
                  src={teamLogoMap[match.radiant_team_id] || dotaImg}
                  alt={`Radiant Team Logo for Match ${match.match_id}`}
                />
                <h2>{teamNameMap[match.radiant_team_id] || "No Name"}</h2>
              </div>
              <div className="vs">VS</div>
              <div className="match-card-img">
                <img
                  src={teamLogoMap[match.dire_team_id] || dotaImg}
                  alt={`Dire Team Logo for Match ${match.match_id}`}
                />
                <h2>{teamNameMap[match.dire_team_id] || "No Name"}</h2>
              </div>
            </div>
            <p>
              {(() => {
                const milis = match.start_time * 1000;
                return dateFormat(milis);
              })()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
