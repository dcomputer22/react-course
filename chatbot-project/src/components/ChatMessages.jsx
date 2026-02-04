import { useAutoScroll } from '../hooks/useAutoScroll.jsx';
import { ChatMessage } from './ChatMessage.jsx';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.length < 1 && (
        <div className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox
          above.
        </div>
      )}

      {chatMessages.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
      ))}
    </div>
  );
}

export default ChatMessages;
