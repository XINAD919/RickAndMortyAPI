require("dotenv").config();
const defaulUrl = process.env.BASEURI_API;

const getCharacters = async () => {
  try {
    const response = await fetch(defaulUrl + "/character");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching data:", error);
    throw error;
  }
};

const getLocations = async () => {
  try {
    const response = await fetch(defaulUrl + "/location");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching data:", error);
    throw error;
  }
};

const getEpisodes = async () => {
  try {
    const response = await fetch(defaulUrl + "/episode");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching data:", error);
    throw error;
  }
};

export { getCharacters, getEpisodes, getLocations };
