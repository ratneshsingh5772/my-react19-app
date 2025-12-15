import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import UserProfile from "../components/program/AuthContext";

export default function Authlogin() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Authentication Login</h1>
          <p className="text-gray-600">Simple login form component</p>
        </div>

        <UserProfile />
      </div>
      <Footer />
    </div>
  );
}