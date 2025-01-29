const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "users.json");

function readUsersFromFile() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo el archivo de usuarios:", err);
    return []; 
  }
}

function writeUsersToFile(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Error escribiendo en el archivo de usuarios:", err);
  }
}

module.exports = {
  get userList() {
    return readUsersFromFile();
  },

  addUser(user) {
    const users = readUsersFromFile();
    users.push(user);
    writeUsersToFile(users);
  },
};
