import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateurl } from '../store/prepageslice'

const AuthPass = ({ pass = true, auth = true, child }) => {
  const [loader, setloader] = useState(true)
  const { status } = useSelector(state => state.authslice)
  const { passmached } = useSelector(state => state.passslice)
  const naviget = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth && status !== auth) {
      naviget("/login")
    } else if (!auth && status !== auth) {
      naviget("/")
    } else if (pass && passmached !== pass) {
      naviget("/code")
    }

    setloader(false)
  }, [passmached, status, naviget])

  useEffect(() => {
    console.log(location.pathname);
    dispatch(updateurl(location.pathname))
  }, [])

  return loader ? (
    <div>AuthPass</div>
  ) : (<>{child}</>)
}

export default AuthPass