// src/data/factorsData.js
export const macroFactors = [
  { id: 'm1', name: 'Economic Growth Rate', category: 'Economy' },
  { id: 'm2', name: 'Inflation Rate', category: 'Economy' },
  { id: 'm3', name: 'Interest Rates', category: 'Economy' },
  { id: 'm4', name: 'Consumer Confidence', category: 'Economy' },
  { id: 'm5', name: 'GDP Growth', category: 'Economy' },
  { id: 'm6', name: 'Political Stability', category: 'Politics' },
  { id: 'm7', name: 'Regulatory Changes', category: 'Politics' },
  { id: 'm8', name: 'Trade Policies', category: 'Politics' },
  { id: 'm9', name: 'Environmental Regulations', category: 'Politics' },
  { id: 'm10', name: 'Technological Advancements', category: 'Technology' },
  { id: 'm11', name: 'Digital Transformation', category: 'Technology' },
  { id: 'm12', name: 'Infrastructure Development', category: 'Technology' },
  { id: 'm13', name: 'Climate Change Impact', category: 'Environment' },
  { id: 'm14', name: 'Sustainability Trends', category: 'Environment' },
  { id: 'm15', name: 'Global Supply Chain', category: 'Global' }
];

export const microFactors = [
  { id: 'mi1', name: 'Competitor Pricing', category: 'Competition' },
  { id: 'mi2', name: 'Market Share Changes', category: 'Competition' },
  { id: 'mi3', name: 'New Entrants', category: 'Competition' },
  { id: 'mi4', name: 'Customer Preferences', category: 'Customer' },
  { id: 'mi5', name: 'Brand Loyalty', category: 'Customer' },
  { id: 'mi6', name: 'Customer Satisfaction', category: 'Customer' },
  { id: 'mi7', name: 'Product Quality', category: 'Product' },
  { id: 'mi8', name: 'Innovation Rate', category: 'Product' },
  { id: 'mi9', name: 'Supply Chain Efficiency', category: 'Operations' },
  { id: 'mi10', name: 'Production Costs', category: 'Operations' },
  { id: 'mi11', name: 'Employee Satisfaction', category: 'HR' },
  { id: 'mi12', name: 'Marketing Effectiveness', category: 'Marketing' },
  { id: 'mi13', name: 'Sales Performance', category: 'Sales' },
  { id: 'mi14', name: 'Distribution Channels', category: 'Distribution' },
  { id: 'mi15', name: 'Digital Presence', category: 'Digital' }
];

export const eventsData = [
  // Economic Events
  { id: 'e1', name: 'Economic Recession', impact: -0.15, category: 'Economy' },
  { id: 'e2', name: 'Stock Market Crash', impact: -0.12, category: 'Economy' },
  { id: 'e3', name: 'Currency Devaluation', impact: -0.08, category: 'Economy' },
  { id: 'e4', name: 'Economic Boom', impact: 0.18, category: 'Economy' },
  
  // Market Events
  { id: 'e5', name: 'Major Competitor Bankruptcy', impact: 0.22, category: 'Market' },
  { id: 'e6', name: 'New Market Entrant', impact: -0.10, category: 'Market' },
  { id: 'e7', name: 'Industry Consolidation', impact: 0.15, category: 'Market' },
  
  // Technology Events
  { id: 'e8', name: 'Breakthrough Innovation', impact: 0.25, category: 'Technology' },
  { id: 'e9', name: 'Cybersecurity Breach', impact: -0.20, category: 'Technology' },
  { id: 'e10', name: 'Digital Transformation Success', impact: 0.18, category: 'Technology' },
  
  // Social Events
  { id: 'e11', name: 'Viral Social Media Campaign', impact: 0.30, category: 'Social' },
  { id: 'e12', name: 'Brand Crisis', impact: -0.25, category: 'Social' },
  { id: 'e13', name: 'Celebrity Endorsement', impact: 0.20, category: 'Social' },
  
  // Environmental Events
  { id: 'e14', name: 'Natural Disaster', impact: -0.35, category: 'Environment' },
  { id: 'e15', name: 'Supply Chain Disruption', impact: -0.28, category: 'Environment' },
  { id: 'e16', name: 'Sustainability Award', impact: 0.15, category: 'Environment' },
  
  // Political Events
  { id: 'e17', name: 'Favorable Regulation', impact: 0.20, category: 'Politics' },
  { id: 'e18', name: 'Trade War', impact: -0.25, category: 'Politics' },
  { id: 'e19', name: 'Government Incentives', impact: 0.18, category: 'Politics' },
  
  // Customer Events
  { id: 'e20', name: 'Customer Loyalty Program Success', impact: 0.22, category: 'Customer' },
  { id: 'e21', name: 'Major Customer Loss', impact: -0.30, category: 'Customer' },
  { id: 'e22', name: 'Positive Customer Reviews', impact: 0.12, category: 'Customer' }
];