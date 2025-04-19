import React from 'react'

// interface Profile {
//     setSender: React.Dispatch<React.SetStateAction<string>>
// }
// const Profile = ({ setSender }: Profile) => {
const Profile = () => {
    const sticket = ['😊', '😂', '🥰', '😍', '😭']


    return (
        <div className='w-[600px]  h-[526px]'>
            <div className='flex justify-start items-start mx-10 py-[40px] gap-x-4'>
                <p className='text-2xl'>สวัสดี... </p>
                <input
                    className='text-2xl outline-none'
                    placeholder='บอกชื่อเราหน่อย'
                // onChange={(e) => { setSender(e.target.value) }}

                >
                </input>
            </div>
            <div className='mx-10 gap-x-4 '>
                <div className='flex justify-center items-center'>
                    <p >บอกความรู้สึกเราหน่อย</p>
                </div>
                <div className='flex justify-center items-center h-[40px] gap-5'>
                    {sticket.map((item, index) => (
                        <button
                            key={index}
                            className='text-2xl hover:scale-125 transition-transform cursor-pointer'
                            onClick={() => {/* handle sticker selection */ }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

            </div>

        </div>
    )

}

export default Profile