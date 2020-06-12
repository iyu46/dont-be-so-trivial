import axios from 'axios';
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
    'Celebrities': 26
};

// Open Trivia API Calls
const getTriviaQuestions = async ({category, numQuestions=1, difficulty, type='multiple'}) => {
    var url = `https://opentdb.com/api.php?amount=${numQuestions}`;
    if (category && categories[category]) {
        url += `&category=${categories[category]}`;
    }
    if (difficulty) {
        url += `&difficulty=${difficulty}`;
    }
    url += `&type=${type}&encode=url3986`;
    var response = await axios.get(url);

    // TODO: This will be done on the server side and return a DTO
    var results = response.data.results;
    for (var i = 0; i < results.length; i++) {
        results[i].question = decodeURIComponent(results[i].question);
        results[i].answers = [];
        var randomInsertIndex = randomInteger(0, 2);
        for (var j = 0; j < results[i].incorrect_answers.length; j++) {
            results[i].answers.push(decodeURIComponent(results[i].incorrect_answers[j]));
        }
        results[i].answers.splice(randomInsertIndex, 0, decodeURIComponent(results[i].correct_answer));
    }
    response.data.results = results;
    return Promise.resolve(response);
}

// Returns an integer random number between min (included) and max (included):
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    joinRoom,
    getSessionMembers
};