import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import UserProfile from '../components/program/AuthContext';
import UserList from '../components/program/UserList';
import CreatePost from '../components/program/CreatePost';
import Footer from '../components/Footer/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <UserProfile />
        <UserList />
        <CreatePost />
      </div>
      <Footer />
    </div>
  );
};

export default About;