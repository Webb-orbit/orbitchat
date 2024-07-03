import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cards from './Cards'
import Menu from './Menu'

const Navbar = () => {
  const {status} = useSelector(state=> state.authslice)
  const [menuopener, setmenuopener] = useState(false)
  return (
    <>
    <div className='z-[20] w-full h-[3rem] flex items-center justify-between px-3 bg-black text-white fixed top-0'>
      <div>
        <Link to={"/"}>
        <h2 className=' capitalize font-medium text-[1.2rem]'>orbiter</h2>
        </Link>
      </div>
      <div className='flex gap-2' >
        {!status &&<Link to={"/login"}>
        connect
        </Link>}
        {status &&<Link to={"/profile"}>
        profile
        </Link>}
        <div className='hidden max-sm:block'>
          <button className='material-symbols-outlined' onClick={()=> setmenuopener(pre=>!pre)}>menu</button>
        </div>
      </div>
    </div>

    <Cards lable={"sextion list"} opener={menuopener} setopener={setmenuopener} classes={"max-sm:h-[80vh] text-white"}>
      <Menu/>
    </Cards>
    </>
  )
}

export default Navbar