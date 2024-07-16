import React from 'react'
import { useForm } from 'react-hook-form'
import AuthClient from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { storelogin } from '../store/authslice'
import { Link, useNavigate } from 'react-router-dom'

const Createorbit = () => {
    const { register, handleSubmit, formState:{errors, isSubmitting}, setError } = useForm()
    const disp = useDispatch()
    const navi  = useNavigate()

    const signuporbit = async(data)=>{
        try {
            const create = await AuthClient.firstcreate(data.username, data.password, data.name)
            if(create){
                disp(storelogin(create.$id))
                navi("/")
            }
        } catch (error) {
            setError("root", {message:error.response.message})
        }
    }
    
    return (
<div className='w-full flex items-center justify-center h-full'>
      <div className='w-[60%] flex flex-col items-center gap-3 max-sm:w-[90%]'>
        <h3 className='text-[2rem] capitalize font-semibold select-none max-sm:text-[1.5rem] max-sm:self-start'>create new orbit</h3>
        {errors.root && <p className='text-red-300 text-[0.8rem] animate-pulse'>{errors.root.message?errors.root.message:"opps!"}</p>}
        <form onSubmit={handleSubmit(signuporbit)} className='w-[55%]  flex flex-col gap-3 max-sm:gap-6 max-sm:w-[100%]'>
          <div>
            <input
              {...register("username", {required:"required", pattern:/\b[A-Za-z0-9._%+-]+@orbit\.io\b/})}
              type="name" placeholder='example@orbit.io' className={` w-full outline-none  bg-neutral-700/80 py-1 px-2 rounded-sm ${errors.username && "border-[1px] border-red-500/70" }`} />
              {errors.username && <p className='text-[0.7rem] text-red-300 font-medium'>{errors.username.message|| "ending with @orbit.io"}</p>}
          </div>
          <div>
            <input
              {...register("password", {required:"required"})}
              type="text" placeholder='password' className={` w-full outline-none  bg-neutral-700/80 py-1 px-2 rounded-sm ${errors.password && "border-[1px] border-red-500/70" }`} />
              {errors.password && <p className='text-[0.7rem] text-red-300 font-medium'>{errors.password.message}</p>}
          </div>
          <div>
            <input
              {...register("name", {required:"required"})}
              type="text" placeholder='name' className={` w-full outline-none  bg-neutral-700/80 py-1 px-2 rounded-sm ${errors.name && "border-[1px] border-red-500/70" }`} />
              {errors.name && <p className='text-[0.7rem] text-red-300 font-medium'>{errors.name.message}</p>}
          </div>
          <button type='submit' disabled={isSubmitting} className={` uppercase text-[1rem] bg-green-500 rounded-md py-1 font-medium text-black ${isSubmitting && "animate-pulse cursor-wait"}`}>submit</button>
        </form>
        <div >
          <p className=' capitalize text-[0.9rem] font-medium'>allrady have an orbiter <Link to={"/login"} className='text-green-300'>connect now</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Createorbit