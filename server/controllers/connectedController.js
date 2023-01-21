const ConnectedUsers = require("../repositories/connectedUserRepository")
const connectedUsers = new ConnectedUsers();

exports.getAll = async (req, res) => {
    const tables = await connectedUsers.getAll();
    if (!tables) {
        throw new Error("tables doesn't exist")
    }
    res.send(tables);
}
exports.addUser = async (req, res) => {
    console.log(req.body);
    const userToAdd = await connectedUsers.create(req.body);
    if (!userToAdd) {
        throw new Error("somthing went wrong")
    }
    res.send(200);
}
