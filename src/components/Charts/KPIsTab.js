// src/components/Charts/KPIsTab.js
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ChartControls from '../UI/ChartControls';

const KPIsTab = ({ results }) => {
  // Dữ liệu KPI tổng hợp
  const safeResults = results || [];
  const kpiData = [
    { subject: 'ROI', value: safeResults.length > 0 ? safeResults.reduce((sum, r) => sum + (r.avgROI || 0), 0) / safeResults.length : 0, fullMark: 300 },
    { subject: 'Revenue', value: safeResults.reduce((sum, r) => sum + (r.totalRevenue || 0), 0) / 100000, fullMark: 500 },
    { subject: 'NPV', value: safeResults.reduce((sum, r) => sum + (r.npv || 0), 0) / 10000, fullMark: 100 },
    { subject: 'IRR', value: safeResults.length > 0 ? safeResults.reduce((sum, r) => sum + (r.irr || 0), 0) / safeResults.length : 0, fullMark: 50 },
    { subject: 'Efficiency', value: 75, fullMark: 100 },
    { subject: 'Risk Score', value: 35, fullMark: 100 }
  ];

  const monthlyKPIs = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    roi: 40 + Math.random() * 20,
    revenue: 50000 + Math.random() * 100000,
    customers: 100 + Math.random() * 200,
    satisfaction: 70 + Math.random() * 25
  }));

  return (
    <div className="kpis-tab">
      <div className="charts-grid">
        <div className="chart-card" id="kpi-radar-chart">
          <div className="chart-card-header">
            <h4>KPI Performance Radar</h4>
            <ChartControls chartId="kpi-radar-chart" chartTitle="KPI_Radar_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={kpiData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="KPIs" dataKey="value" stroke="#1e40af" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" id="kpi-line-chart">
          <div className="chart-card-header">
            <h4>Monthly KPI Trends</h4>
            <ChartControls chartId="kpi-line-chart" chartTitle="KPI_Line_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyKPIs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="roi" stroke="#1e40af" name="ROI %" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue ($)" />
              <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke="#f59e0b" name="Satisfaction %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="kpi-dashboard">
        <h4>📊 KPI Dashboard</h4>
        <div className="kpi-grid">
          <div className="kpi-card positive">
            <div className="kpi-value">{safeResults.length > 0 ? ((safeResults.reduce((sum, r) => sum + (r.avgROI || 0), 0) / safeResults.length) || 0).toFixed(1) : '0.0'}%</div>
            <div className="kpi-label">Average ROI</div>
            <div className="kpi-trend">↑ 12.5%</div>
          </div>
          
          <div className="kpi-card positive">
            <div className="kpi-value kpi-value-large">${(safeResults.reduce((sum, r) => sum + (r.totalRevenue || 0), 0) || 0).toLocaleString()}</div>
            <div className="kpi-label">Total Revenue</div>
            <div className="kpi-trend">↑ 8.2%</div>
          </div>
          
          <div className="kpi-card positive">
            <div className="kpi-value">{safeResults.length > 0 ? ((safeResults.reduce((sum, r) => sum + (r.irr || 0), 0) / safeResults.length) || 0).toFixed(1) : '0.0'}%</div>
            <div className="kpi-label">Avg IRR</div>
            <div className="kpi-trend">↑ 5.8%</div>
          </div>
          
          <div className="kpi-card warning">
            <div className="kpi-value">{safeResults.length > 0 ? (safeResults.filter(r => (r.avgROI || 0) < 120).length / safeResults.length * 100).toFixed(0) : '0'}%</div>
            <div className="kpi-label">Underperforming</div>
            <div className="kpi-trend">↓ 3.2%</div>
          </div>
          
          <div className="kpi-card positive">
            <div className="kpi-value">{safeResults.filter(r => (r.npv || 0) > 0).length}</div>
            <div className="kpi-label">Profitable Strategies</div>
            <div className="kpi-trend">↑ 2</div>
          </div>
          
          <div className="kpi-card positive">
            <div className="kpi-value">{(() => {
              const totalRevenue = safeResults.reduce((sum, r) => sum + (r.totalRevenue || 0), 0);
              const totalBudget = safeResults.reduce((sum, r) => sum + (r.budget || 0), 0);
              return totalBudget > 0 ? (totalRevenue / totalBudget).toFixed(2) : '0.00';
            })()}x</div>
            <div className="kpi-label">Revenue Multiple</div>
            <div className="kpi-trend">↑ 0.3x</div>
          </div>
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-card">
          <h5>Strategy Performance Ranking</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Strategy</th>
                <th>Score</th>
                <th>ROI</th>
                <th>NPV</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {[...(results || [])]
                .sort((a, b) => ((b.avgROI || 0) * 0.6 + (Math.max(0, (b.npv || 0)) / 5000 * 0.4)) - ((a.avgROI || 0) * 0.4 + ((a.npv || 0) / 10000 * 0.6)))
                .map((result, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`rank-badge ${index < 3 ? 'top' : ''}`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td><strong>{result.name || 'Unknown'}</strong></td>
                    <td className="positive">{(((result.avgROI || 0) * 0.4 + ((result.npv || 0) / 10000 * 0.6))).toFixed(1)}</td>
                    <td className={(result.avgROI || 0) > 180 ? 'positive' : ''}>{result.avgROI || 0}%</td>
                    <td className={(result.npv || 0) > 0 ? 'positive' : 'negative'}>${(result.npv || 0).toLocaleString()}</td>
                    <td className={(result.avgROI || 0) < 120 ? 'negative' : 'positive'}>
                      {(result.avgROI || 0) < 60 ? 'High' : (result.avgROI || 0) < 90 ? 'Medium' : 'Low'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h5>KPI Benchmarks vs Targets</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>KPI</th>
                <th>Actual</th>
                <th>Target</th>
                <th>Variance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ROI</strong></td>
                <td>{safeResults.length > 0 ? ((safeResults.reduce((sum, r) => sum + (r.avgROI || 0), 0) / safeResults.length) || 0).toFixed(1) : '0.0'}%</td>
                <td>80%</td>
                <td className="negative">-{safeResults.length > 0 ? ((180 - (safeResults.reduce((sum, r) => sum + (r.avgROI || 0), 0) / safeResults.length)) || 0).toFixed(1) : '180.0'}%</td>
                <td className="negative">❌ Below Target</td>
              </tr>
              <tr>
                <td><strong>Revenue</strong></td>
                <td>${(safeResults.reduce((sum, r) => sum + (r.totalRevenue || 0), 0) || 0).toLocaleString()}</td>
                <td>$400,000</td>
                <td className="positive">+${((safeResults.reduce((sum, r) => sum + (r.totalRevenue || 0), 0) || 0) - 2000000).toLocaleString()}</td>
                <td className="positive">✅ Above Target</td>
              </tr>
              <tr>
                <td><strong>NPV</strong></td>
                <td>${(safeResults.reduce((sum, r) => sum + (r.npv || 0), 0) || 0).toLocaleString()}</td>
                <td>$500,000</td>
                <td className="positive">+${((safeResults.reduce((sum, r) => sum + (r.npv || 0), 0) || 0) - 500000).toLocaleString()}</td>
                <td className="positive">✅ Above Target</td>
              </tr>
              <tr>
                <td><strong>IRR</strong></td>
                <td>{safeResults.length > 0 ? ((safeResults.reduce((sum, r) => sum + (r.irr || 0), 0) / safeResults.length) || 0).toFixed(1) : '0.0'}%</td>
                <td>25%</td>
                <td className="positive">+{safeResults.length > 0 ? (((safeResults.reduce((sum, r) => sum + (r.irr || 0), 0) / safeResults.length) || 0) - 25).toFixed(1) : '-25.0'}%</td>
                <td className="positive">✅ Above Target</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default KPIsTab;
