// Enhanced Alert Detection Engine
// More sophisticated and accurate health monitoring

export const AlertSeverity = {
  SAFE: 'safe',
  WARNING: 'warning',
  DANGER: 'danger',
};

export class AdvancedAlertEngine {
  constructor(userProfile = {}) {
    this.user = userProfile;
  }

  // Calculate comprehensive alert based on multiple vitals
  getComprehensiveAlert(vitals) {
    const {
      heartRate = 72,
      bloodPressure = { systolic: 120, diastolic: 80 },
      bloodSugar = 100,
      oxygen = 98,
      temperature = 37,
      stressLevel = 'Normal',
    } = vitals;

    // Collect all risk factors
    const riskFactors = this.analyzeAllRisks({
      heartRate,
      bloodPressure,
      bloodSugar,
      oxygen,
      temperature,
      stressLevel,
    });

    // Determine severity
    const severity = this.calculateSeverity(riskFactors);
    const message = this.generateMessage(riskFactors, severity);

    return {
      type: severity,
      message,
      riskFactors,
      confidence: this.calculateConfidence(riskFactors),
    };
  }

  // Analyze all individual risk factors
  analyzeAllRisks(vitals) {
    const risks = [];

    // Heart Rate Analysis
    const hrRisk = this.analyzeHeartRate(vitals.heartRate);
    if (hrRisk) risks.push(hrRisk);

    // Blood Pressure Analysis
    const bpRisk = this.analyzeBloodPressure(vitals.bloodPressure);
    if (bpRisk) risks.push(bpRisk);

    // Blood Sugar Analysis (Diabetic Patients)
    if (this.user && this.user.diabetic) {
      const sugarRisk = this.analyzeBloodSugar(vitals.bloodSugar);
      if (sugarRisk) risks.push(sugarRisk);
    }

    // Oxygen Saturation Analysis (Asthma/Respiratory Issues)
    if (this.user && (this.user.asthma || this.user.respiratoryIssue)) {
      const o2Risk = this.analyzeOxygen(vitals.oxygen);
      if (o2Risk) risks.push(o2Risk);
    }

    // Temperature Analysis
    const tempRisk = this.analyzeTemperature(vitals.temperature);
    if (tempRisk) risks.push(tempRisk);

    // Stress + Anxiety Analysis
    if (this.user && this.user.anxiety && vitals.stressLevel === 'High' && vitals.heartRate > 110) {
      risks.push({
        factor: 'anxiety_panic_attack',
        severity: 'warning',
        message: 'Anxiety/panic symptoms detected',
      });
    }

    return risks;
  }

  analyzeHeartRate(hr) {
    // Heart Patient specific thresholds
    if (this.user && this.user.heartPatient) {
      if (hr > 125) return { factor: 'tachycardia_critical', severity: 'danger', message: 'Critical heart rate for cardiac patient' };
      if (hr > 110) return { factor: 'tachycardia_warning', severity: 'warning', message: 'Elevated heart rate detected' };
      if (hr < 50) return { factor: 'bradycardia', severity: 'danger', message: 'Dangerously low heart rate' };
    }

    // General population thresholds
    if (hr > 140) return { factor: 'extreme_tachycardia', severity: 'danger', message: 'Critical heart rate detected' };
    if (hr > 120) return { factor: 'tachycardia', severity: 'warning', message: 'High heart rate' };
    if (hr < 40) return { factor: 'severe_bradycardia', severity: 'danger', message: 'Critically low heart rate' };

    return null;
  }

  analyzeBloodPressure(bp) {
    const systolic = bp.systolic || 120;
    const diastolic = bp.diastolic || 80;

    // Hypertension crisis
    if (systolic > 180 || diastolic > 120) {
      return { factor: 'hypertensive_crisis', severity: 'danger', message: 'Hypertensive emergency - seek immediate help' };
    }

    // Stage 2 Hypertension
    if ((systolic >= 140) || (diastolic >= 90)) {
      return { factor: 'hypertension_stage2', severity: 'warning', message: 'High blood pressure (Stage 2)' };
    }

    // Stage 1 Hypertension
    if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) {
      return { factor: 'hypertension_stage1', severity: 'warning', message: 'Elevated blood pressure (Stage 1)' };
    }

