import React, { useState } from 'react';
import './HealthPage.css';

function HealthPage({ onBack }) {
  // Данные для графиков
  const [healthData, setHealthData] = useState({
    weight: 75,
    height: 180,
    steps: 8452,
    sleep: 7.2,
    water: 1.8,
    calories: 2350
  });

  // История веса за последние 30 дней
  const weightHistory = [
    { date: '01.05', weight: 76.2 },
    { date: '05.05', weight: 75.8 },
    { date: '10.05', weight: 75.5 },
    { date: '15.05', weight: 75.3 },
    { date: '20.05', weight: 75.1 },
    { date: '25.05', weight: 75.0 },
    { date: '30.05', weight: 74.8 }
  ];

  // Данные сна за неделю
  const sleepData = [
    { day: 'Пн', hours: 6.5 },
    { day: 'Вт', hours: 7.2 },
    { day: 'Ср', hours: 6.8 },
    { day: 'Чт', hours: 7.5 },
    { day: 'Пт', hours: 8.1 },
    { day: 'Сб', hours: 7.8 },
    { day: 'Вс', hours: 7.2 }
  ];

  // Активность по дням
  const activityData = [
    { day: 'Пн', steps: 7854 },
    { day: 'Вт', steps: 10234 },
    { day: 'Ср', steps: 9231 },
    { day: 'Чт', steps: 8452 },
    { day: 'Пт', steps: 11245 },
    { day: 'Сб', steps: 6543 },
    { day: 'Вс', steps: 7891 }
  ];

  // Рассчет ИМТ
  const calculateBMI = () => {
    const heightInMeters = healthData.height / 100;
    return (healthData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Получение статуса ИМТ
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { status: 'Недостаточный вес', color: '#ff6b6b' };
    if (bmi < 25) return { status: 'Нормальный вес', color: '#51cf66' };
    if (bmi < 30) return { status: 'Избыточный вес', color: '#ffd43b' };
    return { status: 'Ожирение', color: '#ff6b6b' };
  };

  const bmi = calculateBMI();
  const bmiStatus = getBMIStatus(bmi);

  // Компонент линейного графика
  const LineChart = ({ data, color, maxValue }) => {
    const maxDataValue = Math.max(...data.map(item => item.value || item.weight || item.steps || item.hours));
    const chartMax = maxValue || maxDataValue;

    return (
      <div className="line-chart">
        <div className="chart-lines">
          {data.map((item, index) => {
            const value = item.value || item.weight || item.steps || item.hours;
            const percentage = (value / chartMax) * 100;
            return (
              <div key={index} className="chart-item">
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar" 
                    style={{ 
                      height: `${percentage}%`,
                      backgroundColor: color
                    }}
                  ></div>
                </div>
                <span className="chart-label">{item.date || item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Компонент круговой диаграммы
  const CircularProgress = ({ value, max, color, label, unit }) => {
    const percentage = (value / max) * 100;
    
    return (
      <div className="circular-progress">
        <div className="progress-circle">
          <div 
            className="progress-fill"
            style={{
              background: `conic-gradient(${color} ${percentage * 3.6}deg, #f0f0f0 0deg)`
            }}
          ></div>
          <div className="progress-text">
            <span className="progress-value">{value}</span>
            <span className="progress-unit">{unit}</span>
          </div>
        </div>
        <span className="progress-label">{label}</span>
      </div>
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-button" onClick={onBack}>
          ‹
        </button>
        <div>
          <h1>Здоровье</h1>
          <p className="address">Мониторинг показателей здоровья</p>
        </div>
      </header>

      <main className="main-content">
        {/* Основные показатели */}
        <section className="section">
          <h2>Основные показатели</h2>
          <div className="health-cards">
            <div className="health-card">
              <div className="health-card-icon">⚖️</div>
              <div className="health-card-content">
                <span className="health-card-value">{healthData.weight} кг</span>
                <span className="health-card-label">Вес</span>
              </div>
            </div>
            
            <div className="health-card">
              <div className="health-card-icon">📏</div>
              <div className="health-card-content">
                <span className="health-card-value">{healthData.height} см</span>
                <span className="health-card-label">Рост</span>
              </div>
            </div>
            
            <div className="health-card">
              <div className="health-card-icon">💓</div>
              <div className="health-card-content">
                <span className="health-card-value">{bmi}</span>
                <span 
                  className="health-card-label"
                  style={{ color: bmiStatus.color }}
                >
                  ИМТ • {bmiStatus.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Ежедневная активность */}
        <section className="section">
          <h2>Ежедневная активность</h2>
          <div className="activity-cards">
            <CircularProgress 
              value={healthData.steps} 
              max={10000} 
              color="#4dabf7" 
              label="Шаги" 
              unit="шагов"
            />
            
            <CircularProgress 
              value={healthData.sleep} 
              max={8} 
              color="#9775fa" 
              label="Сон" 
              unit="часов"
            />
            
            <CircularProgress 
              value={healthData.water} 
              max={2} 
              color="#339af0" 
              label="Вода" 
              unit="л"
            />
            
            <CircularProgress 
              value={healthData.calories} 
              max={2500} 
              color="#ff6b6b" 
              label="Калории" 
              unit="ккал"
            />
          </div>
        </section>

        {/* График веса */}
        <section className="section">
          <div className="chart-header">
            <h2>Динамика веса</h2>
            <span className="chart-period">За 30 дней</span>
          </div>
          <div className="chart-container">
            <LineChart 
              data={weightHistory} 
              color="#51cf66" 
              maxValue={78}
            />
          </div>
          <div className="chart-stats">
            <div className="chart-stat">
              <span className="stat-value">-1.4 кг</span>
              <span className="stat-label">Изменение</span>
            </div>
            <div className="chart-stat">
              <span className="stat-value">74.8 кг</span>
              <span className="stat-label">Текущий вес</span>
            </div>
          </div>
        </section>

        {/* График сна и активности */}
        <div className="charts-row">
          <section className="section">
            <div className="chart-header">
              <h3>Качество сна</h3>
              <span className="chart-average">{healthData.sleep} ч/ночь</span>
            </div>
            <div className="chart-container small">
              <LineChart 
                data={sleepData} 
                color="#9775fa" 
                maxValue={9}
              />
            </div>
          </section>

          <section className="section">
            <div className="chart-header">
              <h3>Активность</h3>
              <span className="chart-average">9,231 шаг/день</span>
            </div>
            <div className="chart-container small">
              <LineChart 
                data={activityData} 
                color="#4dabf7" 
                maxValue={12000}
              />
            </div>
          </section>
        </div>

        {/* Рекомендации */}
        <section className="section">
          <h2>Рекомендации</h2>
          <div className="recommendations">
            <div className="recommendation-card">
              <div className="recommendation-icon">💧</div>
              <div className="recommendation-content">
                <h4>Пейте больше воды</h4>
                <p>Сегодня выпито 1.8л из рекомендованных 2л</p>
              </div>
            </div>
            
            <div className="recommendation-card">
              <div className="recommendation-icon">🚶</div>
              <div className="recommendation-content">
                <h4>Пройдите еще 1548 шагов</h4>
                <p>Для достижения дневной цели 10,000 шагов</p>
              </div>
            </div>
            
            <div className="recommendation-card">
              <div className="recommendation-icon">😴</div>
              <div className="recommendation-content">
                <h4>Улучшите качество сна</h4>
                <p>Старайтесь спать 7-9 часов каждую ночь</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HealthPage;