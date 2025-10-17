import React, { useState } from 'react';
import './LeisurePage.css';

function LeisurePage({ onBack }) {
  // Категории мероприятий
  const categories = [
    { id: 'all', name: 'Все мероприятия' },
    { id: 'theater', name: 'Театр' },
    { id: 'concert', name: 'Концерты' },
    { id: 'exhibition', name: 'Выставки' },
    { id: 'cinema', name: 'Кино' },
    { id: 'sport', name: 'Спорт' },
    { id: 'festival', name: 'Фестивали' }
  ];

  // Мероприятия
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Евгений Онегин',
      description: 'Опера П.И. Чайковского в постановке Большого театра',
      category: 'theater',
      date: '2024-12-15',
      time: '19:00',
      image: '🎭',
      venue: 'Большой театр'
    },
    {
      id: 2,
      title: 'Рок-фестиваль "Нашествие"',
      description: 'Крупнейший рок-фестиваль с участием ведущих групп страны',
      category: 'festival',
      date: '2024-07-20',
      time: '14:00',
      image: '🎸',
      venue: 'Поле у деревни Большое Заборовье'
    },
    {
      id: 3,
      title: 'Выставка импрессионистов',
      description: 'Шедевры Моне, Ренуара и Дега из коллекции музея Орсе',
      category: 'exhibition',
      date: '2024-11-10',
      time: '10:00',
      image: '🖼️',
      venue: 'Пушкинский музей'
    },
    {
      id: 4,
      title: 'Финал Кубка России',
      description: 'Футбольный матч за Кубок России между Спартаком и Зенитом',
      category: 'sport',
      date: '2024-05-25',
      time: '18:30',
      image: '⚽',
      venue: 'Стадион "Лужники"'
    },
    {
      id: 5,
      title: 'Симфонический оркестр',
      description: 'Бетховен - Симфония №9 под управлением Валерия Гергиева',
      category: 'concert',
      date: '2024-09-05',
      time: '20:00',
      image: '🎻',
      venue: 'Концертный зал Чайковского'
    },
    {
      id: 6,
      title: 'Премьера блокбастера',
      description: 'Новый фильм Кристофера Нолана "Временной вихрь"',
      category: 'cinema',
      date: '2024-08-12',
      time: '21:15',
      image: '🎬',
      venue: 'Кинотеатр "Октябрь"'
    },
    {
      id: 7,
      title: 'Щелкунчик',
      description: 'Балет П.И. Чайковского в постановке Мариинского театра',
      category: 'theater',
      date: '2024-12-24',
      time: '18:00',
      image: '💃',
      venue: 'Мариинский театр'
    },
    {
      id: 8,
      title: 'Джазовый вечер',
      description: 'Выступление Игоря Бутмана с биг-бэндом',
      category: 'concert',
      date: '2024-06-08',
      time: '19:30',
      image: '🎷',
      venue: 'Джаз-клуб "Союз Композиторов"'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Фильтрация мероприятий
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-button" onClick={onBack}>
          ‹
        </button>
        <div>
          <h1>Досуг</h1>
          <p className="address">Мероприятия и развлечения</p>
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
                </div>
                
                <div className="event-content">
                  <div className="event-category">{categories.find(cat => cat.id === event.category)?.name}</div>
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
                  
                  <div className="event-actions">
                    <button className="btn-primary">Купить билет</button>
                    <button className="btn-secondary">Подробнее</button>
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

export default LeisurePage;