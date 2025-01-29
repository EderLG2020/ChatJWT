import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface FormData {
    question: string;
    answer: string;
}

const FormPage: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({ question: '', answer: '' });
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const socketConnection = io('http://localhost:3001');

        socketConnection.on('connect', () => {
            console.log('Conectado al servidor');
        });

        // Emite el ID de usuario una vez que se establezca la conexión
        socketConnection.on('connect', () => {
            if (userId) {
                socketConnection.emit('setUserId', userId);
                console.log('ID de usuario enviado:', userId);
            }
        });

        socketConnection.on('message', (msg: string) => {
            setMessage(msg);
            setShowModal(true);
            console.log('Mensaje recibido:', msg);
        });

        setSocket(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, [userId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId && formData.question && formData.answer && userName) {
            console.log('Enviando datos...');
            socket.emit('sendData', { userId, userName, formData });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {!userName ? (
                <div>
                    <h2>Ingresa tu nombre</h2>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Tu nombre"
                    />
                    <button onClick={() => setUserName(userName)}>Enviar</button>
                </div>
            ) : (
                <div>
                    <h2>Formulario para {userName}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="question">Pregunta:</label>
                            <input
                                type="text"
                                name="question"
                                value={formData.question}
                                onChange={handleInputChange}
                                placeholder="Pregunta"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="answer">Respuesta:</label>
                            <input
                                type="text"
                                name="answer"
                                value={formData.answer}
                                onChange={handleInputChange}
                                placeholder="Respuesta"
                                required
                            />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Notificación</h2>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormPage;
