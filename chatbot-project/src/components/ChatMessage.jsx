import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.jpg';
import './ChatMessage.css';
import dayjs from 'dayjs';

export function ChatMessage({ message, sender }) {
  const time = dayjs().valueOf();
  const timeInString = dayjs(time).format('h:mma');

  return (
    <div
      className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}
    >
      {sender === 'robot' && (
        <img
          src={RobotProfileImage}
          alt="robot"
          className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">
        {message}
        <p>{timeInString}</p>
      </div>
      {sender === 'user' && (
        <img
          src={UserProfileImage}
          alt="user"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}
