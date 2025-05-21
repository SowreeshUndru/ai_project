
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();


function Userprovider({children}) {

  const [user,setUser] = useState("");

  





  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
    
  )
}


export default Userprovider;
export {UserContext};