import React, { useEffect, useState } from "react";
import {
  upcoming,
  singleMatch,
  allMatches,
  currentMatches,
} from "../utils/API";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    upcoming()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (data) {
    console.log(...data);
  }

  return <main></main>;
};

export default Home;
