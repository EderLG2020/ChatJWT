import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: string;
    nombre: string;
    usuario: string;
    avatar: string;
}

const ListUserStatus = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/listUser")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <>
            {users.map((item) => (
                <div key={item.id} className="text-sm text-center mr-4"><div className="p-1 border-4 border-blue-600 rounded-full"><div className="w-16 h-16 relative flex flex-shrink-0">
                    <img className="shadow-md rounded-full w-full h-full object-cover"
                        src={item.avatar} alt={item.usuario} />
                </div>
                </div>
                    <p>{item.usuario}</p>
                </div>
            ))}
        </>
    );
};

export default ListUserStatus;
