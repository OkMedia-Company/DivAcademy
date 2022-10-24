import React from 'react'
import "./Main.css"
import Navbar from '../navbar/Navbar'
import Pages from '../root/Pages'

const Main = () => {
  return (
    <div className='main'>
      <Navbar/>
      <Pages/>
    </div>
  )
}

export default Main
