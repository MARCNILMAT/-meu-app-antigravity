import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Hotel, Plane, Truck, Sparkles, ShieldCheck, DollarSign } from 'lucide-react';
import './Hero.css';

const POPULAR_CITIES = [
  'Salvador, BA', 'Natal, RN', 'Gramado, RS', 'São Paulo, SP', 
  'Rio de Janeiro, RJ', 'Fortaleza, CE', 'Recife, PE', 'Curitiba, PR',
  'Florianópolis, SC', 'Belo Horizonte, MG'
];

export default function Hero({ onSearch }) {
  const [activeTab, setActiveTab ] = useState('hotel');
  const [isCheapMode, setIsCheapMode] = useState(false);
  const [budget, setBudget] = useState(2500);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  
  // Destination Autocomplete state
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  // Origin Autocomplete state
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);

  // Trip Type and Dates state
  const [tripType, setTripType] = useState('round'); // 'round' | 'oneway'
  const [dateDeparture, setDateDeparture] = useState('');
  const [dateReturn, setDateReturn] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch({
      destination: isCheapMode ? '' : destination,
      origin: origin, // Sempre incluído
      budget: isCheapMode ? parseInt(budget) : 99999,
      isCheapMode,
      activeTab: isCheapMode ? 'cheap' : activeTab,
      isPrivate: true, // Sempre ativo por baixo dos panos (mecanismo preservado)
      dateDeparture,
      dateReturn: tripType === 'round' ? dateReturn : ''
    });
  };

  const handleDestChange = (e) => {
    const val = e.target.value;
    setDestination(val);
    if (val.trim().length > 0) {
      const filtered = POPULAR_CITIES.filter(city => 
        city.toLowerCase().includes(val.toLowerCase())
      );
      setDestSuggestions(filtered);
      setShowDestSuggestions(true);
    } else {
      setDestSuggestions([]);
      setShowDestSuggestions(false);
    }
  };

  const handleOriginChange = (e) => {
    const val = e.target.value;
    setOrigin(val);
    if (val.trim().length > 0) {
      const filtered = POPULAR_CITIES.filter(city => 
        city.toLowerCase().includes(val.toLowerCase())
      );
      setOriginSuggestions(filtered);
      setShowOriginSuggestions(true);
    } else {
      setOriginSuggestions([]);
      setShowOriginSuggestions(false);
    }
  };

  const handleSelectDest = (city) => {
    setDestination(city);
    setShowDestSuggestions(false);
  };

  const handleSelectOrigin = (city) => {
    setOrigin(city);
    setShowOriginSuggestions(false);
  };

  return (
    <div className="hero-section">
      <div className="hero-bg-gradients">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Descubra o {isCheapMode ? <span className="highlight-cheap">Incrível</span> : 'Mundo'} de forma
          <span className="gradient-text"> Transparente</span>
        </h1>
        <p className="hero-subtitle">
          {isCheapMode 
            ? 'Diga-nos seu orçamento e nós encontramos os melhores destinos.' 
            : 'Busca inteligente de viagens com proteção de dados contra rastreios.'}
        </p>

        {/* CONTROLS (Toggles) */}
        <div className="hero-controls">
          <button 
            type="button"
            className={`control-toggle ${isCheapMode ? 'active' : ''}`}
            onClick={() => setIsCheapMode(!isCheapMode)}
          >
            <DollarSign size={18} />
            <span>Explorar Barato</span>
          </button>
          
          {/* Botão Busca Privada Removido conforme pedido */}
        </div>

        {/* SEARCH FORM CONTAINER */}
        <div className="search-container glass">
          
          {/* PACKAGE TABS */}
          {!isCheapMode && (
            <div className="package-tabs">
              <button type="button" className={`tab-btn ${activeTab === 'hotel' ? 'active' : ''}`} onClick={() => setActiveTab('hotel')}>
                <Hotel className="tab-icon" /> <span>Somente Hospedagem</span>
              </button>
              <button type="button" className={`tab-btn ${activeTab === 'flight' ? 'active' : ''}`} onClick={() => setActiveTab('flight')}>
                <Plane className="tab-icon" /> <span>Hospedagem + Aéreo</span>
              </button>
              <button type="button" className={`tab-btn ${activeTab === 'ground' ? 'active' : ''}`} onClick={() => setActiveTab('ground')}>
                <Truck className="tab-icon" /> <span>Hospedagem + Terrestre</span>
              </button>
              <button type="button" className={`tab-btn ${activeTab === 'full' ? 'active' : ''}`} onClick={() => setActiveTab('full')}>
                <Sparkles className="tab-icon" /> <span>Pacote Completo</span>
              </button>
            </div>
          )}

          {/* TRIP TYPE SELECTOR */}
          {!isCheapMode && (
            <div className="trip-type-selector">
              <button 
                type="button" 
                className={`trip-btn ${tripType === 'round' ? 'active' : ''}`}
                onClick={() => setTripType('round')}
              >
                Ida e Volta
              </button>
              <button 
                type="button" 
                className={`trip-btn ${tripType === 'oneway' ? 'active' : ''}`}
                onClick={() => setTripType('oneway')}
              >
                Somente Ida
              </button>
            </div>
          )}

          <form className="search-form" onSubmit={handleFormSubmit}>
            
            {isCheapMode ? (
              <div className="form-grid cheap-grid">
                <div className="input-group">
                  <label><MapPin size={16} /> Origem</label>
                  <input 
                    type="text" 
                    placeholder="De onde você sai?" 
                    value={origin}
                    onChange={handleOriginChange}
                    required 
                    autoComplete="off"
                  />
                  {showOriginSuggestions && originSuggestions.length > 0 && (
                    <div className="suggestions-dropdown glass">
                      {originSuggestions.map((city, i) => (
                        <div key={i} className="suggestion-item" onClick={() => handleSelectOrigin(city)}>
                          <MapPin size={14} className="suggest-icon" />
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="input-group">
                  <label><DollarSign size={16} /> Orçamento Máximo: R$ {budget}</label>
                  <input 
                    type="range" 
                    min="500" 
                    max="5000" 
                    step="100" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                  />
                </div>
              </div>
            ) : (
              <div className={`form-grid ${tripType === 'oneway' ? 'oneway-grid' : ''}`}>
                
                {/* NOVO CAMPO ORIGEM NA HOME PRINCIPAL */}
                <div className="input-group">
                  <label><MapPin size={16} /> Origem</label>
                  <input 
                    type="text" 
                    placeholder="De onde você sai?" 
                    value={origin}
                    onChange={handleOriginChange}
                    required 
                    autoComplete="off"
                  />
                  {showOriginSuggestions && originSuggestions.length > 0 && (
                    <div className="suggestions-dropdown glass">
                      {originSuggestions.map((city, i) => (
                        <div key={i} className="suggestion-item" onClick={() => handleSelectOrigin(city)}>
                          <MapPin size={14} className="suggest-icon" />
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="input-group destination-group">
                  <label><MapPin size={16} /> Destino</label>
                  <input 
                    type="text" 
                    placeholder="Para onde vamos?" 
                    value={destination}
                    onChange={handleDestChange}
                    required 
                    autoComplete="off"
                  />
                  {showDestSuggestions && destSuggestions.length > 0 && (
                    <div className="suggestions-dropdown glass">
                      {destSuggestions.map((city, i) => (
                        <div key={i} className="suggestion-item" onClick={() => handleSelectDest(city)}>
                          <MapPin size={14} className="suggest-icon" />
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <label><Calendar size={16} /> Data Ida</label>
                  <input 
                    type="date" 
                    value={dateDeparture} 
                    onChange={(e) => setDateDeparture(e.target.value)} 
                    required 
                  />
                </div>

                {tripType === 'round' && (
                  <div className="input-group">
                    <label><Calendar size={16} /> Data Volta</label>
                    <input 
                      type="date" 
                      value={dateReturn} 
                      onChange={(e) => setDateReturn(e.target.value)} 
                      required 
                    />
                  </div>
                )}

                <div className="input-group">
                  <label><Users size={16} /> Viajantes</label>
                  <select>
                    <option>1 Adulto</option>
                    <option>2 Adultos</option>
                    <option>Família (3+)</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="search-btn">
              <Search size={22} className="search-icon-anim" />
              <span>{isCheapMode ? 'Encontrar Pechinchas' : 'Buscar'}</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
