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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<AuthPass pass={true} auth={true} child={<Home />}/>} />
            <Route path='/login' element={<AuthPass pass={false} auth={false} child={<Login />}/>} />
            <Route path='/code' element={<Password />} />
            <Route path='/create-orbit' element={<Createorbit />} />

            <Route path='/chat/:userid/:chatid' element={<AuthPass pass={true} auth={true} child={<Chat />}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
