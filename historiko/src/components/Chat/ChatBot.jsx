import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { createClient } from '@supabase/supabase-js';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import './ChatBot.css';
import andresAI from './andresAI.jpg'; 
import { tavily } from '@tavily/core';


const supabaseUrl = 'https://mqomhecazbpagsbfskzv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xb21oZWNhemJwYWdzYmZza3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MDM5NjIsImV4cCI6MjA0MDE3OTk2Mn0.1zP8UxASY-wcTFtL8ln3jxzdnUsmn4L4DUQAq-edf2Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const Chatbox = () => {
  const [response, setResponse] = useState(null);
    const [query, setQuery] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
        

  const tvly = tavily({ apiKey: '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' });

    // Step 2: Function to execute search query
    {/* const executeSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            // Step 3: Executing a simple search query
            const result = await tvly.search(query);
            const storeFirstContent = (data) => {
              if (data.results && data.results.length > 0) {
                const firstContent = data.results[0].content;
                // Storing the content in a variable or local storage
                console.log(firstContent); // For demonstration purposes
                return firstContent; // Return or further process as needed
              }
              return null; // Return null if no results are found
            };
            const firstContent = storeFirstContent(result);
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(firstContent)}&langpair=en|tl`);
            const data = await response.json();
            setResponse(data.responseData.translatedText);
            
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    // Step 4: Use useEffect to trigger search on component mount
    useEffect(() => {
        executeSearch();
    }, []);

    */}

    const predefinedResponses = {
      "ano ang pangalan mo?": "Ang pangalan ko ay ANDRES AI.",
      "paano ka makakatulong?": "Ako ay isang AI chatbot na handang magbigay ng tulong o sagutin ang iyong mga tanong.",
      "saan ako makakahanap ng impormasyon?": "Maaari kang magtanong tungkol sa anumang paksa at tutulungan kita sa paghahanap ng impormasyon.",
      "ano ang weather ngayon?": "Paumanhin, wala akong kakayahan na magbigay ng real-time na balita tulad ng weather.",
      "puwede mo bang mag-translate?": "Oo, maaari akong mag-translate ng mga teksto sa iba't ibang wika.",
      "ano ang ginagawa ng ai?": "Ang AI ay isang teknolohiya na kayang magsagawa ng mga task na karaniwang ginagawa ng tao, tulad ng pagkatuto, pagsusuri, at paggawa ng desisyon.",
      "puwede ba akong magtanong ng math?": "Oo, puwede kitang tulungan sa mga math problems!",
      "saan ako makakakuha ng mga libro?": "Maaari kang maghanap ng mga libro online o sa mga local bookstores.",
      "ano ang ibig sabihin ng 'ai'?": "Ang 'AI' ay nangangahulugang 'Artificial Intelligence' o Artipisyal na Intelihensiya, isang sangay ng agham na tumatalakay sa paggawa ng mga makina na may katalinuhan.",
      "puwede ba kitang i-save?": "Wala akong kakayahang i-save ang mga datos, ngunit maaari mong i-save ang aming mga pag-uusap sa iyong sarili."
    };
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
        // User message handling
        const newMessage = {
            user_id: userId,
            message: userMessage,
            sender_type: 'user-message',
            index: messages.length + 1,
        };
        setMessages([...messages, { sender: 'user', text: userMessage }]);
        setUserMessage('');

        // Save to Supabase
        const { error } = await supabase.from('bot_messages').insert(newMessage);
        if (error) return console.error('Error saving user message:', error);

        const normalizedUserMessage = userMessage.toLowerCase();
        const matchingResponse = Object.keys(predefinedResponses).find(question =>
            normalizedUserMessage.includes(question.toLowerCase())
        );

        if (matchingResponse) {
            const botResponse = predefinedResponses[matchingResponse];
            const botResponseObj = {
                user_id: userId,
                message: botResponse,
                sender_type: 'bot-message',
                index: messages.length + 2,
            };
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
            const { error: botError } = await supabase.from('bot_messages').insert(botResponseObj);
            if (botError) return console.error('Error saving bot response:', botError);
        } else {
            try {
                const result = await tvly.search(userMessage);
                const firstContent = result?.results?.[0]?.content || "Sorry, I couldn't find an answer to your question.";
                
                const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(firstContent)}&langpair=en|tl`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                const translatedText = data?.responseData?.translatedText || "Translation unavailable.";

                const botResponseObj = {
                    user_id: userId,
                    message: translatedText,
                    sender_type: 'bot-message',
                    index: messages.length + 2,
                };

                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: translatedText }]);
                const { error: botError } = await supabase.from('bot_messages').insert(botResponseObj);
                if (botError) console.error('Error saving bot response:', botError);
            } catch (err) {
                console.error("Error processing the request:", err);
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: "I'm sorry, I encountered an error." }]);
            }
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
          Maari mo akong kausapin: {localStorage.getItem('username')}
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
          <h6 >Maaari mo akong tanunging, {localStorage.getItem('username')}</h6>
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
