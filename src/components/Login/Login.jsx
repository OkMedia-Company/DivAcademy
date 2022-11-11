import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
  return (
    <div>
       Mail : <input type="text" />
       Password :  <input type="text" />
        <NavLink to="/signup" className="p-3">
        Hesabınız yoxdur ? 
        </NavLink>
    </div>
  )
}
    export default Login