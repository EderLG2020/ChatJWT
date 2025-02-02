import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import FooterChat from "./FooterChat";


const Conversation = () => {
    return <>
        <section className="flex flex-col flex-auto border-l border-gray-800">
            <ChatHeader></ChatHeader>
            <ChatBody></ChatBody>
            <FooterChat></FooterChat>
        </section>
    </>
}


export default Conversation;