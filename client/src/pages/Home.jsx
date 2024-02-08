import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_PANDASCORE_API_KEY; // Storing API key in environment variable
    const leagueId = 'LOL_LEAGUE_ID'; // Might need to redo this function many times to show lck, lpl, lec and lcs
    const upcomingEndpoint = `https://api.pandascore.co/leagues/${leagueId}/matches/upcoming?token=${apiKey}`;
    const pastEndpoint = `https://api.pandascore.co/leagues/${leagueId}/matches/past?token=${apiKey}`;

    const fetchMatches = async () => {
      try {
        const [upcomingResponse, pastResponse] = await Promise.all([
          axios.get(upcomingEndpoint),
          axios.get(pastEndpoint),
        ]);
        setUpcomingMatches(upcomingResponse.data);
        const pastMatchesWithWinners = pastResponse.data.map(match => {
            const winner = match.winner || match.teams.find(team => team.id === match.winner_id);
            return{
                ...match, 
                winner: winner ? winner.name : 'TBD' //Will need to replace name with what the api gives back somehow
            }
        })
        setPastMatches(pastMatchesWithWinners);
      } catch (error) {
        setError('Failed to load matches');
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to handle match card click, this will need to be updated based on where the stream URL is in the response or at all
  const handleMatchClick = (streamUrl) => {
    window.open(streamUrl, '_blank');
  };

  return (
    <div className="matches-page">
      <div className="upcoming-matches-container">
        <h2>Upcoming Matches</h2>
        {/* Map over upcomingMatches to render match details */}
      </div>
      <div className="past-matches-container">
        <h2>Past Matches</h2>
        {
  pastMatches.map((match) => (
    <div key={match.id} className="match-card">
      <h3>{match.name}</h3>
      <p>{match.teams.map(team => team.name).join(' vs ')}</p>
      <p>Winner: {match.winner}</p> {/* Display the winner here */}
    </div>
  ))
}
      </div>
    </div>
  );
};

export default HomePage;