    // Hypotension
    if (systolic < 90 && diastolic < 60) {
      return { factor: 'hypotension', severity: 'danger', message: 'Dangerously low blood pressure' };
    }

    return null;
  }

  analyzeBloodSugar(sugar) {
    // Hypoglycemic emergency
    if (sugar < 70) {
      return { factor: 'hypoglycemia', severity: 'danger', message: 'Low blood sugar - eat immediately' };
    }

    // Hyperglycemia (very high)
    if (sugar > 300) {
      return { factor: 'hyperglycemia_severe', severity: 'danger', message: 'Very high blood sugar - seek medical help' };
    }

    // High blood sugar
    if (sugar > 180) {
      return { factor: 'hyperglycemia', severity: 'warning', message: 'Elevated blood sugar detected' };
    }

    return null;
  }

  analyzeOxygen(o2) {
    // Severe hypoxia
    if (o2 < 85) {
      return { factor: 'severe_hypoxia', severity: 'danger', message: 'Critical oxygen levels - use rescue inhaler' };
    }

    // Moderate hypoxia
    if (o2 < 92) {
      return { factor: 'hypoxia', severity: 'warning', message: 'Low oxygen saturation - breathing difficulty' };
    }

    // Mild low oxygen
    if (o2 < 95 && this.user && this.user.asthma) {
      return { factor: 'low_oxygen_asthma', severity: 'warning', message: 'Oxygen dropping - monitor closely' };
    }

    return null;
  }

  analyzeTemperature(temp) {
    // High fever
    if (temp > 39) {
      return { factor: 'high_fever', severity: 'danger', message: 'Dangerously high fever - seek medical help' };
    }

    // Moderate fever
    if (temp > 38) {
      return { factor: 'fever', severity: 'warning', message: 'Fever detected - take medication' };
    }

    // Hypothermia
    if (temp < 35) {
      return { factor: 'hypothermia', severity: 'danger', message: 'Dangerous drop in body temperature' };
    }

    return null;
  }

  // Determine overall severity from risk factors
  calculateSeverity(risks) {
    if (risks.length === 0) return AlertSeverity.SAFE;
    if (risks.some(r => r.severity === 'danger')) return AlertSeverity.DANGER;
    if (risks.some(r => r.severity === 'warning')) return AlertSeverity.WARNING;
    return AlertSeverity.SAFE;
  }

  // Generate smart message based on context
  generateMessage(risks, severity) {
    if (risks.length === 0) {
      return "Vitals are stable. Keep monitoring.";
    }

    if (severity === AlertSeverity.DANGER) {
      return risks[0].message + " " + this.getEmergencyAdvice(risks[0].factor);
    }

    if (severity === AlertSeverity.WARNING) {
      return risks[0].message + " " + this.getWarningAdvice(risks[0].factor);
    }

    return "Vitals are within normal range.";
  }

  getEmergencyAdvice(factor) {
    const advice = {
      'extreme_tachycardia': 'Sit down immediately. Call emergency services.',
      'severe_hypoxia': 'Use your rescue inhaler. Seek immediate medical help.',
      'hypoglycemia': 'Consume fast-acting carbohydrates immediately.',
      'hypertensive_crisis': 'Call 911. Do not panic.',
      'severe_bradycardia': 'Seek immediate medical attention.',
    };
    return advice[factor] || 'Seek immediate medical assistance.';
  }

  getWarningAdvice(factor) {
    const advice = {
      'tachycardia': 'Rest and relax. Stay calm.',
      'hypoxia': 'Sit in a well-ventilated area. Use inhaler if needed.',
      'hyperglycemia': 'Avoid exertion. Check blood sugar levels.',
      'fever': 'Take fever-reducing medication. Stay hydrated.',
      'hypertension_stage2': 'Lie down and relax. Monitor blood pressure.',
    };
    return advice[factor] || 'Monitor your condition closely.';
  }

  calculateConfidence(risks) {
    if (risks.length === 0) return 95;
    if (risks.length === 1) return 90;
    if (risks.length === 2) return 85;
    return 80;
  }
}

export default AdvancedAlertEngine;
