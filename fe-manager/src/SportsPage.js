import React, { useState } from 'react';
import './SportsPage.css';

function SportsPage({ onBack }) {
  // Категории спортивных мероприятий
  const categories = [
    { id: 'all', name: 'Все мероприятия' },
    { id: 'football', name: 'Футбол' },
    { id: 'basketball', name: 'Баскетбол' },
    { id: 'hockey', name: 'Хоккей' },
    { id: 'tennis', name: 'Теннис' },
    { id: 'fitness', name: 'Фитнес' },
    { id: 'running', name: 'Бег' },
    { id: 'swimming', name: 'Плавание' },
    { id: 'other', name: 'Другое' }
  ];

  // Спортивные мероприятия
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Футбольный матч: Спартак vs Зенит',
      description: 'Элитный матч Российской Премьер-Лиги между двумя топ-клубами',
      category: 'football',
      date: '2024-05-15',
      time: '19:00',
      image: '⚽',
      venue: 'Стадион "Лужники"',
      price: 1500,
      participants: 45000
    },
    {
      id: 2,
      title: 'Баскетбольный матч: ЦСКА vs Химки',
      description: 'Ключевой матч Единой лиги ВТБ, определяющий лидера сезона',
      category: 'basketball',
      date: '2024-05-20',
      time: '18:30',
      image: '🏀',
      venue: 'УСК ЦСКА',
      price: 800,
      participants: 5000
    },
    {
      id: 3,
      title: 'Хоккейный матч: СКА vs Ак Барс',
      description: 'Плей-офф КХЛ, битва за выход в финал конференции',
      category: 'hockey',
      date: '2024-04-25',
      time: '17:00',
      image: '🏒',
      venue: 'Ледовый дворец',
      price: 1200,
      participants: 12000
    },
    {
      id: 4,
      title: 'Теннисный турнир St. Petersburg Open',
      description: 'Международный теннисный турнир ATP с участием звезд мирового тенниса',
      category: 'tennis',
      date: '2024-09-15',
      time: '14:00',
      image: '🎾',
      venue: 'Сибур Арена',
      price: 2000,
      participants: 7500
    },
    {
      id: 5,
      title: 'Групповая тренировка по йоге',
      description: 'Утренняя йога в парке с профессиональным инструктором',
      category: 'fitness',
      date: '2024-05-08',
      time: '08:00',
      image: '🧘',
      venue: 'Парк Горького',
      price: 500,
      participants: 50
    },
    {
      id: 6,
      title: 'Беговой марафон "Московская осень"',
      description: 'Ежегодный осенний марафон на дистанции 5км, 10км и 42км',
      category: 'running',
      date: '2024-09-30',
      time: '09:00',
      image: '🏃',
      venue: 'Воробьевы горы',
      price: 1000,
      participants: 10000
    },
    {
      id: 7,
      title: 'Соревнования по плаванию',
      description: 'Городские соревнования по плаванию на дистанции 50м и 100м',
      category: 'swimming',
      date: '2024-06-12',
      time: '10:00',
      image: '🏊',
      venue: 'Бассейн "Олимпийский"',
      price: 600,
      participants: 200
    },
    {
      id: 8,
      title: 'Тренировка по кроссфиту',
      description: 'Интенсивная групповая тренировка для всех уровней подготовки',
      category: 'fitness',
      date: '2024-05-18',
      time: '19:30',
      image: '💪',
      venue: 'CrossFit Box',
      price: 700,
      participants: 20
    },
    {
      id: 9,
      title: 'Пляжный волейбол',
      description: 'Летний турнир по пляжному волейболу на берегу Москвы-реки',
      category: 'other',
      date: '2024-07-22',
      time: '11:00',
      image: '🏐',
      venue: 'Пляж "Ривьера"',
      price: 400,
      participants: 100
    },
    {
      id: 10,
      title: 'Велосипедный тур по городу',
      description: 'Групповая велопрогулка по живописным местам города',
      category: 'other',
      date: '2024-06-05',
      time: '15:00',
      image: '🚴',
      venue: 'Старт: Парк Победы',
      price: 300,
      participants: 150
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Фильтрация и сортировка мероприятий
  const filteredEvents = events
    .filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'participants':
          return b.participants - a.participants;
        default:
          return 0;
      }
    });

  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Форматирование цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  // Форматирование количества участников
  const formatParticipants = (participants) => {
    if (participants >= 1000) {
      return (participants / 1000).toFixed(1) + 'k';
    }
    return participants.toString();
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-button" onClick={onBack}>
          ‹
        </button>
        <div>
          <h1>Спорт</h1>
          <p className="address">Спортивные мероприятия и тренировки</p>
        </div>
      </header>

      <main className="main-content">
        {/* Поиск и фильтры */}
        <section className="section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Поиск мероприятий..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Фильтры по категориям */}
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

          {/* Селект сортировки */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">По умолчанию</option>
            <option value="date">По дате</option>
            <option value="price-low">Цена: по возрастанию</option>
            <option value="price-high">Цена: по убыванию</option>
            <option value="participants">По популярности</option>
          </select>
        </section>

        {/* Счетчик найденных мероприятий */}
        <div className="events-count">
          Найдено мероприятий: {filteredEvents.length}
        </div>

        {/* Список мероприятий */}
        <section className="section">
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <span className="event-emoji">{event.image}</span>
                  <div className="event-participants">
                    👥 {formatParticipants(event.participants)}
                  </div>
                </div>
                
                <div className="event-content">
                  <div className="event-category">
                    {categories.find(cat => cat.id === event.category)?.name}
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <span className="detail-icon">📅</span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">🕒</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">📍</span>
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  
                  <div className="event-footer">
                    <div className="event-price">
                      {formatPrice(event.price)}
                    </div>
                    <div className="event-actions">
                      <button className="btn-primary">Купить билет</button>
                      <button className="btn-secondary">Подробнее</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="no-events">
              <div className="no-events-icon">🔍</div>
              <h3>Мероприятия не найдены</h3>
              <p>Попробуйте изменить параметры поиска или выбрать другую категорию</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default SportsPage;