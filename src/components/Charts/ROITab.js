// src/components/Charts/ROITab.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import ChartControls from '../UI/ChartControls';

const ROITab = ({ results }) => {
  const chartData = results.map(result => ({
    name: result.name.length > 20 ? result.name.substring(0, 20) + '...' : result.name,
    roi: result.avgROI,
    revenue: result.totalRevenue / 1000,
    type: result.type
  }));

  const monthlyData = results && results.length > 0 && results[0]?.monthlyROIs
    ? results[0].monthlyROIs.map((roi, index) => ({
        month: `M${index + 1}`,
        ...results.reduce((acc, result, i) => {
          acc[`Strategy ${i + 1}`] = result.monthlyROIs?.[index] || 0;
          return acc;
        }, {})
      }))
    : [];

  return (
    <div className="roi-tab">
      <div className="charts-grid">
        <div className="chart-card" id="roi-bar-chart">
          <div className="chart-card-header">
            <h4>Average ROI by Strategy</h4>
            <ChartControls chartId="roi-bar-chart" chartTitle="ROI_Bar_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
              <Legend />
              <Bar dataKey="roi" fill="#1e40af" name="ROI %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" id="roi-line-chart">
          <div className="chart-card-header">
            <h4>Monthly ROI Trends</h4>
            <ChartControls chartId="roi-line-chart" chartTitle="ROI_Line_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
              <Legend />
              {results.slice(0, 5).map((result, index) => (
                <Line 
                  key={result.name}
                  type="monotone" 
                  dataKey={`Strategy ${index + 1}`}
                  stroke={['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'][index]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="results-table">
        <h4>Detailed ROI Results</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Type</th>
              <th>Budget</th>
              <th>Avg ROI</th>
              <th>Total Revenue</th>
              <th>NPV</th>
              <th>IRR</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td><strong>{result.name}</strong></td>
                <td><span className={`type-badge type-${result.type.toLowerCase()}`}>{result.type}</span></td>
                <td>${result.budget.toLocaleString()}</td>
                <td className={result.avgROI > 180 ? 'positive' : result.avgROI < 120 ? 'negative' : ''}>
                  <strong>{result.avgROI}%</strong>
                </td>
                <td>${result.totalRevenue.toLocaleString()}</td>
                <td className={result.npv > 0 ? 'positive' : 'negative'}>
                  <strong>${result.npv?.toLocaleString()}</strong>
                </td>
                <td className={result.irr > 20 ? 'positive' : result.irr < 10 ? 'negative' : ''}>
                  <strong>{result.irr}%</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ROITab;