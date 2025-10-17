import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LifeManagerPage from './LifeManagerPage';
import LeisurePage from './LeisurePage';
import ServicesPage from './ServicesPage';
import './App.css';

// Компонент главной страницы
function MainPage({ onNavigate }) {
  const newsCards = [
    {
      id: 1,
      title: 'Электричество',
      items: [
        'Аварийное отключение воды',
      ]
    },
    {
      id: 2,
      title: 'Отключение электричества',
      items: [
        'Аварийное отключение ХТВС',
        'Отключатель электр'
      ]
    },
    {
      id: 3,
      title: 'Водоснабжение',
      items: [
        'Плановые работы',
        'Аварийные отключения',
        'Горячая вода',
        'Холодная вода'
      ]
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
                    <h3 className="news-card-title">{card.title}</h3>
                    <div className="news-card-content">
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
    // Здесь можно добавить навигацию для других страниц из главного меню
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
        />
      )}
      {currentPage === 'leisure' && <LeisurePage onBack={handleBackToLifeManager} />}
      {currentPage === 'services' && <ServicesPage onBack={handleBackToLifeManager} />}
    </>
  );
}

export default App;