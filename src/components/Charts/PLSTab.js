// src/components/Charts/PLSTab.js
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';
import ChartControls from '../UI/ChartControls';

const PLSTab = ({ results }) => {
  // Dữ liệu giả lập cho PLS-SEM
  const pathData = [
    { construct: 'Macro Factors', effect: 0.45, tValue: 4.32, pValue: 0.0001 },
    { construct: 'Micro Factors', effect: 0.38, tValue: 3.89, pValue: 0.0002 },
    { construct: 'Customer Segments', effect: 0.52, tValue: 5.12, pValue: 0.0001 },
    { construct: 'Product Strategy', effect: 0.41, tValue: 4.05, pValue: 0.0001 },
    { construct: 'Market Events', effect: -0.28, tValue: -2.89, pValue: 0.004 }
  ];

  const modelFit = {
    rSquared: 0.78,
    adjustedRSquared: 0.75,
    gof: 0.72,
    rmsea: 0.06,
    cfi: 0.94,
    tli: 0.92
  };

  const latentVariables = results.map(result => ({
    name: result.name,
    satisfaction: 0.6 + Math.random() * 0.3,
    loyalty: 0.5 + Math.random() * 0.4,
    profitability: result.avgROI / 300,
    type: result.type
  }));

  return (
    <div className="pls-tab">
      <div className="charts-grid">
        <div className="chart-card" id="pls-bar-chart">
          <div className="chart-card-header">
            <h4>PLS-SEM Path Coefficients</h4>
            <ChartControls chartId="pls-bar-chart" chartTitle="PLS_SEM_Bar_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pathData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="construct" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="effect" fill="#8b5cf6" name="Path Coefficient" />
              <Bar dataKey="tValue" fill="#a78bfa" name="t-Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" id="pls-scatter-chart">
          <div className="chart-card-header">
            <h4>Latent Variable Relationships</h4>
            <ChartControls chartId="pls-scatter-chart" chartTitle="PLS_Scatter_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={latentVariables}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="satisfaction" name="Satisfaction" />
              <YAxis dataKey="loyalty" name="Loyalty" />
              <ZAxis dataKey="profitability" range={[100, 1000]} name="Profitability" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Strategies" data={latentVariables} fill="#8b5cf6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-card">
          <h5>Path Analysis Results</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Construct</th>
                <th>Path Coef.</th>
                <th>t-Value</th>
                <th>p-Value</th>
                <th>Significance</th>
              </tr>
            </thead>
            <tbody>
              {pathData.map((path, index) => (
                <tr key={index}>
                  <td><strong>{path.construct}</strong></td>
                  <td className={Math.abs(path.effect) > 0.4 ? 'positive' : ''}>{path.effect}</td>
                  <td className={Math.abs(path.tValue) > 2 ? 'positive' : 'negative'}>{path.tValue}</td>
                  <td className={path.pValue < 0.05 ? 'positive' : 'negative'}>{path.pValue}</td>
                  <td>
                    <span className={`significance-badge ${path.pValue < 0.01 ? 'high' : path.pValue < 0.05 ? 'medium' : 'low'}`}>
                      {path.pValue < 0.01 ? '***' : path.pValue < 0.05 ? '**' : '*'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h5>Model Fit Indices</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Value</th>
                <th>Threshold</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>R²</strong></td>
                <td className="positive">{modelFit.rSquared}</td>
                <td>&gt; 0.70</td>
                <td className="positive">✅ Excellent</td>
              </tr>
              <tr>
                <td><strong>Adjusted R²</strong></td>
                <td className="positive">{modelFit.adjustedRSquared}</td>
                <td>&gt; 0.65</td>
                <td className="positive">✅ Good</td>
              </tr>
              <tr>
                <td><strong>GoF</strong></td>
                <td className="positive">{modelFit.gof}</td>
                <td>&gt; 0.60</td>
                <td className="positive">✅ Good</td>
              </tr>
              <tr>
                <td><strong>RMSEA</strong></td>
                <td className="positive">{modelFit.rmsea}</td>
                <td>&lt; 0.08</td>
                <td className="positive">✅ Acceptable</td>
              </tr>
              <tr>
                <td><strong>CFI</strong></td>
                <td className="positive">{modelFit.cfi}</td>
                <td>&gt; 0.90</td>
                <td className="positive">✅ Excellent</td>
              </tr>
              <tr>
                <td><strong>TLI</strong></td>
                <td className="positive">{modelFit.tli}</td>
                <td>&gt; 0.90</td>
                <td className="positive">✅ Good</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="chart-card full-width">
        <h4>Structural Equation Model Paths</h4>
        <div className="sem-diagram">
          <div className="constructs-row">
            <div className="construct exogenous">
              <div className="construct-name">Macro Factors</div>
              <div className="path-value">0.45***</div>
            </div>
            <div className="construct exogenous">
              <div className="construct-name">Micro Factors</div>
              <div className="path-value">0.38***</div>
            </div>
          </div>
          
          <div className="arrow-down">↓</div>
          
          <div className="constructs-row">
            <div className="construct mediator">
              <div className="construct-name">Strategy Effectiveness</div>
              <div className="path-value">R² = 0.78</div>
            </div>
          </div>
          
          <div className="arrow-down">↓</div>
          
          <div className="constructs-row">
            <div className="construct endogenous">
              <div className="construct-name">Business Performance</div>
              <div className="path-value">0.52***</div>
            </div>
          </div>
        </div>
      </div>

      <div className="interpretation-card">
        <h5>🧩 PLS-SEM Interpretation</h5>
        <div className="interpretation-content">
          <p><strong>Key Structural Paths:</strong></p>
          <ul>
            <li>✅ <strong>Customer Segments</strong> have strongest effect on performance (0.52)</li>
            <li>✅ <strong>Macro Factors</strong> significantly influence strategy (0.45)</li>
            <li>⚠️ <strong>Market Events</strong> show negative impact (-0.28)</li>
            <li>🎯 <strong>Model Fit:</strong> Excellent overall fit (GoF = 0.72)</li>
            <li>📊 <strong>Explanatory Power:</strong> 78% variance explained</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PLSTab;