import { useForm } from 'react-hook-form'
import Chatbase from '../appwrite/chatbase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showt } from '../store/toastslice'
import createGlobe from "cobe"
import { useEffect, useRef, useState } from "react"
import Cards from './Cards'
import { useSpring } from '@react-spring/web';

const Header = () => {
    const { setError, register, handleSubmit, formState: { errors } } = useForm()
    const navi = useNavigate()
    const { userid } = useSelector(state => state.authslice)
    const Dispatch = useDispatch()
    const canvasref = useRef(null)
    const [addopener, setaddopener] = useState(false)
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [{ r }, api] = useSpring(() => ({
        r: 0,
        config: {
            mass: 1,
            tension: 280,
            friction: 40,
            precision: 0.001,
        },
    }));

    const createchats = async (data) => {
        try {
            const crete = await Chatbase.createchatbar(data.name, userid)
            if (crete) {
                navi(`/chat/${userid}/${crete.$id}`)
            }
        } catch (error) {
            Dispatch(showt({ mass: "something wrong", color: "text-black", time: 1500, icon: "error" }))
            setError("root", { message: error.response.message })
        }
    }

    useEffect(() => {
        let phi = 0;
        const globe = createGlobe(canvasref.current, {
            devicePixelRatio: 2,
            width: canvasref.current.offsetHeight * 2,
            height: canvasref.current.offsetHeight * 2,
            phi: 0,
            theta: 0.2,
            dark: 1.1,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.8,
            mapBaseBrightness: .05,
            baseColor: [1.1, 1.1, 1.1],
            markerColor: [251 / 255, 100 / 255, 21 / 255],
            glowColor: [1, 1, 1],
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.1 },
            ],
            opacity: .7,
            onRender: (state) => {
                state.phi = phi + r.get()
                phi += 0.01
            }
        })

        return () => globe.destroy()
    }, [canvasref.current])
    return (
        <>
        <div className='h-[20rem] w-full overflow-hidden  relative select-none  py-2'>
            <div className=' w-fit absolute z-20 right-2  p-2'>
                <button onClick={()=> setaddopener(pre=> !pre)} className='material-symbols-outlined p-1 bg-white text-black rounded-md'>add </button>
            </div>
            <div className="flex w-[100%] h-full justify-center items-center ">
                <canvas 
                className=' w-[20rem] rounded-full h-[20rem]'
                ref={canvasref} 
                 onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                        canvasref.current.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasref.current.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasref.current.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 200,
                        });
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 100,
                        });
                    }
                }}
                ></canvas>
            </div>
        </div>

        <Cards opener={addopener} setopener={setaddopener} lable={"add new section"}>
        <div className=' flex flex-col py-3 justify-center h-[80%] items-center'>
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
        </Cards>
        </>
    )
}

export default Header