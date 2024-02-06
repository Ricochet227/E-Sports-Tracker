import axios from "axios";
const API = import.meta.env.VITE_API_KEY;
const upcomingOptions = {
  method: "GET",
  url: "https://api.pandascore.co/lol/matches/upcoming",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API}`,
  },
};

const AllMatchesOptions = {
  method: "GET",
  url: "https://api.pandascore.co/lol/matches",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API}`,
  },
};

const currentMatchesOptions = {
  method: "GET",
  url: "https://api.pandascore.co/lol/matches/running",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API}`,
  },
};

const upcoming = async () => {
  const data = await axios
    .request(upcomingOptions)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
};

const singleMatch = async (id) => {
  const singleMatchOptions = {
    method: "GET",
    url: `https://api.pandascore.co/lol/matches/${id}`,
    headers: {
      accept: "application/json",
      authorization: `Bearer ${API}`,
    },
  };
  const data = await axios
    .request(singleMatchOptions)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
};

const allMatches = async () => {
  const data = await axios
    .request(AllMatchesOptions)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
};

const currentMatches = () => {
  axios
    .request(currentMatchesOptions)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export { upcoming, singleMatch, allMatches, currentMatches };
