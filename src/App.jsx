import { useEffect, useState } from 'react'
import AuthClient from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { storelogin, storelogout } from './store/authslice';
import Navbar from './compons/Navbar';
import { Outlet } from 'react-router-dom';
import Toast from './compons/Toast';
import Loadinpage from './compons/Loadinpage';

const App = () => {
  const [loader, setloader] = useState(true)
  const dispach = useDispatch()


  const init = async () => {
    try {
      setloader(true)
      const isauth = await AuthClient.getcurrentuser()
      if (isauth) {
        dispach(storelogin(isauth.$id))
        setloader(false)
      } else {
        dispach(storelogout())
        setloader(false)
      }
    } catch (error) {
      setloader(false)
      console.log(error);
    }
  }

  useEffect(() => {
    init()
  }, [])


  return loader ? (
    <Loadinpage/>
  ) : (
    <>
      <Navbar />
      <Toast/>
      <main className='w-full min-h-screen max-h-full pt-12 bg-neutral-950 text-neutral-100'>
        <Outlet />
      </main>
    </>
  )
}

export default App