import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Results from './components/Results';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    budget: 5000,
    isCheapMode: false,
    activeTab: 'hotel'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (params) => {
    setIsLoading(true);
    setSearchParams(params);
    
    // Simulate API Delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero onSearch={handleSearch} />
        <Results searchParams={searchParams} isLoading={isLoading} />
      </main>
      <Footer />
    </>
  );
}

export default App;
