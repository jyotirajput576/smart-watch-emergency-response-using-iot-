// Comprehensive Health Dataset for Testing
export const healthDataset = [
  // Normal vitals - Safe range
  {
    id: 1,
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    bloodSugar: 95,
    oxygen: 98,
    temperature: 37.0,
    stressLevel: 'Normal',
    description: 'Normal healthy vitals',
    expectedAlert: 'safe'
  },
  
  // High Heart Rate - Warning
  {
    id: 2,
    heartRate: 115,
    bloodPressure: { systolic: 130, diastolic: 85 },
    bloodSugar: 110,
    oxygen: 97,
    temperature: 37.1,
    stressLevel: 'High',
    description: 'High heart rate with elevated stress',
    expectedAlert: 'warning'
  },
  
  // Critical Heart Rate - Danger
  {
    id: 3,
    heartRate: 145,
    bloodPressure: { systolic: 160, diastolic: 95 },
    bloodSugar: 250,
    oxygen: 92,
    temperature: 38.2,
    stressLevel: 'Critical',
    description: 'Critical vitals - Medical emergency',
    expectedAlert: 'danger'
  },
  
  // Low Oxygen - Danger
  {
    id: 4,
    heartRate: 105,
    bloodPressure: { systolic: 140, diastolic: 90 },
    bloodSugar: 100,
    oxygen: 88,
    temperature: 37.5,
    stressLevel: 'High',
    description: 'Low oxygen saturation - breathing issue',
    expectedAlert: 'danger'
  },
  
  // High Blood Pressure - Warning
  {
    id: 5,
    heartRate: 95,
    bloodPressure: { systolic: 160, diastolic: 100 },
    bloodSugar: 120,
    oxygen: 96,
    temperature: 37.2,
    stressLevel: 'Elevated',
    description: 'Hypertension detected',
    expectedAlert: 'warning'
  },
  
  // Low Blood Sugar - Danger
  {
    id: 6,
    heartRate: 98,
    bloodPressure: { systolic: 110, diastolic: 70 },
    bloodSugar: 55,
    oxygen: 97,
    temperature: 36.8,
    stressLevel: 'Normal',
    description: 'Hypoglycemia - dangerous blood sugar',
    expectedAlert: 'danger'
  },
  
  // Very High Blood Sugar - Warning
  {
    id: 7,
    heartRate: 88,
    bloodPressure: { systolic: 135, diastolic: 88 },
    bloodSugar: 320,
    oxygen: 96,
    temperature: 37.3,
    stressLevel: 'Moderate',
    description: 'Hyperglycemia - high blood sugar',
    expectedAlert: 'warning'
  },
  
  // Fever + High Heart Rate - Danger
  {
    id: 8,
    heartRate: 122,
    bloodPressure: { systolic: 128, diastolic: 82 },
    bloodSugar: 100,
    oxygen: 95,
    temperature: 39.5,
    stressLevel: 'High',
    description: 'High fever with tachycardia',
    expectedAlert: 'danger'
  },
  
  // Moderate stress - Warning
  {
    id: 9,
    heartRate: 110,
    bloodPressure: { systolic: 125, diastolic: 80 },
    bloodSugar: 105,
    oxygen: 97,
    temperature: 37.0,
    stressLevel: 'High',
    description: 'Elevated stress levels detected',
    expectedAlert: 'warning'
  },
  
  // Athlete vitals - Safe
  {
    id: 10,
    heartRate: 55,
    bloodPressure: { systolic: 115, diastolic: 75 },
    bloodSugar: 90,
    oxygen: 99,
    temperature: 36.9,
    stressLevel: 'Normal',
    description: 'Excellent cardiovascular health',
    expectedAlert: 'safe'
  },
  
  // Extreme tachycardia - Critical
  {
    id: 11,
    heartRate: 160,
    bloodPressure: { systolic: 170, diastolic: 105 },
    bloodSugar: 200,
    oxygen: 90,
    temperature: 38.5,
    stressLevel: 'Critical',
    description: 'Extreme heart rate - immediate emergency',
    expectedAlert: 'danger'
  },
  
  // Severe hypoxia - Critical
  {
    id: 12,
    heartRate: 130,
    bloodPressure: { systolic: 145, diastolic: 92 },
    bloodSugar: 110,
    oxygen: 82,
    temperature: 37.2,
    stressLevel: 'Critical',
    description: 'Severe oxygen deficiency',
    expectedAlert: 'danger'
  },
];

// Advanced test scenarios for different health conditions
export const advancedScenarios = {
  heartPatient: [
    { name: 'Normal Rest', vitals: { hr: 68, bp: '118/76', o2: 98 }, shouldAlert: false },
    { name: 'Elevated During Activity', vitals: { hr: 112, bp: '140/85', o2: 96 }, shouldAlert: true },
    { name: 'Critical Arrhythmia', vitals: { hr: 155, bp: '165/100', o2: 91 }, shouldAlert: true },
  ],
  
  diabetic: [
    { name: 'Normal Fasting', vitals: { sugar: 100, hr: 75 }, shouldAlert: false },
    { name: 'Post-meal High', vitals: { sugar: 280, hr: 95 }, shouldAlert: true },
    { name: 'Hypoglycemic Crisis', vitals: { sugar: 45, hr: 110 }, shouldAlert: true },
  ],
  
  asthma: [
    { name: 'Normal Breathing', vitals: { o2: 98, hr: 72 }, shouldAlert: false },
    { name: 'Breathing Difficulty', vitals: { o2: 92, hr: 115 }, shouldAlert: true },
    { name: 'Severe Asthma Attack', vitals: { o2: 85, hr: 140 }, shouldAlert: true },
  ],
  
  bpPatient: [
    { name: 'Controlled BP', vitals: { bp: '125/80', hr: 72 }, shouldAlert: false },
    { name: 'Elevated BP', vitals: { bp: '155/95', hr: 95 }, shouldAlert: true },
    { name: 'Hypertensive Crisis', vitals: { bp: '180/120', hr: 120 }, shouldAlert: true },
  ],
};

// Time-series data for stress testing
export const stressTestTimeSeries = {
  normalDay: generateTimeSeries(72, 88, 300, 'normal'),
  activeExercise: generateTimeSeries(95, 130, 300, 'exercise'),
  anxietyAttack: generateTimeSeries(85, 155, 300, 'anxiety'),
  fever: generateTimeSeries(100, 125, 300, 'fever'),
};

function generateTimeSeries(min, max, points, type) {
  const data = [];
  for (let i = 0; i < points; i++) {
    const variance = type === 'anxiety' ? Math.sin(i / 20) * 15 : 
                    type === 'exercise' ? Math.cos(i / 30) * 10 : 
                    type === 'fever' ? 5 + Math.random() * 10 :
                    Math.random() * 5;
    
    data.push({
      time: new Date(Date.now() + i * 10000).toLocaleTimeString(),
      bpm: Math.max(min, Math.min(max, min + (max - min) / 2 + variance)),
      timestamp: i,
    });
  }
  return data;
}

export default healthDataset;
