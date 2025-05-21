import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './Usercontext'
import { useNavigate } from 'react-router-dom';
 


function Auth({ children }) {
    const [load,setLoading]=useState(true);
    const navigate=useNavigate();
    const { user } = useContext(UserContext);
    const token=localStorage.getItem("token");

    useEffect(function () {
        if(user)
            setLoading(false);

        if (!user){    
            navigate("/login");
        }
        if(!token){
            navigate("/login");
        }
    }, [])

        if(load){
            return (<div>loading....</div>)
        }

    return (
        <>{children}</>
    )
}

export default Auth