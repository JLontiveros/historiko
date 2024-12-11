import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { createClient } from '@supabase/supabase-js';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import './ChatBot.css';
import andresAI from './andresAI.jpg'; 

const supabaseUrl = 'https://mqomhecazbpagsbfskzv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb21oZWNhemJwYWdzYmZza3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MDM5NjIsImV4cCI6MjA0MDE3OTk2Mn0.1zP8UxASY-wcTFtL8ln3jxzdnUsmn4L4DUQAq-edf2Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const Chatbox = () => {
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(true); // For controlling the popup visibility

  useEffect(() => {
    if (!userId) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('bot_messages')
        .select('*')
        .eq('user_id', userId)
        .order('index', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data.map((msg) => ({
          sender: msg.sender_type === 'bot-message' ? 'bot' : 'user',
          text: msg.message,
        })));
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      const newMessage = {
        user_id: userId,
        message: userMessage,
        sender_type: 'user-message',
        index: messages.length + 1,
      };
  
      setMessages([...messages, { sender: 'user', text: userMessage }]);
      setUserMessage('');
  
      const { error } = await supabase.from('bot_messages').insert(newMessage);
  
      if (error) {
        console.error('Error saving message:', error);
      } else {
        setTimeout(async () => {
          // Call the external API
          const response = await fetch(
            `https://api-ai-historiko-rfzur0z07-eidrian-ramos-projects.vercel.app/api/search?query=${encodeURIComponent(userMessage)}`, 
            {
              headers: {
                'Authorization': `Bearer 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`
              }
            }
          );
          
          const data = await response.json();
  
          // Check if the response contains valid content
          if (data.content) {
            const botResponseText = `Here is what I found: ${data.content}. For more details, visit: ${data.url}`;
            const botResponse = {
              user_id: userId,
              message: botResponseText,
              sender_type: 'bot-message',
              index: messages.length + 2,
            };
  
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'bot', text: botResponseText },
            ]);
  
            const { error: botError } = await supabase.from('bot_messages').insert(botResponse);
            if (botError) {
              console.error('Error saving bot response:', botError);
            }
          } else {
            const botResponseText = "Sorry, I couldn't find an answer to your question.";
            const botResponse = {
              user_id: userId,
              message: botResponseText,
              sender_type: 'bot-message',
              index: messages.length + 2,
            };
  
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'bot', text: botResponseText },
            ]);
  
            const { error: botError } = await supabase.from('bot_messages').insert(botResponse);
            if (botError) {
              console.error('Error saving bot response:', botError);
            }
          }
        }, 1000);
      }
    }
  };
  

  const handlePopupClick = () => {
    setIsPopupVisible(false); // Hide the popup when clicked
  };

  return (
    <div>
      <input type="checkbox" id="check-unique" />
      <label className="chat-btn-unique" htmlFor="check-unique">
        <img
          src={andresAI} 
          alt="Description"
          className="styled-image"
          onClick={handlePopupClick}
          style={{ border: '2px solid black', borderRadius: '100px', width: '50px' }}
        />
      </label>

      {/* Popup message box */}
      {isPopupVisible && (
        <div className="popup-message" onClick={handlePopupClick}>
          May tanong ka ba sa kasaysayan? Tara mag usap tayo!
        </div>
      )}

      <div className="wrapper-unique">
        <div className="header-unique">
          <img
            src={andresAI}
            alt="Description"
            className="styled-image"
            style={{ border: '2px solid black', borderRadius: '100px', width: '50px' }}
          />
          <h6 className='h6name'>ANDRES AI</h6>
          <h6 >Alamin ang Nayon at Dambana ng Revolusyon, Edukasyon, at Salaysay</h6>
        </div>

        <div className="chat-content-unique">
          <div className="chat-messages-unique">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message-unique ${message.sender === 'user' ? 'user-message-unique' : 'bot-message-unique'}`}
              >
                <span>{message.text}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-unique">
            <input
              type="text"
              className="form-control-unique"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="btn-unique" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
