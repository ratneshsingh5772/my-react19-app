import React from 'react'
import BankAccount from '../components/program/BankAccount.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'

export default function Bank() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
      <BankAccount />
      <Footer />
    </div>
  )
}
