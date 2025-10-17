import React, { useState } from 'react';
import './ScenariosPage.css';

function ScenariosPage({ onBack }) {
  // Категории сценариев
  const categories = [
    { id: 'all', name: 'Все сценарии' },
    { id: 'family', name: 'Семья' },
    { id: 'work', name: 'Работа' },
    { id: 'health', name: 'Здоровье' },
    { id: 'home', name: 'Дом' },
    { id: 'children', name: 'Дети' }
  ];

  // Сценарии
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      title: 'Утренний ритуал',
      description: 'Автоматизация утренних процедур для всей семьи',
      category: 'family',
      blocks: [
        { id: 1, type: 'time', value: '07:00', label: 'Пробуждение' },
        { id: 2, type: 'action', value: 'coffee', label: 'Включить кофеварку' },
        { id: 3, type: 'action', value: 'lights', label: 'Включить свет' },
        { id: 4, type: 'delay', value: '15', label: 'Через 15 минут' },
        { id: 5, type: 'action', value: 'music', label: 'Включить музыку' }
      ],
      active: true,
      target: 'family'
    },
    {
      id: 2,
      title: 'Детский сон',
      description: 'Автоматизация вечерних процедур для детей',
      category: 'children',
      blocks: [
        { id: 1, type: 'time', value: '20:30', label: 'Подготовка ко сну' },
        { id: 2, type: 'action', value: 'lights_dim', label: 'Приглушить свет' },
        { id: 3, type: 'action', value: 'music_calm', label: 'Спокойная музыка' },
        { id: 4, type: 'delay', value: '30', label: 'Через 30 минут' },
        { id: 5, type: 'action', value: 'lights_off', label: 'Выключить свет' }
      ],
      active: true,
      target: 'children'
    },
    {
      id: 3,
      title: 'Рабочий день',
      description: 'Автоматизация рабочего пространства',
      category: 'work',
      blocks: [
        { id: 1, type: 'time', value: '09:00', label: 'Начало работы' },
        { id: 2, type: 'action', value: 'pc_on', label: 'Включить ПК' },
        { id: 3, type: 'action', value: 'lights_work', label: 'Рабочее освещение' },
        { id: 4, type: 'condition', value: 'meeting', label: 'Если встреча' },
        { id: 5, type: 'action', value: 'camera_on', label: 'Включить камеру' }
      ],
      active: false,
      target: 'adults'
    },
    {
      id: 4,
      title: 'Фитнес-режим',
      description: 'Автоматизация тренировочного процесса',
      category: 'health',
      blocks: [
        { id: 1, type: 'time', value: '19:00', label: 'Время тренировки' },
        { id: 2, type: 'action', value: 'lights_gym', label: 'Освещение зала' },
        { id: 3, type: 'action', value: 'music_workout', label: 'Мотивирующая музыка' },
        { id: 4, type: 'action', value: 'ac_on', label: 'Кондиционер' },
        { id: 5, type: 'delay', value: '60', label: 'Через 60 минут' },
        { id: 6, type: 'action', value: 'sauna', label: 'Подготовить сауну' }
      ],
      active: true,
      target: 'adults'
    },
    {
      id: 5,
      title: 'Вечерний отдых',
      description: 'Создание атмосферы для релаксации',
      category: 'home',
      blocks: [
        { id: 1, type: 'time', value: '21:00', label: 'Вечерний режим' },
        { id: 2, type: 'action', value: 'lights_warm', label: 'Теплый свет' },
        { id: 3, type: 'action', value: 'music_jazz', label: 'Джазовая музыка' },
        { id: 4, type: 'action', value: 'curtains', label: 'Закрыть шторы' },
        { id: 5, type: 'action', value: 'aroma', label: 'Включить аромалампу' }
      ],
      active: false,
      target: 'family'
    },
    {
      id: 6,
      title: 'Безопасность детей',
      description: 'Контроль доступа и уведомления',
      category: 'children',
      blocks: [
        { id: 1, type: 'condition', value: 'door_open', label: 'Если дверь открыта' },
        { id: 2, type: 'notification', value: 'parent', label: 'Уведомить родителей' },
        { id: 3, type: 'action', value: 'camera_record', label: 'Запись камеры' },
        { id: 4, type: 'delay', value: '5', label: 'Через 5 минут' },
        { id: 5, type: 'notification', value: 'emergency', label: 'Экстренное уведомление' }
      ],
      active: true,
      target: 'children'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingScenario, setEditingScenario] = useState(null);
  const [newBlockType, setNewBlockType] = useState('action');

  // Фильтрация сценариев
  const filteredScenarios = scenarios.filter(scenario => 
    selectedCategory === 'all' || scenario.category === selectedCategory
  );

  // Типы блоков для редактирования
  const blockTypes = [
    { id: 'time', name: 'Время', icon: '⏰', color: '#4dabf7' },
    { id: 'action', name: 'Действие', icon: '⚡', color: '#51cf66' },
    { id: 'condition', name: 'Условие', icon: '❓', color: '#ffd43b' },
    { id: 'delay', name: 'Задержка', icon: '⏳', color: '#9775fa' },
    { id: 'notification', name: 'Уведомление', icon: '📱', color: '#ff6b6b' }
  ];

  // Переключение активности сценария
  const toggleScenario = (scenarioId) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === scenarioId 
        ? { ...scenario, active: !scenario.active }
        : scenario
    ));
  };

  // Начало редактирования сценария
  const startEditing = (scenario) => {
    setEditingScenario({ ...scenario });
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingScenario(null);
  };

  // Сохранение изменений
  const saveScenario = () => {
    if (editingScenario) {
      setScenarios(scenarios.map(scenario => 
        scenario.id === editingScenario.id ? editingScenario : scenario
      ));
      setEditingScenario(null);
    }
  };

  // Добавление нового блока
  const addBlock = () => {
    if (!editingScenario) return;

    const newBlock = {
      id: Date.now(),
      type: newBlockType,
      value: '',
      label: 'Новый блок'
    };

    setEditingScenario({
      ...editingScenario,
      blocks: [...editingScenario.blocks, newBlock]
    });
  };

  // Удаление блока
  const removeBlock = (blockId) => {
    if (!editingScenario) return;

    setEditingScenario({
      ...editingScenario,
      blocks: editingScenario.blocks.filter(block => block.id !== blockId)
    });
  };

  // Обновление блока
  const updateBlock = (blockId, field, value) => {
    if (!editingScenario) return;

    setEditingScenario({
      ...editingScenario,
      blocks: editingScenario.blocks.map(block =>
        block.id === blockId ? { ...block, [field]: value } : block
      )
    });
  };

  // Получение иконки и цвета для типа блока
  const getBlockInfo = (type) => {
    return blockTypes.find(bt => bt.id === type) || blockTypes[0];
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-button" onClick={onBack}>
          ‹
        </button>
        <div>
          <h1>Сценарии</h1>
          <p className="address">Автоматизация повседневной жизни</p>
        </div>
      </header>

      <main className="main-content">
        {/* Фильтры по категориям */}
        <section className="section">
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

        {/* Список сценариев */}
        <section className="section">
          <div className="scenarios-grid">
            {filteredScenarios.map(scenario => (
              <div key={scenario.id} className="scenario-card">
                <div className="scenario-header">
                  <div className="scenario-title-section">
                    <h3 className="scenario-title">{scenario.title}</h3>
                    <span className="scenario-target">
                      {scenario.target === 'family' && '👨‍👩‍👧‍👦 Семья'}
                      {scenario.target === 'children' && '🧒 Дети'}
                      {scenario.target === 'adults' && '👨‍💼 Взрослые'}
                    </span>
                  </div>
                  <div className="scenario-actions">
                    <button 
                      className={`toggle-btn ${scenario.active ? 'active' : ''}`}
                      onClick={() => toggleScenario(scenario.id)}
                    >
                      {scenario.active ? 'Вкл' : 'Выкл'}
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => startEditing(scenario)}
                    >
                      ✏️
                    </button>
                  </div>
                </div>
                
                <p className="scenario-description">{scenario.description}</p>
                
                <div className="blocks-preview">
                  {scenario.blocks.slice(0, 4).map(block => {
                    const blockInfo = getBlockInfo(block.type);
                    return (
                      <div 
                        key={block.id} 
                        className="block-preview"
                        style={{ borderLeftColor: blockInfo.color }}
                      >
                        <span className="block-icon">{blockInfo.icon}</span>
                        <span className="block-label">{block.label}</span>
                      </div>
                    );
                  })}
                  {scenario.blocks.length > 4 && (
                    <div className="block-more">
                      +{scenario.blocks.length - 4} ещё
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Модальное окно редактирования */}
        {editingScenario && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Редактирование сценария</h2>
                <button className="close-btn" onClick={cancelEditing}>×</button>
              </div>
              
              <div className="edit-section">
                <label>Название сценария</label>
                <input
                  type="text"
                  value={editingScenario.title}
                  onChange={(e) => setEditingScenario({
                    ...editingScenario,
                    title: e.target.value
                  })}
                  className="edit-input"
                />
              </div>

              <div className="edit-section">
                <label>Описание</label>
                <textarea
                  value={editingScenario.description}
                  onChange={(e) => setEditingScenario({
                    ...editingScenario,
                    description: e.target.value
                  })}
                  className="edit-textarea"
                  rows="3"
                />
              </div>

              <div className="blocks-editor">
                <h3>Блоки сценария</h3>
                
                <div className="add-block-section">
                  <select 
                    value={newBlockType}
                    onChange={(e) => setNewBlockType(e.target.value)}
                    className="block-type-select"
                  >
                    {blockTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                  <button className="add-block-btn" onClick={addBlock}>
                    + Добавить блок
                  </button>
                </div>

                <div className="blocks-list">
                  {editingScenario.blocks.map(block => {
                    const blockInfo = getBlockInfo(block.type);
                    return (
                      <div key={block.id} className="edit-block">
                        <div 
                          className="block-header"
                          style={{ backgroundColor: blockInfo.color }}
                        >
                          <span className="block-type-icon">{blockInfo.icon}</span>
                          <span className="block-type-name">{blockInfo.name}</span>
                          <button 
                            className="remove-block-btn"
                            onClick={() => removeBlock(block.id)}
                          >
                            ×
                          </button>
                        </div>
                        <div className="block-content">
                          <input
                            type="text"
                            value={block.label}
                            onChange={(e) => updateBlock(block.id, 'label', e.target.value)}
                            placeholder="Название блока"
                            className="block-input"
                          />
                          <input
                            type="text"
                            value={block.value}
                            onChange={(e) => updateBlock(block.id, 'value', e.target.value)}
                            placeholder="Значение"
                            className="block-input"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={cancelEditing}>
                  Отмена
                </button>
                <button className="btn-primary" onClick={saveScenario}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ScenariosPage;