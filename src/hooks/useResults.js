import { useState, useEffect } from "react";
import client from "../api/client";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //for search
  const searchApi = async (searchTerm) => {
    try {
      const response = await client.get("/country", {
        params: {
          limit: 50,
          term: searchTerm,
        },
      });
      setResults(response.data);
      // console.log(response.data.businesses);
    } catch (e) {
      setErrorMessage("Something went wrong");
    }
  };
  //call searchApi when component
  //is first rendered, BadCode!!
  //searchApi('pasta');
  useEffect(() => {
    searchApi("India");
  }, []);
  return [searchApi, results, errorMessage];
};
