import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './compons/Login.jsx'
import Home from './pages/Home.jsx'
import Createorbit from './compons/Createorbit.jsx'
import Chat from './compons/Chat.jsx'
import Password from './compons/Password.jsx'
import AuthPass from './compons/AuthPass.jsx'
import Profile from './compons/Profile.jsx'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import Test from './compons/Test.jsx'
import Howtouse from './compons/Howtouse.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<AuthPass pass={true} auth={true} child={<Home />}/>} />
            <Route path='/login' element={<AuthPass pass={false} auth={false} child={<Login />}/>} />
            <Route path='/code' element={<AuthPass pass={false} auth={true} child={<Password />}/>} />
            <Route path='/create-orbit' element={<AuthPass pass={false} auth={false} child={<Createorbit />}/>} />
            <Route path='/profile' element={<AuthPass pass={true} auth={true} child={<Profile />}/>} />
            <Route path='/test' element={<Test/>} />
            <Route path='/how-to-use' element={<Howtouse/>} />
            <Route path='/chat/:userid/:chatid' element={<AuthPass pass={true} auth={true} child={<Chat />}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </SkeletonTheme>
  </React.StrictMode>,
)
