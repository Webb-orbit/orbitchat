import React, { useEffect, useState } from 'react'
import AuthClient from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { showt } from '../store/toastslice';
import { Link, useNavigate } from 'react-router-dom';
import { storelogout } from '../store/authslice';

const Profile = () => {
  const [user, setuser] = useState({})
  const [sessins, setsessins] = useState([])
  const [louing, setlouing] = useState(false)
  const Dispatch = useDispatch() 
  const neviget = useNavigate()


  const userinfo = async () => {
    try {
      const user = await AuthClient.getcurrentuser()
      const sessons = (await AuthClient.sessons()).sessions
      setuser(user)
      setsessins(sessons)
      console.log(user);
      console.log(sessons);
    } catch (error) {
      console.log(error);
    }
  }

  const logoutfun = async ()=>{
    try {
      setlouing(true)
      let log = await AuthClient.appwritelogout()
      if (log) {
        setlouing(false)
        Dispatch(storelogout())
        neviget("/login")
      }
    } catch (error) {
      setlouing(false)
      Dispatch(showt({mass:"something wrong", color:"text-black", time:1000, icon:"error"}))
      console.log(error);
    }
  }

  useEffect(() => {
    userinfo()
  }, [])
  return sessins.length!==0?(
    <div className='py-10 inter flex flex-col items-center w-full justify-center'>
      <div className='w-[90%] flex flex-col gap-5 pb-5'>
        <div>
          <h2 className=' capitalize text-[2rem] font-medium  text-neutral-300 max-sm:text-[1.2rem]'>orbit name: {user.name}</h2>
          <p className='capitalize text-[0.7rem] font-medium'>id: {user.$id}</p>
        </div>
        <h2 className=' capitalize text-[1.7rem] font-medium text-neutral-300 max-sm:text-[1.2rem] '>orbit provider: {user.email}</h2>
      </div>
      <div className='w-[90%] flex flex-col gap-5 pb-5 border-b-2'>
        {sessins.map((e) => (
          <div key={e.$id} className={` relative cursor-default select-none bg-neutral-800 px-4 py-2 rounded-md text-[0.9rem] text-neutral-300 `}>
            {e.current && <div className=' w-2 h-2 rounded-full bg-green-500 absolute right-2 top-2'></div>}
            <p>{e.osCode}</p>
            <p>{e.clientName} {e.clientType}</p>
            <p className='text-[0.8rem]'>id {e.$id}</p>
          </div>
        ))}
      </div>
      <div className='w-[90%] flex flex-col gap-5 pb-5'>
        <div>
        <h3 className=' capitalize text-[2rem] font-medium  text-neutral-400 '>denger zone</h3>
        <p className='txet-[0.8rem] text-neutral-300'>logout won't delete your Account!</p>
        <p className=' capitalize'>taniya be carefull 🤖</p>
        </div>
        <button onClick={logoutfun} className={` bg-red-500 py-1 rounded-md font-semibold text-black uppercase ${louing && "animate-pulse"}`}>logout</button>
      </div>
      <div className='w-[90%] flex flex-col gap-5 pb-5'>
        <div>
        <h3 className=' capitalize text-[2rem] font-medium  text-neutral-400 '> my other websites</h3>
        <div>
       <p>parsonal and worlds most secure note website</p>
       <Link to={"https://darkpassword.vercel.app"} target={"_blank"} className='text-[0.9rem] text-blue-200 capitalize'>darkpassword</Link>
        </div>
        <div>
       <p>artical website not responsive</p>
       <Link to={"https://artivarse.vercel.app"} target={"_blank"} className='text-[0.9rem] text-blue-200 capitalize'>artivarse</Link>
        </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Profile