# 🧪 Quick Reference: Alert Testing

## Access Test Center
```
URL: http://localhost:3000/test
OR Click: "🧪 Test" in Navbar (look for a colorful banner at the top!)

> 🎨 The Test Center is decorated with illustrative imagery and icons to make testing feel engaging.
```

## Three Testing Modes

### 1️⃣ Dataset Tests
**What:** Test against 12+ real-world scenarios
**How:** Click "🚀 Run All Tests"
**See:** Accuracy %, alert distribution, detailed results

### 2️⃣ Condition Tests  
**What:** Test your specific health condition
**How:** 
  1. Set health profile in Settings
  2. Click "🎯 Run Scenario Tests"
  3. Review condition-specific alerts

### 3️⃣ Timeline Tests
**What:** Stress test with 300 continuous data points
**How:**
  1. Select scenario: Normal/Exercise/Anxiety/Fever
  2. Click scenario button
  3. Analyze heart rate patterns

---

## Alert Types

| Type | Icon | Color | Action |
|------|------|-------|--------|
| SAFE | ✅ | Green | Monitor |
| WARNING | ⚠️ | Yellow | Rest/Adjust |
| DANGER | 🚨 | Red | Emergency |

---

## Test Results Table

Shows for each test:
- **ID**: Test identifier
- **Description**: What was tested
- **Heart Rate**: BPM value
- **Alert Type**: Safe/Warning/Critical
- **Message**: AI recommendation
- **Result**: ✅ Pass / ❌ Fail

---

## Understanding Stats

**Accuracy %**: How many alerts were correct
- 95%+ = Excellent
- 90-95% = Very Good
- 85-90% = Good

**Total Tests**: Number of scenarios tested

**Alert Distribution**:
- Safe: Normal readings
- Warning: Caution needed
- Critical: Emergency action

---

## Risk Factors

The system identifies multiple issues:
- `extreme_tachycardia`: HR too high
- `hypertension_crisis`: BP dangerously high
- `severe_hypoxia`: Low oxygen
- `hypoglycemia`: Low blood sugar
- `fever`: High temperature

---

## Dashboard Vitals

Real-time monitoring shows:
- ❤️ **Heart Rate**: 60-100 BPM (normal)
- 🩸 **BP**: <120/80 (optimal)
- 🫁 **O2**: >95% (healthy)
- 🌡️ **Temp**: 36.5-37.5°C (normal)

---

## How Alerts Work

```
Vital Signs Input
     ↓
Risk Analysis (5+ vitals)
     ↓
Identify Risk Factors
     ↓
Determine Severity
     ↓
Generate Smart Message
     ↓
Trigger Alert (Safe/Warning/Critical)
```

---

## Health Conditions & Profile

Set in Settings (you can now also upload a profile picture!):
- 🫀 Heart Patient
- 🍬 Diabetic
- 🫁 Asthma
- 🩸 BP Patient
- 😰 Anxiety

Each has custom alert thresholds!

---

## Quick Tips

✅ **Enable** voice alerts for audio notifications
✅ **Set** your health conditions for personalized monitoring
✅ **Run** tests regularly to validate accuracy
✅ **Review** risk factors to understand your health
✅ **Follow** AI recommendations for better outcomes

---

## Files Modified/Added

**NEW:**
- `src/data/healthDataset.js` - Test data
- `src/utils/advancedAlertEngine.js` - Alert logic
- `src/pages/TestCenter.jsx` - Testing page

**UPDATED:**
- `src/pages/Dashboard.jsx` - Multi-vital monitoring
- `src/App.js` - /test route
- `src/components/Navbar.jsx` - Test button

---

## Next: Run Your First Test

1. Go to Test Center (`/test`)
2. Click "🚀 Run All Tests"
3. Wait for results
4. Review the table
5. Check accuracy % at top

**Expected Results:** 90%+ accuracy on dataset tests

---

Made with ❤️ for better health monitoring
