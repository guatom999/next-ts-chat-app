'use client';

import Chat from "@/components/Chat";
import JoinnedChat from "@/components/JoinnedChat";
// import LoginButton from "@/components/LoginButton";
import Profile from "@/components/Profile";
import UserBar from "@/components/UserBar";
import { useSession } from "next-auth/react";

import { useState } from 'react';

export default function Page() {

  const { data: session } = useSession()

  // const [sender, setSender] = useState(session?.user?.name)
  const [chatMode, setChatMode] = useState(true)
  const [socket, setSocket] = useState<WebSocket | null>(null);

  console.log("session is ========>", session)

  return (
    <div>
      {
        // chatMode ? (

        <div className="gap-10 max-w-[1000px] mx-auto ">
          <UserBar />
          <div className="flex justify-center items-start gap-10 max-w-[1000px] mx-auto">
            <Profile
            />
            {
              chatMode ? (
                <Chat setSocket={setSocket} setChatMode={setChatMode} />
              ) : (
                <JoinnedChat setChatMode={setChatMode} socket={socket} setSocket={setSocket} />
              )
            }

          </div>
        </div>
        // )
        //   :
        //   (
        //   )
      }
    </div>
  )
}