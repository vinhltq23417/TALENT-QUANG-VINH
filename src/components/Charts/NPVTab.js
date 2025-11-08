// src/components/Charts/NPVTab.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ChartControls from '../UI/ChartControls';

const NPVTab = ({ results }) => {
  const npvData = results.map(result => ({
    name: result.name.length > 15 ? result.name.substring(0, 15) + '...' : result.name,
    npv: result.npv || 0,
    irr: result.irr || 0,
    payback: result.paybackPeriod || 0,
    type: result.type
  }));

  // Dữ liệu dòng tiền giả định
  const cashFlowData = results.slice(0, 3).flatMap((result, index) => 
    Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      [`Strategy ${index + 1}`]: (result.budget * (result.avgROI + Math.random() * 20 - 10) / 100 / 12),
      name: result.name
    }))
  );

  // Tính tổng hợp cash flow
  const aggregatedCashFlow = Array.from({ length: 12 }, (_, i) => {
    const monthData = { month: `M${i + 1}` };
    results.forEach((result, index) => {
      monthData[`S${index + 1}`] = (result.budget * result.avgROI / 100 / 12) * (1 + (Math.random() - 0.5) * 0.2);
    });
    monthData.total = Object.values(monthData).slice(1).reduce((a, b) => a + b, 0);
    return monthData;
  });

  return (
    <div className="npv-tab">
      <div className="charts-grid">
        <div className="chart-card" id="npv-bar-chart">
          <div className="chart-card-header">
            <h4>Net Present Value (NPV) by Strategy</h4>
            <ChartControls chartId="npv-bar-chart" chartTitle="NPV_Bar_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={npvData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'NPV']} />
              <Legend />
              <Bar dataKey="npv" fill="#10b981" name="NPV ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" id="irr-bar-chart">
          <div className="chart-card-header">
            <h4>Internal Rate of Return (IRR)</h4>
            <ChartControls chartId="irr-bar-chart" chartTitle="IRR_Bar_Chart" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={npvData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'IRR']} />
              <Legend />
              <Bar dataKey="irr" fill="#f59e0b" name="IRR %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card full-width" id="cashflow-area-chart">
        <div className="chart-card-header">
          <h4>Cash Flow Projection</h4>
          <ChartControls chartId="cashflow-area-chart" chartTitle="CashFlow_Area_Chart" />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={aggregatedCashFlow}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cash Flow']} />
            <Legend />
            <Area type="monotone" dataKey="total" stackId="1" stroke="#1e40af" fill="#3b82f6" name="Total Cash Flow" />
            {results.slice(0, 4).map((result, index) => (
              <Area 
                key={result.name}
                type="monotone" 
                dataKey={`S${index + 1}`} 
                stackId="1"
                stroke={['#60a5fa', '#93c5fd', '#dbeafe', '#eff6ff'][index]}
                fill={['#60a5fa', '#93c5fd', '#dbeafe', '#eff6ff'][index]}
                name={result.name.length > 15 ? result.name.substring(0, 15) + '...' : result.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="tables-grid">
        <div className="table-card">
          <h5>Financial Metrics</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Strategy</th>
                <th>NPV</th>
                <th>IRR</th>
                <th>Payback</th>
                <th>PI</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => {
                const pi = result.npv > 0 ? (result.npv / result.budget).toFixed(2) : '0.00';
                return (
                  <tr key={index}>
                    <td><strong>{result.name}</strong></td>
                    <td className={result.npv > 0 ? 'positive' : 'negative'}>
                      <strong>${(result.npv || 0).toLocaleString()}</strong>
                    </td>
                    <td className={result.irr > 20 ? 'positive' : result.irr < 10 ? 'negative' : ''}>
                      <strong>{(result.irr || 0).toFixed(1)}%</strong>
                    </td>
                    <td>{result.paybackPeriod || 'N/A'} months</td>
                    <td className={pi > 1 ? 'positive' : 'negative'}>{pi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h5>Cash Flow Analysis</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Initial</th>
                <th>Y1 Cash</th>
                <th>Y2 Cash</th>
                <th>Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {results.slice(0, 5).map((result, index) => {
                const y1Cash = result.budget * result.avgROI / 100 * 0.6;
                const y2Cash = result.budget * result.avgROI / 100 * 0.4;
                const cumulative = y1Cash + y2Cash - result.budget;
                return (
                  <tr key={index}>
                    <td><strong>{result.name}</strong></td>
                    <td className="negative">-${result.budget.toLocaleString()}</td>
                    <td className="positive">${y1Cash.toLocaleString()}</td>
                    <td className="positive">${y2Cash.toLocaleString()}</td>
                    <td className={cumulative > 0 ? 'positive' : 'negative'}>
                      <strong>${cumulative.toLocaleString()}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NPVTab;