import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LifeManagerPage from './LifeManagerPage';
import LeisurePage from './LeisurePage';
import ServicesPage from './ServicesPage';
import SportsPage from './SportsPage';
import HealthPage from './HealthPage';
import ScenariosPage from './ScenariosPage';
import './App.css';

// Компонент главной страницы
function MainPage({ onNavigate }) {
  const newsCards = [
    {
      id: 1,
      title: 'Электричество',
      items: [
        'Аварийное отключение воды',
      ],
      image: '⚡',
      imageBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      date: 'Сегодня 14:30'
    },
    {
      id: 2,
      title: 'Отключение электричества',
      items: [
        'Аварийное отключение ХТВС',
        'Отключатель электр'
      ],
      image: '🔌',
      imageBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      date: 'Завтра 10:00-16:00'
    },
    {
      id: 3,
      title: 'Водоснабжение',
      items: [
        'Плановые работы',
        'Аварийные отключения',
        'Горячая вода',
        'Холодная вода'
      ],
      image: '💧',
      imageBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      date: '25.05 09:00-18:00'
    },
    {
      id: 4,
      title: 'Отопление',
      items: [
        'Пуск тепла в дома',
        'Подготовка к отопительному сезону'
      ],
      image: '🔥',
      imageBg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      date: 'С 15 октября'
    },
    {
      id: 5,
      title: 'Капремонт',
      items: [
        'Ремонт фасада',
        'Замена лифтов',
        'Обновление коммуникаций'
      ],
      image: '🏗️',
      imageBg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      date: 'Июнь-Август 2024'
    },
    {
      id: 6,
      title: 'Уборка территории',
      items: [
        'Стрижка газонов',
        'Уборка листьев',
        'Мойка фасадов'
      ],
      image: '🧹',
      imageBg: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
      date: 'Каждую пятницу'
    }
  ];

  const menuItems = [
    { id: 1, title: 'LiFE менеджер', icon: '📱' },
    { id: 2, title: 'Показания счетчиков', icon: '📊' },
    { id: 3, title: 'Бонусы', icon: '🎁' },
    { id: 4, title: 'Временные пропуски', icon: '🔑' },
    { id: 5, title: 'Квитанции от УК', icon: '🧾' },
    { id: 6, title: 'Заявки', icon: '📝' },
    { id: 7, title: 'Моя квартира', icon: '🏠' }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Главная</h1>
        <p className="address">ул. Тестовая, д. 27, кв. 5</p>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>Новости</h2>
          <div className="news-slider">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1.1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 1.3 },
                768: { slidesPerView: 2.1 }
              }}
            >
              {newsCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <div className="news-card">
                    <div 
                      className="news-card-image"
                      style={{ background: card.imageBg }}
                    >
                      <div className="news-card-emoji-container">
                        <span className="news-card-emoji">{card.image}</span>
                      </div>
                      <div className="news-card-date">{card.date}</div>
                    </div>
                    
                    <div className="news-card-content">
                      <h3 className="news-card-title">{card.title}</h3>
                      <ul className="news-card-list">
                        {card.items.map((item, index) => (
                          <li key={index} className="news-card-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2>Меню</h2>
          <div className="main-menu">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="menu-item"
                onClick={() => onNavigate(item.title)}
              >
                <div className="menu-item-left">
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-title">{item.title}</span>
                </div>
                <span className="chevron">{'>'}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Главный компонент приложения
function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const handleNavigate = (page) => {
    if (page === 'LiFE менеджер') {
      setCurrentPage('life-manager');
    }
  };

  const handleNavigateToScenarios = () => {
    setCurrentPage('scenarios');
  };

  const handleNavigateToHealth = () => {
    setCurrentPage('health');
  };

  const handleNavigateToSports = () => {
    setCurrentPage('sports');
  };

  const handleNavigateToServices = () => {
    setCurrentPage('services');
  };

  const handleNavigateToLeisure = () => {
    setCurrentPage('leisure');
  };

  const handleBackToLifeManager = () => {
    setCurrentPage('life-manager');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  return (
    <>
      {currentPage === 'main' && <MainPage onNavigate={handleNavigate} />}
      {currentPage === 'life-manager' && (
        <LifeManagerPage 
          onBack={handleBackToMain} 
          onNavigateToLeisure={handleNavigateToLeisure}
          onNavigateToServices={handleNavigateToServices}
          onNavigateToSports={handleNavigateToSports}
          onNavigateToHealth={handleNavigateToHealth}
          onNavigateToScenarios={handleNavigateToScenarios}
        />
      )}
      {currentPage === 'leisure' && <LeisurePage onBack={handleBackToLifeManager} />}
      {currentPage === 'services' && <ServicesPage onBack={handleBackToLifeManager} />}
      {currentPage === 'sports' && <SportsPage onBack={handleBackToLifeManager} />}
      {currentPage === 'health' && <HealthPage onBack={handleBackToLifeManager} />}
      {currentPage === 'scenarios' && <ScenariosPage onBack={handleBackToLifeManager} />}
    </>
  );
}

export default App;