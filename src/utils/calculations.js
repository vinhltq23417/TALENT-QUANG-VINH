// src/utils/calculations.js
export const generateRandomEvents = (selectedEvents, totalMonths) => {
  const events = [];
  const eventPool = selectedEvents.map(id => ({
    id,
    impact: (Math.random() - 0.5) * 0.05
  }));

  // Phân bố events không đều
  for (let month = 1; month <= totalMonths; month++) {
    // Xác suất event tăng dần theo thời gian
    const probability = 0.1 + (month / totalMonths) * 0.2;
    if (Math.random() < probability && eventPool.length > 0) {
      const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)];
      events.push({
        ...randomEvent,
        month
      });
    }
  }

  return events;
};

export const calculateCorrelation = (x, y) => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
  const sumY2 = y.reduce((sum, val) => sum + val * val, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;

};
