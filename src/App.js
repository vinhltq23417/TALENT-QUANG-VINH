// src/App.js
import React, { useState, useMemo } from 'react';
import StrategySelector from './components/StrategySelector';
import SimulationResults from './components/SimulationResults';
import { macroFactors, microFactors, eventsData } from './data/factorsData';
import { runSimulation } from './utils/simulationEngine';
import './styles/App.css';

function App() {
  const [selectedMacros, setSelectedMacros] = useState([]);
  const [selectedMicros, setSelectedMicros] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedMacroFactors, setSelectedMacroFactors] = useState([]);
  const [selectedMicroFactors, setSelectedMicroFactors] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [totalBudget, setTotalBudget] = useState(1000000);
  const [simulationMonths, setSimulationMonths] = useState(12);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - thay thế bằng API call thực tế
  const customerData = useMemo(() => ({
    "At-risk": ["SENIOR_BUDGET_CONSCIOUS", "YOUNG_AFFLUENT_TECH_SAVVY", "GENERAL_AUDIENCE"],
    "Potential": ["SENIOR_BUDGET_CONSCIOUS", "YOUNG_AFFLUENT_TECH_SAVVY", "GENERAL_AUDIENCE"],
    "Good": ["SENIOR_BUDGET_CONSCIOUS", "YOUNG_AFFLUENT_TECH_SAVVY", "GENERAL_AUDIENCE"],
    "VIP": ["SENIOR_BUDGET_CONSCIOUS", "YOUNG_AFFLUENT_TECH_SAVVY", "GENERAL_AUDIENCE"]
  }), []);

  const productData = useMemo(() => [
    "Niche Products", "Popular Products", 
    "Standard Products", "High Margin Products"
  ], []);

  const handleRunSimulation = async () => {
    setLoading(true);
    
    try {
      // Chuẩn bị strategies
      const strategies = [];
      
      // Customer strategies
      const totalMicros = Object.values(selectedMicros).flat().length;
      if (totalMicros > 0) {
        Object.entries(selectedMicros).forEach(([macro, micros]) => {
          micros.forEach(micro => {
            strategies.push({
              name: `${macro} - ${micro}`,
              type: 'CUSTOMER',
              budget: totalBudget * 0.6 / totalMicros,
              baseROI: 5 + Math.random() * 10
            });
          });
        });
      }
      
      // Product strategies
      if (selectedProducts.length > 0) {
        selectedProducts.forEach(product => {
          strategies.push({
            name: product,
            type: 'PRODUCT', 
            budget: totalBudget * 0.4 / selectedProducts.length,
            baseROI: 5 + Math.random() * 10
          });
        });
      }

      // Kiểm tra nếu không có strategies nào được chọn
      if (strategies.length === 0) {
        alert('Vui lòng chọn ít nhất một Customer Segment hoặc Product Strategy!');
        setLoading(false);
        return;
      }

      // Chạy simulation
      const simulationResults = await runSimulation(
        strategies, 
        simulationMonths,
        selectedMacroFactors,
        selectedMicroFactors,
        selectedEvents
      );
      
      setResults(simulationResults);
    } catch (error) {
      console.error('Error running simulation:', error);
      alert('Có lỗi xảy ra khi chạy simulation. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🚴 Bicycle Market Simulator</h1>
          <p>Professional Marketing Strategy Analysis</p>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>🎯 Strategy Configuration</h3>
            
            <StrategySelector
              customerData={customerData}
              productData={productData}
              macroFactors={macroFactors}
              microFactors={microFactors}
              eventsData={eventsData}
              selectedMacros={selectedMacros}
              selectedMicros={selectedMicros}
              selectedProducts={selectedProducts}
              selectedMacroFactors={selectedMacroFactors}
              selectedMicroFactors={selectedMicroFactors}
              selectedEvents={selectedEvents}
              onMacroChange={setSelectedMacros}
              onMicroChange={setSelectedMicros}
              onProductChange={setSelectedProducts}
              onMacroFactorChange={setSelectedMacroFactors}
              onMicroFactorChange={setSelectedMicroFactors}
              onEventChange={setSelectedEvents}
            />

            <div className="simulation-config">
              <h4>⚙️ Simulation Config</h4>
              
              <div className="config-item">
                <label>Total Budget (USD)</label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                />
                <span>${totalBudget.toLocaleString()}</span>
              </div>

              <div className="config-item">
                <label>Simulation Months</label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={simulationMonths}
                  onChange={(e) => setSimulationMonths(Number(e.target.value))}
                />
                <span>{simulationMonths} months</span>
              </div>
            </div>

            <button 
              className="run-button"
              onClick={handleRunSimulation}
              disabled={loading}
            >
              {loading ? '🔄 Running...' : '🚀 Run Simulation'}
            </button>
          </div>
        </aside>

        <main className="main-content">
          {results ? (
            <SimulationResults results={results} />
          ) : (
            <div className="welcome-screen">
              <div className="welcome-card">
                <h2>Welcome to Bicycle Market Simulator! 🎯</h2>
                <p>Configure your marketing strategies in the sidebar and click "Run Simulation" to see detailed analysis.</p>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <h4>👥 Customer Segments</h4>
                    <ul>
                      <li>At-risk: Price sensitive, churn risk</li>
                      <li>Lost: Win-back opportunities</li>
                      <li>Potential: Growth prospects</li>
                      <li>VIP: High-value retention</li>
                    </ul>
                  </div>
                  
                  <div className="feature-card">
                    <h4>📦 Product Strategies</h4>
                    <ul>
                      <li>Premium High Margin</li>
                      <li>High Performance Bestsellers</li>
                      <li>Emerging Potential</li>
                      <li>Low Performance</li>
                    </ul>
                  </div>
                  
                  <div className="feature-card">
                    <h4>📊 Advanced Analytics</h4>
                    <ul>
                      <li>ROI Analysis</li>
                      <li>NPV & Cash Flow</li>
                      <li>Regression Models</li>
                      <li>PLS-SEM Path Analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


export default App;


