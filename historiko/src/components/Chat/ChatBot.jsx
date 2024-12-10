import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import './ChatBot.css';

const supabaseUrl = 'https://mqomhecazbpagsbfskzv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb21oZWNhemJwYWdzYmZza3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MDM5NjIsImV4cCI6MjA0MDE3OTk2Mn0.1zP8UxASY-wcTFtL8ln3jxzdnUsmn4L4DUQAq-edf2Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


const Chatbox = () => {
  const [userId, setUserId] = useState(localStorage.getItem('id')); // Initialize userId state
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  // Fetch messages from Supabase
  useEffect(() => {
    if (!userId) return; // Ensure userId is available
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('bot_messages')
        .select('*')
        .eq('user_id', userId)
        .order('index', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        console.log('Fetched messages:', data);
        setMessages(data.map((msg) => ({
          sender: msg.sender_type === 'bot-message' ? 'bot' : 'user',
          text: msg.message,
        })));
      }
    };

    fetchMessages();
  }, [userId]);

  // Save new message to Supabase and update UI
  const handleSendMessage = async () => {
  
    if (userMessage.trim()) {
      const newMessage = {
        user_id: userId,
        message: userMessage,
        sender_type: 'user-message',
        index: messages.length + 1,
      };

      // Update UI immediately
      setMessages([...messages, { sender: 'user', text: userMessage }]);
      setUserMessage('');

      // Save message to Supabase
      const { error } = await supabase.from('bot_messages').insert(newMessage);

      if (error) {
        console.error('Error saving message:', error);
      } else {
        // Simulate bot response
        setTimeout(async () => {
          const botResponseText = 'Thank you for your message! How can I assist you further?';
          const botResponse = {
            user_id: userId,
            message: botResponseText,
            sender_type: 'bot-message',
            index: messages.length + 2,
          };

          // Update UI with bot response
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: botResponseText },
          ]);

          // Save bot response to Supabase
          const { error: botError } = await supabase.from('bot_messages').insert(botResponse);
          if (botError) {
            console.error('Error saving bot response:', botError);
          }
        }, 1000);
      }
    }
  };

  return (
    <div>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="fa fa-commenting-o comment" aria-hidden="true"></i>
        <i className="fa fa-close close" aria-hidden="true"></i>
      </label>
      <div className="wrapper">
        <div className="header">
          <h6>Let's Chat - Online</h6>
        </div>
        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="btn btn-success" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
