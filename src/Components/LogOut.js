import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';

function LogOut() {
    const { setIsLoggedIn } = useContext(AppContext);
  return (
      <>
        <button type="button" className="btn" onClick={()=>{setIsLoggedIn(0)}}>Log Out</button>
      </>
  )
}

export default LogOut