interface MessageItemProps {
    avatar: string;
    name: string;
    message: string;
    time: string;
    unread: boolean;
    isOnline: boolean;
    seen: boolean; // Nuevo parámetro
}

const MessageItem: React.FC<MessageItemProps> = ({ avatar, name, message, time, unread, isOnline, seen }) => {
    return (
        <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
            {/* Avatar principal */}
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover" src={avatar} alt={name} />
                {isOnline && (
                    <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                        <div className="bg-green-500 rounded-full w-3 h-3"></div>
                    </div>
                )}
            </div>

            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p className="font-bold">{name}</p>
                <div className={`flex items-center text-sm ${unread ? "font-bold" : "text-gray-600"}`}>
                    <div className="min-w-0">
                        <p className="truncate">{message}</p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">{time}</p>
                </div>
            </div>

            {unread ? (
                <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
            ) : seen ? (
                <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                    <img className="rounded-full w-full h-full object-cover" src={avatar} alt={name} />
                </div>
            ) : null}
        </div>
    );
};

export default MessageItem;
