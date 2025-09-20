"use client";

import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  // --- EXISTING STATES ---
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your agriculture assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- NEW STATE for visibility ---
  const [isOpen, setIsOpen] = useState(false); // <-- NEW: State to control chat window visibility

  // --- EXISTING FUNCTIONS ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) { // <-- UPDATED: Only scroll when the chat is open
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setLoading(true);
    setInput('');
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  // --- NEW FUNCTION to toggle the chatbot ---
  const toggleChat = () => { // <-- NEW
    setIsOpen(prev => !prev);
  };

  return (
    // This container holds both the icon and the chat window
    <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
      {/* --- The Chat Window (conditionally rendered) --- */}
      {isOpen && ( // <-- NEW: Only show the window if isOpen is true
        <div style={{
          width: 350,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 15,
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          position: 'absolute', // <-- UPDATED: Position relative to the container
          bottom: 80, // <-- UPDATED: Position above the icon
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{ padding: 16, borderBottom: '1px solid #eee', fontWeight: 'bold', background: '#f7fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Agri Chatbot</span>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>&times;</button>
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto', padding: 16 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
                <span style={{ background: msg.sender === 'user' ? '#e6f7ff' : '#f1f1f1', padding: '8px 12px', borderRadius: 16, display: 'inline-block', maxWidth: '100%' }}>{msg.text}</span>
              </div>
            ))}
            {loading && <div style={{ color: '#888', textAlign: 'left' }}>Bot is typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about crops..."
              style={{ flex: 1, border: 'none', outline: 'none', padding: 8 }}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{ marginLeft: 8, padding: '0 16px', background: '#38a169', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Send</button>
          </form>
        </div>
      )}

      {/* --- The Toggler Icon --- */}
      <button onClick={toggleChat} style={{ // <-- NEW
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#28a745', // Green color to match your site
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}>
        {/* Simple chat icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Chatbot;