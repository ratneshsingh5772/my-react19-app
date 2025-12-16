import React from 'react'
import UseCallbackDemo from '../components/program/UseCallbackDemo.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'

export default function UseCallback() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      <UseCallbackDemo />
      <Footer />
    </div>
  )
}
