import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthPass = ({pass=true, auth=true, child}) => {
const [loader, setloader] = useState(true)
const {status} = useSelector(state=>state.authslice)
const {passmached} = useSelector(state=>state.passslice)
const naviget = useNavigate()

useEffect(()=>{
  if (auth && status !== auth) {
    naviget("/login")
  }else if(!auth && status !== auth){
    naviget("/")
  }else if(pass && passmached !== pass){
    naviget("/code")
}else if (!pass && passmached !== pass) {
  naviget("/")
}

setloader(false)
},[passmached, status, naviget])

  return loader? (
    <div>AuthPass</div>
  ):(<>{child}</>)
}

export default AuthPass