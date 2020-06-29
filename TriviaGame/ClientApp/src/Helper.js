import { useContext } from 'react';
import axios from 'axios';
//import { useHubConnectionContext } from "./Context.js";

// const { hubConnection, executeCommand } = useHubConnectionContext();

//const BASE_URL = 'https://localhost:44302';
const BASE_URL = 'http://localhost:5890';
// Open Trivia DB Categories
const categories = [
    'General Knowledge',
    // 'Arts & Literature',
    'Entertainment',
    'Science & Technology',
    // 'Sports & Vehicles',
    'World Knowledge'
];

const generateRoom = async () => {
    var url = `${BASE_URL}/api/Session/Generate`;
    var response = await axios.get(url);
    return response.data;
}

const joinRoom = async (name, room) => {
    //call server, try to add person to room
    console.log(`[JOINING ROOM] Name: ${name}, Room code: ${room}`);
    var url = `${BASE_URL}/api/Session/Join`;
    var newUser = { SessionId: room, Name: name };
    var response = await axios.post(url, newUser);
    return response;
}

const incrementGamePhase = async (room) => {
    var response = await axios.post(`${BASE_URL}/api/Session/IncrementGamePhase/${room}`);
    console.log(`[GAME STATE] Room code ${room} has incremented their game phase to ${response.data}`);
    return (response.data);
}

const getSessionMembers = async (room) => {
    var response = await axios.get(`${BASE_URL}/api/Session/Get/${room}`);
    return (response.data);
}

const getCategoryOptions = (numOptions) => {
    var options = new Set();
    while (options.size !== numOptions) {
        options.add(Object.keys(categories).find(key => categories[key] === randomInteger(9, 32)));
    }
    return options;
}

const getGamePhase = async (room) => {
    var response = await axios.get(`${BASE_URL}/api/Session/GetGamePhase/${room}`);
    return (response.data);
}

const getQuickstarter = async ({category, numQuestions=1, difficulty, type='multiple'}) => {
    //var url = `https://opentdb.com/api.php?amount=${numQuestions}`;
    // TODO: ADD SERVER SIDE VALIDATION FOR CATEGORY AND DIFFICULTY
    var url = `${BASE_URL}/api/Quickstarter/Get?numQuestions=${numQuestions}`
    if (category) {
        url += `&category=${category}`;
    }
    if (difficulty) {
        url += `&difficulty=${difficulty}`;
    }
    //url += `&type=${type}&encode=url3986`;
    // const validateCategory = new Set(Object.keys(categories));
    // if (!validateCategory.has(category)) {
    //     console.log(`category ${category} is not valid`);
    //     return null;
    // }
    // if (!["easy", "normal", "hard"].includes(difficulty)) {
    //     console.log(`difficulty ${difficulty} is not valid`);
    //     return null;
    // }
    var response = await axios.get(url);
    for (var i = 0; i < numQuestions; i++) {
        response.data[i].answers = JSON.parse(response.data[i].answers);
    }
    return response.data;
}

const getQuestions = async (room) => {
    var response = await axios.get(`${BASE_URL}/api/Session/GetCurrentQuestions/${room}`);
    return (response.data);
}

const checkAnswer = async (answer, id) => {
    var url = `${BASE_URL}/api/Quickstarter/Check?id=${id}`;
    var response = await axios.get(url);
    return (response.data);
}


/* HELPERS */

// Returns an integer random number between min (included) and max (included):
const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    categories,
    generateRoom,
    joinRoom,
    incrementGamePhase,
    getSessionMembers,
    getCategoryOptions,
    getQuickstarter,
    getQuestions,
    getGamePhase,
    checkAnswer,
};