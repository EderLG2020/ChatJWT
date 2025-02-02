const { userList} =  require("../config/db")

// function para crear usurio
async function listUser(req,res) {
    res.status(200).json(userList)
}


module.exports={
    listUser
}