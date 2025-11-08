// src/components/SimulationResults.js
import React, { useState } from 'react';
import ROITab from './Charts/ROITab';
import NPVTab from './Charts/NPVTab';
import RegressionTab from './Charts/RegressionTab';
import PLSTab from './Charts/PLSTab';
import ProfitTab from './Charts/ProfitTab';
import KPIsTab from './Charts/KPIsTab';
import '../styles/charts.css';

const SimulationResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState('roi');

  const tabs = [
    { id: 'roi', label: '📈 ROI Analysis', component: ROITab },
    { id: 'npv', label: '💰 NPV & Cash Flow', component: NPVTab },
    { id: 'regression', label: '📊 Regression Models', component: RegressionTab },
    { id: 'pls', label: '🧩 PLS-SEM Analysis', component: PLSTab },
    { id: 'profit', label: '💸 Profit Analysis', component: ProfitTab },
    { id: 'kpis', label: '🎯 Other KPIs', component: KPIsTab }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="simulation-results">
      <div className="results-header">
        <h2>📊 Simulation Results</h2>
        <div className="summary-stats">
          <div className="stat-card">
            <span className="stat-value">${(results?.reduce((sum, r) => sum + (r.totalRevenue || 0), 0) || 0).toLocaleString()}</span>
            <span className="stat-label">Total Revenue</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{((results?.reduce((sum, r) => sum + (r.avgROI || 0), 0) / (results?.length || 1)) || 0).toFixed(1)}%</span>
            <span className="stat-label">Avg ROI</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{results?.length || 0}</span>
            <span className="stat-label">Strategies</span>
          </div>
        </div>
      </div>

      <div className="results-tabs">
        <div className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {ActiveComponent && <ActiveComponent results={results} />}
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;