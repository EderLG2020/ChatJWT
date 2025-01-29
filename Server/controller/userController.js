const { userList} =  require("../config/db")

// function para crear usurio
async function listUser(req,res) {
    req.status(200).json(userList())
}


module.exports={
    listUser
}