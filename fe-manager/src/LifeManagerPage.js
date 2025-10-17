import React from 'react';
import './LifeManagerPage.css';

function LifeManagerPage({ onBack, onNavigateToLeisure, onNavigateToServices, onNavigateToSports, onNavigateToHealth }) {
  const lifeManagerItems = [
    { id: 1, title: 'Здоровье', icon: '❤️', description: 'Мониторинг здоровья и медицинские услуги' },
    { id: 2, title: 'Спорт', icon: '🏃', description: 'Тренировки, спортивные мероприятия' },
    { id: 3, title: 'Услуги', icon: '🔧', description: 'Бытовые и коммунальные услуги' },
    { id: 4, title: 'Досуг', icon: '🎭', description: 'Развлечения и культурные мероприятия' },
    { id: 5, title: 'Сценарии', icon: '📋', description: 'Автоматизация и сценарии жизни' }
  ];

  const handleItemClick = (item) => {
    if (item.title === 'Досуг') {
      onNavigateToLeisure();
    } else if (item.title === 'Услуги') {
      onNavigateToServices();
    } else if (item.title === 'Спорт') {
      onNavigateToSports();
    } else if (item.title === 'Здоровье') {
      onNavigateToHealth();
    }
    // Здесь можно добавить навигацию для других пунктов
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-button" onClick={onBack}>
          ‹
        </button>
        <h1>LiFE менеджер</h1>
        <p className="address">Управление качеством жизни</p>
      </header>

      <main className="main-content">
        <section className="section">
          <div className="main-menu">
            {lifeManagerItems.map((item) => (
              <div 
                key={item.id} 
                className="menu-item life-manager-item"
                onClick={() => handleItemClick(item)}
              >
                <div className="menu-item-left">
                  <span className="menu-icon life-manager-icon">{item.icon}</span>
                  <div className="life-manager-content">
                    <span className="menu-title">{item.title}</span>
                    <span className="menu-description">{item.description}</span>
                  </div>
                </div>
                <span className="chevron">{'>'}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="life-manager-info">
          <p>Все услуги и сервисы для комфортной жизни в одном месте</p>
        </div>
      </main>
    </div>
  );
}

export default LifeManagerPage;