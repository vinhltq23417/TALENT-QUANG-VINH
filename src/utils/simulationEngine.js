// src/utils/simulationEngine.js
import { generateRandomEvents } from './calculations';

export const runSimulation = async (strategies, totalMonths, macroFactors, microFactors, selectedEvents) => {
  // Giả lập simulation - thay thế bằng logic thực tế
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = strategies.map(strategy => {
        const baseROI = strategy.baseROI;
        const monthlyROIs = [];
        let totalRevenue = 0;
        
        // Tạo events ngẫu nhiên
        const events = generateRandomEvents(selectedEvents, totalMonths);
        
        for (let month = 1; month <= totalMonths; month++) {
          // Tính toán ROI với các yếu tố ảnh hưởng
          let monthlyROI = baseROI;
          
          // Ảnh hưởng của factors
          monthlyROI *= (1 + macroFactors.length * 0.01);
          monthlyROI *= (1 + microFactors.length * 0.005);
          
          // Ảnh hưởng của events trong tháng
          const monthEvents = events.filter(e => e.month === month);
          monthEvents.forEach(event => {
            monthlyROI *= (1 + event.impact);
          });
          
          // Biến động ngẫu nhiên
          monthlyROI *= (1 + (Math.random() - 0.5) * 0.1);
          
          monthlyROI = Math.max(50, Math.min(300, monthlyROI));
          monthlyROIs.push(monthlyROI);
          
          const monthlyRevenue = strategy.budget * monthlyROI / 100;
          totalRevenue += monthlyRevenue;
        }
        
        const avgROI = monthlyROIs.reduce((a, b) => a + b, 0) / monthlyROIs.length;
        
        return {
          ...strategy,
          monthlyROIs,
          totalRevenue: parseFloat(totalRevenue.toFixed(2)),
          avgROI: parseFloat(avgROI.toFixed(2)),
          npv: calculateNPV(strategy.budget, monthlyROIs, 0.1),
          irr: calculateIRR(strategy.budget, monthlyROIs),
          paybackPeriod: calculatePaybackPeriod(strategy.budget, monthlyROIs)
        };
      });
      
      resolve(results);
    }, 1000);
  });
};

const calculateNPV = (initialInvestment, monthlyROIs, discountRate) => {
  let npv = -initialInvestment;
  monthlyROIs.forEach((roi, index) => {
    const cashflow = (initialInvestment * roi / 100) / 12;
    npv += cashflow / Math.pow(1 + discountRate/12, index + 1);
  });
  return parseFloat(npv.toFixed(2));
};

const calculateIRR = (initialInvestment, monthlyROIs) => {
  // Simplified IRR calculation
  const totalReturn = monthlyROIs.reduce((sum, roi) => sum + (initialInvestment * roi / 100 / 12), 0);
  const totalMonths = monthlyROIs.length;
  return parseFloat(((totalReturn - initialInvestment) / initialInvestment * 100).toFixed(2));
};

const calculatePaybackPeriod = (initialInvestment, monthlyROIs) => {
  let cumulativeCashflow = 0;
  for (let i = 0; i < monthlyROIs.length; i++) {
    cumulativeCashflow += (initialInvestment * monthlyROIs[i] / 100 / 12);
    if (cumulativeCashflow >= initialInvestment) {
      return i + 1;
    }
  }
  return monthlyROIs.length;
};