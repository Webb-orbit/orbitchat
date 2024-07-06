import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { passwordok } from '../store/passslice'
import { Link, useNavigate } from 'react-router-dom'

const Password = () => {

    const [number, setnumber] = useState(0)
    const { passmached } = useSelector(state => state.passslice)
    const { prepage } = useSelector(state => state.prepageslice)
    const disp = useDispatch()
    const { watch, register } = useForm()
    const watchany = watch()
    const naviget = useNavigate()


    useEffect(() => {
        let ram = ""
        for (let i = 0; i < 3; i++) {
            let dom = Math.round(Math.random() * 9)
            ram += dom
        }
        setnumber(ram)
    }, [])

    const chack = () => {
        if (watchany.code) {
            let currentcode = `im${number * 2}`
            if (currentcode == watchany.code) {
                naviget(prepage)
                disp(passwordok())
            }
        }
    }

    useEffect(() => {
        chack()
    }, [watchany.code])

    return !passmached ? (
        <div className='w-full h-screen fixed top-0 bg-black/40 backdrop-blur-sm flex items-center justify-center flex-col gap-5 z-50'>
            <h2 className='text-[2rem] capitalize font-semibold select-none max-sm:text-[1.5rem]  max-sm:self-center'>enter the Password</h2>
            <div className='w-[30%] flex flex-col items-center max-sm:w-[90%]'>
                <p className='text-[1.1rem] text-neutral-200 uppercase font-medium'>{number}</p>
                <input
                    {...register("code")}
                    type="text" placeholder='code' className=' text-black placeholder:text-black w-full outline-none  bg-neutral-200 py-1 px-2 rounded-sm' />
            </div>
        </div>
    ) : <div className='w-full h-screen flex items-center justify-center capitalize font-medium text-green-400 inter'><Link to={"/"}>back home</Link></div>
}

export default Password