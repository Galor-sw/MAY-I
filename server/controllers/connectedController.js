const ConnectedUsers = require("../repositories/connectedUserRepository")
const UserRepo = require("../repositories/userRepository")
const connectedUsers = new ConnectedUsers();
const userRepo = new UserRepo();

exports.getAll = async (req, res) => {
    const Users = await connectedUsers.getAll();
    if (!Users) {
        throw new Error("no users connected")
    }
    res.send(Users);
}

exports.getOne = async (req, res) => {
    const user = await userRepo.retrieve({_id: req.params.id});
    if (!user) {
        throw new Error("user doesn't exist")
    }
    res.send(user);
}

exports.addUser = async (req, res) => {
    const {user_id, seat} = req.body;
    const row = seat.row;
    const col = seat.col;
    const idResult = await connectedUsers.retrieve({'user_id': user_id});
    const seatResult = await connectedUsers.retrieve({'seat.row': row, 'seat.col': col});
    console.log('idResult: ', idResult)
    console.log(seatResult)
    if (seatResult !== null && idResult !== null) {
        res.status(409).send({error: 'Chair already in use'});
    } else {
        const userToAdd = await connectedUsers.create(req.body);
        if (!userToAdd) {
            throw new Error("something went wrong")
        }
        res.status(200);
        res.send(200);
    }
}

