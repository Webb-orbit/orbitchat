import { useEffect, useState } from 'react'
import Chatbase from '../appwrite/chatbase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Menu = () => {
  const { userid } = useSelector(state => state.authslice)
  const [listchat, setlistchat] = useState([])
  const [fetching, setfetching] = useState(true)

  const fetchlist = async () => {
    try {
      setfetching(false)
      let get = (await Chatbase.listchatbars(userid)).documents.reverse()
      if (get) {
        setfetching(true)
        setlistchat(get)
      }
    } catch (error) {
      setfetching(true)
      console.log(error);
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  return fetching ? (
    <div className='w-full flex justify-center py-9'>
      <div className='w-[60%] flex flex-col gap-5 max-sm:w-[90%]'>
        {listchat.length!=0?listchat.map((e) => (
          <Link key={e.$id} to={`/chat/${userid}/${e.$id}`}>
            <div className='h-20 p-3 bg-neutral-800 overflow-hidden inter flex flex-col justify-between'>
              <div className='flex w-full items-center justify-between'>
                <p className=' font-semibold'>{e.title}</p>
                <p className='text-[0.7rem] text-neutral-300'>{e.lastvisited}</p>
              </div>
              <p className='text-[0.8rem] whitespace-pre-wrap text-wrap text-neutral-300'>{e.chatsarr.length !== 0 ? (JSON.parse(e.chatsarr[e.chatsarr.length - 1]).m.substring(0, 90)) : "......"}</p>
            </div>
          </Link>
        )):<h2>no chats fount</h2>}
      </div>
    </div>
  ) : (<>
    <div className='w-[100%] mx-auto p-7 h-[25rem]'>
      <Skeleton count={3} height={"5rem"} className='w-60%' />
    </div>
  </>)
}

export default Menu