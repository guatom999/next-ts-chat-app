'use client';

import { useEffect, useState } from 'react';

interface Message {
    id: string;
    content: string;
    type: 'sent' | 'received';
    timestamp: Date;
}

export default function Kepp() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5555/joinroom');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const newMessage: Message = {
                id: crypto.randomUUID(),
                content: event.data,
                type: 'received',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newMessage]);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const handleSendMessage = () => {
        if (!inputMessage.trim() || !socket) return;

        const newMessage: Message = {
            id: crypto.randomUUID(),
            content: inputMessage,
            type: 'sent',
            timestamp: new Date()
        };

        socket.send(inputMessage);
        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${message.type === 'sent'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-800'
                                }`}
                        >
                            <p>{message.content}</p>
                            <span className="text-xs opacity-75">
                                {message.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t bg-white p-4">
                <div className="flex gap-2">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 resize-none rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={1}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}