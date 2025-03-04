const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "users.json");
const conversationFilePath = path.join(__dirname, "conversation.json");
const messengerFilePath = path.join(__dirname, "mesenger.json");

function readMessengerFromFile() {
  try {
    const data = fs.readFileSync(messengerFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo el archivo de conversation:", err);
    return [];
  }
}

function writeMesengerToFile(messenger) {
  try {
    fs.writeFileSync(messengerFilePath, JSON.stringify(messenger, null, 2), "utf8");
  } catch (err) {
    console.error("Error escribiendo en el archivo de mensajes:", err);
  }
}


function readConversationFromFile() {
  try {
    const data = fs.readFileSync(conversationFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo el archivo de conversation:", err);
    return [];
  }
}

function writeConversationToFile(conv) {
  try {
    fs.writeFileSync(conversationFilePath, JSON.stringify(conv, null, 2), "utf8");
  } catch (err) {
    console.error("Error escribiendo en el archivo de usuarios:", err);
  }
}

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

  get conversationList() {
    return readConversationFromFile()
  },

  addConversation(conv) {
    const conversation = readConversationFromFile();
    conversation.push(conv)
    writeConversationToFile(conversation)
  },

  get messengerList() {
    return readMessengerFromFile()
  },

  addMessenger(mes) {
    const messenger = readMessengerFromFile();
    messenger.push(mes);
    writeMesengerToFile(messenger);
  }
};
