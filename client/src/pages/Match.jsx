import React, { useEffect, useState } from "react";
import { getSingleGame, getTeams } from "../utils/API";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import PlayerStats from "../components/playerStats";
import dotaImg from "../assets/images/dota2logo.jpeg";
import "../components/playerStats/playerStats.css";
import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";
import { QUERY_MATCH_COMMENTS } from "../utils/queries";
import Auth from "../utils/auth";

const Match = () => {
  const [match, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { matchid } = useParams();

  //runs the query on the comments that match the param matchid. this brings in comments that only apply to this match
  const {
    loading,
    error,
    data: matchData,
  } = useQuery(QUERY_MATCH_COMMENTS, {
    variables: { matchId: matchid },
  });

  //fetches the game from the api using the matchid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleGame(matchid);
        //if no match is returned throws an error
        if (data) {
          setMatches(data);
          setDataLoaded(true);
        } else {
          throw new Error("No match exists with that ID");
        }
      } catch (err) {
        console.error("Error fetching Matches API:", err);
      }
    };
    fetchData();
  }, [matchid]);
  //fetches teams from the api
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
  // allows loading of the api without throwing error
  if (!teams) {
    return <div>Loading...</div>;
  }
  //maps the logo to the team based on id this allows for 1 api call instead of 2, since our calls are limited
  const teamLogoMap = teams.reduce((map, team) => {
    map[team.team_id] = team.logo_url;
    return map;
  }, {});
  //waits to load in the match data to avoid errors
  if (!dataLoaded) {
    return <div>Loading...</div>;
  }
  //filters the players into their respective teams
  const radiantPlayers = match.players.filter((player) => player.isRadiant);
  const direPlayers = match.players.filter((player) => !player.isRadiant);
  //loading and error check for the gql query
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching comments:", error);
    return <p>Error fetching comments</p>;
  }
  const comments = matchData.comments;
  console.log(match);
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
      <div className="match-comments-container">
        <h2>Match Comments</h2>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentList key={comment._id} comment={comment} />
          ))
        ) : (
          <p>There are no comments yet. Be the first!</p>
        )}
        {Auth.loggedIn() ? <CommentForm /> : <p>Please loggin to Commment</p>}
      </div>
    </div>
  );
};

export default Match;
