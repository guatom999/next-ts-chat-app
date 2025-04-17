import { useState } from "react"
import LoginModal from "./Modal/LoginModal"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

interface LoginButtonProps {
    session: Session | null
}


export default function LogginButton({ session }: LoginButtonProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleLogout = async () => {
        await signOut()
    }

    return (
        <div className='flex justify-center items-center w-[100px]' >
            {
                session ? (
                    <button
                        className='text-pink-500 cursor-pointer'
                        onClick={() => {
                            handleLogout()
                        }}
                    > Logout
                    </button>
                ) : (
                    <button
                        className='text-pink-500 cursor-pointer'
                        onClick={() => setIsModalOpen(true)}
                    > Login
                    </button>
                )
            }

            {
                isModalOpen && (
                    <LoginModal setIsModalOpen={setIsModalOpen} />
                )
            }
        </div>
    )

}