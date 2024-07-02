import React from 'react'
import baner from "../assets/104057.jpg"
import { useForm } from 'react-hook-form'
import Chatbase from '../appwrite/chatbase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { setError, register, handleSubmit, formState: { errors } } = useForm()
    const navi = useNavigate()
    const { userid } = useSelector(state => state.authslice)

    const createchats = async (data) => {
        try {
            console.log(data, userid);
            const crete = await Chatbase.createchatbar(data.name, userid)
            if (crete) {
                navi(`/chat/${userid}/${crete.$id}`)
            }
        } catch (error) {
            setError("root", { message: error.response.message })
        }
    }
    return (
        <div className='h-[15rem] w-full bg-zinc-800 relative select-none flex items-center justify-center py-5'>
            <div className='z-[2] flex flex-col items-center justify-around h-full w-full max-sm:justify-end max-sm:gap-5'>
                <h1 className='text-[2rem] capitalize font-semibold max-sm:text-[1.8rem]'>create sections of chat</h1>
                <form onSubmit={handleSubmit(createchats)} className=' flex gap-1 flex-col'>
                    <p className='text-[0.8rem]'>{errors.root && errors.root.message}</p>
                    <div className='flex gap-3 w-[30rem] max-sm:w-[100%]'>
                    <input
                        {...register("name")}
                        className=' w-full   outline-none bg-neutral-100 py-1 px-2 text-black rounded-lg' type="text" />
                    <button type='submit' className='py-1 px-3 bg-green-500 text-black font-semibold uppercase rounded-lg'>create</button>
                        </div>
                </form>
            </div>
            <img src={baner} className=' brightness-50 z-[1] absolute w-[100%] h-full object-cover object-center ' />
        </div>
    )
}

export default Header