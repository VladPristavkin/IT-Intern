import React from 'react';
import './QuestionBlock.css';

const QuestionBlock = ({
  questionData,
  questionIndex,
  answer,
  subject,
  confidence,
  onAnswerChange,
  onSubjectChange,
  onConfidenceChange,
  subjectOptions,
}) => {
  const shouldShowConfidence = subject && subject !== 'Самостоятельное изучение';

  const handleCheckboxChange = (option) => {
    if (!Array.isArray(answer)) {
      onAnswerChange([option]);
    } else if (answer.includes(option)) {
      onAnswerChange(answer.filter((item) => item !== option));
    } else {
      onAnswerChange([...answer, option]);
    }
  };

  return (
    <div>
      {/* Question */}
      <div className="question-box">
        <h3 className="question-text">{questionData.question}</h3>

        {questionData.type === 'closed' ? (
          <div className="checkbox-group">
            {questionData.options.map((option, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Введите ваш ответ..."
            className="textarea"
          />
        )}
      </div>

      {/* Subject Select */}
      <div className="form-group">
        <label>Какой предмет помог вам с этим вопросом?</label>
        <select
          value={subject || ''}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="select"
        >
          <option value="">Выберите предмет</option>
          {subjectOptions.map((s, index) => (
            <option key={index} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Confidence Range */}
      {shouldShowConfidence && (
        <div className="form-group">
          <label>
            Насколько вам пригодился этот предмет для ответа на вопрос? ({confidence || 50}%)
          </label>
          <div className="range-group">
            <span>0%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence || 50}
              onChange={(e) => onConfidenceChange(parseInt(e.target.value))}
              className="slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                  confidence || 50
                }%, #E5E7EB ${confidence || 50}%, #E5E7EB 100%)`,
              }}
            />
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBlock;