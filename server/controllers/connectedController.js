const ConnectedUsers = require("../repositories/connectedUserRepository")
const connectedUsers = new ConnectedUsers();

exports.getAll = async (req, res) => {
    const tables = await connectedUsers.getAll();
    console.log(tables)
    if (!tables) {
        throw new Error("tables doesn't exist")
    }
    res.send(tables);
}
exports.addUser = async (req, res) => {
    const {seat} = req.body;
    const row = seat.row;
    const col = seat.col;
    const result = await connectedUsers.retrieve({'seat.row': row, 'seat.col': col});
    if (result) {
        res.status(409).send({error: 'Chair already in use'});
    } else {
        const userToAdd = await connectedUsers.create(req.body);
        if (!userToAdd) {
            throw new Error("something went wrong")
        }
        res.send(200);
    }
}
