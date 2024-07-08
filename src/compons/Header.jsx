import baner from "../assets/104057.jpg"
import { useForm } from 'react-hook-form'
import Chatbase from '../appwrite/chatbase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showt } from '../store/toastslice'
import createGlobe from "cobe"
import { useEffect, useRef, useState } from "react"

const Header = () => {
    const { setError, register, handleSubmit, formState: { errors } } = useForm()
    const navi = useNavigate()
    const { userid } = useSelector(state => state.authslice)
    const Dispatch = useDispatch() 
    const canvasref = useRef(null)
    
    const createchats = async (data) => {
        try {
            const crete = await Chatbase.createchatbar(data.name, userid)
            if (crete) {
                navi(`/chat/${userid}/${crete.$id}`)
            }
        } catch (error) {
            Dispatch(showt({mass:"something wrong", color:"text-black", time:1500, icon:"error"}))
            setError("root", { message: error.response.message })
        }
    }
    


    useEffect(()=>{
        let phi = 0;
        const globe = createGlobe(canvasref.current, {
          devicePixelRatio: 1,
          width: 350 * 2,
          height: 350 * 2,
          phi: 0,
          theta: 0,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 10000,
          mapBrightness: 6,
          baseColor: [0.3, 0.3, 0.3],
          markerColor: [0.1, 0.8, 1],
          glowColor: [1, 1, 1],
          markers: [
            { location: [37.759523, -122.436765], size: 0.03 },
          ],
          onRender: (state) => {
            state.phi = phi;
            phi += 0.01;
          }
        });
    
        return () => {
            globe.destroy();
        };
        
        
    },[canvasref.current])
    return (
        <div className='h-[20rem] w-full bg-zinc-800 relative select-none flex items-center justify-center py-5'>
            <div className='z-[2] flex flex-col items-center justify-around h-full w-full max-sm:justify-end max-sm:gap-5'>
                <h1 className='text-[2rem] capitalize font-semibold max-sm:text-[1.5rem]'>create sections of chat</h1>
                <form onSubmit={handleSubmit(createchats)} className=' flex gap-1 flex-col'>
                    <p className='text-[0.8rem]'>{errors.root && errors.root.message}</p>
                    <div className='flex gap-3 w-[30rem] max-sm:w-[100%]'>
                    <input
                        {...register("name")}
                        maxLength={20}
                        className=' w-full   outline-none bg-neutral-100 py-1 px-2 text-black rounded-lg' type="text" />
                    <button type='submit' className='py-1 px-3 bg-green-500 text-black font-semibold uppercase rounded-lg'>create</button>
                        </div>
                </form>
            </div>
            <div className="flex absolute w-[100%] h-full justify-center items-center ">
            <canvas ref={canvasref} className='absolute  h-[100%] w-[100%]'></canvas>
            </div>
        </div>
    )
}

export default Header