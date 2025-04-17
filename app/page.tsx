'use client';

import Chat from "@/components/Chat";
import JoinnedChat from "@/components/JoinnedChat";
// import LoginButton from "@/components/LoginButton";
import Profile from "@/components/Profile";
import UserBar from "@/components/UserBar";
// import { useSession } from "next-auth/react";

import { useState } from 'react';

export default function Page() {

  // const { data: session } = useSession()

  const [sender, setSender] = useState('sender')
  const [chatMode, setChatMode] = useState(true)
  const [socket, setSocket] = useState<WebSocket | null>(null);


  return (
    <div>
      {
        chatMode ? (

          <div className="gap-10 max-w-[1000px] mx-auto ">
            <UserBar />
            <div className="flex justify-center items-start gap-10 max-w-[1000px] mx-auto">
              <Profile setSender={setSender} />
              <Chat setSocket={setSocket} setChatMode={setChatMode} />
            </div>
          </div>
        )

          :

          (
            <JoinnedChat sender={sender} setChatMode={setChatMode} socket={socket} setSocket={setSocket} />
          )
      }
    </div>
  )
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [messages, setMessages] = useState<string[]>([]);
  // const [inputMessage, setInputMessage] = useState('');

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:5555/ws');

  //   ws.onopen = () => {
  //     console.log('Connected to WebSocket');
  //     setMessages(prev => [...prev, 'Connected to WebSocket']);
  //   };

  //   ws.onmessage = (event) => {
  //     setMessages(prev => [...prev, `Received: ${event.data}`]);
  //   };

  //   ws.onclose = () => {
  //     console.log('Disconnected from WebSocket');
  //     setMessages(prev => [...prev, 'Disconnected from WebSocket']);
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //     setMessages(prev => [...prev, 'WebSocket error occurred']);
  //   };

  //   setSocket(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.send(inputMessage);
  //     setMessages(prev => [...prev, `Sent: ${inputMessage}`]);
  //     setInputMessage('');
  //   }
  // };

  // return (
  //   <div className="p-4">
  //     <h1 className="text-2xl font-bold mb-4">WebSocket Test</h1>

  //     <div className="mb-4">
  //       <input
  //         type="text"
  //         value={inputMessage}
  //         onChange={(e) => setInputMessage(e.target.value)}
  //         className="border p-2 mr-2"
  //         placeholder="Enter message"
  //       />
  //       <button
  //         onClick={sendMessage}
  //         className="bg-blue-500 text-white px-4 py-2 rounded"
  //       >
  //         Send
  //       </button>
  //     </div>

  //     <div className="border p-4 h-[400px] overflow-y-auto">
  //       {messages.map((message, index) => (
  //         <div key={index} className="mb-2">
  //           {message}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}