import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './view/Navbar';
import IssueTemplate from './view/IssueTemplate/IssueTemplate';
// Example page components
const Home = () => (
  <div className=" bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Page</h1>
      <p className="text-gray-600">Welcome to the home page!</p>

    </div>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About Page</h1>
      <p className="text-gray-600">Learn more about us.</p>
    </div>
  </div>
);

const Services = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Services Page</h1>
      <p className="text-gray-600">Check out our services.</p>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Page</h1>
      <p className="text-gray-600">Get in touch with us.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='mt-20'>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issueTemplate" element={<IssueTemplate/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;