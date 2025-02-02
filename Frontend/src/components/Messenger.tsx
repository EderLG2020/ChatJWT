import React, { useEffect, useState } from "react";
import ListUserStatus from "./ListUserStatus";
import MessageItem from "./MessageItem";
import Conversation from "./Conversation";
import Header from "./Header";

const messagess = [
    {
        avatar: "https://randomuser.me/api/portraits/men/97.jpg", // Avatar
        name: "Tony Stark", // Nombre
        message: "Hey, Are you there?", // Ultimo mensaje?
        time: "10min", // hace que tiempo?
        unread: true, // mensaje nuevo?
        isOnline: true, // Esta activo?
        seen: false // Me dejo en visto?
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        name: "Dwayne Johnson",
        message: "How can I forget about that man!",
        time: "12 Nov",
        unread: false,
        isOnline: true,
        seen: true
    },
];

const Messenger: React.FC = () => {
    const [user, setUser] = useState<{ nombre: string; avatar: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            <div className="flex-1 flex flex-col">
                <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
                    <div className="bg-red-600 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                </div>
                <main className="flex-grow flex flex-row min-h-0">
                    <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                        {user && <Header nombreUser={user.nombre} img={user.avatar} />}
                        <div className="search-box p-4 flex-none">
                            <form >
                                <div className="relative">
                                    <label>
                                        <input className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                                            type="text" value="" placeholder="Search Messenger" />
                                        <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                            <svg viewBox="0 0 24 24" className="w-6 h-6">
                                                <path fill="#bbb"
                                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
                            <div className="text-sm text-center mr-4">
                                <button className="flex flex-shrink-0 focus:outline-none block bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                                    type="button">
                                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                        <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                                    </svg>
                                </button>
                                <p>Your Story</p>
                            </div>
                            <ListUserStatus></ListUserStatus>
                        </div>
                        <div className="contacts p-2 flex-1 overflow-y-scroll">
                            <div>
                                {messagess.map((msg, index) => (
                                    <MessageItem
                                        key={index}
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
                        </div>
                    </section>
                    <Conversation></Conversation>
                </main>
            </div>
        </div>
    );
};

export default Messenger;
