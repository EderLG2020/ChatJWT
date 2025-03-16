const { messengerList, addMessenger, conversationList, userList, } = require("../config/db");
const { v4 } = require("uuid");

async function listMessengerForFriend(req, res) {
    const { idUser, idFriend } = req.body;
    const conversation = conversationList.find(
        (c) =>
            (c.idEmisor === idUser && c.idReceptor === idFriend) ||
            (c.idEmisor === idFriend && c.idReceptor === idUser)
    );

    if (!conversation) {
        return res.status(200).json([]);
    }

    const mensajes = messengerList.filter(
        (m) => m.idMessenger === conversation.idMessenger
    );

    res.status(200).json({
        idConversation: conversation.id,
        idMessenger: conversation.idMessenger,
        mensajes
    });
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

async function listFriendConversation(req, res) {
    const { idUser } = req.body;

    const conversaciones = conversationList.filter(
        (c) => c.idEmisor === idUser || c.idReceptor === idUser
    );

    const resultado = conversaciones.map((c) => {
        const idFriend = c.idEmisor === idUser ? c.idReceptor : c.idEmisor;
        const user = userList.find((user) => user.id === idFriend);

        return {
            id: c.idMessenger,
            idFriend,
            name: user ? user.usuario : "Desconocido",
            avatar: user ? user.avatar : null,
        };
    });

    res.status(200).json(resultado);
}



module.exports = {
    listConversation,
    listMessengerForFriend,
    addMessengerForFriend,
    listFriendConversation
};
