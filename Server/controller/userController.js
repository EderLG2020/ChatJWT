const { userList } = require("../config/db")

// function para crear usurio
async function listUser(req, res) {
    const { id } = req.body;

    if (id) {
        const user = userList.find(user => user.id === id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json(user);
    }

    return res.status(200).json(userList);
}


module.exports = {
    listUser
}