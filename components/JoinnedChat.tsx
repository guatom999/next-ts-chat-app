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
    const [mode, setMode] = useState(0)
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

        <div className="relative w-[400px] border-2 border-black py-5 mt-12">
            <button
                className={`${mode === 0 ? `bg-pink-200` : ``}   absolute -top-11 -left-0.5 border-2 border-black rounded-t-md  px-4 py-2  hover:bg-pink-400 transition-colors w-[100px]`}
                onClick={() => setMode(0)}
            >
                แชท
            </button>
            <button
                className={`${mode === 1 ? `bg-pink-200` : ``}   absolute -top-11 left-[100px] border-2 border-black rounded-t-md  px-4 py-2  hover:bg-pink-400 transition-colors w-[100px]`}
                onClick={() => setMode(1)}
            >
                เพลง
            </button>
            <button
                className="absolute -top-11 -right-0.5 border-2 border-black rounded-t-md  px-4 py-2  hover:bg-red-600 transition-colors"
                onClick={handleCloseConnection}
            >
                ออกจากโต๊ะ
            </button>
            <div className="h-[400px] relative">
                <div className="overflow-y-auto h-[300px] mx-4 mb-4">
                    {messages.map((msg, index) => (
                        msg.type === 'join' ? (
                            (
                                msg.sender === session?.user?.name ? (
                                    <div key={index} className="flex justify-center mb-2 p-2 bg-gray-200 rounded">
                                        <p className='text-sm'>คุณได้เข้าร่วม</p>
                                    </div>
                                ) : (
                                    <div key={index} className="flex justify-center mb-2 p-2 bg-gray-200 rounded w-full">
                                        <p className='text-sm'>{msg.sender} ได้เข้าร่วม</p>
                                    </div>
                                )
                            )
                        )
                            :
                            (
                                msg.sender === user ?
                                    <div key={index} className="flex justify-end mb-2 p-2 rounded">
                                        <p className='text-sm px-4 rounded-md border border-black py-0.5'>{msg.message}</p>
                                    </div>

                                    :

                                    <div key={index} className="flex justify-start mb-2 p-2 rounded">
                                        <p className='text-sm px-4 rounded-md border border-black py-0.5'>{msg.message}</p>
                                    </div>

                            )
                    ))}
                </div>
                <div className="flex border border-black mx-4 absolute bottom-0 w-[calc(90%)]">
                    <input
                        className="w-4/5 p-3 focus:outline-none"
                        placeholder="Enter Your Message Here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        className="w-1/5 cursor-pointer border border-black m-2 rounded-md"
                        onClick={handleSendMessage}
                    >
                        <p>ส่ง</p>
                    </button>
                </div>
            </div>
        </div >
    )
}
export default JoinnedChat