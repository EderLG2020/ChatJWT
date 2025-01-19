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

    useEffect(() => {
        const socketConnection = io('http://localhost:3001'); // Asegúrate de que el puerto sea correcto

        socketConnection.on('userId', (id: string) => {
            setUserId(id);
            console.log('ID de usuario recibido:', id);
        });

        socketConnection.on('message', (msg: string) => {
            setMessage(msg);
            console.log('Mensaje recibido:', msg);
        });

        // Guardar la conexión del socket
        setSocket(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId && formData.question && formData.answer && userName) {
            console.log('Enviando datos...');
            // Emitir datos al servidor, incluyendo el nombre del usuario
            socket.emit('sendData', { userId, userName, formData });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        </div>
    );
};

export default FormPage;
