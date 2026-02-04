import { useEffect, useState } from 'react';
import './App.css';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages.jsx';
import { Chatbot } from 'supersimpledev';

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || [],
  );

  useEffect(() => {
    Chatbot.addResponses({
      holla: 'Howdy!',
      'what is your name': 'I am a chatbot created by SuperSimpleDev.',
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
