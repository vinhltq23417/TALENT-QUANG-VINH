// src/components/StrategySelector.js
import React, { useState } from 'react';
import '../styles/components.css';

const StrategySelector = ({
  customerData,
  productData,
  macroFactors,
  microFactors,
  eventsData,
  selectedMacros,
  selectedMicros,
  selectedProducts,
  selectedMacroFactors,
  selectedMicroFactors,
  selectedEvents,
  onMacroChange,
  onMicroChange,
  onProductChange,
  onMacroFactorChange,
  onMicroFactorChange,
  onEventChange
}) => {
  const [collapsedSections, setCollapsedSections] = useState({
    customers: false,
    products: false,
    factors: false,
    events: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleMacroToggle = (macro) => {
    const newSelected = selectedMacros.includes(macro)
      ? selectedMacros.filter(m => m !== macro)
      : [...selectedMacros, macro];
    onMacroChange(newSelected);
    
    // Reset micros khi bỏ chọn macro
    if (!newSelected.includes(macro)) {
      const newMicros = { ...selectedMicros };
      delete newMicros[macro];
      onMicroChange(newMicros);
    }
  };

  const handleMicroToggle = (macro, micro) => {
    const newMicros = { ...selectedMicros };
    if (!newMicros[macro]) newMicros[macro] = [];
    
    newMicros[macro] = newMicros[macro].includes(micro)
      ? newMicros[macro].filter(m => m !== micro)
      : [...newMicros[macro], micro];
    
    onMicroChange(newMicros);
  };

  const handleSelectAllMacros = () => {
    const allMacros = Object.keys(customerData);
    onMacroChange(allMacros);
    
    // Select all micros for each macro
    const allMicros = {};
    allMacros.forEach(macro => {
      allMicros[macro] = customerData[macro];
    });
    onMicroChange(allMicros);
  };

  const handleClearAllMacros = () => {
    onMacroChange([]);
    onMicroChange({});
  };

  const handleSelectAllProducts = () => {
    onProductChange([...productData]);
  };

  const handleClearAllProducts = () => {
    onProductChange([]);
  };

  return (
    <div className="strategy-selector">
      {/* Customer Segments */}
      <div className="strategy-section collapsible-section">
        <div className="section-header clickable" onClick={() => toggleSection('customers')}>
          <h4>👥 Customer Segments</h4>
          <div className="section-header-right">
            <div className="section-actions">
              <button className="action-btn" onClick={(e) => { e.stopPropagation(); handleSelectAllMacros(); }}>Select All</button>
              <button className="action-btn" onClick={(e) => { e.stopPropagation(); handleClearAllMacros(); }}>Clear All</button>
            </div>
            <span className="collapse-icon">{collapsedSections.customers ? '▼' : '▲'}</span>
          </div>
        </div>
        
        {!collapsedSections.customers && (
        <div className="segments-grid">
          {Object.entries(customerData).map(([macro, micros]) => (
            <div key={macro} className="macro-group">
              <div className="macro-header">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedMacros.includes(macro)}
                    onChange={() => handleMacroToggle(macro)}
                  />
                  <span className="checkmark"></span>
                  <strong>{macro}</strong>
                </label>
              </div>
              
              {selectedMacros.includes(macro) && (
                <ul className="micro-list">
                  {micros.map(micro => (
                    <li key={micro} className="micro-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedMicros[macro]?.includes(micro) || false}
                          onChange={() => handleMicroToggle(macro, micro)}
                        />
                        <span className="checkmark"></span>
                        {micro}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Product Strategies */}
      <div className="strategy-section collapsible-section">
        <div className="section-header clickable" onClick={() => toggleSection('products')}>
          <h4>📦 Product Strategies</h4>
          <div className="section-header-right">
            <div className="section-actions">
              <button className="action-btn" onClick={(e) => { e.stopPropagation(); handleSelectAllProducts(); }}>Select All</button>
              <button className="action-btn" onClick={(e) => { e.stopPropagation(); handleClearAllProducts(); }}>Clear All</button>
            </div>
            <span className="collapse-icon">{collapsedSections.products ? '▼' : '▲'}</span>
          </div>
        </div>
        
        {!collapsedSections.products && (
        <ul className="product-list">
          {productData.map(product => (
            <li key={product} className="product-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onProductChange([...selectedProducts, product]);
                    } else {
                      onProductChange(selectedProducts.filter(p => p !== product));
                    }
                  }}
                />
                <span className="checkmark"></span>
                {product}
              </label>
            </li>
          ))}
        </ul>
        )}
      </div>

      {/* Market Factors */}
      <div className="strategy-section collapsible-section">
        <div className="section-header clickable" onClick={() => toggleSection('factors')}>
          <h4>🌍 Market Factors</h4>
          <span className="collapse-icon">{collapsedSections.factors ? '▼' : '▲'}</span>
        </div>

        {!collapsedSections.factors && (
        <div className="factors-grid">
    {/* ===== Macro Factors ===== */}
    <div className="factor-group">
      <h5>Macro Factors</h5>
      <ul className="factor-list">
        {macroFactors.map(factor => (
          <li key={factor.id} className="factor-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedMacroFactors.includes(factor.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onMacroFactorChange([...selectedMacroFactors, factor.id]);
                  } else {
                    onMacroFactorChange(selectedMacroFactors.filter(f => f !== factor.id));
                  }
                }}
              />
              <span className="checkmark"></span>
              {factor.name}
            </label>

            {/* Ô nhập phần trăm thay đổi */}
            <input
              type="number"
              step="0.1"
              min="-100"
              max="100"
              className="factor-input"
              placeholder="% change"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                factor.change = isNaN(value) ? 0 : value;
              }}
            />
          </li>
        ))}
      </ul>
    </div>

    {/* ===== Micro Factors ===== */}
    <div className="factor-group">
      <h5>Micro Factors</h5>
      <ul className="factor-list">
        {microFactors.map(factor => (
          <li key={factor.id} className="factor-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedMicroFactors.includes(factor.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onMicroFactorChange([...selectedMicroFactors, factor.id]);
                  } else {
                    onMicroFactorChange(selectedMicroFactors.filter(f => f !== factor.id));
                  }
                }}
              />
              <span className="checkmark"></span>
              {factor.name}
            </label>

            {/* Ô nhập phần trăm thay đổi */}
            <input
              type="number"
              step="0.1"
              min="-100"
              max="100"
              className="factor-input"
              placeholder="% change"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                factor.change = isNaN(value) ? 0 : value;
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
        )}
      </div>

      {/* Events */}
      <div className="strategy-section collapsible-section">
        <div className="section-header clickable" onClick={() => toggleSection('events')}>
          <h4>⚡ Unexpected Events</h4>
          <span className="collapse-icon">{collapsedSections.events ? '▼' : '▲'}</span>
        </div>
        
        {!collapsedSections.events && (
        <ul className="events-list">
          {eventsData.map(event => (
            <li key={event.id}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onEventChange([...selectedEvents, event.id]);
                    } else {
                      onEventChange(selectedEvents.filter(e => e !== event.id));
                    }
                  }}
                />
                <span className="checkmark"></span>
                <span className="event-name">{event.name}</span>
                <span className="event-impact">{event.impact > 0 ? '+' : ''}{event.impact * 100}%</span>
              </label>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default StrategySelector;