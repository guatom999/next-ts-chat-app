import { useSession } from "next-auth/react"
import LogginButton from "./LoginButton"

const UserBar = () => {

    const { data: session } = useSession()

    return (
        <div className="flex justify-between items-center py-[60px]">

            {
                session ? (
                    <p className="text-xl w-[300px]">สวัสดี {session.user?.name}</p>
                ) : (
                    <p className="text-xl w-[200px]"></p>
                )
            }
            <p className="text-3xl w-[300px]">Drunk On You</p>
            <LogginButton session={session} />
        </div>
    )
}

export default UserBar