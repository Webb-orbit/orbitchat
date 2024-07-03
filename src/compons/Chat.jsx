import { useEffect, useState } from 'react'
import Chatbase from '../appwrite/chatbase'
import { useNavigate, useParams } from 'react-router-dom'
import AuthClient from '../appwrite/auth'
import Cards from './Cards'
import { useDispatch } from 'react-redux'
import { showt } from '../store/toastslice'

const Chat = () => {
  const { userid, chatid } = useParams()
  const [initchat, setinitchat] = useState([])
  const [alldata, setalldata] = useState(null)
  const [mass, setmass] = useState("")
  const [sending, setsending] = useState(false)
  const [updater, setupdater] = useState(false)
  const [settopenr, setsettopenr] = useState(false)
  const naviget = useNavigate()
  const Dispatch = useDispatch() 

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

  const firstget = async () => {
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
          await Chatbase.updatechat(chatid, { lastvisited: date })
        }
      } else {
        naviget("/")
        Dispatch(showt({mass:"invalid argument", color:"text-black", time:2000, icon:"error"}))
      }
    } catch (error) {
      naviget("/")
      Dispatch(showt({mass:"something wrong", color:"text-black", time:2000, icon:"error"}))
      console.log(error);
    }
  }

  const sendmass = async () => {
    if (mass == "") return
    try {
      let nowtime = new Date().toTimeString().substring(0, 5)
      setsending(true)
      let massis = mass.trim()
      let inputarr = JSON.stringify({ massis, nowtime })
      const newchat = [...initchat, inputarr]
      const send = await Chatbase.updatechat(chatid, { chatsarr: newchat })
      if (send) {
        setinitchat(send.chatsarr)
        setsending(false)
        setmass("")
      }
    } catch (error) {
      Dispatch(showt({mass:"something wrong", color:"text-black", time:1000, icon:"error"}))
      setsending(false)
      console.log(error);
    }
  }

  const cleanup = async()=>{
    try {
      const clean = await Chatbase.updatechat(chatid, { chatsarr: [] })
      if (clean) {
        setupdater(pre => !pre)
        setsettopenr(false)
      }
    } catch (error) {
      console.log(error);
      Dispatch(showt({mass:"something wrong", color:"text-black", time:1000, icon:"error"}))
    }
  }

  const deletechat = async()=>{
    try {
      const dele = await Chatbase.deletechat(chatid)
      if (dele) {
        setsettopenr(false)
        naviget("/")
      }
    } catch (error) {
      Dispatch(showt({mass:"something wrong", color:"text-black", time:1000, icon:"error"}))
      console.log(error);
    }
  }

  useEffect(() => {
    firstget()
  }, [chatid])

  useEffect(() => {
    getchat()
  }, [updater])

  return alldata ? (
    <>
      <div className='w-full flex flex-col items-center h-full inter'>
        <div className=' self-start p-3 w-full flex items-center justify-between'>
          <h2 className='text-[2rem]'>{alldata.title}</h2>
          <button onClick={()=>setsettopenr(pre=> !pre)} className='material-symbols-outlined'>settings</button>
        </div>
        <div className='w-[60%] h-full flex flex-col gap-4  items-end py-20 max-sm:w-[90%]'>
          {initchat?.map((e, i) => (
            <div key={i} className='w-fit max-w-[100%]  h-full scrollbar overflow-x-scroll bg-neutral-800 px-2 pt-2 pb-1 rounded-md text-neutral-300'>
              <p className='text-wrap text-left whitespace-pre-wrap'>{JSON.parse(e).massis}</p>
              <p className='text-wrap text-neutral-400 text-right text-[0.5rem] whitespace-pre-wrap'>{JSON.parse(e).nowtime}</p>
            </div>
          ))}
        </div>
        <div className='w-[98%] relative flex items-end justify-around bg-zinc-900 py-2 px-1'>
          <button onClick={() => setupdater(pre => !pre)} className=' p-2 bg-white text-black rounded-full absolute bottom-24 left-2 material-symbols-outlined text-[1.1rem]'>circle</button>
          <textarea
            value={mass}
            onChange={(e) => setmass(e.target.value)}
            spellCheck={false}
            disabled={sending}
            placeholder='hello moto' className='w-[90%] h-[5rem] text-neutral-100 text-[0.9rem] bg-transparent border-none outline-none'></textarea>

          <button disabled={sending} className={`material-symbols-outlined p-1 text-[1rem] bg-white text-black rounded-full ${sending && "animate-pulse"} `} onClick={sendmass}>{sending ? "progress_activity" : "arrow_circle_up"}</button>
        </div>
      </div>

      <Cards lable={"settings"} setopener={setsettopenr} opener={settopenr}>
        <div className='p-4 flex flex-col gap-5'>
          <button onClick={cleanup} className='flex items-center rounded-md bg-neutral-800/30 gap-6 px-5 py-2 text-[1.1rem] font-semibold capitalize'><span className='material-symbols-outlined'>vacuum</span>clean up </button>
          <button onClick={deletechat} className='flex items-center rounded-md bg-neutral-800/30 gap-6 px-5 py-2 text-[1.1rem] font-semibold capitalize'><span className='material-symbols-outlined'>delete</span>destroy section </button>
        </div>
      </Cards>
    </>
  ) : null
}

export default Chat