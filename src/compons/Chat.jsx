import { useEffect, useState } from 'react'
import Chatbase from '../appwrite/chatbase'
import { useNavigate, useParams } from 'react-router-dom'
import AuthClient from '../appwrite/auth'

const Chat = () => {
  const { userid, chatid } = useParams()
  const [initchat, setinitchat] = useState([])
  const [alldata, setalldata] = useState(null)
  const [mass, setmass] = useState("")
  const [sending, setsending] = useState(false)
  const [updater, setupdater] = useState(false)
  const naviget = useNavigate()

  const getchat = async () => {
    try {
      const get = await Chatbase.getchatbar(chatid)
      if (get) {
        setinitchat(get.chatsarr)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const firstget = async()=>{
    try {
      let date = new Date().toDateString()
      console.log(date);
      const user = await AuthClient.getcurrentuser()
      if (user.$id == userid) {
        const get = await Chatbase.getchatbar(chatid)
        if (get) {
          setinitchat(get.chatsarr)
          setalldata(get)
          console.log(get);
          await Chatbase.updatechat(chatid,{lastvisited:date})
        }
      }else{
        naviget("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendmass = async()=>{
    if (mass == "") return
    try {
      setsending(true)
      const newchat = [...initchat, mass.trim()]
      setinitchat(newchat)
      const send = await Chatbase.updatechat(chatid,{chatsarr:newchat})
      if (send) {
        setsending(false)
        setmass("")
        console.log(send);
      }
    } catch (error) {
      setsending(false)
      console.log(error);
    }
  }

  useEffect(()=>{
    firstget()
  },[])

  useEffect(()=>{
    getchat()
  },[updater])

  return alldata?(
    <div className='w-full flex flex-col items-center h-full'>
      <div className=' self-start p-3 w-full flex items-center justify-between'>
        <h2 className='text-[2rem]'>{alldata.title}</h2>
        <button className='material-symbols-outlined'>settings</button>
      </div>
      <div className='w-[60%] h-full min-h-[90%] flex flex-col gap-4  items-end py-20 max-sm:w-[90%]'>
        {initchat?.map((e, i) => (
          <div key={i} className='w-fit max-w-[100%]  h-full scrollbar overflow-x-scroll bg-neutral-800 p-2 rounded-md text-neutral-300'>
          <p className='text-wrap text-left whitespace-pre-wrap'>{e}</p>
          </div>
        ))}
      </div>
      <div className='w-[98%] relative flex items-end justify-around bg-zinc-900 py-2 px-1'>
        <button onClick={()=>setupdater(pre=>!pre) } className=' p-2 bg-white text-black rounded-full absolute bottom-24 left-2 material-symbols-outlined text-[1.1rem]'>circle</button>
        <textarea 
        value={mass}
        onChange={(e)=> setmass(e.target.value)}
        spellCheck={false}
        placeholder='hello' className='w-[90%] h-[5rem] text-neutral-100 text-[0.9rem] bg-transparent border-none outline-none'></textarea>

        <button disabled={sending} className="material-symbols-outlined p-1 text-[1rem] bg-white text-black rounded-full " onClick={sendmass}>{sending?"progress_activity":"send"}</button>
      </div>
    </div>
  ):null
}

export default Chat