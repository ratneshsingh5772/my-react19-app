import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header, { ThemeProvider } from '../components/program/ThemeContext'
import Footer from '../components/Footer/Footer'

export default function Theme() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
        <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Theme Toggle Example</h1>
                <p className="text-gray-600">Simple React Context for theme switching</p>
            </div>

            <ThemeProvider>
                <Header />
            </ThemeProvider>
        </div>
        <Footer />
    </div>
  )
}
