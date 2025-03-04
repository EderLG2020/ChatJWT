const { messengerList, addMessenger } = require("../config/db");
const { v4 } = require("uuid");

async function listMessengerForFriend(req, res) {
    const { idUser, idFriend } = req.body;
    const mess = messengerList;

    const conversation = mess.filter(
        (m) =>
            (m.idUser === idUser && idFriend === idFriend) ||
            (m.idUser === idFriend && idUser === idUser)
    );

    res.status(200).json(conversation);
}

async function addMessengerForFriend(req, res) {
    try {
        const { idUser, idFriend, message, image, video, audio, Emojireaccion } = req.body;

        if (!idUser || !idFriend || !message) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const newMessage = {
            idMessenger: v4(),
            idUser,
            message,
            image: image || "",
            video: video || "",
            audio: audio || "",
            Emojireaccion: Emojireaccion || "",
            fecha_creacion: new Date().toLocaleString(),
            fecha_visto: "",
            visto: false
        };

        addMessenger(newMessage);

        res.status(201).json({ success: true, message: "Mensaje agregado", data: newMessage });
    } catch (error) {
        console.error("Error al agregar mensaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

async function listConversation(req, res) {
    const { idUser } = req.body

    const conv = listConversation;

    const conversation = conv.filter(
        (m) =>
            (m.idUser === idUser && idFriend === idFriend) ||
            (m.idUser === idFriend && idUser === idUser)
    );

    res.status(200).json(conversation);
}

module.exports = {
    listConversation,
    listMessengerForFriend,
    addMessengerForFriend,
};
