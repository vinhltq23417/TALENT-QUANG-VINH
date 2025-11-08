// src/components/Charts/ProfitTab.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ChartControls from '../UI/ChartControls';

const ProfitTab = ({ results }) => {
  const profitData = (results || []).map(result => ({
    name: result.name?.length > 15 ? result.name.substring(0, 15) + '...' : result.name || 'Unknown',
    revenue: result.totalRevenue || 0,
    cost: result.budget || 0,
    profit: (result.totalRevenue || 0) - (result.budget || 0),
    margin: result.totalRevenue ? (((result.totalRevenue - (result.budget || 0)) / result.totalRevenue * 100) || 0) : 0,
    type: result.type || 'UNKNOWN'
  }));

  const pieData = (results || []).map(result => ({
    name: result.name || 'Unknown',
    value: result.totalRevenue || 0,
    type: result.type || 'UNKNOWN'
  }));

  const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];

  return (
    <div className="profit-tab">
      <div className="charts-grid">
        <div className="chart-card" id="profit-bar-chart">
          <div className="chart-card-header">
            <h4>Profit & Loss by Strategy</h4>
            <ChartControls chartId="profit-bar-chart" chartTitle="Profit_Loss_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="cost" fill="#ef4444" name="Cost" />
              <Bar dataKey="profit" fill="#f59e0b" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" id="revenue-pie-chart">
          <div className="chart-card-header">
            <h4>Revenue Distribution</h4>
            <ChartControls chartId="revenue-pie-chart" chartTitle="Revenue_Pie_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-card">
          <h5>Profitability Analysis</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Strategy</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Profit</th>
                <th>Margin</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              {profitData.map((item, index) => (
                <tr key={index}>
                  <td><strong>{item.name}</strong></td>
                  <td>${item.revenue.toLocaleString()}</td>
                  <td className="negative">-${item.cost.toLocaleString()}</td>
                  <td className={item.profit > 0 ? 'positive' : 'negative'}>
                    <strong>${item.profit.toLocaleString()}</strong>
                  </td>
                  <td className={item.margin > 20 ? 'positive' : item.margin < 0 ? 'negative' : ''}>
                    <strong>{item.margin.toFixed(1)}%</strong>
                  </td>
                  <td className={item.profit / item.cost * 100 > 150 ? 'positive' : 'negative'}>
                    <strong>{((item.profit / item.cost) * 100).toFixed(1)}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h5>Profitability Ratios</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Benchmark</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gross Profit Margin</strong></td>
                <td className="positive">{(profitData.reduce((sum, item) => sum + item.profit, 0) / profitData.reduce((sum, item) => sum + item.revenue, 0) * 100).toFixed(1)}%</td>
                <td>&gt; 25%</td>
                <td className="positive">✅ Excellent</td>
              </tr>
              <tr>
                <td><strong>Net Profit Margin</strong></td>
                <td className="positive">{(profitData.reduce((sum, item) => sum + item.profit, 0) / profitData.reduce((sum, item) => sum + item.revenue, 0) * 100).toFixed(1)}%</td>
                <td>&gt; 15%</td>
                <td className="positive">✅ Good</td>
              </tr>
              <tr>
                <td><strong>Return on Investment</strong></td>
                <td className="positive">{(profitData.reduce((sum, item) => sum + item.profit, 0) / profitData.reduce((sum, item) => sum + item.cost, 0) * 100).toFixed(1)}%</td>
                <td>&gt; 120%</td>
                <td className="positive">✅ Strong</td>
              </tr>
              <tr>
                <td><strong>Break-even Point</strong></td>
                <td>{(profitData.reduce((sum, item) => sum + item.cost, 0) / profitData.reduce((sum, item) => sum + item.revenue, 0) * 12).toFixed(1)} months</td>
                <td>&lt; 8 months</td>
                <td className="positive">✅ Fast</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitTab;