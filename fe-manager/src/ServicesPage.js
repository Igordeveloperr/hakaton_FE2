import React, { useState } from 'react';
import './ServicesPage.css';

function ServicesPage({ onBack }) {
  // Категории услуг
  const categories = [
    { id: 'all', name: 'Все услуги' },
    { id: 'cleaning', name: 'Уборка' },
    { id: 'repair', name: 'Ремонт' },
    { id: 'delivery', name: 'Доставка' },
    { id: 'beauty', name: 'Красота' },
    { id: 'education', name: 'Обучение' },
    { id: 'other', name: 'Другое' }
  ];

  // Услуги
  const [services, setServices] = useState([
    {
      id: 0,
      title: 'Муж на час',
      description: 'Решение бытовых задач: повесить полки, починить кран, собрать мебель, установить технику',
      category: 'repair',
      price: 1500,
      image: '👨‍🔧',
      duration: '1 час',
      rating: 4.9,
      popular: true
    },
    {
      id: 1,
      title: 'Генеральная уборка',
      description: 'Комплексная уборка всей квартиры с использованием профессиональной химии',
      category: 'cleaning',
      price: 3500,
      image: '🧹',
      duration: '3-4 часа',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Установка кондиционера',
      description: 'Монтаж и подключение сплит-системы с гарантией 2 года',
      category: 'repair',
      price: 5000,
      image: '❄️',
      duration: '2-3 часа',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Доставка продуктов',
      description: 'Доставка свежих продуктов из супермаркетов в течение 2 часов',
      category: 'delivery',
      price: 299,
      image: '🛒',
      duration: '2 часа',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Мастер-маникюр',
      description: 'Профессиональный маникюр с покрытием гель-лаком у вас дома',
      category: 'beauty',
      price: 1500,
      image: '💅',
      duration: '1.5 часа',
      rating: 4.9
    },
    {
      id: 5,
      title: 'Репетитор по математике',
      description: 'Подготовка к ЕГЭ и ОГЭ, помощь с домашними заданиями',
      category: 'education',
      price: 1200,
      image: '📐',
      duration: '1 час',
      rating: 4.8
    },
    {
      id: 6,
      title: 'Химчистка дивана',
      description: 'Профессиональная химчистка мягкой мебели с выездом на дом',
      category: 'cleaning',
      price: 2500,
      image: '🛋️',
      duration: '2 часа',
      rating: 4.6
    },
    {
      id: 7,
      title: 'Сборка мебели',
      description: 'Сборка любой мебели из IKEA и других магазинов',
      category: 'repair',
      price: 2000,
      image: '🛠️',
      duration: '2-4 часа',
      rating: 4.7
    },
    {
      id: 8,
      title: 'Курьерская доставка',
      description: 'Срочная доставка документов и посылок по городу',
      category: 'delivery',
      price: 450,
      image: '📦',
      duration: '1-3 часа',
      rating: 4.5
    },
    {
      id: 9,
      title: 'Парикмахерские услуги',
      description: 'Стрижка, укладка, окрашивание волос на дому',
      category: 'beauty',
      price: 2000,
      image: '💇',
      duration: '2 часа',
      rating: 4.8
    },
    {
      id: 10,
      title: 'Репетитор английского',
      description: 'Индивидуальные занятия английским для любого уровня',
      category: 'education',
      price: 1000,
      image: '🇬🇧',
      duration: '1 час',
      rating: 4.9
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Фильтрация и сортировка услуг
  const filteredServices = services
    .filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          // Сначала популярные, потом остальные
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return 0;
        default:
          return 0;
      }
    });

  // Форматирование цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-button" onClick={onBack}>
          ‹
        </button>
        <div>
          <h1>Услуги</h1>
          <p className="address">Бытовые и профессиональные услуги</p>
        </div>
      </header>

      <main className="main-content">
        {/* Поиск и фильтры */}
        <section className="section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Поиск услуг..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <div className="categories-filter">
              <div className="categories-scroll">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">По умолчанию</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
              <option value="popular">Популярные</option>
            </select>
          </div>
        </section>

        {/* Счетчик найденных услуг */}
        <div className="services-count">
          Найдено услуг: {filteredServices.length}
        </div>

        {/* Список услуг */}
        <section className="section">
          <div className="services-grid">
            {filteredServices.map(service => (
              <div key={service.id} className={`service-card ${service.popular ? 'popular' : ''}`}>
                <div className="service-image">
                  <span className="service-emoji">{service.image}</span>
                  <div className="service-rating">
                    ⭐ {service.rating}
                  </div>
                  {service.popular && (
                    <div className="popular-badge">Популярная</div>
                  )}
                </div>
                
                <div className="service-content">
                  <div className="service-category">
                    {categories.find(cat => cat.id === service.category)?.name}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-details">
                    <div className="service-detail">
                      <span className="detail-icon">⏱️</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <div className="service-footer">
                    <div className="service-price">
                      {formatPrice(service.price)}
                    </div>
                    <div className="service-actions">
                      <button className="btn-primary">Заказать</button>
                      <button className="btn-secondary">Подробнее</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="no-services">
              <div className="no-services-icon">🔍</div>
              <h3>Услуги не найдены</h3>
              <p>Попробуйте изменить параметры поиска или выбрать другую категорию</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ServicesPage;