import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './TestAnswersView.css';

const mockTestData = {
  testName: 'Проверка знаний',
  teacher: 'Сергиенко О.В.',
  date: '29.04.2024',
  questions: [
    {
      id: 1,
      category: 'C#',
      subcategory: 'ASP.NET',
      type: 'closed',
      question: 'Какой из следующих методов используется для создания Web API контроллера в ASP.NET Core?',
      options: ['Controller', 'ApiController', 'ControllerBase', 'WebApiController'],
      selectedAnswers: ['ControllerBase'],
      correctness: 100
    },
    {
      id: 2,
      category: 'C#',
      subcategory: 'LINQ',
      type: 'open',
      question: 'Напишите LINQ запрос для выбора всех элементов из коллекции, где свойство Age больше 18',
      selectedAnswers: ['var result = people.Where(p => p.Age > 18);'],
      correctness: 90
    },
    {
      id: 3,
      category: 'Database',
      subcategory: 'SQL',
      type: 'closed',
      question: 'Какая команда SQL используется для получения данных из таблицы?',
      options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
      selectedAnswers: ['SELECT'],
      correctness: 100
    },
    {
      id: 4,
      category: 'React',
      subcategory: 'Hooks',
      type: 'closed',
      question: 'Какой хук используется для управления локальным состоянием компонента в React?',
      options: ['useEffect', 'useState', 'useRef', 'useReducer'],
      selectedAnswers: ['useEffect', 'useState'],
      correctness: 50
    },
    {
      id: 5,
      category: 'C#',
      subcategory: 'OOP',
      type: 'closed',
      question: 'Какой модификатор доступа позволяет использовать метод только внутри текущего класса?',
      options: ['public', 'private', 'protected', 'internal'],
      selectedAnswers: ['private'],
      correctness: 100
    },
  ]
};

export default function TestAnswersView({ isOpen, onClose, testData }) {
  const [current, setCurrent] = useState(0);
  const total = mockTestData.questions.length;
  const question = mockTestData.questions[current];

  return (
    <div className="test-answers-modal-overlay" onClick={onClose}>
      <div className="test-answers-modal-container" onClick={e => e.stopPropagation()}>
        <div className="test-answers-modal-header">
          <div className="test-answers-modal-header-left">
            <div className="test-answers-modal-icon">IT</div>
            <div>
              <h2 className="test-answers-modal-title">{mockTestData.testName}</h2>
              <div className="test-answers-modal-meta">
                <Calendar className="test-answers-icon-small" />
                <span>{mockTestData.date}</span>
                <div className="test-answers-separator" />
                <span>{mockTestData.teacher}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="test-answers-modal-close-btn">
            <X className="test-answers-icon-medium" />
          </button>
        </div>

        <div className="test-answers-modal-progress">
          <div className="test-answers-progress-info">Вопрос {current + 1} из {total}</div>
          <div className="test-answers-progress-dots">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className={`test-answers-dot ${i === current ? 'test-answers-dot-current' : 'test-answers-dot-default'}`}
              />
            ))}
          </div>
        </div>

        <div className="test-answers-modal-content">
          <div className="test-answers-tags">
            <span className="test-answers-tag test-answers-tag-blue">{question.category}</span>
            <span className="test-answers-tag test-answers-tag-purple">
              {question.type === 'open' ? 'Открытый' : 'Закрытый'}
            </span>
          </div>
          <h3 className="test-answers-question-text">{question.question}</h3>

          {question.type === 'closed' ? (
            <div className="test-answers-options">
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className={`test-answers-option ${
                    question.selectedAnswers.includes(option) ? 'test-answers-option-selected' : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          ) : (
            <div className="test-answers-open">
              <strong>Ответ:</strong>
              <p>{question.selectedAnswers[0]}</p>
            </div>
          )}

          <div className="test-answers-correctness">
            Отвечено верно на: <strong>{question.correctness}%</strong>
          </div>
        </div>

        <div className="test-answers-modal-footer">
          <button 
            onClick={() => setCurrent(current - 1)} 
            disabled={current === 0} 
            className="test-answers-btn test-answers-btn-secondary"
          >
            <ChevronLeft className="test-answers-icon-small" /> Предыдущий
          </button>

          <div className="test-answers-footer-progress">{current + 1} / {total}</div>

          <button 
            onClick={() => setCurrent(current + 1)} 
            disabled={current === total - 1} 
            className="test-answers-btn test-answers-btn-blue"
          >
            Следующий <ChevronRight className="test-answers-icon-small" />
          </button>
        </div>
      </div>
    </div>
  );
}