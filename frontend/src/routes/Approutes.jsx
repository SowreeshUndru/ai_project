import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import Home from '../components/Home.jsx';
import Project from '../components/Project.jsx';
import Auth from '../components/Auth.jsx';
function Approutes() {
    
    return (
      
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Auth><Home/></Auth>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/project/:id" element={<Auth><Project/></Auth>}></Route>
            </Routes>

        </BrowserRouter>
    )
}

export default Approutes;