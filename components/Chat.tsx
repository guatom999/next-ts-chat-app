'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface Chat {
    setChatMode: React.Dispatch<React.SetStateAction<boolean>>
    setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>
}

const Chat = ({ setChatMode, setSocket }: Chat) => {
    const [roomId, setRoomId] = useState<string>('');
    const [error, setError] = useState<string>('')
    // const [isConnected, setIsConnected] = useState(false);
    const { data: session } = useSession()


    const handleRandomRoom = () => {

        try {

            const ws = new WebSocket(`ws://localhost:5555/randomroom`);

            setSocket(ws);

            ws.onopen = () => {
                console.log('Connected to room:', roomId);
                // setIsConnected(true);

                ws.send(JSON.stringify({
                    type: 'join',
                    sender: session?.user?.name || 'Anonymous',
                    message: '',
                }))

                setSocket(ws);
                setError('')
            };

            ws.onclose = () => {
                console.log('Disconnected from room');
                // setIsConnected(false);
                setSocket(null);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setError('Failed to connect server')
                // setIsConnected(false);
            };

        } catch (error) {
            console.log("error is ", error)
        }


    };

    const handleJoinRoom = () => {
        if (!roomId.trim()) return;

        try {
            const ws = new WebSocket(`ws://localhost:5555/joinroom?roomId=${roomId}`);

            ws.onopen = () => {
                console.log('Connected to room:', roomId);
                // setIsConnected(true);
                setSocket(ws);
                setError('')
            };

            ws.onclose = () => {
                console.log('Disconnected from room');
                // setIsConnected(false);
                setSocket(null);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setError('Failed to connect server')
                // setIsConnected(false);
            };
        } catch (error) {
            console.log("error is ", error)
            setError('Failed to connect server')
        }

    };

    return (
        <div className="w-[400px] mt-12">
            <div className="w-full border-2 border-black h-[526px] flex flex-col justify-end p-10 space-y-3  rounded-md">
                <div className='flex border border-black rounded-sm'>
                    <button className='p-3 w-full' onClick={() => {
                        handleRandomRoom()
                        if (error == "") {
                            setChatMode(false)
                        }
                    }}>
                        <p>คุยเล่น แก้เหงา</p>
                    </button>
                </div>

                <div className='flex justify-center items-center'>
                    <p>หรือ</p>
                </div>

                <div className="flex border border-black rounded-sm">
                    <input
                        type="text"
                        className="w-4/5 p-3 focus:outline-none"
                        placeholder="Enter room ID here"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <button
                        className="w-1/5 cursor-pointer transition-colors"
                        onClick={() => {
                            handleJoinRoom()
                            if (error == "") {
                                setChatMode(false)
                            }
                        }}
                    >
                        <p>Join</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat