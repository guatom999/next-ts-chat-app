'use client'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'

interface JoinnedChat {
    // // chatMode: boolean
    // sender: string | null | undefined,
    setChatMode: React.Dispatch<React.SetStateAction<boolean>>
    socket: WebSocket | null
    setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>
}

interface MessageData {
    type: string,
    sender: string,
    message: string,
}

const JoinnedChat = ({ setChatMode, socket, setSocket }: JoinnedChat) => {
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<MessageData[]>([])
    // const [user, setUser] = useState<string[]>([])
    const [user, setUser] = useState('')

    const { data: session } = useSession()
    // const [lastSender, setLastSender] = useState<string>('')
    // console.log("joinnedUser ==========>", joinnedUser)

    useEffect(() => {
        setUser(session?.user?.name || 'Anonymous')
        if (socket) {
            // socket.onopen = () => {

            //     setJoinnedUser(session?.user?.name || 'Anonymous')
            //     // Send join message after connection is established
            //     socket.send(JSON.stringify({
            //         type: 'join',
            //         sender: session?.user?.name || 'Anonymous',
            //         message: 'joined the chat'
            //     }));
            // };

            socket.onmessage = (event) => {
                const data: MessageData = JSON.parse(event.data)
                console.log("data is ========>", data)
                if (data.type === 'join') {
                    // setUser(prev => [...prev, data.sender])
                    // setUser(session?.user?.name || 'Anonymous')
                    // setJoinnedUser(data.sender)
                    setMessages(prev => [...prev, data])
                } else {
                    setMessages(prev => [...prev, data])
                }
            }

            socket.onerror = (error) => {
                console.error('WebSocket connection error:', error);
            };

            socket.onclose = () => {
                console.log('Disconnected from room');
            };

        }
    }, [socket, session])

    const handleSendMessage = () => {
        if (!socket) return

        socket.send(JSON.stringify({
            type: 'message',
            sender: user,
            message: message,
        }))
        setMessage('')
    }

    const handleCloseConnection = () => {
        if (!socket) return;
        // Update states immediately
        setSocket(null);
        setChatMode(true);

        // Close the connection after state updates
        socket.close();
    }


    return (
        <div className="flex items-start justify-center max-w-[800px] mx-auto relative min-h-screen">

            <div className="relative w-[400px] border border-black py-5 my-5">
                <button
                    className="absolute -top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={handleCloseConnection}
                >
                    Exit
                </button>
                <div className='border border-black mx-10 my-3'>
                    <p className='p-3 w-full'>Joinned Channel</p>
                </div>
                <div className="h-[350px] relative">
                    <div className="overflow-y-auto h-[300px] mx-10 mb-4">
                        {messages.map((msg, index) => (
                            msg.type === 'join' ? (
                                (
                                    msg.sender === session?.user?.name ? (
                                        <div key={index} className="flex justify-center mb-2 p-2 bg-gray-100 rounded">
                                            <p className='text-sm'>คุณได้เข้าร่วม</p>
                                        </div>
                                    ) : (
                                        <div key={index} className="flex justify-center mb-2 p-2 bg-gray-100 rounded">
                                            <p className='text-sm'>{msg.sender} ได้เข้าร่วม</p>
                                        </div>
                                    )
                                )
                            )
                                :
                                (
                                    msg.sender === user ?
                                        <div key={index} className="flex justify-end mb-2 p-2 bg-gray-100 rounded">
                                            <p className='text-sm'>{msg.message}</p>
                                        </div>

                                        :

                                        <div key={index} className="flex justify-start mb-2 p-2 bg-gray-100 rounded">
                                            <p className='text-sm'>{msg.message}</p>
                                        </div>

                                )
                        ))}
                    </div>
                    <div className="flex border border-black mx-10 absolute bottom-0 w-[calc(100%-5rem)]">
                        <input
                            className="w-4/5 p-3"
                            placeholder="Enter Your Message Here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            className="w-1/5 cursor-pointer transition-colors hover:bg-gray-100"
                            onClick={handleSendMessage}
                        >
                            <p>Send</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JoinnedChat