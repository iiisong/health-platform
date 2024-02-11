import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [text, setText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/read-message');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetchMessages();
      const response = await axios.post('/data', { text });
      setProcessedText(response.data.processed_text);
      setText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>What health information do you need?</h1>
      <form id="myForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <input type="submit" value="Submit" />
      </form>
      <div id="output">{processedText && <p>{processedText}</p>}</div>
      <div>
        <h2>Most Recent Responses:</h2>
        <ol>
          {messages.map((message, index) => (
            <li key={index}>{message.question}: {message.response}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;