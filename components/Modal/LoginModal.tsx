'use client'
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginModalProps {
    // isOpen: boolean | false;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// const LoginModal = ({ isOpen }: LoginModalProps) => {
const LoginModal = ({ setIsModalOpen }: LoginModalProps) => {

    // const router = useRouter();

    // const [isModalOpen, setIsModalOpen] = useState(isOpen)

    // const handleDiscordLogin = async () => {
    //     router.push('https://discord.com/oauth2/authorize?client_id=1362393639854280959&response_type=code&redirect_uri=localhost%3A30001&scope=identify+email')
    // }

    console.log(typeof (setIsModalOpen))

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 ">
            <div className="bg-white rounded-lg p-8 w-[400px] relative border border-black space-y-6">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsModalOpen(false)}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <button
                    className="w-full bg-white border border-black py-2 px-4 rounded-md cursor-pointer hover:bg-fuchsia-200 transition-colors"
                    onClick={async () => {
                        // await handleDiscordLogin()
                        signIn('discord')
                        setIsModalOpen(false)
                    }}
                >
                    JOIN WITH DISOCRD
                </button>
                <button
                    className="w-full bg-white border border-black py-2 px-4 rounded-md cursor-pointer hover:bg-fuchsia-200 transition-colors"
                    onClick={async () => {
                        // await handleDiscordLogin()
                        setIsModalOpen(false)
                    }}>
                    JOIN WITH GOOGLE
                </button>
                {/* <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form> */}
            </div>
        </div>
    )
}

export default LoginModal