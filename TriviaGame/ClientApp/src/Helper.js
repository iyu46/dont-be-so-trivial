import axios from 'axios';

const BASE_URL = 'https://localhost:44302';
// Open Trivia DB Categories
const categories = {
    'General Knowledge': 9,
    'Books': 10,
    'Film': 11,
    'Music': 12,
    'Musicals & Plays': 13,
    'Television': 14,
    'Video Games': 15,
    'Board Games': 16,
    'Science and Nature': 17,
    'Computers': 18,
    'Mathematics': 19,
    'Mythology': 20,
    'Sports': 21,
    'Geography': 22,
    'History': 23,
    'Politics': 24,
    'Art': 25,
    'Celebrities': 26,
    'Animals': 27,
    'Vehicles': 28,
    'Comics': 29,
    'Gadgets': 30,
    'Japanese Anime & Manga': 31,
    'Cartoon & Animation': 32

};

// Open Trivia API Calls
const getTriviaQuestions = async ({category, numQuestions=1, difficulty, type='multiple'}) => {
    //var url = `https://opentdb.com/api.php?amount=${numQuestions}`;
    var url = `${BASE_URL}/api/Quickstarter/Get?numQuestions=${numQuestions}`
    if (category) {
        url += `&category=${category}`;
    }
    if (difficulty) {
        url += `&difficulty=${difficulty}`;
    }
    //url += `&type=${type}&encode=url3986`;
    var response = await axios.get(url);
    for (var i = 0; i < numQuestions; i++) {
        response.data[i].answers = JSON.parse(response.data[i].answers);
    }
    return response.data;

    // TODO: This will be done on the server side and return a DTO
    // var results = response.data.results;
    // for (var i = 0; i < results.length; i++) {
    //     results[i].question = decodeURIComponent(results[i].question);
    //     results[i].answers = [];
    //     var randomInsertIndex = randomInteger(0, 2);
    //     for (var j = 0; j < results[i].incorrect_answers.length; j++) {
    //         results[i].answers.push(decodeURIComponent(results[i].incorrect_answers[j]));
    //     }
    //     results[i].answers.splice(randomInsertIndex, 0, decodeURIComponent(results[i].correct_answer));
    // }
    // response.data.results = results;
    // return Promise.resolve(response);
}

const checkAnswer = async (answer, id) => {
    var url = `${BASE_URL}/api/Quickstarter/Check?id=${id}`;
    var response = await axios.get(url);
    return (response.data);
}

// Returns an integer random number between min (included) and max (included):
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCategoryOptions = (numOptions) => {
    var options = new Set();
    while (options.size !== numOptions) {
        options.add(Object.keys(categories).find(key => categories[key] === randomInteger(9, 32)));
    }
    return options;
}

// Mock API helper functions
const joinRoom = async (name, room) => {
    //call server, try to add person to room
    console.log(`[JOINING ROOM] Name: ${name}, Room code: ${room}`);
    return Promise.resolve({status: 200, data: {}});
}

const getSessionMembers = async (room) => {
    // Get all current room members from server
    console.log(`[GETTING MEMBERS] Room code: ${room}`);
    return Promise.resolve({
        status: 200,
        data: {
            value: [
                'Nik',
                'Siena',
                'Filip'
            ]
        }
    });
}

export {
    getTriviaQuestions,
    checkAnswer,
    getCategoryOptions,
    joinRoom,
    getSessionMembers
};