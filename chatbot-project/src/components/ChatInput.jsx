import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import Spinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText.trim() === '' || isLoading) {
      return;
    }

    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img className="loading-spinner" src={Spinner} alt="spinner" />
        ),
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  const clearMessage = () => {
    setChatMessages([]);
  };

  return (
    <div className="chat-input-container">
      <input
        value={inputText}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Send a message to Chatbot"
        disabled={isLoading}
        className="chat-input"
      />
      <div>
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
        <button className="clear-button" onClick={clearMessage}>
          Clear
        </button>
      </div>
    </div>
  );
}
