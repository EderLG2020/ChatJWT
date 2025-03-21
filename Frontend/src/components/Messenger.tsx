import React, { useEffect, useState, useMemo } from "react";
import ListUserStatus from "./ListUserStatus";
import MessageItem from "./MessageItem";
import Conversation from "./Conversation";
import Header from "./Header";
import { useAuthStore } from "../store/authStore";

const Messenger: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const [search, setSearch] = useState(""); 

    console.log("userId123",user?.id);
    
    // realizar consulta a esta api http://localhost:3000/messenger/friend/listFrind

    // {
    //     "idUser":"aqui va el user.id"
    // }

    // la cual tendre datos como esto
    // [
        //     "abcd-olep-ploi-sldo",
        //     "abcd-olep-ploi-s741"
        // ]
        
        // relizar consulta por cada uno 

    const messages = useMemo(() => [
        {
            id: 1,
            avatar: "https://randomuser.me/api/portraits/men/97.jpg",
            name: "Tony Stark",
            message: "Hey, Are you there?",
            time: "10min",
            unread: true,
            isOnline: true,
            seen: false
        },
        {
            id: 2,
            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
            name: "Dwayne Johnson",
            message: "How can I forget about that man!",
            time: "12 Nov",
            unread: false,
            isOnline: true,
            seen: true /** Visto */
        },
    ], []);

    return (
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            <div className="flex-1 flex flex-col">
                {/* Barra superior con botones de colores */}
                <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
                    <div className="bg-red-600 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                </div>

                {/* Contenido Principal */}
                <main className="flex-grow flex flex-row min-h-0">
                    {/* Barra lateral */}
                    <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                        {user && <Header nombreUser={user.nombre} img={user.avatar} />}
                        
                        {/* Barra de búsqueda */}
                        <div className="search-box p-4 flex-none">
                            <form>
                                <div className="relative">
                                    <label>
                                        <input
                                            className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search Messenger"
                                        />
                                        <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                            <svg viewBox="0 0 24 24" className="w-6 h-6">
                                                <path fill="#bbb" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* Sección de usuarios activos */}
                        <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
                            <div className="text-sm text-center mr-4">
                                <button className="flex flex-shrink-0 focus:outline-none block bg-gray-800 text-gray-600 rounded-full w-20 h-20" type="button">
                                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                        <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                                    </svg>
                                </button>
                                <p>Your Story</p>
                            </div>
                            <ListUserStatus />
                        </div>

                        {/* Lista de conversaciones */}
                        <div className="contacts p-2 flex-1 overflow-y-scroll">
                            {messages.map((msg) => (
                                <MessageItem
                                    key={msg.id}
                                    avatar={msg.avatar}
                                    name={msg.name}
                                    message={msg.message}
                                    time={msg.time}
                                    unread={msg.unread}
                                    isOnline={msg.isOnline}
                                    seen={msg.seen}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Conversación principal */}
                    <Conversation />
                </main>
            </div>
        </div>
    );
};

export default Messenger;
