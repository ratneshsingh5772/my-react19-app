import React from 'react'
import BankAccounts from '../components/program/BankAccounts.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'

export default function Bank() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
      <BankAccounts/>
      <Footer />
    </div>
  )
}
