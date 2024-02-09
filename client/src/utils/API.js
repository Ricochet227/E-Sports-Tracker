import axios from "axios";

const getGames = async () => {
  try {
    const response = await axios.get(
      "https://api.opendota.com/api/leagues/15899/matches"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getTeams = async () => {
  try {
    const response = await axios.get(
      "https://api.opendota.com/api/leagues/15899/teams"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getSingleGame = async (matchid) => {
  try {
    const response = await axios.get(
      `https://api.opendota.com/api/matches/${matchid}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getAllHeroes = async () => {
  try {
    const response = await axios.get("https://api.opendota.com/api/heroes");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getAllItems = async () => {
  try {
    const response = await axios.get(
      "https://api.opendota.com/api/constants/items"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export { getGames, getTeams, getSingleGame, getAllHeroes, getAllItems };
