import React from 'react'
import { useForm } from 'react-hook-form'
import AuthClient from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { storelogin } from '../store/authslice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState:{errors, isSubmitting}, setError } = useForm()
  const disp = useDispatch()
  const navi  = useNavigate()

  const loginsubmit = async(data)=>{
    try {
      let log = await AuthClient.login(data.username, data.password)
      if(log){
        disp(storelogin(log.$id))
        navi("/")
      }
    } catch (error) {
      setError("root", {message:error.response.message})
    }
  }
  
  return (
    <div className='w-full h-full flex items-center justify-center '>
      <div className='w-[60%] flex flex-col items-center gap-3 max-sm:w-[90%]'>
        <h3 className='text-[2rem] capitalize font-semibold select-none max-sm:text-[1.5rem] max-sm:self-start'>login to an orbiter</h3>
        {errors.root && <p className='text-red-300 text-[0.8rem] animate-pulse'>{errors.root.message?errors.root.message:"opps!"}</p>}
        <form onSubmit={handleSubmit(loginsubmit)} className='w-[55%]  flex flex-col gap-3 max-sm:gap-6 max-sm:w-[100%]'>
          <div>
            <input
              {...register("username", {required:"required"})}
              type="email" placeholder='username' className={` w-full outline-none  bg-neutral-700/80 py-1 px-2 rounded-sm ${errors.username && "border-[1px] border-red-500/70" }`} />
              {errors.username && <p className='text-[0.7rem] text-red-300 font-medium'>{errors.username.message}</p>}
          </div>
          <div>
            <input
              {...register("password", {required:"required"})}
              type="text" placeholder='password' className={` w-full outline-none  bg-neutral-700/80 py-1 px-2 rounded-sm ${errors.password && "border-[1px] border-red-500/70" }`} />
              {errors.password && <p className='text-[0.7rem] text-red-300 font-medium'>{errors.password.message}</p>}
          </div>
          <button type='submit' disabled={isSubmitting} className={` uppercase text-[1rem] bg-green-500 rounded-md py-1 font-medium text-black ${isSubmitting && "animate-pulse"}`}>submit</button>
        </form>

        <div >
          <p className=' capitalize text-[0.9rem] font-medium'>don't have an orbiter <Link to={"/create-orbit"} className='text-green-300'>create new</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login