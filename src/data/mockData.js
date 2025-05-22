// src/data/mockData.js

// General Insurance Data
export const generalInsuranceData = {
  covers: [
    {
      id: 'GI001',
      type: 'Motor Vehicle',
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        registrationNumber: 'KCA 123A',
      },
      coverage: 'Comprehensive',
      premium: 85000, // KES
      deductible: 25000, // KES
      policyNumber: 'CIC-MV-2024-001',
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      status: 'Active',
      benefits: [
        'Third Party Liability',
        'Collision Coverage',
        'Theft Protection',
        'Fire & Natural Disasters',
        'Personal Accident Cover',
        'Windscreen Coverage',
      ]
    },
    {
      id: 'GI002',
      type: 'Home Insurance',
      propertyInfo: {
        address: 'Kilimani, Nairobi',
        propertyType: 'Apartment',
        bedrooms: 3,
        squareMeters: 150,
      },
      coverage: 'Buildings & Contents',
      premium: 45000, // KES
      deductible: 15000, // KES
      policyNumber: 'CIC-HI-2024-002',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'Active',
      benefits: [
        'Fire & Lightning',
        'Theft & Burglary',
        'Water Damage',
        'Personal Belongings',
        'Alternative Accommodation',
        'Public Liability',
      ]
    },
    {
      id: 'GI003',
      type: 'Travel Insurance',
      tripInfo: {
        destination: 'Europe',
        tripDuration: '14 days',
        travelType: 'Leisure',
      },
      coverage: 'Comprehensive Travel',
      premium: 12000, // KES
      deductible: 5000, // KES
      policyNumber: 'CIC-TI-2024-003',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      status: 'Expired',
      benefits: [
        'Medical Emergencies',
        'Trip Cancellation',
        'Lost Luggage',
        'Flight Delays',
        'Emergency Evacuation',
        'Personal Liability',
      ]
    }
  ]
};

// Life Insurance Data
export const lifeInsuranceData = {
  policies: [
    {
      id: 'LI001',
      policyType: 'Whole Life',
      policyNumber: 'CIC-WL-2020-001',
      sumAssured: 2500000, // KES
      premiumAmount: 18000, // KES monthly
      premiumFrequency: 'Monthly',
      policyStartDate: '2020-05-15',
      maturityDate: '2055-05-15',
      status: 'Active',
      beneficiaries: [
        { name: 'Jane Doe', relationship: 'Spouse', percentage: 60 },
        { name: 'John Doe Jr.', relationship: 'Child', percentage: 40 },
      ]
    }
  ],
  deposits: [
    {
      id: 'DEP001',
      date: '2024-05-15',
      amount: 18000,
      type: 'Premium Payment',
      status: 'Processed',
    },
    {
      id: 'DEP002',
      date: '2024-04-15',
      amount: 18000,
      type: 'Premium Payment',
      status: 'Processed',
    },
    {
      id: 'DEP003',
      date: '2024-03-15',
      amount: 18000,
      type: 'Premium Payment',
      status: 'Processed',
    },
    {
      id: 'DEP004',
      date: '2024-02-15',
      amount: 25000,
      type: 'Additional Premium',
      status: 'Processed',
    },
    {
      id: 'DEP005',
      date: '2024-01-15',
      amount: 18000,
      type: 'Premium Payment',
      status: 'Processed',
    },
  ],
  maturityBenefits: {
    projectedMaturityValue: 8500000, // KES
    yearsToMaturity: 31,
    monthsToMaturity: 8,
    guaranteedAmount: 2500000, // KES
    bonusProjection: 6000000, // KES
    surrenderValue: 450000, // KES (current)
  },
  summary: {
    totalPremiumsPaid: 792000, // KES
    policyDuration: '4 years 1 month',
    lastPaymentDate: '2024-05-15',
    nextPaymentDue: '2024-06-15',
    cashValue: 450000, // KES
  }
};

// Assets Insurance Data  
export const assetsInsuranceData = {
  portfolio: {
    totalValue: 1850000, // KES
    totalInvested: 1200000, // KES
    totalGains: 650000, // KES
    portfolioReturn: '54.17%',
    lastUpdated: '2024-05-20',
  },
  investments: [
    {
      id: 'INV001',
      name: 'CIC Money Market Fund',
      type: 'Money Market',
      units: 45000,
      pricePerUnit: 12.45, // KES
      currentValue: 560250, // KES
      initialInvestment: 400000, // KES
      gain: 160250, // KES
      gainPercentage: '40.06%',
      investmentDate: '2022-08-15',
      riskLevel: 'Low',
    },
    {
      id: 'INV002',
      name: 'CIC Equity Fund',
      type: 'Equity Fund',
      units: 28000,
      pricePerUnit: 18.75, // KES
      currentValue: 525000, // KES
      initialInvestment: 350000, // KES
      gain: 175000, // KES
      gainPercentage: '50.00%',
      investmentDate: '2021-11-20',
      riskLevel: 'High',
    },
    {
      id: 'INV003',
      name: 'CIC Bond Fund',
      type: 'Bond Fund',
      units: 35000,
      pricePerUnit: 15.30, // KES
      currentValue: 535500, // KES
      initialInvestment: 300000, // KES
      gain: 235500, // KES
      gainPercentage: '78.50%',
      investmentDate: '2020-03-10',
      riskLevel: 'Medium',
    },
    {
      id: 'INV004',
      name: 'CIC Balanced Fund',
      type: 'Balanced Fund',
      units: 15000,
      pricePerUnit: 15.50, // KES
      currentValue: 232500, // KES
      initialInvestment: 150000, // KES
      gain: 82500, // KES
      gainPercentage: '55.00%',
      investmentDate: '2023-01-25',
      riskLevel: 'Medium',
    },
  ],
  transactions: [
    {
      id: 'TXN001',
      date: '2024-05-15',
      type: 'Purchase',
      fund: 'CIC Money Market Fund',
      amount: 50000, // KES
      units: 4016,
      pricePerUnit: 12.45,
      status: 'Completed',
    },
    {
      id: 'TXN002',
      date: '2024-04-20',
      type: 'Dividend',
      fund: 'CIC Equity Fund',
      amount: 25000, // KES
      units: 0,
      pricePerUnit: 0,
      status: 'Completed',
    },
    {
      id: 'TXN003',
      date: '2024-04-01',
      type: 'Purchase',
      fund: 'CIC Bond Fund',
      amount: 75000, // KES
      units: 4902,
      pricePerUnit: 15.30,
      status: 'Completed',
    },
    {
      id: 'TXN004',
      date: '2024-03-15',
      type: 'Redemption',
      fund: 'CIC Money Market Fund',
      amount: -30000, // KES (negative for redemption)
      units: -2410,
      pricePerUnit: 12.45,
      status: 'Completed',
    },
    {
      id: 'TXN005',
      date: '2024-02-28',
      type: 'Purchase',
      fund: 'CIC Balanced Fund',
      amount: 100000, // KES
      units: 6452,
      pricePerUnit: 15.50,
      status: 'Completed',
    },
    {
      id: 'TXN006',
      date: '2024-01-30',
      type: 'Dividend',
      fund: 'CIC Bond Fund',
      amount: 18500, // KES
      units: 0,
      pricePerUnit: 0,
      status: 'Completed',
    },
  ],
  performance: {
    oneMonth: '+3.2%',
    threeMonths: '+8.7%',
    sixMonths: '+15.4%',
    oneYear: '+28.9%',
    threeYears: '+54.17%',
  }
};

// Utility functions to format currency and dates
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatPercentage = (value) => {
  return `${value > 0 ? '+' : ''}${value}%`;
};