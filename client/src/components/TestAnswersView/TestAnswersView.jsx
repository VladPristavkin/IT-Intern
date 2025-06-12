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
      selectedAnswers: ['private', 'protected'],
      correctness: 50
    },
  ]
};

export default function TestAnswersView({ isOpen, onClose, testData }) {
  const [current, setCurrent] = useState(0);
  const total = mockTestData.questions.length;
  const question = mockTestData.questions[current];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon">IT</div>
            <div>
              <h2 className="modal-title">{mockTestData.testName}</h2>
              <div className="modal-meta">
                <Calendar className="icon-small" />
                <span>{mockTestData.date}</span>
                <span className="separator"></span>
                <span>{mockTestData.teacher}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X className="icon-medium" />
          </button>
        </div>

        <div className="modal-progress">
          <div className="progress-info">Вопрос {current + 1} из {total}</div>
          <div className="progress-dots">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className={`dot ${i === current ? 'dot-current' : 'dot-default'}`}
              />
            ))}
          </div>
        </div>

        <div className="modal-content">
          <div className="tags">
            <span className="tag tag-blue">{question.category}</span>
            <span className="tag tag-purple">{question.type === 'open' ? 'Открытый' : 'Закрытый'}</span>
          </div>
          <h3 className="question-text">{question.question}</h3>

          {question.type === 'closed' ? (
            <div className="answers-options">
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className={`answer-option ${question.selectedAnswers.includes(option) ? 'selected' : ''}`}
                >
                  {option}
                </div>
              ))}
            </div>
          ) : (
            <div className="answer-open">
              <strong>Ответ:</strong>
              <p>{question.selectedAnswers[0]}</p>
            </div>
          )}

          <div className="correctness-result">
            Отвечено верно на: <strong>{question.correctness}%</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setCurrent(current - 1)} disabled={current === 0} className="btn btn-secondary">
            <ChevronLeft className="icon-small" /> Предыдущий
          </button>

          <div className="footer-progress">{current + 1} / {total}</div>

          <button onClick={() => setCurrent(current + 1)} disabled={current === total - 1} className="btn btn-blue">
            Следующий <ChevronRight className="icon-small" />
          </button>
        </div>
      </div>
    </div>
  );
}
