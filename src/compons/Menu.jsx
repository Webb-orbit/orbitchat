import React, { useEffect, useState } from 'react'
import Chatbase from '../appwrite/chatbase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { userid } = useSelector(state => state.authslice)
  const [listchat, setlistchat] = useState([])

  const fetchlist = async () => {
    try {
      let get = (await Chatbase.listchatbars(userid)).documents.reverse()
      console.log(get)
      setlistchat(get)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])
  return (
    <div className='w-full flex justify-center py-9'>
      <div className='w-[60%] flex flex-col gap-5 max-sm:w-[90%]'>
        {listchat.map((e) => (
          <Link key={e.$id} to={`/chat/${userid}/${e.$id}`}>
            <div className='h-20 p-3 bg-neutral-800 overflow-hidden inter flex flex-col justify-between'>
              <div className='flex w-full items-center justify-between'>
              <p className=' font-semibold'>{e.title}</p>
              <p className='text-[0.7rem] text-neutral-300'>{e.lastvisited}</p>
              </div>
              <p className='text-[0.8rem] whitespace-pre-wrap text-wrap text-neutral-300'>{e.chatsarr.length!==0?(JSON.parse(e.chatsarr[e.chatsarr.length-1]).massis.substring(0, 90)):"......"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Menu