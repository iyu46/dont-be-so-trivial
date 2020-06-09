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
                'Filip',
                'Ramon'
            ]
        }
    });
}

export {
    joinRoom,
    getSessionMembers
};