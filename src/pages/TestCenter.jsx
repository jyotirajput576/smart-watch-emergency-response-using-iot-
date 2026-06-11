import { useState, useMemo } from 'react';
import { healthDataset, advancedScenarios, stressTestTimeSeries } from '../data/healthDataset';
import AdvancedAlertEngine from '../utils/advancedAlertEngine';
import { useUser } from '../context/UserContext';

export default function TestCenter() {
  const { user } = useUser();
  const [testResults, setTestResults] = useState([]);
  const [activeTab, setActiveTab] = useState('dataset'); // dataset, scenarios, timeline
  const [filterType, setFilterType] = useState('all');

  const alertEngine = useMemo(() => new AdvancedAlertEngine(user), [user]);

  // Run tests on entire dataset
  const runDatasetTests = () => {
    const results = healthDataset.map(item => {
      const vitals = {
        heartRate: item.heartRate,
        bloodPressure: item.bloodPressure,
        bloodSugar: item.bloodSugar,
        oxygen: item.oxygen,
        temperature: item.temperature,
        stressLevel: item.stressLevel,
      };

      const alert = alertEngine.getComprehensiveAlert(vitals);
      const isCorrect = alert.type === item.expectedAlert;

      return {
        ...item,
        alert,
        isCorrect,
        testPassed: isCorrect ? '✅' : '❌',
      };
    });

    setTestResults(results);
  };

  // Run scenario-based tests
  const runScenarioTests = () => {
    let scenarios = [];
    
    if (user?.heartPatient) {
      scenarios = advancedScenarios.heartPatient.map((s, idx) => ({
        id: `heart-${idx}`,
        ...s,
      }));
    } else if (user?.diabetic) {
      scenarios = advancedScenarios.diabetic.map((s, idx) => ({
        id: `diabetic-${idx}`,
        ...s,
      }));
    } else if (user?.asthma) {
      scenarios = advancedScenarios.asthma.map((s, idx) => ({
        id: `asthma-${idx}`,
        ...s,
      }));
    } else if (user?.bpPatient) {
      scenarios = advancedScenarios.bpPatient.map((s, idx) => ({
        id: `bp-${idx}`,
        ...s,
      }));
    }

    const results = scenarios.map(scenario => {
      const alert = alertEngine.getComprehensiveAlert(scenario.vitals);
      const isCorrect = (alert.type !== 'safe') === scenario.shouldAlert;

      return {
        ...scenario,
        alert,
        isCorrect,
        testPassed: isCorrect ? '✅' : '❌',
      };
    });

    setTestResults(results);
  };

  // Run time-series stress tests
  const runTimelineTest = (timelineType) => {
    const timeSeries = stressTestTimeSeries[timelineType];
    const results = timeSeries.map((dataPoint, idx) => {
      const alert = alertEngine.getComprehensiveAlert({ heartRate: dataPoint.bpm });
      
      return {
        id: `timeline-${idx}`,
        time: dataPoint.time,
        heartRate: dataPoint.bpm,
        alert,
        timestamp: idx,
      };
    });

    setTestResults(results);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (testResults.length === 0) return null;

    const passed = testResults.filter(r => r.isCorrect).length;
    const accuracy = ((passed / testResults.length) * 100).toFixed(2);
    const alerts = {
      safe: testResults.filter(r => r.alert.type === 'safe').length,
      warning: testResults.filter(r => r.alert.type === 'warning').length,
      danger: testResults.filter(r => r.alert.type === 'danger').length,
    };

    return { passed, accuracy, alerts, total: testResults.length };
  }, [testResults]);

  // Filter results
  const filteredResults = useMemo(() => {
    if (filterType === 'all') return testResults;
    return testResults.filter(r => r.alert.type === filterType);
  }, [testResults, filterType]);

  return (
    <div className="bg-dashboard animated-bg min-h-[calc(100vh-56px)] p-8 animate-slideUp">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape square"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
      </div>
      <div className="mb-4">
        <img
          src="/assets/banner-test.svg"
          alt="Testing Banner"
          className="w-full h-32 object-cover rounded-lg shadow-md mb-4"
        />
      </div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-2">🧪 Alert Test Center</h1>
      <p className="text-gray-400 mb-6">Test health alerts against comprehensive datasets</p>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-gray-600">
        <button
          onClick={() => setActiveTab('dataset')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'dataset'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          📊 Dataset Tests
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'scenarios'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          🎯 Condition Tests
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'timeline'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          📈 Timeline Tests
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'dataset' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Run Dataset Tests</h2>
            <p className="text-gray-400 mb-4">Test alert system against {healthDataset.length} pre-defined health scenarios</p>
            <button
              onClick={runDatasetTests}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-bold text-white transition"
            >
              🚀 Run All Tests
            </button>
          </div>
        </div>
      )}

      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Condition-Specific Tests</h2>
            <p className="text-gray-400 mb-4">
              {user?.heartPatient && 'Testing for cardiac patient scenarios'}
              {user?.diabetic && 'Testing for diabetic patient scenarios'}
              {user?.asthma && 'Testing for asthma patient scenarios'}
              {user?.bpPatient && 'Testing for hypertension scenarios'}
              {!user?.heartPatient && !user?.diabetic && !user?.asthma && !user?.bpPatient && 'Complete health profile to enable condition-specific tests'}
            </p>
            <button
              onClick={runScenarioTests}
              disabled={!user?.heartPatient && !user?.diabetic && !user?.asthma && !user?.bpPatient}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-white transition"
            >
              🎯 Run Scenario Tests
            </button>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Time-Series Stress Tests</h2>
            <p className="text-gray-400 mb-4">Analyze alert behavior over 300 data points under different conditions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['normalDay', 'activeExercise', 'anxietyAttack', 'fever'].map(type => (
                <button
                  key={type}
                  onClick={() => runTimelineTest(type)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-white text-sm transition"
                >
                  {type.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <StatCard title="Total Tests" value={stats.total} color="cyan" />
          <StatCard title="Accuracy" value={`${stats.accuracy}%`} color="green" />
          <StatCard title="Warnings" value={stats.alerts.warning} color="yellow" />
          <StatCard title="Critical" value={stats.alerts.danger} color="red" />
        </div>
      )}

      {/* Filter Controls */}
      {testResults.length > 0 && (
        <div className="mt-8 flex gap-3 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterType === 'all'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All ({testResults.length})
          </button>
          <button
            onClick={() => setFilterType('safe')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterType === 'safe'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Safe ({testResults.filter(r => r.alert.type === 'safe').length})
          </button>
          <button
            onClick={() => setFilterType('warning')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterType === 'warning'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Warning ({testResults.filter(r => r.alert.type === 'warning').length})
          </button>
          <button
            onClick={() => setFilterType('danger')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterType === 'danger'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Danger ({testResults.filter(r => r.alert.type === 'danger').length})
          </button>
        </div>
      )}

      {/* Results Table */}
      {filteredResults.length > 0 && (
        <div className="mt-8 glass rounded-xl p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-cyan-300 mb-4">Test Results</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-cyan-400">Test ID</th>
                <th className="text-left py-3 px-4 text-cyan-400">Description</th>
                <th className="text-left py-3 px-4 text-cyan-400">Heart Rate</th>
                <th className="text-left py-3 px-4 text-cyan-400">Alert Type</th>
                <th className="text-left py-3 px-4 text-cyan-400">Message</th>
                <th className="text-center py-3 px-4 text-cyan-400">Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.slice(0, 20).map((result, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-gray-300">#{result.id}</td>
                  <td className="py-3 px-4 text-gray-400">{result.description || result.name || 'Timeline Data'}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${result.heartRate > 100 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.heartRate || result.vitals?.hr} BPM
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        result.alert.type === 'danger'
                          ? 'bg-red-900/30 text-red-300'
                          : result.alert.type === 'warning'
                          ? 'bg-yellow-900/30 text-yellow-300'
                          : 'bg-green-900/30 text-green-300'
                      }`}
                    >
                      {result.alert.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs max-w-xs truncate">{result.alert.message}</td>
                  <td className="text-center py-3 px-4 font-bold text-lg">{result.testPassed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredResults.length > 20 && (
            <p className="text-gray-500 text-sm mt-4">Showing 20 of {filteredResults.length} results</p>
          )}
        </div>
      )}

      {testResults.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-lg">👈 Select a test type and click a button to start testing</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    cyan: 'bg-cyan-900/40 border-cyan-500 text-cyan-300',
    green: 'bg-green-900/40 border-green-500 text-green-300',
    yellow: 'bg-yellow-900/40 border-yellow-500 text-yellow-300',
    red: 'bg-red-900/40 border-red-500 text-red-300',
  };

  return (
    <div className={`${colors[color]} border p-6 rounded-xl text-center`}>
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
