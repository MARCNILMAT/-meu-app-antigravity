import React, { useState } from 'react';
import { Star, TrendingDown, TrendingUp, Sparkles, Map, SlidersHorizontal, Loader } from 'lucide-react';
import './Results.css';

const mockOffers = [
  {
    id: 1,
    type: 'hotel',
    title: 'Visual Resort & Spa',
    location: 'Natal, RN',
    price: 1850,
    oldPrice: 2200,
    rating: 4.8,
    distance: '100m da praia',
    trend: 'down',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80',
    tags: ['All Inclusive', 'Cancelamento Grátis']
  },
  {
    id: 2,
    type: 'flight',
    title: 'Hotel Fasano Salvador',
    location: 'Salvador, BA',
    price: 1240,
    oldPrice: 1240,
    rating: 4.9,
    distance: 'No Centro Histórico',
    trend: 'stable',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    tags: ['Luxo', 'Hospedagem + Voo']
  },
  {
    id: 3,
    type: 'ground',
    title: 'Pousada Recanto das Cores',
    location: 'Gramado, RS',
    price: 680,
    oldPrice: 850,
    rating: 4.5,
    distance: '1.2km do centro',
    trend: 'down',
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
    tags: ['Romântico', 'Translados']
  },
  {
    id: 4,
    type: 'full',
    title: 'Resort Costão do Santinho',
    location: 'Florianópolis, SC',
    price: 3200,
    oldPrice: 3500,
    rating: 4.7,
    distance: 'Beira-mar',
    trend: 'down',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    tags: ['Pacote Completo', 'Spa']
  }
];

export default function Results({ searchParams, isLoading }) {
  const [filterPrice, setFilterPrice] = useState('all');

  // Filtering Logic
  const filteredOffers = mockOffers.filter(offer => {
    // 1. Tab / Package filtering
    const matchTab = searchParams.activeTab === 'cheap' || searchParams.activeTab === 'full' 
      ? true 
      : offer.type === searchParams.activeTab;

    // 2. Destination filtering
    const matchDest = searchParams.destination 
      ? offer.location.toLowerCase().includes(searchParams.destination.toLowerCase()) || 
        offer.title.toLowerCase().includes(searchParams.destination.toLowerCase())
      : true;

    // 3. Budget filtering
    const matchBudget = offer.price <= searchParams.budget;

    return matchTab && matchDest && matchBudget;
  });

  return (
    <section className="results-section" id="results">
      <div className="results-container">
        
        {/* TOP FILTER BAR */}
        <div className="filter-bar">
          <div className="filter-title">
            <SlidersHorizontal size={18} />
            <span>Filtros</span>
          </div>
          <div className="filter-options">
            <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
              <option value="all">Qualquer Preço</option>
              <option value="1000">Até R$ 1.000</option>
              <option value="2000">Até R$ 2.000</option>
            </select>
            <select><option>Melhor Avaliação</option><option>Menor Preço</option></select>
            <button className="btn-map-view"><Map size={16} /> Ver no Mapa</button>
          </div>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="content-layout">
          
          <div className="main-content-area">
            {isLoading ? (
              <div className="loading-state">
                <Loader size={40} className="spinner" />
                <p>Buscando as melhores ofertas em <span>múltiplas APIs</span>...</p>
              </div>
            ) : filteredOffers.length > 0 ? (
              <div className="offers-grid">
                {filteredOffers.map(offer => (
                  <div key={offer.id} className="offer-card">
                    <div className="card-image">
                      <img src={offer.img} alt={offer.title} />
                      {offer.trend === 'down' && (
                        <div className="badge badge-trend">
                          <TrendingDown size={14} /> Preço em Queda
                        </div>
                      )}
                      <div className="badge badge-eco">Sustentável</div>
                    </div>

                    <div className="card-body">
                      <div className="card-header">
                        <h3>{offer.title}</h3>
                        <div className="card-rating">
                          <Star size={16} className="star-icon" />
                          <span>{offer.rating}</span>
                        </div>
                      </div>
                      
                      <p className="card-location">{offer.location} • {offer.distance}</p>

                      <div className="card-tags">
                        {offer.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                      </div>

                      <div className="card-footer">
                        <div className="price-area">
                          {offer.oldPrice > offer.price && (
                            <span className="old-price">R$ {offer.oldPrice}</span>
                          )}
                          <div className="current-price">
                            <span className="currency">R$</span>
                            <span className="amount">{offer.price}</span>
                          </div>
                        </div>
                        <button className="btn-details">Detalhes</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>🔍 Nenhuma oferta encontrada</h3>
                <p>Tente ajustar os filtros ou selecionar outro tipo de pacote.</p>
              </div>
            )}
          </div>

          {/* AI SIDEBAR */}
          <div className="ai-sidebar glass">
            <div className="sidebar-header">
              <Sparkles size={20} className="spark-anim" />
              <h4>Sugestões da IA</h4>
            </div>
            
            <div className="ai-tip">
              <h6>💡 Dica de Economia</h6>
              <p>Viajar para <strong>Natal</strong> em Maio custa <strong>25% menos</strong> do que em Abril.</p>
            </div>

            <div className="ai-tip">
              <h6>🏨 Melhor Custo-Benefício</h6>
              <p>A <strong>Pousada Recanto das Cores</strong> está com o menor preço dos últimos 30 dias.</p>
            </div>

            <button className="btn-ai-itinerary">Montar Roteiro Automático</button>
          </div>

        </div>
      </div>
    </section>
  );
}
